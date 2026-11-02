import { guild } from '@/config/guild';

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[12px] uppercase tracking-[0.2em] text-muted">{label}</span>
      <span className="font-display text-[30px] font-black text-bone">{value}</span>
    </div>
  );
}

export function Progression({ members }: { members?: number }) {
  const { tier, cleared, total } = guild.progression;

  return (
    <div className="relative z-1 flex flex-wrap items-center justify-between gap-5 border-t border-line pt-8">
      <div className="flex flex-wrap gap-12">
        {total > 0 && <Stat label="Progression" value={`${cleared}/${total} ${tier}`} />}
        {members !== undefined && <Stat label="Members" value={String(members)} />}
      </div>
      <a
        href={guild.links.logs}
        className="border border-line px-7 py-4 text-[13px] font-bold uppercase tracking-[0.16em] text-text hover:text-blood-light"
      >
        Warcraft Logs →
      </a>
    </div>
  );
}
