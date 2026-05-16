/**
 * Terms and conditions page
 *
 * @returns The Terms and conditions page
 */
export default function TermsAndConditionsPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-primary mb-4">
          Terms and Conditions
        </h1>
        <p className="text-normal-text">
          Please read these terms carefully before using Holidaze. By using our
          platform, you agree to the following terms.
        </p>
      </div>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-secondary mb-4">
          Use of the platform
        </h2>
        <p className="text-normal-text mb-4">
          Holidaze is a venue booking platform that connects travelers with
          venue managers. You must be at least 18 years old to create an account
          and make bookings. You are responsible for keeping your account
          details secure.
        </p>
        <p className="text-normal-text">
          We reserve the right to suspend or terminate accounts that violate
          these terms or engage in any behavior that is harmful to other users
          or the platform.
        </p>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-secondary mb-4">Bookings</h2>
        <p className="text-normal-text mb-4">
          When you make a booking through Holidaze, you enter into an agreement
          with the venue manager. Holidaze acts as the platform facilitating
          this connection and is not responsible for the conduct of either
          party.
        </p>
        <p className="text-normal-text">
          All bookings are subject to the availability and pricing set by the
          venue manager. Prices displayed are per night unless stated otherwise.
        </p>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-secondary mb-4">
          Cancellations
        </h2>
        <p className="text-normal-text">
          Cancellation policies vary by venue. Please review the venue's policy
          before completing your booking. Holidaze is not responsible for
          refunds or disputes between guests and venue managers.
        </p>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-secondary mb-4">
          Changes to these terms
        </h2>
        <p className="text-normal-text">
          We may update these terms from time to time. Continued use of the
          platform after changes are made means you accept the updated terms.
        </p>
      </section>
    </div>
  );
}
