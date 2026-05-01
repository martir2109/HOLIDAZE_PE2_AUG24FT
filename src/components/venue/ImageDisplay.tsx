import { useState } from "react";
import type { Venue } from "../../interfaces/venue";
import { useFavorites } from "../../hooks/useFavorites";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { useAuthStore } from "../../stores/authStore";

interface ImageDisplayProps {
  venue: Venue;
}

/**
 * Displays a venue's images as a carousel.
 *
 * Shows arrow buttons and dot indicators when there is more than one image.
 * Also shows a favorite button in the top right corner.
 *
 * @param venue The venue whose images to display.
 * @returns An image carousel with navigation arrows, dot indicators and a favorite button.
 */
export default function ImageDisplay({ venue }: ImageDisplayProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const { isFavorited, toggleFavorite } = useFavorites();
  const { user } = useAuthStore();
  const isLoggedIn = !!user;

  return (
    <>
      <div className="relative overflow-hidden rounded-t-md">
        <img
          src={
            venue.media[currentImage]?.url ||
            "https://placehold.co/650x370?text=No+Image"
          }
          alt={venue.media[currentImage]?.alt || venue.name}
          loading="lazy"
          className="object-cover w-full h-full"
        />

        {venue.media.length > 1 && (
          <div className="absolute flex w-full items-center justify-between px-2 top-1/2 -translate-y-1/2">
            <button
              type="button"
              title="Previous image"
              onClick={() =>
                setCurrentImage(
                  (prev) =>
                    (prev - 1 + venue.media.length) % venue.media.length,
                )
              }
              className="bg-white/80 rounded-full p-1 cursor-pointer"
            >
              <ChevronLeft />
            </button>
            <button
              type="button"
              title="Next image"
              onClick={() =>
                setCurrentImage((prev) => (prev + 1) % venue.media.length)
              }
              className="bg-white/80 rounded-full p-1 cursor-pointer"
            >
              <ChevronRight />
            </button>
          </div>
        )}

        {venue.media.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {venue.media.map((_, i) => (
              <button
                type="button"
                title="Go to image"
                key={i}
                onClick={() => setCurrentImage(i)}
                className={`w-3 h-3 rounded-full ${i === currentImage ? "bg-white" : "bg-white/50"}`}
              />
            ))}
          </div>
        )}

        {isLoggedIn && (
          <div
            className="absolute bg-light-grey rounded-full p-1 top-2 right-2 cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              toggleFavorite(venue.id);
            }}
          >
            <Heart
              className={
                isFavorited(venue.id)
                  ? "text-red-600 fill-red-600"
                  : "text-dark-grey"
              }
            />
          </div>
        )}
      </div>
    </>
  );
}
