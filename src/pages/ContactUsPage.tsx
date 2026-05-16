/**
 * Contact us page
 *
 * @returns The contact us page
 */
export default function ContactUsPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="text-left md:text-center mb-16">
        <h1 className="text-4xl font-bold text-primary mb-4">Contact us</h1>
        <p className="text-normal-text">
          Have questions about a booking, venue registration, or your account?
          Our team is here to help. Reach out to us through email or phone and
          we’ll get back to you as soon as possible.
        </p>
      </div>

      <div className="w-full flex justify-center">
        <div className="flex flex-col gap-8 text-normal-text w-full sm:w-fit rounded-sm p-4 sm:p-10 bg-white items-center sm:break-normal break-all">
          <div className="w-fit contact:w-50">
            <h2 className="text-medium-text font-bold text-secondary mb-2">
              Email
            </h2>
            <p>holidaze@gmail.com</p>
            <p>support@holidaze.com</p>
          </div>

          <div className="w-fit contact:w-50">
            <h2 className="text-medium-text font-bold text-secondary mb-2">
              Phone
            </h2>
            <p>+47 123 456 78</p>
            <p>Mon – Fri, 08:00 – 16:00</p>
          </div>

          <div className="w-fit contact:w-50">
            <h2 className="text-medium-text font-bold text-secondary mb-2">
              Office
            </h2>
            <p>Oslo, Norway</p>
          </div>
        </div>
      </div>
    </div>
  );
}
