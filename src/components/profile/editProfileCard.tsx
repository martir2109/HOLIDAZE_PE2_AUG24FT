import { X } from "lucide-react";
import { InputField } from "../shared/InputField";
import { useState } from "react";
import { Button } from "../shared/Button";
import { editProfile } from "../../services/profileApi";
import { MessageBanner } from "../shared/MessageBanner";
import type { MessageType } from "../shared/MessageBanner";

interface ProfileEditFormProps {
  onClose: () => void;
  onSuccess?: () => void;
  currentAvatar: string;
  currentBanner: string;
}

/**
 * A popup form for editing the user's avatar and banner.
 *
 * Shows a live image preview as the user types in a URL.
 * On success, closes the form and reloads the page to reflect the changes.
 * Displays a success or error message depending on the outcome.
 *
 * @returns The edit profile popup form.
 */
export default function EditProfileCard({
  onClose,
  onSuccess,
  currentAvatar,
  currentBanner,
}: ProfileEditFormProps) {
  const [avatar, setAvatar] = useState(currentAvatar);
  const [banner, setBanner] = useState(currentBanner);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alert, setAlert] = useState<{
    type: MessageType;
    text: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await editProfile(avatar, banner);
      onSuccess?.();
      setAlert({
        type: "success",
        text: "Profile successfully updated!",
      });
      setTimeout(() => {
        onClose();
        window.location.reload();
      }, 1000);
    } catch {
      setAlert({
        type: "error",
        text: "Failed to update profile",
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
        <h2 className="text-h5 font-bold">Edit profile</h2>
        <button
          type="button"
          title="close form"
          onClick={() => onClose()}
          className="cursor-pointer"
        >
          <X />
        </button>
      </div>
      <div>
        {alert && (
          <MessageBanner messageType={alert.type} message={alert.text} />
        )}
      </div>
      <div className="flex flex-col gap-4">
        <InputField
          placeholder="Avatar"
          name="avatar"
          id="avatar"
          type="text"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          required
        >
          Avatar
          {avatar && (
            <img
              src={avatar}
              alt="Avatar preview"
              className="w-24 h-24 object-cover rounded-[10px] border border-light-grey"
            />
          )}
        </InputField>

        <InputField
          placeholder="banner"
          name="banner"
          id="banner"
          type="text"
          value={banner}
          onChange={(e) => setBanner(e.target.value)}
          required
        >
          Banner
          {banner && (
            <img
              src={banner}
              alt="Banner preview"
              className="w-full h-32 object-cover rounded-[10px] border border-light-grey"
            />
          )}
        </InputField>
      </div>
      <div className="flex items-center w-full mt-8">
        <Button className="w-full" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving changes..." : "Save changes"}
        </Button>
      </div>
    </form>
  );
}
