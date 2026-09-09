import Container from "../../components/Container";
import IllustrativeBadge from "../../components/IllustrativeBadge";
import { CLIENTS } from "../../data/home";

/**
 * Client strip. Set type stands in for logos — the list is doubled and
 * translated -50% for a seamless loop, so both copies must stay identical.
 */
export default function Marquee() {
  return (
    <div className="mt-24 overflow-hidden border-y border-hairline bg-white py-10">
      <Container className="mb-6 flex items-center gap-3">
        <span className="text-[13px] font-medium tracking-[0.02em] text-ink-60">
          Teams we've built with
        </span>
        <IllustrativeBadge>Placeholder strip</IllustrativeBadge>
      </Container>

      <div className="relative">
        <div className="flex w-max animate-[dwMarquee_30s_linear_infinite]">
          {CLIENTS.map((client) => (
            <span key={client} className="dw-marquee-item">
              {client}
            </span>
          ))}
          {CLIENTS.map((client) => (
            <span key={`${client}-dup`} className="dw-marquee-item" aria-hidden="true">
              {client}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
