import { Link } from "react-router-dom";
import { Button } from "../components/shared/Button";

/**
 * Displays a 404 Page not found message with a button to go back to the home page.
 *
 * Used the Default example from Flowbite as a starting point for the NotFoundPage and made it fit the website.
 * Flowbite url: https://flowbite.com/blocks/marketing/404/
 *
 * @returns The rendered 404 Not Found Page.
 */
export default function NotFoundPage() {
  return (
    <main className="grid w-full min-h-screen place-items-center bg-background px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-6xl font-bold text-primary">404</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
          Page not found
        </h1>
        <p className="mt-6 text-lg font-medium text-pretty text-gray-900 sm:text-xl/8">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link to="/">
            <Button> Go home</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
