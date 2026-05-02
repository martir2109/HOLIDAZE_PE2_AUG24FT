interface DeleteModalProps {
  onConfirm: () => void;
  onCancel: () => void;
  isDeleting: boolean;
  error: string | null;
}

/**
 * A popup that asks the user to confirm before deleting a booking.
 *
 * @param onConfirm Called when the user clicks "Yes, delete".
 * @param onCancel Called when the user clicks Cancel.
 * @param isDeleting When true, the confirm button shows "Deleting..." and is disabled.
 * @param error An error message to show if the delete fails, or null if there is no error.
 * @returns An overlay with a confirmation card.
 */
export default function ConfrimDeleteCard({
  onConfirm,
  onCancel,
  isDeleting,
  error,
}: DeleteModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative bg-white rounded-xl shadow-xl p-6 w-full max-w-sm mx-4 flex flex-col gap-4">
        <h2 className="text-lg font-bold">Delete booking</h2>
        <p className="text-sm text-gray-600">
          Are you sure you want to delete this booking? This cannot be undone
          once deleted.
        </p>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="cursor-pointer px-4 py-2 text-sm rounded-md border border-gray-300 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="cursor-pointer px-4 py-2 text-sm rounded-md bg-red-600 text-white hover:bg-red-700 disabled:opacity-60"
          >
            {isDeleting ? "Deleting..." : "Yes, delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
