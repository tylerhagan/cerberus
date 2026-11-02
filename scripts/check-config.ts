// Fails while src/config/guild.ts still holds a '[PLACEHOLDER]' string. Matches a quote followed
// by a bracket so the raidNights array literal itself does not trip it.
import { readFileSync } from 'node:fs';

const placeholders = readFileSync('src/config/guild.ts', 'utf8').match(/'\[[^']*'/g) ?? [];

if (placeholders.length > 0) {
  console.error(`src/config/guild.ts still has placeholders:\n  ${placeholders.join('\n  ')}`);
  process.exit(1);
}

console.log('guild.ts has no placeholders');
