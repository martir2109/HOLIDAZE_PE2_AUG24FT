/**
 * Help  page
 *
 * @returns The Help page
 */
export default function HelpPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-primary mb-4">Help Center</h1>
        <p className="text-normal-text">
          Have a question? Here are some of the most common topics to help you
          get started.
        </p>
      </div>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-secondary mb-4">
          Booking a venue
        </h2>
        <p className="text-normal-text">
          To book a venue, browse or search for a venue that fits your needs.
          Select your dates and the number of guests, then confirm your booking.
          You need to be logged in to complete a booking.
        </p>
        <p className="text-normal-text">
          Once booked, you can view your upcoming bookings in your profile page.
        </p>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-secondary mb-4">
          Managing your bookings
        </h2>
        <p className="text-normal-text">
          You can view all your bookings from your profile. Each booking shows
          the venue, dates, and number of guests. If you need to cancel, contact
          the venue manager directly.
        </p>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-secondary mb-4">
          Becoming a venue manager
        </h2>
        <p className="text-normal-text">
          When creating an account, you can choose to register as a venue
          manager. This gives you access to create and manage your own venues,
          as well as see bookings made by guests.
        </p>
        <p className="text-normal-text">
          You can manage your venues from your profile page after logging in.
        </p>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-secondary mb-4">
          Favorites
        </h2>
        <p className="text-normal-text">
          You can save venues to your favorites by clicking the heart icon on
          any venue. Your favorites are saved in your browser and will persist
          between visits, but are not tied to your account.
        </p>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-secondary mb-4">
          Account and login
        </h2>
        <p className="text-normal-text">
          You can update your profile picture and bio from your profile page. If
          you forget your password, please contact support as password reset is
          not currently available through the platform.
        </p>
        <p className="text-normal-text">
          Logging out will clear your session from the browser.
        </p>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-secondary mb-4">
          Still need help?
        </h2>
        <p className="text-normal-text">
          If you couldn't find the answer you were looking for, feel free to
          reach out to us at{" "}
          <a
            href="mailto:support@holidaze.com"
            className="text-primary underline"
          >
            support@holidaze.com
          </a>{" "}
          and we'll get back to you as soon as possible.
        </p>
      </section>
    </div>
  );
}
