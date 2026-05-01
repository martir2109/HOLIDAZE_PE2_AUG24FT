/**
 * Displays a full page loading indicator.
 */
export default function LoadingSpinner() {
  return (
    <div className="flex gap-4 pb-10 text-secondary h-screen w-full items-center justify-center">
      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      <p>Loading...</p>
    </div>
  );
}
