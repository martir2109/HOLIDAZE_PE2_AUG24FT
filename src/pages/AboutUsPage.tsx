/**
 * About us page
 *
 * @returns The About us page
 */
export default function AboutUsPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="text-left md:text-center mb-16">
        <h1 className="text-4xl font-bold text-primary mb-4">About Holidaze</h1>

        <p className="text-normal-text">
          Holidaze is a modern accommodation booking platform that connects
          travelers with unique venues around the world. Whether you are looking
          for a cozy weekend getaway, a city apartment, or a long-term stay,
          Holidaze makes discovering and booking venues simple and seamless.
        </p>
      </div>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-secondary mb-4">
          Our story
        </h2>

        <p className="mb-4">
          Holidaze was created to provide a smooth and user-friendly booking
          experience for both travelers and venue managers. We wanted to build a
          platform where customers can easily browse accommodations, view venue
          details, and make bookings with confidence.
        </p>

        <p>
          At the same time, Holidaze gives venue managers the tools they need to
          register venues, manage availability, and organize bookings all in one
          place. Our goal is to create a reliable platform that brings people
          and places together.
        </p>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-secondary mb-6">
          Our values
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="font-bold text-secondary mb-1">Transparency</p>

            <p className="text-normal-text">
              Clear pricing, honest venue information, and a straightforward
              booking experience.
            </p>
          </div>

          <div className="bg-white rounded-xl p-4">
            <p className="font-bold text-secondary mb-1">Trust</p>

            <p className="text-normal-text">
              We focus on creating a secure and dependable platform for guests
              and venue managers.
            </p>
          </div>

          <div className="bg-white rounded-xl p-4">
            <p className="font-bold text-secondary mb-1">Community</p>

            <p className="text-normal-text">
              Bringing travelers and hosts together through meaningful travel
              experiences.
            </p>
          </div>

          <div className="bg-white rounded-xl p-4">
            <p className="font-bold text-secondary mb-1">Quality</p>

            <p className="text-normal-text">
              Delivering a modern, intuitive, and enjoyable experience across
              the platform.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
