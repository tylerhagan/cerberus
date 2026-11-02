import Image from 'next/image';

export function StonePanel({ children }: { children: React.ReactNode }) {
  return (
    <div className="stone clip-panel relative z-1 flex flex-col gap-14 border border-line bg-panel p-6 pt-[72px] md:p-16">
      <div aria-hidden="true" className="seam absolute inset-x-6 top-0 h-0.5" />
      {children}
      <Image
        src="/art/emblem.png"
        alt=""
        aria-hidden="true"
        width={160}
        height={160}
        className="pointer-events-none absolute bottom-10 right-12 opacity-[0.06]"
      />
    </div>
  );
}
