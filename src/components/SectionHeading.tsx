export function SectionHeading({
  id,
  title,
  hairline = false,
  tag,
}: {
  id: string;
  title: string;
  hairline?: boolean;
  tag?: string;
}) {
  return (
    <h2
      id={id}
      className="m-0 flex flex-wrap items-center gap-x-4 gap-y-2 font-display text-[24px] font-bold tracking-[0.12em] text-bone"
    >
      <svg width="22" height="18" viewBox="0 0 30 26" fill="#c8102e" aria-hidden="true">
        <path d="M2 24 L6 6 L11 16 L15 2 L19 16 L24 6 L28 24 Z" />
      </svg>
      {title}
      {hairline && <span aria-hidden="true" className="hairline h-px flex-1" />}
      {tag && (
        <span className="font-sans text-[12px] font-medium uppercase tracking-[0.14em] text-muted">
          {tag}
        </span>
      )}
    </h2>
  );
}
