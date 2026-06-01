/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { apiClient } from "../../lib/api-client";
import { useState } from "react";
import { Mail, MapPin, Shield } from "lucide-react";
import Spinner from "../../components/Spinner";

interface FormDataType {
  name: string;
  email: string;
  subject: string;
  survey?: string;
  message: string;
}

const formInputs = {
  name: "",
  email: "",
  subject: "",
  survey: "",
  message: "",
} as FormDataType;

export default function ContactVariantA() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<typeof formInputs>({ mode: "onSubmit" });
  const [isLoading, setIsLoading] = useState(false);

  const submitHandler: SubmitHandler<FormDataType> = async (data) => {
    const requestPayload = {
      name: data.name,
      email: data.email,
      subject: data.subject,
      survey: data.survey || "",
      message: data.message,
    };

    setIsLoading(true);

    try {
      const res = await apiClient.post(
        "/.netlify/functions/send-email",
        requestPayload
      );

      if (res.isSuccess) {
        toast.success("Form submitted successfully!", {
          hideProgressBar: true,
          theme: "light",
        });

        reset({ ...formInputs });
        setIsLoading(false);
      } else {
        throw Error(res.error?.message, { cause: res.error?.cause });
      }
    } catch {
      setIsLoading(false);
      toast.error("Failed to submit Email!", {
        hideProgressBar: true,
        theme: "dark",
        icon: false,
        role: "alert",
        style: {
          color: "white",
          border: "1px solid white",
          borderRadius: "6px",
          backgroundColor: "#222222",
        },
      });
    }
  };

  return (
    <div className="py-10 px-5 lg:px-14 max-w-295 mx-auto">
      {/* Bento Card Container */}
      <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-0 border border-white/8 rounded-[30px] overflow-hidden bg-duo-dark">
        {/* Left Rail */}
        <aside className="relative overflow-hidden bg-linear-to-br from-[#262626] to-[#191919] p-11 lg:py-11 lg:px-10 flex flex-col gap-8 border-r border-white/8">
          {/* Glow effect */}
          <div className="absolute -right-[120px] -bottom-[150px] w-[420px] h-[420px] rounded-full bg-[radial-gradient(circle,rgba(158,255,81,0.2)_0%,rgba(158,255,81,0)_62%)] pointer-events-none" />

          <div className="relative">
            <div className="font-mono text-xs tracking-[0.1em] text-duo-green-200 mb-3">
              // reach us
            </div>
            <p className="text-white font-title text-[26px] leading-tight tracking-tight">
              Real humans. Same-day replies.
            </p>
          </div>

          <div className="relative flex flex-col gap-6">
            {/* Location */}
            <div className="flex gap-3.5 items-start">
              <span className="flex-none w-[42px] h-[42px] rounded-[13px] grid place-items-center bg-white/5 border border-[#3a3a3a]">
                <MapPin className="w-[19px] h-[19px] text-duo-green-200" />
              </span>
              <div>
                <div className="text-[11px] tracking-[0.16em] uppercase text-white/50 mb-1">
                  Based in
                </div>
                <div className="text-[15px] text-white font-medium leading-snug">
                  Abuja, Nigeria · Working remote
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="flex gap-3.5 items-start">
              <span className="flex-none w-[42px] h-[42px] rounded-[13px] grid place-items-center bg-white/5 border border-[#3a3a3a]">
                <Mail className="w-[19px] h-[19px] text-duo-green-200" />
              </span>
              <div>
                <div className="text-[11px] tracking-[0.16em] uppercase text-white/50 mb-1">
                  Email us
                </div>
                <div className="text-[15px] text-white font-medium leading-snug break-words">
                  <a href="mailto:reach@duowork.tech" className="hover:text-duo-green-200">
                    reach@duowork.tech
                  </a>
                  <br />
                  <a href="mailto:reach.duoworkhq@gmail.com" className="hover:text-duo-green-200">
                    reach.duoworkhq@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="relative mt-auto flex flex-col gap-4">
            <span className="inline-flex items-center gap-2 text-white/72 text-[13px]">
              <span className="w-2 h-2 rounded-full bg-duo-green-200" />
              Avg. first reply in under 24h
            </span>

            <div className="flex gap-2.5 flex-wrap">
              <a
                href="https://twitter.com/DuoworkHQ"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-full border border-[#3a3a3a] text-[13px] font-semibold text-white hover:border-duo-green-200 hover:text-duo-green-200 hover:bg-duo-green-200/12 transition-all"
              >
                <svg className="w-[15px] h-[15px]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
                </svg>
                Twitter/X
              </a>

              <a
                href="https://instagram.com/duoworkhq"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-full border border-[#3a3a3a] text-[13px] font-semibold text-white hover:border-duo-green-200 hover:text-duo-green-200 hover:bg-duo-green-200/12 transition-all"
              >
                <svg className="w-[15px] h-[15px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
                Instagram
              </a>

              <a
                href="https://www.linkedin.com/company/duowork"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-full border border-[#3a3a3a] text-[13px] font-semibold text-white hover:border-duo-green-200 hover:text-duo-green-200 hover:bg-duo-green-200/12 transition-all"
              >
                <svg className="w-[15px] h-[15px]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
                </svg>
                LinkedIn
              </a>
            </div>
          </div>
        </aside>

        {/* Form Side */}
        <form
          className="p-11 flex flex-col gap-5"
          onSubmit={(e) =>
            void (handleSubmit(submitHandler) as unknown as any)(e)
          }
        >
          {/* Name & Email Row */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-semibold tracking-tight text-white">
                Name <span className="text-duo-green-200">*</span>
              </label>
              <input
                type="text"
                placeholder="Your full name"
                className="w-full bg-[#1a1a1a] border border-[#3a3a3a] rounded-[14px] text-white text-[15px] px-4 py-[15px] placeholder:text-white/50 focus:outline-none focus:border-duo-green-200 focus:shadow-[0_0_0_4px_rgba(158,255,81,0.14)] transition-all"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <small className="text-red-400 text-xs">Name is required</small>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-semibold tracking-tight text-white">
                Email <span className="text-duo-green-200">*</span>
              </label>
              <input
                type="email"
                placeholder="username@example.com"
                className="w-full bg-[#1a1a1a] border border-[#3a3a3a] rounded-[14px] text-white text-[15px] px-4 py-[15px] placeholder:text-white/50 focus:outline-none focus:border-duo-green-200 focus:shadow-[0_0_0_4px_rgba(158,255,81,0.14)] transition-all"
                {...register("email", {
                  required: true,
                  pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                })}
              />
              {errors.email && (
                <small className="text-red-400 text-xs">Valid email is required</small>
              )}
            </div>
          </div>

          {/* Subject & Survey Row */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-semibold tracking-tight text-white">
                I need help with <span className="text-duo-green-200">*</span>
              </label>
              <select
                className="w-full bg-[#1a1a1a] border border-[#3a3a3a] rounded-[14px] text-white/72 text-[15px] px-4 py-[15px] pr-11 appearance-none focus:outline-none focus:border-duo-green-200 focus:shadow-[0_0_0_4px_rgba(158,255,81,0.14)] transition-all bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20width=%2220%22%20height=%2220%22%20fill=%22none%22%20stroke=%22%239eff51%22%20stroke-width=%222.2%22%20stroke-linecap=%22round%22%20stroke-linejoin=%22round%22%3E%3Cpath%20d=%22m5%208%205%205%205-5%22/%3E%3C/svg%3E')] bg-no-repeat bg-[right_15px_center]"
                defaultValue=""
                {...register("subject", { required: true })}
              >
                <option value="" disabled>
                  Select an option
                </option>
                <option value="A new product / MVP">A new product / MVP</option>
                <option value="An existing product">An existing product</option>
                <option value="AI & automation">AI &amp; automation</option>
                <option value="Design / UX">Design / UX</option>
                 <option value="Product Strategy">Product Strategy</option>
                <option value="Something else">Something else</option>
              </select>
              {errors.subject && (
                <small className="text-red-400 text-xs">Please select an option</small>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-semibold tracking-tight text-white">
                How did you find us?{" "}
                <span className="text-white/50 font-normal">(Optional)</span>
              </label>
              <select
                className="w-full bg-[#1a1a1a] border border-[#3a3a3a] rounded-[14px] text-white/72 text-[15px] px-4 py-[15px] pr-11 appearance-none focus:outline-none focus:border-duo-green-200 focus:shadow-[0_0_0_4px_rgba(158,255,81,0.14)] transition-all bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20width=%2220%22%20height=%2220%22%20fill=%22none%22%20stroke=%22%239eff51%22%20stroke-width=%222.2%22%20stroke-linecap=%22round%22%20stroke-linejoin=%22round%22%3E%3Cpath%20d=%22m5%208%205%205%205-5%22/%3E%3C/svg%3E')] bg-no-repeat bg-[right_15px_center]"
                defaultValue=""
                {...register("survey")}
              >
                <option value="" disabled>
                  Select to tell us
                </option>
                <option value="Referral">Referral</option>
                <option value="Twitter / X">Twitter / X</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="Search">Search</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-semibold tracking-tight text-white">
              Description <span className="text-duo-green-200">*</span>
            </label>
            <textarea
              rows={5}
              placeholder="Tell us about your project — goal, timeline, anything useful…"
              className="w-full bg-[#1a1a1a] border border-[#3a3a3a] rounded-[14px] text-white text-[15px] px-4 py-[15px] placeholder:text-white/50 resize-none leading-relaxed focus:outline-none focus:border-duo-green-200 focus:shadow-[0_0_0_4px_rgba(158,255,81,0.14)] transition-all"
              {...register("message", { required: true })}
            />
            {errors.message && (
              <small className="text-red-400 text-xs">Description is required</small>
            )}
          </div>

          {/* Security Note */}
          <div className="flex items-center gap-2 text-white/50 text-[12.5px] mt-0.5">
            <Shield className="w-[15px] h-[15px] text-duo-green-200 flex-none" />
            Your data is safe with us. We never share it with 3rd parties.
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="mt-1 w-full bg-duo-green-200 text-duo-dark rounded-[14px] font-archivo-black text-base tracking-wide py-4.5 inline-flex items-center justify-center gap-3 shadow-[0_14px_32px_-14px_rgba(158,255,81,0.6)] hover:-translate-y-0.5 transition-transform cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <span>Sending...</span>
                <Spinner isLoading={true} size="sm" speed="fast" arcColor="#222222" />
              </>
            ) : (
              <>
                <span>Send message</span>
                <svg
                  className="w-[18px] h-[18px]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7 17 17 7" />
                  <path d="M8 7h9v9" />
                </svg>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
