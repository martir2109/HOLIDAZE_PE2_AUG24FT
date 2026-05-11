import { X, Star } from "lucide-react";
import { useState } from "react";
import { InputField } from "../shared/InputField";
import { Button } from "../shared/Button";
import type { CreateVenue } from "../../interfaces/venue";
import { MessageBanner } from "../shared/MessageBanner";
import type { MessageType } from "../shared/MessageBanner";

interface VenueFormProps {
  onClose: () => void;
  onSubmit: (values: CreateVenue) => Promise<void>;
}

/**
 * Form for creating a new venue.
 * Allows the venue manager to fill in the details about the venue:
 * - Name (required)
 * - Description (required)
 * - Add images (optional)
 * - Price per night (required)
 * - Max guest (required)
 * - Rating (optional)
 * - Amenities (optional)
 * - Location (optional)
 *
 * Validates the name, description, price, guests and image URL format before submitting.
 *
 * @param onClose Closes the form popup.
 * @param onSubmit Sends the venue data to the API when the user clicks "Create venue".
 * @returns The Venue form with fields for name, description, images, price, max guests, rating, amenities and location.
 */
export default function VenueForm({ onClose, onSubmit }: VenueFormProps) {
  const [hover, setHover] = useState(0);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [guests, setGuests] = useState("");
  const [rating, setRating] = useState(0);
  const [wifi, setWifi] = useState(false);
  const [breakfast, setBreakfast] = useState(false);
  const [pets, setPets] = useState(false);
  const [parking, setParking] = useState(false);
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [mediaList, setMediaList] = useState<{ url: string; alt: string }[]>(
    [],
  );
  const [mediaUrl, setMediaUrl] = useState("");
  const [mediaAlt, setMediaAlt] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alert, setAlert] = useState<{
    type: MessageType;
    text: string;
  } | null>(null);

  function handleAddImage() {
    if (!mediaUrl) return;
    if (!mediaUrl.trim().startsWith("http")) {
      setAlert({
        type: "error",
        text: "Image URL must start with http or https.",
      });
      return;
    }
    setMediaList((prev) => [...prev, { url: mediaUrl, alt: mediaAlt }]);
    setMediaUrl("");
    setMediaAlt("");
  }

  function handleRemoveImage(index: number) {
    setMediaList((prev) => prev.filter((_, i) => i !== index));
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setAlert({ type: "error", text: "Name is required." });
      return;
    } else if (name.trim().length < 3) {
      setAlert({ type: "error", text: "Name must be at least 3 characters." });
      return;
    }

    if (!description.trim()) {
      setAlert({ type: "error", text: "Description is required." });
      return;
    } else if (description.trim().length < 10) {
      setAlert({
        type: "error",
        text: "Description must be at least 10 characters.",
      });
      return;
    }

    if (!price || Number(price) <= 0) {
      setAlert({ type: "error", text: "Price must be greater than 0." });
      return;
    }

    if (!guests || Number(guests) <= 0) {
      setAlert({ type: "error", text: "Must allow at least 1 guest" });
      return;
    }

    setIsSubmitting(true);

    try {
      await onSubmit({
        name,
        description,
        price: Number(price),
        maxGuests: Number(guests),
        rating: rating || undefined,
        media: mediaList,
        meta: { wifi, breakfast, pets, parking },
        location: { address, city, country, zip },
      });
      setAlert({ type: "success", text: "Venue created!" });
      setTimeout(() => {
        onClose();
        window.location.reload();
      }, 1000);
    } catch {
      setAlert({
        type: "error",
        text: "Failed to create venue. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-[10px] py-6 px-4 sm:px-6 w-full max-w-200 translate-y-4 overflow-y-auto max-h-[90vh]"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-h5 font-bold">Create venue</h2>
        <button
          type="button"
          title="close form"
          onClick={() => onClose()}
          className="cursor-pointer"
        >
          <X />
        </button>
      </div>
      <div className="flex flex-col gap-4">
        <InputField
          placeholder="name"
          name="name"
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        >
          Name
        </InputField>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="description"
            className="text-medium-text text-secondary"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="text-normal-text min-h-30 w-full p-2 rounded-md border-[0.5px] border-dark-grey active:border-blue-300"
          ></textarea>
        </div>
        <p className="text-medium-text font-bold">Images</p>
        {mediaList.length > 0 && (
          <div className="w-full grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {mediaList.map((media, index) => (
              <div
                key={index}
                className="relative rounded-[10px] overflow-hidden border border-medium-dark-grey"
              >
                <img
                  src={media.url}
                  alt={media.alt || "Venue image"}
                  className="w-full aspect-square object-cover"
                />
                <button
                  title="close"
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-2 right-2 bg-white rounded-full p-1 cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="flex flex-col gap-2">
          <InputField
            placeholder="Image URL"
            id="mediaUrl"
            name="mediaUrl"
            type="text"
            value={mediaUrl}
            onChange={(e) => setMediaUrl(e.target.value)}
          >
            Image URL
          </InputField>
          <InputField
            placeholder="Image description (alt text)"
            id="mediaAlt"
            name="mediaAlt"
            type="text"
            value={mediaAlt}
            onChange={(e) => setMediaAlt(e.target.value)}
          >
            Image description
          </InputField>
          <Button type="button" variant="clear" onClick={handleAddImage}>
            Add image
          </Button>
        </div>

        <p className="text-medium-text font-bold">Price and capacity</p>
        <InputField
          placeholder="Price /night (NOK)"
          id="price"
          name="price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        >
          Price /night (NOK)
        </InputField>
        <InputField
          placeholder="Max quests"
          id="guests"
          name="guests"
          type="number"
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          required
        >
          Max quests
        </InputField>
        <div className="flex flex-col gap-2">
          <label htmlFor="rating" className="text-medium-text text-secondary">
            Rating
          </label>
          <div className="flex gap-1">
            {[...Array(5)].map((_, index) => {
              const starValue = index + 1;
              return (
                <button
                  title="Star rating"
                  type="button"
                  key={starValue}
                  className="cursor-pointer"
                  onClick={() => setRating(starValue)}
                  onMouseEnter={() => setHover(starValue)}
                  onMouseLeave={() => setHover(0)}
                >
                  <Star
                    size={24}
                    strokeWidth={0}
                    fill={
                      starValue <= (hover || rating) ? "#facc15" : "#d1d5db"
                    }
                  />
                </button>
              );
            })}
            {rating > 0 && (
              <Button
                type="button"
                onClick={() => setRating(0)}
                variant="clearRating"
              >
                Clear
              </Button>
            )}
          </div>
        </div>
        <p className="text-medium-text font-bold">Amenities</p>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="wifi"
              checked={wifi}
              onChange={(e) => setWifi(e.target.checked)}
              className="h-4.5 w-4.5 cursor-pointer"
            />
            <label htmlFor="wifi">Wifi</label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="breakfast"
              checked={breakfast}
              onChange={(e) => setBreakfast(e.target.checked)}
              className="h-4.5 w-4.5 cursor-pointer"
            />
            <label htmlFor="breakfast">Breakfast</label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="pets"
              checked={pets}
              onChange={(e) => setPets(e.target.checked)}
              className="h-4.5 w-4.5 cursor-pointer"
            />
            <label htmlFor="pets">Pets</label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="parking"
              checked={parking}
              onChange={(e) => setParking(e.target.checked)}
              className="h-4.5 w-4.5 cursor-pointer"
            />
            <label htmlFor="parking">Parking</label>
          </div>
        </div>

        <p className="text-medium-text font-bold">Location</p>
        <InputField
          placeholder="Country"
          id="country"
          name="country"
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        >
          Country
        </InputField>
        <InputField
          placeholder="Address"
          id="address"
          name="address"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        >
          Address
        </InputField>
        <InputField
          placeholder="City"
          id="city"
          name="city"
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        >
          City
        </InputField>
        <InputField
          placeholder="Zip"
          id="zip"
          name="zip"
          type="text"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
        >
          Zip
        </InputField>
      </div>
      {alert && <MessageBanner messageType={alert.type} message={alert.text} />}
      <div className="flex items-center w-full mt-8">
        <Button className="w-full" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create venue"}
        </Button>
      </div>
    </form>
  );
}
