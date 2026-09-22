import { notFound } from "next/navigation";
import { VIDEO_RECIPES } from "@/lib/mock/data";
import { VideoDetailClient } from "./VideoDetailClient";

export default async function VideoDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const video = VIDEO_RECIPES.find((v) => v.id === id);

  if (!video) {
    notFound();
  }

  return <VideoDetailClient video={video} />;
}
