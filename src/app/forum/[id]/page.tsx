import { notFound } from "next/navigation";
import { FORUM_POSTS } from "@/lib/mock/data";
import { ForumPostDetailClient } from "./ForumPostDetailClient";

export default async function ForumPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = FORUM_POSTS.find((p) => p.id === id);

  if (!post) {
    notFound();
  }

  return <ForumPostDetailClient post={post} />;
}
