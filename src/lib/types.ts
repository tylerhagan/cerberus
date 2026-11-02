export type SeatLevel = 'High' | 'Medium' | 'Low';

export interface RaidNight {
  label: string; // 'Main raid' | 'Alt / social' | event name
  day: string; // 'Thu'
  time: string; // '20:00 to 23:00 CET'
  startsAt?: string; // ISO, present when from Discord events
}

export interface Seat {
  role: string; // 'Restoration Druid'
  level: SeatLevel;
}

export interface Post {
  id: string;
  author: string; // display name, falls back to username
  text: string; // plain text, max 280 chars, markdown and mentions stripped
  postedAt: string; // ISO
}

export interface Counts {
  online?: number;
  members?: number;
}

export interface SiteData {
  counts: Counts;
  raidNights: RaidNight[]; // Discord events first; static fallback fills gaps
  seats: Seat[]; // may be empty
  posts: Post[]; // 0 to 3
  fetchedAt: string; // ISO, time of this render
  errors: {
    auth: boolean;
    counts: boolean;
    events: boolean;
    pins: boolean;
    posts: boolean;
  };
}
