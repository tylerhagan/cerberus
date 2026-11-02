export const guild = {
  name: 'Cerberus',
  game: 'WoW: Forever',
  server: 'Normal', // realm ruleset until a realm is named at launch
  faction: 'Alliance',
  lead: 'Three heads, one pull. A raiding guild forming for WoW: Forever, built to clear on schedule and keep the hall loud the rest of the week.',
  progression: { tier: '', cleared: 0, total: 0 }, // shown only when total > 0
  raidNights: [
    // static fallback when Discord has no events
    { label: 'Main raid', day: 'Fri', time: '20:00 to 23:00 server time' },
    { label: 'Main raid', day: 'Sun', time: '20:00 to 23:00 server time' },
  ],
  links: {
    logs: 'https://www.warcraftlogs.com/guild/id/764879', // retail guild until WoW: Forever logs exist
  },
};

export const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : 'http://localhost:3000';
