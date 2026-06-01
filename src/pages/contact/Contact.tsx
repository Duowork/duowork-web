/**
 * Toggle between variants by uncommenting the desired variant above
 * and updating the component used below
 */

import ContactVariantA from "./ContactVariantA";
// import ContactVariantB from "./ContactVariantB";
import TopNav from "../../components/TopNav";

/* ----------------------------------------------------------------------- */

export default function Contact() {
  return (
    <section className="h-auto bg-duo-dark bg-[url('/pages/contact.webp')] relative">
      {/* Overlay */}
      <TopNav />

      <div className="size-full py-2 sm:py-10 z-70 relative">
        <div className="text-center px-5 pt-12 pb-0 lg:px-14">
          <h1 className="font-archivo-black text-4xl sm:text-5xl lg:text-[54px] leading-none tracking-tight mb-4 text-white">
            How can we be of{" "}
            <span className="text-duo-green-200">service?</span>
          </h1>

          <p className="text-white/72 text-base sm:text-[17px] leading-relaxed max-w-2xl mx-auto">
            Tell us what you're building — we'll get back to you, fast.
          </p>
        </div>

        {/* Contact Form - Change to ContactVariantB for the no-form version */}
        <ContactVariantA />
      </div>
    </section>
  );
}
