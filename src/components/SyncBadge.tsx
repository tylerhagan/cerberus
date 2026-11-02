import { formatSyncTime } from '@/lib/format';
import type { SiteData } from '@/lib/types';

export function SyncBadge({ fetchedAt, errors }: Pick<SiteData, 'fetchedAt' | 'errors'>) {
  if (Object.values(errors).some(Boolean)) return <span>Sync paused</span>;

  return (
    <span>
      Rebuilt hourly from Discord · Synced {formatSyncTime(fetchedAt)}
    </span>
  );
}
