import { Link } from "react-router-dom";
import type { Venue } from "../../interfaces/venue";
import { Heart, MapPin } from "lucide-react";
import { useFavorites } from "../../hooks/useFavorites";

interface VenueCardProps {
  venue: Venue;
}

/**
 * A venue card showing a preview of the venue.
 * Displays the venue image, location, name and price per night.
 * Clicking the VenueCard redirects the user to the venue page.
 * Clicking the heart saves the venue to favorites.
 *
 * @returns The venue card.
 */
export default function VenueCard({ venue }: VenueCardProps) {
  const { isFavorited, toggleFavorite } = useFavorites();

  return (
    <>
      <Link to={`/venues/${venue.id}`} className="cursor-pointer">
        <div className="rounded-md border-[0.5px] border-light-grey bg-white hover:shadow-md hover:-translate-y-2">
          <div className="relative overflow-hidden h-60 sm:h-80 rounded-t-md ">
            <img
              src={
                venue.media[0]?.url ||
                "https://placehold.co/650x370?text=No+Image"
              }
              alt={venue.media[0]?.alt || venue.name}
              loading="lazy"
              className="object-cover w-full h-full"
            />

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
          </div>

          <div className="flex flex-col gap-3 py-4 px-2">
            <div className="flex items-center">
              <MapPin />
              <p className="text-normal-text text-dark-grey">
                {venue.location.city}, {venue.location.country}
              </p>
            </div>
            <div>
              <h5 className="text-h5 font-bold truncate">{venue.name}</h5>
            </div>
            <div className="flex items-center gap-1 text-medium-text">
              <p className="font-bold">{venue.price} nok</p>
              <p className="text-dark-grey">/night</p>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}
