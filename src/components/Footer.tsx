import { guild } from '@/config/guild';
import type { SiteData } from '@/lib/types';
import { SyncBadge } from './SyncBadge';

export function Footer({ fetchedAt, errors }: Pick<SiteData, 'fetchedAt' | 'errors'>) {
  return (
    <footer className="relative flex w-full max-w-[1200px] flex-wrap justify-between gap-3 pt-10 text-[12px] uppercase tracking-[0.16em] text-faint">
      <span>
        {guild.name} · {guild.game}
      </span>
      <SyncBadge fetchedAt={fetchedAt} errors={errors} />
    </footer>
  );
}
