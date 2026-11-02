import type { Seat, SeatLevel } from './types';

const POST_LENGTH = 280;
const SEAT_LINE = /^(.+?):\s*(high|medium|low|closed)\s*$/i;

function stripEmphasis(text: string): string {
  return text.replace(/\*\*|__|~~|\|\||`/g, '');
}

export function parseSeats(content: string): Seat[] {
  const seats: Seat[] = [];
  for (const line of stripEmphasis(content).trim().split('\n')) {
    const match = line.trim().match(SEAT_LINE);
    if (!match) continue;
    const level = match[2].toLowerCase();
    if (level === 'closed') continue;
    seats.push({
      role: match[1].trim(),
      level: (level[0].toUpperCase() + level.slice(1)) as SeatLevel,
    });
  }
  return seats;
}

export function cleanPost(content: string): string {
  const text = stripEmphasis(content)
    .replace(/<a?:\w+:\d+>/g, '') // custom emoji
    .replace(/<(@[!&]?|#)\d+>/g, '') // user, role and channel mentions
    .replace(/<t:\d+(:\w)?>/g, '') // timestamps
    .replace(/@(everyone|here)\b/g, '')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1') // masked links
    .replace(/^\s*(#{1,3}|>{1,3}|-#)\s+/gm, '') // headings, quotes, subtext
    .replace(/(^|[\s(])[*_]([^*_\n]+)[*_](?=[\s).,!?:;]|$)/gm, '$1$2') // italics
    .replace(/\s+/g, ' ')
    .trim();
  return text.length > POST_LENGTH ? `${text.slice(0, POST_LENGTH).trimEnd()}…` : text;
}
