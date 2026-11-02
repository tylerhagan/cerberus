import type { Counts, Post, RaidNight, Seat } from './types';

const hoursAgo = (hours: number) => new Date(Date.now() - hours * 3_600_000).toISOString();

export const fixtures: {
  counts: Counts;
  raidNights: RaidNight[];
  seats: Seat[];
  posts: Post[];
  inviteUrl: string;
} = {
  counts: { online: 37, members: 142 },
  raidNights: [
    { label: 'Main raid', day: 'Thu', time: '20:00 to 23:00 CET' },
    { label: 'Main raid', day: 'Sun', time: '20:00 to 23:00 CET' },
    { label: 'Alt / social', day: 'Tue', time: '20:30 to 22:30 CET' },
  ],
  seats: [
    { role: 'Restoration Druid', level: 'High' },
    { role: 'Warlock', level: 'High' },
    { role: 'Protection Warrior', level: 'Medium' },
    { role: 'Mage', level: 'Low' },
  ],
  posts: [
    {
      id: '3',
      author: 'Sample Officer',
      text: 'Sample announcement. Signups for Thursday are open, please react before Wednesday night so we can sort the roster.',
      postedAt: hoursAgo(2),
    },
    {
      id: '2',
      author: 'Sample Officer',
      text: 'Sample announcement. Consumables are in the guild bank, take what you need for the week.',
      postedAt: hoursAgo(26),
    },
    {
      id: '1',
      author: 'Sample GM',
      text: 'Sample announcement. Good kills last night, logs are up.',
      postedAt: hoursAgo(50),
    },
  ],
  inviteUrl: 'https://discord.gg/',
};
