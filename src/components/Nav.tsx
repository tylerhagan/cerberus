import Image from 'next/image';
import { guild } from '@/config/guild';

const links = [
  { label: 'Raids', href: '#raids' },
  { label: 'Recruitment', href: '#recruit' },
  { label: 'Hall', href: '#hall' },
  { label: 'Logs', href: guild.links.logs },
];

export function Nav() {
  return (
    <header className="nav-bar clip-nav relative mt-6 flex w-full max-w-[1200px] flex-wrap items-center gap-x-8 gap-y-3 border border-line px-4 py-[18px] md:px-7">
      <span className="flex items-center gap-3 font-display text-[18px] font-black uppercase tracking-[0.26em] text-bone">
        <Image src="/art/emblem.png" alt="" aria-hidden="true" width={34} height={34} />
        {guild.name}
      </span>
      <nav
        aria-label="Primary"
        className="flex w-full justify-between gap-2 text-[11px] font-semibold uppercase tracking-[0.1em] md:ml-auto md:w-auto md:gap-7 md:text-[13px] md:tracking-[0.16em]"
      >
        {links.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            className="inline-block py-1 text-text decoration-blood-light underline-offset-4 hover:text-blood-light hover:underline"
          >
            {label}
          </a>
        ))}
      </nav>
    </header>
  );
}
