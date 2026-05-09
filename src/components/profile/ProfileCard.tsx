import { Button } from "../shared/Button";
import type { User } from "../../interfaces/user";
import { useState, useEffect } from "react";
import VenueCard from "../shared/VenueCard";
import { useFavorites } from "../../hooks/useFavorites";
import type { Venue } from "../../interfaces/venue";
import EditProfileCard from "./editProfileCard";

interface UserCardProps {
  user: User;
  venues: Venue[];
}

/**
 * Displays a user's profile page.
 * Includes their banner, avatar, name and email.
 *
 * Shows different content depending on the user's role:
 * - Your bookings: the venues the user has booked (this is visible for all logged in users).
 * - Your venues: the venues the user manages (this is only visible for venue managers).
 * - Your favorites: the venues the user has saved as favorites (this is visible for all logged in users).
 *
 * All users can open a popup form to edit their profile (avatar and banner).
 * Both form are displayed as popups and disable page scrolling while open.
 *
 * @returns The profile card or null if no user is provided.
 */
export default function ProfileCard({ user, venues }: UserCardProps) {
  const [activeSection, setActiveSection] = useState<
    "venues" | "bookings" | "favorites"
  >("bookings");
  const { favorites } = useFavorites();
  const favoriteVenues = venues.filter((venue) => favorites.includes(venue.id));
  const [showEditProfileForm, setShowEditProfileForm] = useState(false);
  const isVenueManager = user?.venueManager ?? false;

  useEffect(() => {
    if (showEditProfileForm) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showEditProfileForm]);

  if (!user) return null;

  return (
    <>
      <section className="w-full max-w-286.5 bg-white p-3 sm:p-6 min-h-screen flex flex-col gap-4">
        <div className="w-full md:min-h-110 min-h-100">
          <div className="relative">
            <img
              src={
                user.banner.url || "https://placehold.co/650x370?text=No+Image"
              }
              alt={user.banner.alt || "Profile banner image"}
              className="object-cover w-full h-48 md:h-64 rounded-[10px]"
            />
            <div className="absolute -bottom-45 md:-bottom-20 md:left-10 flex flex-col md:flex-row items-center md:items-end gap-4 md:w-fit w-full">
              <img
                src={
                  user.avatar.url ||
                  "https://placehold.co/100x100?text=No+Image"
                }
                alt={user.avatar.alt || "Profile avatar image"}
                className="w-24 h-24 sm:w-30 sm:h-30 md:w-40 md:h-40 object-cover rounded-[10px] border-4 border-white shrink-0"
              />
              <div className="flex flex-col gap-1 text-center md:text-left md:translate-y-14 w-full md:items-start items-center md:w-fit">
                <h1 className="text-medium-text font-bold">{user.name}</h1>
                <p className="text-normal-text text-medium-dark-grey break-all">
                  {user.email}
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="secondary"
                    className="w-fit mt-4"
                    type="button"
                    onClick={() => setShowEditProfileForm(true)}
                  >
                    Edit profile
                  </Button>
                  {isVenueManager && (
                    <Button
                      type="button"
                      variant="newVenue"
                      className="w-fit mt-4"
                    >
                      New venue
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex md:flex-row flex-col justify-between gap-4">
          <div className="w-full md:max-w-65 flex flex-col gap-4 ">
            {isVenueManager && (
              <Button
                variant="profile"
                onClick={() => setActiveSection("venues")}
                className={
                  activeSection === "venues"
                    ? "border-green-900 bg-green-200 text-green-900"
                    : ""
                }
              >
                Your venues ({user.venues?.length ?? 0})
              </Button>
            )}

            <Button
              variant="profile"
              onClick={() => setActiveSection("bookings")}
              className={
                activeSection === "bookings"
                  ? "border-green-900 bg-green-200 text-green-900"
                  : ""
              }
            >
              Your bookings ({user.bookings?.length ?? 0})
            </Button>

            <Button
              variant="profile"
              onClick={() => setActiveSection("favorites")}
              className={
                activeSection === "favorites"
                  ? "border-green-900 bg-green-200 text-green-900"
                  : ""
              }
            >
              Your favorites ({favorites.length})
            </Button>
          </div>
          <div className="w-full md:max-w-212.5 min-h-172 bg-white rounded-[10px] border border-medium-dark-grey p-4">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {isVenueManager &&
                activeSection === "venues" &&
                user.venues?.map((venue) => (
                  <VenueCard key={venue.id} venue={venue} />
                ))}

              {activeSection === "bookings" &&
                user.bookings?.map((booking) => (
                  <VenueCard key={booking.id} venue={booking.venue!} />
                ))}
              {activeSection === "favorites" &&
                favoriteVenues.map((venue) => (
                  <VenueCard key={venue.id} venue={venue} />
                ))}
            </div>
          </div>
        </div>
      </section>

      {showEditProfileForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-2">
          <EditProfileCard
            onClose={() => setShowEditProfileForm(false)}
            currentAvatar={user.avatar.url}
            currentBanner={user.banner.url}
          />
        </div>
      )}
    </>
  );
}
