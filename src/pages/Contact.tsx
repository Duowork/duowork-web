import { Link } from "react-router-dom";
import { Mail, MapPin, X, ExternalLink } from "lucide-react";
import ContactForm from "../components/ContactForm";

/* ----------------------------------------------------------------------- */

export default function Contact() {
  return (
    <section className="h-auto bg-white bg-[url('/pages/contact.webp')] relative">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-70"></div>

      <div className="size-full py-2 sm:py-10 z-70 relative">
        <div className="breadcrumb-nav my-3 sm:my-10 pt-5 text-center text-sm">
          <Link to="/" className="text-gray-400">
            {" "}
            Home
          </Link>
          <small className="mx-1 text-gray-300">{">"}</small>
          <small className="text-white">Contact us</small>
        </div>

        <div className="text-center mb-10">
          <h1 className="hidden">Contact Duowork</h1>
          <h2 className="text-2xl sm:text-3xl font-semibold mb-5 text-white">
            How can we be of service?
          </h2>

          <p className="text-sm text-gray-400 font-light text-center px-14 sm:px-5">
            fill the form below and we'll get back to you ASAP!
          </p>
        </div>

        <div className="py-10 px-2 sm:px-5 lg:px-10 flex flex-end sm:flex-row justify-center max-w-240 h-auto mx-5 lg:mx-auto rounded-xl mb-20 md:rounded-[2.75rem] bg-duo-dark">
          <div
            id="contact-form-left"
            className="contactFormLeft hidden md:block sm:mr-5 w-1/2"
          >
            <div
              id="contact-method"
              className="bg-black h-full pl-5 lg:pl-10 pt-10 flex flex-col justify-between"
            >
              <div className="text-white flex flex-col items-start justify-between h-50">
                <div className="flex items-center gap-2">
                  <MapPin className="text-gray-400 text-2xl mr-2" />
                  <span>Abuja, Nigeria</span>
                </div>

                <div className="flex items-center gap-2">
                  <Mail className="text-gray-400 text-2xl mr-2" />
                  <span>reach@duowork.tech</span>
                </div>
              </div>

              <div
                id="contact-icon"
                className="flex items-center justify-between"
              >
                <div className="flex flex-row justify-start align-items flex-wrap text-white">
                  <div className="icons items h-10 w-10 rounded-xl flex justify-center items-center">
                    <a
                      href="https://twitter.com/DuoworkHQ"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg block underline"
                    >
                      <X />
                    </a>
                  </div>

                  <div className="icons items h-10 w-10 rounded-xl flex justify-center items-center mx-10">
                    <a
                      href="https://instagram.com/duoworkhq"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg block underline"
                    >
                      <ExternalLink />
                    </a>
                  </div>

                  <div className="icons items h-10 w-10 rounded-xl flex justify-center items-center">
                    <a
                      href="https://www.linkedin.com/company/duowork"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg block underline"
                    >
                      {/* <Linkedin /> */}
                    </a>
                  </div>
                </div>

                <img
                  src="/contact-bubble.svg"
                  alt="Duowork contact page right-side contact bubble"
                  width={130}
                  height={130}
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Contact form */}
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
