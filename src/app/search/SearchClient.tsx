"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { Input } from "@/components/ui/Input";
import { Tabs } from "@/components/ui/Tabs";
import { Card } from "@/components/ui/Card";
import { VideoCard } from "@/components/ui/VideoCard";
import { PlaceRow } from "@/components/ui/PlaceRow";
import { VIDEO_RECIPES, FORUM_POSTS, VEGAN_PLACES } from "@/lib/mock/data";

const SEARCH_SUGGESTIONS = [
  "tofu bowl",
  "high protein",
  "b12",
  "coconut noodle",
  "saigon vegan",
  "smoothie",
];

export function SearchClient({ initialQuery }: { initialQuery: string }) {
  const [query, setQuery] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState("videos");

  const qLower = query.toLowerCase().trim();

  const matchedVideos = VIDEO_RECIPES.filter(
    (v) =>
      !qLower ||
      v.title.toLowerCase().includes(qLower) ||
      v.description.toLowerCase().includes(qLower) ||
      v.cuisine.toLowerCase().includes(qLower)
  );

  const matchedPosts = FORUM_POSTS.filter(
    (p) =>
      !qLower ||
      p.title.toLowerCase().includes(qLower) ||
      p.content.toLowerCase().includes(qLower) ||
      p.tags.some((t) => t.toLowerCase().includes(qLower))
  );

  const matchedPlaces = VEGAN_PLACES.filter(
    (pl) =>
      !qLower ||
      pl.name.toLowerCase().includes(qLower) ||
      pl.district.toLowerCase().includes(qLower) ||
      pl.type.toLowerCase().includes(qLower) ||
      pl.popularDish.toLowerCase().includes(qLower)
  );

  return (
    <AppShell>
      <div className="flex flex-col space-y-7">
        <PageHeader
          eyebrow="SEARCH DIRECTORY"
          title={query ? `Search results for “${query}”` : "Search VeggieHub"}
          subtitle="Discover plant-based video recipes, nutritional science threads, and local vegan restaurants."
        />

        {/* Search Bar */}
        <div className="max-w-xl">
          <Input
            variant="search"
            placeholder="Search recipes, ingredients, health threads, places…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {/* Suggestion Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs font-semibold uppercase tracking-wider text-stone-400 shrink-0 mr-1">
            Suggested:
          </span>
          {SEARCH_SUGGESTIONS.map((sug) => (
            <button
              key={sug}
              type="button"
              onClick={() => setQuery(sug)}
              className={`h-8 px-3.5 rounded-full text-xs font-medium border transition-colors cursor-pointer shrink-0 ${
                query.toLowerCase() === sug
                  ? "bg-emerald-700 text-white border-emerald-700"
                  : "bg-white text-stone-600 border-stone-200 hover:bg-stone-50 hover:text-stone-900"
              }`}
            >
              {sug}
            </button>
          ))}
        </div>

        {/* Tabs: Videos | Posts | Shops */}
        <Tabs
          tabs={[
            { id: "videos", label: "Videos", count: matchedVideos.length },
            { id: "posts", label: "Forum Posts", count: matchedPosts.length },
            { id: "shops", label: "Nearby Spots", count: matchedPlaces.length },
          ]}
          activeTab={activeTab}
          onChange={setActiveTab}
          variant="underline"
        />

        {/* Results Container */}
        <div>
          {activeTab === "videos" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {matchedVideos.map((video) => (
                <Link key={video.id} href={`/videos/${video.id}`} className="block">
                  <VideoCard
                    title={video.title}
                    duration={video.duration}
                    author={video.author}
                    views={video.views}
                    imageUrl={video.image}
                  />
                </Link>
              ))}

              {matchedVideos.length === 0 && (
                <Card className="col-span-full text-center py-12 text-stone-500">
                  <p className="text-lg font-semibold">No video recipes found</p>
                  <p className="text-sm mt-1">Try another search term or click one of the suggested tags above.</p>
                </Card>
              )}
            </div>
          )}

          {activeTab === "posts" && (
            <div className="space-y-4">
              {matchedPosts.map((post) => (
                <Link key={post.id} href={`/forum/${post.id}`}>
                  <Card className="p-6 hover:border-emerald-600 transition-colors cursor-pointer">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                        {post.category}
                      </span>
                      <span className="text-xs text-stone-400">·</span>
                      <span className="text-xs text-stone-500">
                        {post.author} · {post.timestamp}
                      </span>
                    </div>
                    <h3 className="font-serif font-bold text-xl text-stone-900 leading-snug">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-base text-stone-600 line-clamp-2 leading-relaxed">
                      {post.excerpt}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {post.tags.map((t) => (
                        <span
                          key={t}
                          className="text-xs font-medium text-stone-600 bg-stone-100 px-2 py-0.5 rounded-md"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </Card>
                </Link>
              ))}

              {matchedPosts.length === 0 && (
                <Card className="text-center py-12 text-stone-500">
                  <p className="text-lg font-semibold">No discussion threads found</p>
                  <p className="text-sm mt-1">Try searching for other topics like B12, protein, or grocery.</p>
                </Card>
              )}
            </div>
          )}

          {activeTab === "shops" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {matchedPlaces.map((place) => (
                <Card key={place.id} className="p-5">
                  <PlaceRow
                    name={place.name}
                    sub={`${place.district} · ${place.distance}`}
                    rating={place.rating}
                  />
                  <div className="mt-3 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                    <span>{place.address}</span>
                    <span className="font-semibold text-emerald-800">{place.type}</span>
                  </div>
                </Card>
              ))}

              {matchedPlaces.length === 0 && (
                <Card className="col-span-full text-center py-12 text-stone-500">
                  <p className="text-lg font-semibold">No nearby spots found</p>
                  <p className="text-sm mt-1">Try searching for a district or restaurant name.</p>
                </Card>
              )}
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
