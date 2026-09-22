"use client";

import React, { useState } from "react";
import {
  MapPin,
  Clock,
  Utensils,
  Navigation,
  Sparkles,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { Rating } from "@/components/ui/Rating";
import { Badge } from "@/components/ui/Badge";
import {
  VEGAN_PLACES,
  SHOP_FILTERS,
  SUGGESTED_FOOD_SPOTS,
} from "@/lib/mock/data";
import { VeganPlace } from "@/lib/mock/types";

function InteractiveMap({
  places,
  selectedPlace,
  onSelectPlace,
}: {
  places: VeganPlace[];
  selectedPlace: VeganPlace | null;
  onSelectPlace: (p: VeganPlace) => void;
}) {
  return (
    <div className="relative h-[360px] w-full rounded-[20px] bg-gradient-to-br from-map-from to-map-to border border-stone-200 overflow-hidden shadow-sm select-none">
      {/* Decorative City Grid Lines & River */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 800 360"
        preserveAspectRatio="none"
        fill="none"
      >
        {/* River */}
        <path
          d="M-20 180 C 180 240, 320 80, 520 220 C 640 290, 740 140, 840 170"
          stroke="white"
          strokeWidth="32"
          strokeOpacity="0.8"
          strokeLinecap="round"
        />
        {/* Major thoroughfares */}
        <path
          d="M60 -20 C 140 140, 280 220, 420 380"
          stroke="white"
          strokeWidth="14"
          strokeOpacity="0.9"
        />
        <path
          d="M-20 90 L 820 120"
          stroke="white"
          strokeWidth="10"
          strokeOpacity="0.75"
        />
        <path
          d="M220 -20 L 260 380"
          stroke="white"
          strokeWidth="8"
          strokeOpacity="0.6"
        />
        <path
          d="M580 -20 L 520 380"
          stroke="white"
          strokeWidth="8"
          strokeOpacity="0.6"
        />
      </svg>

      {/* Pins */}
      {places.map((place) => {
        const isSelected = selectedPlace?.id === place.id;
        return (
          <button
            key={place.id}
            type="button"
            onClick={() => onSelectPlace(place)}
            style={{ left: `${place.x}%`, top: `${place.y}%` }}
            className="absolute -translate-x-1/2 -translate-y-full cursor-pointer group transition-transform hover:scale-110 focus:outline-none"
            aria-label={`Select ${place.name}`}
          >
            {/* Custom SVG Pin */}
            <svg
              viewBox="0 0 24 30"
              width={isSelected ? 32 : 26}
              height={isSelected ? 40 : 32}
              fill="none"
              className="transition-all filter drop-shadow-md"
            >
              <path
                d="M12 0C5.373 0 0 5.373 0 12C0 19.5 12 30 12 30C12 30 24 19.5 24 12C24 5.373 18.627 0 12 0Z"
                className={isSelected ? "fill-amber-500" : "fill-emerald-600"}
              />
              <circle cx="12" cy="11" r="4.5" className="fill-white" />
            </svg>

            {/* Hover Tooltip / Label */}
            <div
              className={`absolute left-1/2 -translate-x-1/2 -top-8 px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap shadow-sm pointer-events-none transition-opacity ${
                isSelected
                  ? "bg-amber-400 text-amber-950 opacity-100 scale-105"
                  : "bg-stone-900/80 text-white opacity-0 group-hover:opacity-100"
              }`}
            >
              {place.name}
            </div>
          </button>
        );
      })}

      {/* Map Corner Info Badge */}
      <div className="absolute left-4 bottom-4 bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-stone-200 text-xs font-semibold text-stone-700 shadow-xs flex items-center gap-2">
        <Navigation className="w-3.5 h-3.5 text-emerald-600" />
        <span>Ho Chi Minh City · Central Districts</span>
      </div>
    </div>
  );
}

export default function ShopsPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedPlace, setSelectedPlace] = useState<VeganPlace | null>(
    VEGAN_PLACES[0]
  );

  const filteredPlaces = VEGAN_PLACES.filter((p) => {
    if (activeFilter === "All") return true;
    return p.type === activeFilter;
  });

  return (
    <AppShell>
      <div className="flex flex-col space-y-8">
        {/* Header */}
        <PageHeader
          eyebrow="NEIGHBORHOOD GUIDE"
          title="Nearby vegan & vegetarian spots"
          subtitle="Curated plant-based restaurants, neighborhood grocers, and ethical cafés in Ho Chi Minh City."
        />

        {/* Category Filters */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none">
          {SHOP_FILTERS.map((f) => (
            <Chip
              key={f}
              variant="filter"
              active={activeFilter === f}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </Chip>
          ))}
        </div>

        {/* Interactive Pure SVG Map */}
        <InteractiveMap
          places={filteredPlaces}
          selectedPlace={selectedPlace}
          onSelectPlace={setSelectedPlace}
        />

        {/* Selected Place Detail Highlight */}
        {selectedPlace && (
          <Card className="p-6 bg-gradient-to-r from-emerald-50/50 to-white border-emerald-200/80">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2.5 mb-1.5">
                  <Badge variant="success">{selectedPlace.type}</Badge>
                  <span className="text-sm font-semibold text-stone-500">
                    {selectedPlace.district} · {selectedPlace.distance} away
                  </span>
                </div>
                <h2 className="font-serif font-bold text-2xl text-stone-900">
                  {selectedPlace.name}
                </h2>
                <p className="mt-1 text-sm text-stone-600">
                  {selectedPlace.address}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 shrink-0">
                <Rating
                  score={selectedPlace.rating}
                  reviewsCount={`${selectedPlace.reviewsCount}`}
                  variant="hero"
                  className="text-stone-900"
                />
                <div className="flex items-center gap-1.5 text-sm text-stone-600">
                  <Clock className="w-4 h-4 text-emerald-600" />
                  <span>{selectedPlace.openingHours}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-emerald-100/70 flex items-center gap-2 text-sm text-stone-700">
              <Utensils className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>
                <strong>Signature dish:</strong> {selectedPlace.popularDish}
              </span>
            </div>
          </Card>
        )}

        {/* Full Places Directory List */}
        <div>
          <h2 className="font-serif font-bold text-2xl text-stone-900 tracking-tight mb-4">
            All spots ({filteredPlaces.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredPlaces.map((place) => (
              <Card
                key={place.id}
                onClick={() => setSelectedPlace(place)}
                className={`p-5 cursor-pointer transition-all ${
                  selectedPlace?.id === place.id
                    ? "border-emerald-600 shadow-sm bg-emerald-50/30"
                    : "hover:border-stone-300"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full">
                        {place.type}
                      </span>
                      <span className="text-xs text-stone-400">
                        {place.distance}
                      </span>
                    </div>
                    <h3 className="font-serif font-bold text-lg text-stone-900 leading-snug">
                      {place.name}
                    </h3>
                    <p className="mt-1 text-xs text-stone-500">
                      {place.address}
                    </p>
                  </div>

                  <Rating score={place.rating} />
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-600">
                  <span>Open: {place.openingHours}</span>
                  <span className="text-emerald-700 font-medium">
                    {place.popularDish.split("&")[0]}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Suggested For Section */}
        <section className="pt-6 border-t border-stone-200">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <h2 className="font-serif font-bold text-2xl text-stone-900 tracking-tight">
              Where to order recipe matches in Saigon
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SUGGESTED_FOOD_SPOTS.map((sug) => (
              <Card key={sug.dish} className="p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700 mb-1">
                  CRAVING THIS DISH?
                </p>
                <h3 className="font-serif font-bold text-lg text-stone-900 mb-3">
                  {sug.dish}
                </h3>
                <div className="space-y-2">
                  {sug.places.map((p) => (
                    <div
                      key={p.name}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-stone-50 text-sm"
                    >
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span className="font-medium text-stone-900">{p.name}</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-stone-500">
                        <span>{p.distance}</span>
                        <span className="font-semibold text-emerald-800">{p.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
