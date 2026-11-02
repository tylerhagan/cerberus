import { guild } from '@/config/guild';
import {
  DiscordAuthError,
  getAnnouncements,
  getGuildCounts,
  getOpenSeats,
  getScheduledRaids,
  getWidgetCounts,
} from './discord';
import type { SiteData } from './types';

function isBackgroundRender(): boolean {
  return process.env.NODE_ENV === 'production' && process.env.NEXT_PHASE !== 'phase-production-build';
}

export async function getSiteData(): Promise<SiteData> {
  const [guildCounts, raids, seats, posts] = await Promise.allSettled([
    getGuildCounts(),
    getScheduledRaids(),
    getOpenSeats(),
    getAnnouncements(),
  ]);
  const [widgetCounts] =
    guildCounts.status === 'rejected' ? await Promise.allSettled([getWidgetCounts()]) : [];

  const results = [guildCounts, raids, seats, posts];
  for (const result of results) {
    if (result.status === 'rejected') console.error('Discord fetch failed:', String(result.reason));
  }

  // Failing a background render makes ISR keep serving the last good page, so a Discord
  // outage cannot replace live content with fallbacks. A build has no previous page to
  // keep, so it renders the fallbacks and shows "sync paused".
  if (isBackgroundRender() && results.some((result) => result.status === 'rejected')) {
    throw new Error('Discord sync failed; keeping the last good page');
  }

  const scheduled = raids.status === 'fulfilled' ? raids.value : [];
  const counts = guildCounts.status === 'fulfilled' ? guildCounts : widgetCounts;

  return {
    counts: counts?.status === 'fulfilled' ? counts.value : {},
    raidNights: [...scheduled, ...guild.raidNights.slice(scheduled.length)],
    seats: seats.status === 'fulfilled' ? seats.value : [],
    posts: posts.status === 'fulfilled' ? posts.value : [],
    fetchedAt: new Date().toISOString(),
    errors: {
      auth: results.some(
        (result) => result.status === 'rejected' && result.reason instanceof DiscordAuthError,
      ),
      counts: counts?.status !== 'fulfilled',
      events: raids.status === 'rejected',
      pins: seats.status === 'rejected',
      posts: posts.status === 'rejected',
    },
  };
}
