import { Toaster } from "react-hot-toast";

/**
 * Renders the toast notification container.
 *
 * @returns A toast notification provider positioned at the top right.
 */
export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      containerStyle={{
        top: 80,
        left: 40,
      }}
    />
  );
}
