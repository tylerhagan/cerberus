import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import { guild } from '@/config/guild';

export const alt = `${guild.name}, a ${guild.game} raiding guild`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpengraphImage() {
  const root = process.cwd();
  const [font, emblem] = await Promise.all([
    readFile(join(root, 'src/assets/cinzel-900.woff')),
    readFile(join(root, 'public/art/emblem.png')),
  ]);

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 28,
        background: 'radial-gradient(ellipse 80% 70% at 50% 0%, #2a0f12 0%, #141013 50%, #0b0b0d 100%)',
        color: '#e8e1d3',
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text -- rendered by next/og */}
      <img src={`data:image/png;base64,${emblem.toString('base64')}`} width={220} height={220} />
      <div style={{ fontFamily: 'Cinzel', fontSize: 112, letterSpacing: '0.04em', lineHeight: 1 }}>
        CERBERUS
      </div>
      <div style={{ fontSize: 28, letterSpacing: '0.2em', color: '#e63950' }}>
        {`${guild.game} · ${guild.server} · ${guild.faction}`.toUpperCase()}
      </div>
    </div>,
    { ...size, fonts: [{ name: 'Cinzel', data: font, weight: 900, style: 'normal' }] },
  );
}
