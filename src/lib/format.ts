const TIME_ZONE = 'Europe/Berlin';

const dayFormat = new Intl.DateTimeFormat('en-GB', { timeZone: TIME_ZONE, weekday: 'short' });
const timeFormat = new Intl.DateTimeFormat('en-GB', {
  timeZone: TIME_ZONE,
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
});
const zoneFormat = new Intl.DateTimeFormat('en-GB', { timeZone: TIME_ZONE, timeZoneName: 'short' });

// 'CET' in winter, 'CEST' in summer
function zoneName(date: Date): string {
  return zoneFormat.formatToParts(date).find((part) => part.type === 'timeZoneName')?.value ?? 'CET';
}

export function formatDay(iso: string): string {
  return dayFormat.format(new Date(iso));
}

export function formatTimeRange(startIso: string, endIso?: string | null): string {
  const start = new Date(startIso);
  const startTime = timeFormat.format(start);
  // Discord only requires an end time on external events
  if (!endIso) return `${startTime} ${zoneName(start)}`;
  return `${startTime} to ${timeFormat.format(new Date(endIso))} ${zoneName(start)}`;
}

export function formatSyncTime(iso: string): string {
  const date = new Date(iso);
  return `${timeFormat.format(date)} ${zoneName(date)}`;
}

export function formatRelative(iso: string, now: string): string {
  const minutes = Math.floor((new Date(now).getTime() - new Date(iso).getTime()) / 60_000);
  if (minutes < 60) return `${Math.max(minutes, 1)}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}
