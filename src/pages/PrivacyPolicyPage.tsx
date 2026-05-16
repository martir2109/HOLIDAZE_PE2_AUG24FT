/**
 * Privacy policy page
 *
 * @returns The Privacy policy page
 */
export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-primary mb-4">Privacy Policy</h1>
        <p className="text-normal-text">
          Your privacy matters to us. This page explains what data we collect
          and how we use it.
        </p>
      </div>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-secondary mb-4">
          What we collect
        </h2>
        <p className="text-normal-text mb-4">
          When you create an account, we collect your name, email address, and
          optionally a profile picture and bio. When you make a booking, we
          store the details of that booking tied to your account.
        </p>
        <p className="text-normal-text">
          We also store data locally in your browser, such as your login session
          and any venues you have saved as favorites.
        </p>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-secondary mb-4">
          How we use your data
        </h2>
        <p className="text-normal-text mb-4">
          Your data is used to provide and improve the Holidaze platform. This
          includes managing your account, displaying your bookings, and allowing
          venue managers to see reservations made at their venues.
        </p>
        <p className="text-normal-text">
          We do not sell your personal data to third parties.
        </p>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-secondary mb-4">
          Cookies and local storage
        </h2>
        <p className="text-normal-text">
          Holidaze uses localStorage in your browser to keep you logged in and
          to save your favorite venues. This data stays on your device and is
          cleared when you log out.
        </p>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-secondary mb-4">
          Your rights
        </h2>
        <p className="text-normal-text">
          You can delete your account at any time, which will remove your
          personal data from our platform. If you have any questions about your
          data, feel free to contact us.
        </p>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-secondary mb-4">
          Changes to this policy
        </h2>
        <p className="text-normal-text">
          We may update this privacy policy from time to time. We will notify
          you of any significant changes by updating this page.
        </p>
      </section>
    </div>
  );
}
