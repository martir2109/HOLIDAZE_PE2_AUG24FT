import { useState } from "react";
import { InputField } from "../../shared/InputField";
import { Button } from "../../shared/Button";
import { X } from "lucide-react";

interface ImageInputProps {
  mediaList: { url: string; alt: string }[];
  onChange: (mediaList: { url: string; alt: string }[]) => void;
  onError: (message: string) => void;
}

/**
 * ImageInput component that lets the user add and remove images for a venue.
 *
 * Each image requires a URL and an optional alt text description.
 * Shows a preview grid of added images, each with a remove button.
 * Validates that the URL starts with http before adding.
 *
 * @param mediaList The current list of images, each with a url and alt text.
 * @param onChange Called with the updated image list when an image is added or removed.
 * @param onError Called with an error message if the URL is invalid.
 * @returns An image preview grid, two input fields, and an Add image button.
 */
export function ImageInput({ mediaList, onChange, onError }: ImageInputProps) {
  const [mediaUrl, setMediaUrl] = useState("");
  const [mediaAlt, setMediaAlt] = useState("");

  function handleAddImage() {
    if (!mediaUrl) return;
    if (!mediaUrl.trim().startsWith("http")) {
      onError("Image URL must start with http or https.");
      return;
    }
    onChange([...mediaList, { url: mediaUrl, alt: mediaAlt }]);
    setMediaUrl("");
    setMediaAlt("");
  }

  function handleRemoveImage(index: number) {
    onChange(mediaList.filter((_, i) => i !== index));
  }
  return (
    <>
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
    </>
  );
}
