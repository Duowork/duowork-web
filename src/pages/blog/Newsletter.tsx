import { useState } from "react";
import Section from "../../components/Section";
import Icon from "../../components/Icon";

/**
 * Newsletter signup.
 *
 * TODO: not wired to a list provider yet — submitting only acknowledges
 * locally, so no address is stored anywhere. Point `subscribe` at the real
 * endpoint before promoting this.
 */
export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const subscribe = (event: React.FormEvent) => {
    event.preventDefault();
    setDone(true);
  };

  return (
    <Section bare className="pb-30">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))] items-center gap-[clamp(28px,4vw,48px)] rounded-[20px] border border-hairline p-[clamp(28px,4vw,56px)]">
        <div>
          <h2 className="mb-3.5 font-title text-[clamp(26px,2.6vw,34px)] leading-[1.15] font-semibold tracking-[-0.01em]">
            Why not stay in the loop?
          </h2>
          <p className="max-w-[46ch] text-[17px] text-ink-60">
            A postcard from us a few times a year. No spam, just useful updates.
          </p>
        </div>

        {done ? (
          <p className="m-0 text-[17px] text-ink-60">
            Thanks — we'll be in touch.
          </p>
        ) : (
          <form onSubmit={subscribe} className="flex flex-wrap gap-3">
            <label className="min-w-[220px] flex-1">
              <span className="sr-only">Email address</span>
              <input
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Email address"
                autoComplete="email"
                className="w-full rounded-full border border-ink-30 bg-white px-5 py-3.5 text-[15px] text-carbon transition-colors duration-200 focus:border-volt focus:outline-none"
              />
            </label>

            <button
              type="submit"
              className="inline-flex cursor-pointer items-center gap-3 rounded-full bg-carbon py-[13px] pr-[14px] pl-7 text-[15px] font-medium text-white transition-colors duration-200 hover:bg-[#1c1c1c]"
            >
              Subscribe
              <span className="inline-flex size-[26px] shrink-0 items-center justify-center rounded-full bg-volt text-carbon">
                <Icon name="arrowRight" size={14} strokeWidth={2.4} />
              </span>
            </button>
          </form>
        )}
      </div>
    </Section>
  );
}
