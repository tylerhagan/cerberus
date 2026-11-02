import { Footer } from '@/components/Footer';
import { HallFeed } from '@/components/HallFeed';
import { Hero } from '@/components/Hero';
import { Nav } from '@/components/Nav';
import { Progression } from '@/components/Progression';
import { RaidNights } from '@/components/RaidNights';
import { Recruiting } from '@/components/Recruiting';
import { StonePanel } from '@/components/StonePanel';
import { getSiteData } from '@/lib/data';
import { getInviteUrl } from '@/lib/discord';

export const revalidate = 3600;

export default async function Page() {
  const data = await getSiteData();
  const inviteUrl = getInviteUrl();

  return (
    <>
      <Nav />
      <main id="main" className="relative w-full max-w-[1200px]">
        <Hero online={data.counts.online} inviteUrl={inviteUrl} />
        <StonePanel>
          <RaidNights nights={data.raidNights} />
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-12">
            <Recruiting seats={data.seats} inviteUrl={inviteUrl} />
            <HallFeed posts={data.posts} now={data.fetchedAt} />
          </div>
          <Progression members={data.counts.members} />
        </StonePanel>
      </main>
      <Footer fetchedAt={data.fetchedAt} errors={data.errors} />
    </>
  );
}
