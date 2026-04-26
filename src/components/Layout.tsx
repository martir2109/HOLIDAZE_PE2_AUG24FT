import { Outlet } from "react-router-dom";
import NavigationBar from "./shared/NavigationBar";
import Footer from "./shared/Footer";
import ToastProvider from "./shared/ToastProvider";

/**
 * The main layout wrapper.
 * Render the navigation bar, page content, footer and toast notifications on every page.
 *
 * @returns The application shell with navbar, page content and footer.
 */
export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <NavigationBar />

      <main>
        <ToastProvider />
        <div className="w-full min-h-screen mx-auto pt-14 bg-background text-secondary overflow-hidden">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
}
