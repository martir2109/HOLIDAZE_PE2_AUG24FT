import type { Venue } from "../../interfaces/venue";
import { Wifi, Car, Coffee, Cat } from "lucide-react";

interface AmenitiesDisplayProps {
  venue: Venue;
}

/**
 * Displays the amenities available at a venue.
 * Shows icons and labels for WiFi, parking, breakfast, and pets.
 * If no amenities are available, displays a "No amenities" message.
 *
 * @param venue The venue whose amenities to display.
 * @returns Amenity icons and labels, or "No amenities" if none are available.
 */
export default function AmenitiesDisplay({ venue }: AmenitiesDisplayProps) {
  return (
    <>
      <h2 className="text-h5 font-bold">Amenities</h2>
      <div className="flex gap-4 flex-wrap">
        {!venue.meta.wifi &&
        !venue.meta.parking &&
        !venue.meta.breakfast &&
        !venue.meta.pets ? (
          <p>No amenities</p>
        ) : (
          <>
            {venue.meta.wifi && (
              <span className="flex items-center gap-2">
                <Wifi /> WiFi
              </span>
            )}
            {venue.meta.parking && (
              <span className="flex items-center gap-2">
                <Car /> Parking
              </span>
            )}
            {venue.meta.breakfast && (
              <span className="flex items-center gap-2">
                <Coffee /> Breakfast
              </span>
            )}
            {venue.meta.pets && (
              <span className="flex items-center gap-2">
                <Cat /> Pets allowed
              </span>
            )}
          </>
        )}
      </div>
    </>
  );
}
