# Cerberus

The website for Cerberus, a WoW: Forever raiding guild. One static page, rebuilt at most hourly from the guild's Discord server. Nobody edits the site: content changes happen in Discord.

Next.js 15 (App Router), Tailwind CSS v4, hosted on Vercel. No database, no cron, no bot process.

## Setup

```sh
npm install
cp .env.example .env.local   # DISCORD_MOCK=1 uses sample data, no credentials needed
npm run dev
```

The project path must not contain `#`. Both webpack and Tailwind's CSS resolver fail on it.

| Command | What it does |
| --- | --- |
| `npm run dev` | Local dev server |
| `npm run build` | Production build |
| `npm run check` | Types, lint, and fails while `src/config/guild.ts` has `[PLACEHOLDER]` values |
| `npm run check:discord` | Runs every Discord fetcher and prints the results; exits non-zero on auth failure |

## Before launch

Fill every bracketed value in [`src/config/guild.ts`](src/config/guild.ts): server, faction, tier and progress, Warcraft Logs URL, and the fallback raid nights. Progression stays hidden while `total` is 0.

## Discord bot

1. At [discord.com/developers](https://discord.com/developers/applications), create an application, add a Bot and copy the token.
2. Under Privileged Gateway Intents, enable **Message Content**. Without it Discord returns empty message text, so the announcements feed and recruitment list stay empty.
3. Have a server admin invite the bot with scope `bot` and permissions View Channels + Read Message History (integer `66560`).
4. With Developer Mode on, copy the server ID and the #announcements and #recruitment channel IDs.
5. Create a permanent invite (never expires, unlimited uses).
6. Optional: turn on Server Settings > Widget. It is only a fallback for the online count.

### Environment variables

All server-only. Set them in Vercel for Production and Preview, and locally in `.env.local`.

| Variable | Required | Value |
| --- | --- | --- |
| `DISCORD_BOT_TOKEN` | yes | Bot token |
| `DISCORD_GUILD_ID` | yes | Server ID |
| `DISCORD_ANNOUNCEMENTS_CHANNEL_ID` | yes | #announcements channel ID |
| `DISCORD_RECRUITMENT_CHANNEL_ID` | yes | #recruitment channel ID |
| `DISCORD_INVITE_URL` | yes | Permanent invite link |
| `DISCORD_MOCK` | no | `1` returns fixtures instead of calling Discord. Never set this in Production |

## For officers

**Recruitment.** Pin one message in #recruitment. The site reads the most recently posted pin, so keep that one current. One role per line, `Role: Level`, where Level is High, Medium, Low or Closed. Other lines are ignored and Closed roles are hidden.

```
Recruiting (updated by officers, the website reads this pin)
Restoration Druid: High
Warlock: High
Protection Warrior: Medium
Mage: Low
Rogue: Closed
```

**Raid nights.** Create Discord Scheduled Events. The site shows the next three; the event name becomes the label, so set an end time to show a time range. A recurring event only counts once, because Discord lists just its next occurrence. Remaining slots use the fallback nights in `guild.ts`.

**Announcements.** The feed shows the last three posts in #announcements by people. Bot posts and system messages are skipped.

Changes appear on the first visit after the hourly refresh.

## When Discord fails

- **While the site is live:** the refresh is abandoned and the last good page keeps serving, so an outage cannot blank the recruitment list or feed. The "Synced" time in the footer simply stops advancing, and the error is in the Vercel logs.
- **During a deploy:** there is no previous page to keep, so each failed section shows its fallback and the footer says "Sync paused".

## Deviations from the build spec

| Spec | Built | Why |
| --- | --- | --- |
| `GET /channels/{id}/pins` | `GET /channels/{id}/messages/pins` | Discord has deprecated the old endpoint |
| Failed fetches always render fallbacks | Background refreshes fail on purpose; only deploys render fallbacks | The spec also wants an outage to leave previous content live. Rendering fallbacks counts as a success and would overwrite the good page |
| `presence_count` from the widget for online | `approximate_presence_count` from the guild call, widget as fallback | Needs no extra server setting |
| Message Content intent off at first | On | Discord blanks message text without it |
| `--faint` raised to `#6f6a62` if needed | `#807a71` | `#5c5852` (2.8:1) and `#6f6a62` (3.7:1) both fail 4.5:1 on the page ground |
| H1 fixed at 72px under 768px | Scales down to fit, 52px at 360px | 72px is 430px wide and would overflow a 312px column |
| CTA and panel `box-shadow` | Omitted at rest; CTA glow on hover | `clip-path` removes a shadow on the same element, so the approved E1 render never showed them |
| Times always labelled CET | CET or CEST by date | Avoids wrong labels in summer |
| Hound entrance animation at all widths | 1024px and up | On mobile the hound is the LCP element and the fade delays it |
| `npm run check` fails on any `[` | Fails on `'[` in a string | The array literal in `guild.ts` would always fail |
| `emblem.png` from the asset pack | The newer hounds emblem | Owner's choice |
