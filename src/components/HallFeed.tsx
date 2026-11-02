import { formatRelative } from '@/lib/format';
import type { Post } from '@/lib/types';
import { SectionHeading } from './SectionHeading';

export function HallFeed({ posts, now }: { posts: Post[]; now: string }) {
  return (
    <section
      id="hall"
      aria-labelledby="hall-heading"
      className="flex min-w-0 scroll-mt-6 flex-col gap-6 lg:col-span-7"
    >
      <SectionHeading id="hall-heading" title="From the hall" hairline tag="#announcements" />
      {posts.length > 0 ? (
        <div className="flex flex-col gap-3">
          {posts.map((post) => (
            <article
              key={post.id}
              className="flex items-start gap-5 border border-line bg-card px-5 py-6 md:px-7"
            >
              <span
                aria-hidden="true"
                className="glyph-diamond clip-diamond size-10 shrink-0"
              />
              <div className="flex min-w-0 flex-col gap-1.5">
                <span className="text-[12px] uppercase tracking-[0.16em] text-muted">
                  {post.author} · {formatRelative(post.postedAt, now)}
                </span>
                <p className="m-0 break-words text-[16px] leading-[1.55]">{post.text}</p>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <p className="text-text-2">Nothing new in the hall yet</p>
      )}
    </section>
  );
}
