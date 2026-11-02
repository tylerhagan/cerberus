import type { RaidNight } from '@/lib/types';
import { SectionHeading } from './SectionHeading';

export function RaidNights({ nights }: { nights: RaidNight[] }) {
  return (
    <section id="raids" aria-labelledby="raids-heading" className="flex scroll-mt-6 flex-col gap-6">
      <SectionHeading id="raids-heading" title="Raid nights" hairline />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {nights.map((night, index) => (
          <div
            key={`${night.label}-${index}`}
            className="clip-card flex min-w-0 flex-col gap-1.5 border border-line bg-card p-7"
          >
            <span className="text-[12px] uppercase tracking-[0.2em] text-muted">{night.label}</span>
            <span className="font-display text-[36px] font-black text-bone">{night.day}</span>
            <span className="text-[15px] text-text-2">{night.time}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
