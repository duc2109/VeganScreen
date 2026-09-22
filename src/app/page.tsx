import { AppShell } from "@/components/layout/AppShell";
import { Hero } from "@/components/discover/Hero";
import { TrendingVideos } from "@/components/discover/TrendingVideos";

export default function DiscoverPage() {
  return (
    <AppShell>
      <div className="flex flex-col">
        <Hero />
        <TrendingVideos />
      </div>
    </AppShell>
  );
}
