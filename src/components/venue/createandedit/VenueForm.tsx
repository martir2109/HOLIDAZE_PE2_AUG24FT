import { X } from "lucide-react";
import { useState } from "react";
import { InputField } from "../../shared/InputField";
import { Button } from "../../shared/Button";
import type { CreateVenue } from "../../../interfaces/venue";
import { MessageBanner } from "../../shared/MessageBanner";
import type { MessageType } from "../../shared/MessageBanner";
import type { Venue } from "../../../interfaces/venue";
import { StarRating } from "./StarRating";
import { ImageInput } from "./ImageInput";
import { AmenitiesCheckboxes } from "./AmenitiesChecboxes";

interface VenueFormProps {
  onClose: () => void;
  initialValues?: Venue;
  onSubmit: (values: CreateVenue) => Promise<void>;
  mode?: "create" | "edit";
  onDelete?: () => void;
}

/**
 * Form for creating or editing a venue.
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
 * @param initialValues Existing venue data used to pre-fill the form when editing.
 * @param mode "create" (default) renders a empty form; "edit" pre-fills fields from initialValues.
 * @param onDelete Called when the user clicks "Delete venue" in edit mode.
 * @returns The Venue form with fields for name, description, images, price, max guests, rating, amenities and location.
 */
export default function VenueForm({
  onClose,
  onSubmit,
  initialValues,
  mode = "create",
  onDelete,
}: VenueFormProps) {
  const [name, setName] = useState(initialValues?.name ?? "");
  const [description, setDescription] = useState(
    initialValues?.description ?? "",
  );
  const [price, setPrice] = useState(String(initialValues?.price ?? ""));
  const [guests, setGuests] = useState(String(initialValues?.maxGuests ?? ""));
  const [rating, setRating] = useState(initialValues?.rating ?? 0);
  const [wifi, setWifi] = useState(initialValues?.meta?.wifi ?? false);
  const [breakfast, setBreakfast] = useState(
    initialValues?.meta?.breakfast ?? false,
  );
  const [pets, setPets] = useState(initialValues?.meta?.pets ?? false);
  const [parking, setParking] = useState(initialValues?.meta?.parking ?? false);
  const [country, setCountry] = useState(
    initialValues?.location?.country ?? "",
  );
  const [address, setAddress] = useState(
    initialValues?.location?.address ?? "",
  );
  const [city, setCity] = useState(initialValues?.location?.city ?? "");
  const [zip, setZip] = useState(initialValues?.location?.zip ?? "");
  const [mediaList, setMediaList] = useState(initialValues?.media ?? []);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alert, setAlert] = useState<{
    type: MessageType;
    text: string;
  } | null>(null);

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
        rating,
        media: mediaList,
        meta: { wifi, breakfast, pets, parking },
        location: { address, city, country, zip },
      });
      setAlert({
        type: "success",
        text: mode === "edit" ? "Venue updated!" : "Venue created!",
      });
      setTimeout(() => {
        onClose();
        window.location.reload();
      }, 1000);
    } catch {
      setAlert({
        type: "error",
        text: `Failed to ${mode === "edit" ? "update" : "create"} venue. Please try again.`,
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
        <h2 className="text-h5 font-bold">
          {mode === "edit" ? "Edit venue" : "Create venue"}
        </h2>
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
        <ImageInput
          mediaList={mediaList}
          onChange={setMediaList}
          onError={(message) => setAlert({ type: "error", text: message })}
        />
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
        <StarRating value={rating} onChange={setRating} />

        <AmenitiesCheckboxes
          wifi={wifi}
          breakfast={breakfast}
          pets={pets}
          parking={parking}
          setWifi={setWifi}
          setBreakfast={setBreakfast}
          setPets={setPets}
          setParking={setParking}
        />

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
          {isSubmitting
            ? mode === "edit"
              ? "Saving..."
              : "Creating..."
            : mode === "edit"
              ? "Save changes"
              : "Create venue"}
        </Button>
      </div>
      {mode === "edit" && initialValues?.id && (
        <div className="w-full py-4 flex justify-center">
          <Button variant="deleteVenue" type="button" onClick={onDelete}>
            Delete venue
          </Button>
        </div>
      )}
    </form>
  );
}
