import Image from 'next/image';
import { guild } from '@/config/guild';

export function Hero({ online, inviteUrl }: { online?: number; inviteUrl: string }) {
  return (
    <section
      aria-label={guild.name}
      className="relative grid grid-cols-1 items-end gap-8 pt-[72px] lg:grid-cols-12"
    >
      <div className="flex min-w-0 flex-col gap-7 lg:col-span-7 lg:pb-12">
        <p className="min-h-8 text-[13px] font-semibold uppercase tracking-[0.3em] text-blood-light md:min-h-0">
          {guild.game} · {guild.server} · {guild.faction}
        </p>
        <h1 className="hero-title m-0 font-display font-black uppercase leading-[0.9] tracking-[0.01em] text-bone">
          {guild.name}
        </h1>
        <p className="max-w-[520px] text-[20px] leading-normal text-text-2">{guild.lead}</p>
        <div className="flex flex-wrap items-center gap-4">
          <span className="cta-wrap inline-block">
            <a
              href={inviteUrl}
              className="cta clip-cta inline-block px-10 py-5 font-display text-[16px] font-black tracking-[0.1em] text-white"
            >
              Join the Discord
            </a>
          </span>
          {online !== undefined && (
            <span className="text-[14px] text-muted">
              <span className="font-semibold text-bone">{online}</span> in voice and chat right now
            </span>
          )}
        </div>
      </div>
      <div className="relative z-2 mb-[-60px] flex min-w-0 items-end justify-center md:mb-0 md:justify-end lg:col-span-5 lg:h-[460px]">
        <div
          aria-hidden="true"
          className="hero-glow pointer-events-none absolute inset-x-[10%] bottom-10 h-3/5"
        />
        <Image
          src="/art/hound.webp"
          alt="Cerberus, the three-headed hound, crouched to lunge"
          width={2048}
          height={1536}
          priority
          sizes="(max-width: 768px) 100vw, 40vw"
          className="hero-hound hound-rise relative h-auto w-full max-w-none md:mb-[-60px] md:w-[70%] lg:mb-[-110px] lg:mr-[-14%] lg:w-[118%]"
        />
      </div>
    </section>
  );
}
