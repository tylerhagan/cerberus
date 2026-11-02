import type { Seat, SeatLevel } from '@/lib/types';
import { SectionHeading } from './SectionHeading';

const badgeStyles: Record<SeatLevel, string> = {
  High: 'bg-blood text-white',
  Medium: 'bg-line text-bone',
  Low: 'bg-card text-muted',
};

export function Recruiting({ seats, inviteUrl }: { seats: Seat[]; inviteUrl: string }) {
  return (
    <section
      id="recruit"
      aria-labelledby="recruit-heading"
      className="flex min-w-0 scroll-mt-6 flex-col gap-6 lg:col-span-5"
    >
      <SectionHeading id="recruit-heading" title="Recruiting" />
      {seats.length > 0 ? (
        <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
          {seats.map(({ role, level }) => (
            <li
              key={role}
              className="flex items-center justify-between gap-4 border border-line bg-card px-5 py-4"
            >
              <span className="text-[18px] font-semibold">{role}</span>
              <span
                className={`px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] ${badgeStyles[level]}`}
              >
                {level}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-text-2">See #recruitment in Discord</p>
      )}
      <a
        href={inviteUrl}
        className="border border-blood p-4 text-center text-[13px] font-bold uppercase tracking-[0.16em] text-blood-light hover:bg-blood hover:text-white"
      >
        Apply in #recruitment
      </a>
    </section>
  );
}
