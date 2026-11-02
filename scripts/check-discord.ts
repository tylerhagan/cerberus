// Runs every fetcher against the real server and prints what it returns.
// Exits non-zero on auth failure or a failed parser sanity check.
import assert from 'node:assert/strict';
import { loadEnvConfig } from '@next/env';
import {
  DiscordAuthError,
  getAnnouncements,
  getGuildCounts,
  getOpenSeats,
  getScheduledRaids,
  getWidgetCounts,
} from '@/lib/discord';
import { cleanPost, parseSeats } from '@/lib/parse';

loadEnvConfig(process.cwd());

assert.deepEqual(
  parseSeats(
    'Recruiting (the website reads this pin)\n**Restoration Druid: High**\nWarlock: high\nMage:LOW\nRogue: Closed\nnot a seat',
  ),
  [
    { role: 'Restoration Druid', level: 'High' },
    { role: 'Warlock', level: 'High' },
    { role: 'Mage', level: 'Low' },
  ],
);
assert.equal(
  cleanPost('<@&123> **Raid** moved to <#456>, see [the post](https://example.com) <:hound:789> @everyone'),
  'Raid moved to , see the post',
);
assert.equal(cleanPost('x'.repeat(400)).length, 281);

const fetchers = {
  counts: getGuildCounts,
  widget: getWidgetCounts,
  raidNights: getScheduledRaids,
  seats: getOpenSeats,
  posts: getAnnouncements,
};

async function main() {
  let authFailed = false;

  for (const [name, fetcher] of Object.entries(fetchers)) {
    try {
      console.log(name, JSON.stringify(await fetcher(), null, 2));
    } catch (error) {
      authFailed ||= error instanceof DiscordAuthError;
      console.error(name, 'FAILED:', String(error));
    }
  }

  process.exit(authFailed ? 1 : 0);
}

main();
