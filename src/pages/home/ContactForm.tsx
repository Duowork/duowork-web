import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import Icon from "../../components/Icon";
import Spinner from "../../components/Spinner";
import { apiClient } from "../../lib/api-client";
import { NEED_OPTIONS } from "../../data/home";

type ContactFields = {
  name: string;
  email: string;
  company?: string;
  need: string;
  message: string;
  /** Honeypot — real people never see it, so anything in it is a bot. */
  website?: string;
};

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <span role="alert" className="text-[13px] text-alert">
      {message}
    </span>
  );
}

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFields>({
    mode: "onBlur",
    defaultValues: { need: NEED_OPTIONS[0] },
  });

  const [sent, setSent] = useState(false);
  const [failed, setFailed] = useState(false);

  const onSubmit: SubmitHandler<ContactFields> = async (data) => {
    // Silently accept and drop anything that filled the honeypot.
    if (data.website) {
      setSent(true);
      return;
    }

    setFailed(false);

    // The existing Netlify function takes name/email/subject/survey/message,
    // so the 2.0 fields map onto those keys rather than renaming the endpoint.
    const payload = {
      name: data.name,
      email: data.email,
      subject: data.need,
      survey: data.company || "",
      message: data.message,
    };

    try {
      const res = await apiClient.post(
        "/.netlify/functions/send-email",
        payload
      );

      if (!res.isSuccess) throw new Error(res.error?.message);

      reset({ need: NEED_OPTIONS[0] });
      setSent(true);
    } catch {
      setFailed(true);
    }
  };

  if (sent) {
    return (
      <div className="grid justify-items-start gap-3.5 py-6">
        <span className="inline-flex size-11 items-center justify-center rounded-full bg-volt text-carbon">
          <Icon name="check" size={22} strokeWidth={2.2} />
        </span>

        <div className="font-title text-[22px] font-semibold">
          Thanks — message received.
        </div>

        <p className="m-0 max-w-[40ch] text-base text-paper-70">
          We'll be in touch within one business day. If it's urgent, message us on
          WhatsApp using the number to the left.
        </p>

        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-1.5 cursor-pointer rounded-full border border-paper-40 bg-transparent px-[22px] py-2.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-white hover:text-carbon"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-[18px]">
      <div className="font-title text-xl font-semibold">
        Tell us what you're building
      </div>

      <label className="grid gap-2">
        <span className="text-[13px] font-medium tracking-[0.02em] text-paper-70">
          Name
        </span>
        <input
          type="text"
          autoComplete="name"
          placeholder="Your name"
          className="dw-field"
          aria-invalid={Boolean(errors.name)}
          {...register("name", { required: "Tell us who you are." })}
        />
        <FieldError message={errors.name?.message} />
      </label>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(180px,100%),1fr))] gap-[18px]">
        <label className="grid gap-2">
          <span className="text-[13px] font-medium tracking-[0.02em] text-paper-70">
            Work email
          </span>
          <input
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            className="dw-field"
            aria-invalid={Boolean(errors.email)}
            {...register("email", {
              required: "We need an email to reply to.",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "That doesn't look like an email address.",
              },
            })}
          />
          <FieldError message={errors.email?.message} />
        </label>

        <label className="grid gap-2">
          <span className="text-[13px] font-medium tracking-[0.02em] text-paper-70">
            Company
          </span>
          <input
            type="text"
            autoComplete="organization"
            placeholder="Your company"
            className="dw-field"
            {...register("company")}
          />
        </label>
      </div>

      <label className="grid gap-2">
        <span className="text-[13px] font-medium tracking-[0.02em] text-paper-70">
          What do you need?
        </span>
        <select className="dw-field" {...register("need")}>
          {NEED_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      <label className="grid gap-2">
        <span className="text-[13px] font-medium tracking-[0.02em] text-paper-70">
          A little more detail
        </span>
        <textarea
          rows={4}
          placeholder="What's the system, and what's not working?"
          className="dw-field"
          aria-invalid={Boolean(errors.message)}
          {...register("message", {
            required: "A sentence or two is plenty to start.",
          })}
        />
        <FieldError message={errors.message?.message} />
      </label>

      {/* Honeypot. Hidden from people and from assistive tech, visible to bots. */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute h-0 w-0 opacity-0"
        {...register("website")}
      />

      {failed && (
        <p role="alert" className="m-0 text-sm text-alert">
          That didn't send. Try again, or email us directly at hello@duowork.com.
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex cursor-pointer items-center justify-self-start gap-3 rounded-full bg-volt py-[13px] pr-[14px] pl-7 text-[15px] font-medium text-carbon transition-colors duration-200 hover:bg-[#b0ff74] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? "Sending…" : "Send message"}
        <span className="inline-flex size-[26px] shrink-0 items-center justify-center rounded-full bg-carbon text-volt">
          {isSubmitting ? (
            <Spinner isLoading size="sm" speed="fast" arcColor="#9EFF51" />
          ) : (
            <Icon name="arrowRight" size={14} strokeWidth={2.4} />
          )}
        </span>
      </button>
    </form>
  );
}
