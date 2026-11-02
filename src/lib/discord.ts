import { siteUrl } from '@/config/guild';
import { fixtures } from './fixtures';
import { formatDay, formatTimeRange } from './format';
import { cleanPost, parseSeats } from './parse';
import type { Counts, Post, RaidNight, Seat } from './types';

const BASE_URL = 'https://discord.com/api/v10';
const TIMEOUT_MS = 5_000;
const MAX_RETRY_SECONDS = 2;
const REVALIDATE_SECONDS = 3600;

// Discord message types: DEFAULT and REPLY. Everything else is a system notice.
const USER_MESSAGE_TYPES = [0, 19];
const POST_LIMIT = 3;
const RAID_NIGHT_LIMIT = 3;
const EVENT_SCHEDULED = 1;
const EVENT_ACTIVE = 2;

export class DiscordAuthError extends Error {}

interface DiscordMessage {
  id: string;
  type: number;
  content: string;
  timestamp: string;
  author: { username: string; global_name?: string | null; bot?: boolean; system?: boolean };
}

interface DiscordEvent {
  name: string;
  status: number;
  scheduled_start_time: string;
  scheduled_end_time?: string | null;
}

function isMock(): boolean {
  return process.env.DISCORD_MOCK === '1';
}

function env(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is not set`);
  return value;
}

let authFailureLogged = false;

async function request<T>(path: string, { auth = true, retried = false } = {}): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: {
      ...(auth ? { Authorization: `Bot ${env('DISCORD_BOT_TOKEN')}` } : {}),
      'User-Agent': `cerberus-site (${siteUrl}, 1.0)`,
    },
    signal: AbortSignal.timeout(TIMEOUT_MS),
    next: { revalidate: REVALIDATE_SECONDS },
  });

  if (response.status === 429 && !retried) {
    const { retry_after: retryAfter } = (await response.json()) as { retry_after?: number };
    if (retryAfter !== undefined && retryAfter <= MAX_RETRY_SECONDS) {
      await new Promise((resolve) => setTimeout(resolve, retryAfter * 1000));
      return request<T>(path, { auth, retried: true });
    }
    throw new Error(`Discord rate limited ${path}`);
  }
  if (auth && (response.status === 401 || response.status === 403)) {
    if (!authFailureLogged) {
      authFailureLogged = true;
      console.error(`Discord rejected the bot token (${response.status} on ${path})`);
    }
    throw new DiscordAuthError(`${response.status} on ${path}`);
  }
  if (!response.ok) throw new Error(`Discord returned ${response.status} on ${path}`);
  return (await response.json()) as T;
}

export function getInviteUrl(): string {
  return isMock() ? fixtures.inviteUrl : (process.env.DISCORD_INVITE_URL ?? fixtures.inviteUrl);
}

export async function getGuildCounts(): Promise<Counts> {
  if (isMock()) return fixtures.counts;
  const guild = await request<{
    approximate_member_count?: number;
    approximate_presence_count?: number;
  }>(`/guilds/${env('DISCORD_GUILD_ID')}?with_counts=true`);
  return { members: guild.approximate_member_count, online: guild.approximate_presence_count };
}

// Needs "Enable Server Widget" on. Only used when the authenticated count call fails.
export async function getWidgetCounts(): Promise<Counts> {
  if (isMock()) return { online: fixtures.counts.online };
  const widget = await request<{ presence_count?: number }>(
    `/guilds/${env('DISCORD_GUILD_ID')}/widget.json`,
    { auth: false },
  );
  return { online: widget.presence_count };
}

export async function getAnnouncements(): Promise<Post[]> {
  if (isMock()) return fixtures.posts;
  const messages = await request<DiscordMessage[]>(
    `/channels/${env('DISCORD_ANNOUNCEMENTS_CHANNEL_ID')}/messages?limit=10`,
  );
  return messages
    .filter(({ author, type }) => !author.bot && !author.system && USER_MESSAGE_TYPES.includes(type))
    .map((message) => ({
      id: message.id,
      author: message.author.global_name ?? message.author.username,
      text: cleanPost(message.content),
      postedAt: message.timestamp,
    }))
    .filter((post) => post.text)
    .slice(0, POST_LIMIT);
}

export async function getOpenSeats(): Promise<Seat[]> {
  if (isMock()) return fixtures.seats;
  // No channel configured is a choice, not a sync failure, so it must not block refreshes
  const channel = process.env.DISCORD_RECRUITMENT_CHANNEL_ID;
  if (!channel) return [];
  const { items } = await request<{ items: { message: DiscordMessage }[] }>(
    `/channels/${channel}/messages/pins`,
  );
  const [latest] = items
    .map(({ message }) => message)
    .sort((a, b) => b.timestamp.localeCompare(a.timestamp));
  return latest ? parseSeats(latest.content) : [];
}

export async function getScheduledRaids(): Promise<RaidNight[]> {
  if (isMock()) return fixtures.raidNights;
  const events = await request<DiscordEvent[]>(`/guilds/${env('DISCORD_GUILD_ID')}/scheduled-events`);
  return events
    .filter(({ status }) => status === EVENT_SCHEDULED || status === EVENT_ACTIVE)
    .sort((a, b) => a.scheduled_start_time.localeCompare(b.scheduled_start_time))
    .slice(0, RAID_NIGHT_LIMIT)
    .map((event) => ({
      label: event.name,
      day: formatDay(event.scheduled_start_time),
      time: formatTimeRange(event.scheduled_start_time, event.scheduled_end_time),
      startsAt: event.scheduled_start_time,
    }));
}
