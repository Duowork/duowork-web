import { useId } from "react";
import {
  AddressBook,
  DownloadSimple,
  EnvelopeSimple,
  FileSvg,
  LinkSimple,
  Phone,
  Printer,
  TextT,
  WhatsappLogo,
  WifiHigh,
  type Icon,
} from "@phosphor-icons/react";
import { QR_COLOUR_NOTE } from "../../data/tool-notes";
import { DRAFT_NOTICE } from "../../data/tools";
import { useDraft } from "../../hooks/useDraft";
import { useFieldErrors } from "../../hooks/useFieldErrors";
import { downloadBlob, qrPngBlob } from "../../lib/tools/files";
import {
  buildQrContent,
  createQrDraft,
  forgetWifiPassword,
  isQrPristine,
  QR_COLOURS,
  qrColours,
  qrMatrix,
  qrPath,
  qrSvg,
  QUIET_ZONE,
  SAMPLE_QR_URL,
  validateQr,
  type QrDraft,
  type QrErrorLevel,
  type QrKind,
  type WifiSecurity,
} from "../../lib/tools/qr";
import DuoworkLockup from "./DuoworkLockup";
import ToolActions from "./ToolActions";
import Workbench from "./Workbench";
import { FieldGroup, FieldRow, SelectField, TextAreaField, TextField } from "./fields";

const KINDS: { value: QrKind; label: string; icon: Icon }[] = [
  { value: "url", label: "Website", icon: LinkSimple },
  { value: "whatsapp", label: "WhatsApp", icon: WhatsappLogo },
  { value: "email", label: "Email", icon: EnvelopeSimple },
  { value: "phone", label: "Phone", icon: Phone },
  { value: "text", label: "Text", icon: TextT },
  { value: "wifi", label: "Wi-Fi", icon: WifiHigh },
  { value: "vcard", label: "Contact card", icon: AddressBook },
];

const SECURITY_OPTIONS: readonly { value: WifiSecurity; label: string }[] = [
  { value: "WPA", label: "WPA or WPA2 (most networks)" },
  { value: "WEP", label: "WEP (older routers)" },
  { value: "nopass", label: "No password" },
];

const LEVEL_OPTIONS: readonly { value: QrErrorLevel; label: string }[] = [
  { value: "M", label: "Standard (recommended)" },
  { value: "L", label: "Light: fewest squares" },
  { value: "Q", label: "Sturdy: survives scuffs" },
  { value: "H", label: "Sturdiest: survives the most damage" },
];

const PILL =
  "inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors duration-200";

/** What the code will be, worked out once per render; never throws. */
function generate(draft: QrDraft) {
  const sample = isQrPristine(draft);
  const content = sample
    ? { payload: SAMPLE_QR_URL, summary: `Opens ${SAMPLE_QR_URL} in the phone's browser.` }
    : buildQrContent(draft);
  if (!content) return { sample, content: null, matrix: null, tooLong: "" };

  try {
    return { sample, content, matrix: qrMatrix(content.payload, draft.errorLevel), tooLong: "" };
  } catch (error) {
    return { sample, content, matrix: null, tooLong: error instanceof Error ? error.message : "" };
  }
}

export default function QrEditor() {
  const [draft, setDraft] = useDraft<QrDraft>("duowork-tools:qr:v1", createQrDraft, forgetWifiPassword);
  const hiddenId = useId();

  const errors = validateQr(draft);
  const { errorFor, touch, attempt, reset } = useFieldErrors(errors);
  const { sample, content, matrix, tooLong } = generate(draft);
  const colours = qrColours(draft.colours);

  const patch = (changes: Partial<QrDraft>) =>
    setDraft((current) => ({ ...current, ...changes }));

  /** The code to export, or a thrown message saying what's missing. */
  const requireCode = () => {
    const count = Object.keys(errors).length;
    if (count > 0) {
      attempt();
      window.setTimeout(() => {
        document.querySelector<HTMLElement>('#workbench [aria-invalid="true"]')?.focus();
      }, 50);
      throw new Error(
        `${count === 1 ? "One thing needs" : `${count} things need`} fixing before your code is ready.`,
      );
    }
    if (tooLong || !matrix) throw new Error(tooLong || "Your code isn't ready yet.");
    return matrix;
  };

  const field = (key: keyof QrDraft & string) => ({
    onBlur: () => touch(key),
    error: errorFor(key),
  });

  const fields: Record<QrKind, React.ReactNode> = {
    url: (
      <TextField
        label="Web address"
        type="text"
        inputMode="text"
        value={draft.url}
        placeholder="yourbusiness.com/menu"
        onChange={(url) => patch({ url })}
        {...field("url")}
      />
    ),
    whatsapp: (
      <>
        <TextField
          label="WhatsApp number"
          type="tel"
          value={draft.whatsappNumber}
          placeholder="0803 000 0000"
          hint="A number starting with 0 is treated as Nigerian. For other countries, start with + and the country code."
          onChange={(whatsappNumber) => patch({ whatsappNumber })}
          {...field("whatsappNumber")}
        />
        <TextAreaField
          label="Message to start the chat"
          optional
          value={draft.whatsappMessage}
          placeholder="Hello, I'd like to place an order."
          onChange={(whatsappMessage) => patch({ whatsappMessage })}
        />
      </>
    ),
    email: (
      <>
        <TextField
          label="Email address"
          type="email"
          value={draft.email}
          placeholder="hello@yourbusiness.com"
          onChange={(email) => patch({ email })}
          {...field("email")}
        />
        <TextField
          label="Subject"
          optional
          value={draft.emailSubject}
          onChange={(emailSubject) => patch({ emailSubject })}
        />
        <TextAreaField
          label="Message"
          optional
          value={draft.emailBody}
          onChange={(emailBody) => patch({ emailBody })}
        />
      </>
    ),
    phone: (
      <TextField
        label="Phone number"
        type="tel"
        value={draft.phone}
        placeholder="0803 000 0000"
        onChange={(phone) => patch({ phone })}
        {...field("phone")}
      />
    ),
    text: (
      <TextAreaField
        label="Text"
        rows={4}
        value={draft.text}
        placeholder="Table 4. Scan to see today's specials."
        onChange={(text) => patch({ text })}
        {...field("text")}
      />
    ),
    wifi: (
      <>
        <TextField
          label="Network name"
          value={draft.wifiName}
          placeholder="Harmattan-Guest"
          onChange={(wifiName) => patch({ wifiName })}
          {...field("wifiName")}
        />
        <SelectField
          label="Security"
          value={draft.wifiSecurity}
          options={SECURITY_OPTIONS}
          onChange={(wifiSecurity) => patch({ wifiSecurity: wifiSecurity as WifiSecurity })}
        />
        {draft.wifiSecurity !== "nopass" && (
          <TextField
            label="Password"
            value={draft.wifiPassword}
            hint="Never saved, not even in this tab. Anyone who scans the code can join the network."
            onChange={(wifiPassword) => patch({ wifiPassword })}
            {...field("wifiPassword")}
          />
        )}
        <label htmlFor={hiddenId} className="flex min-h-11 cursor-pointer items-center gap-3 text-sm text-paper-70">
          <input
            id={hiddenId}
            type="checkbox"
            checked={draft.wifiHidden}
            onChange={(event) => patch({ wifiHidden: event.target.checked })}
            className="size-5 cursor-pointer accent-volt"
          />
          The network is hidden
        </label>
      </>
    ),
    vcard: (
      <>
        <FieldRow>
          <TextField
            label="First name"
            value={draft.firstName}
            autoComplete="given-name"
            onChange={(firstName) => patch({ firstName })}
            {...field("firstName")}
          />
          <TextField
            label="Last name"
            optional
            value={draft.lastName}
            autoComplete="family-name"
            onChange={(lastName) => patch({ lastName })}
          />
        </FieldRow>
        <FieldRow>
          <TextField
            label="Business"
            optional
            value={draft.organisation}
            autoComplete="organization"
            onChange={(organisation) => patch({ organisation })}
          />
          <TextField
            label="Job title"
            optional
            value={draft.jobTitle}
            onChange={(jobTitle) => patch({ jobTitle })}
          />
        </FieldRow>
        <FieldRow>
          <TextField
            label="Phone"
            type="tel"
            optional
            value={draft.cardPhone}
            onChange={(cardPhone) => patch({ cardPhone })}
            {...field("cardPhone")}
          />
          <TextField
            label="Email"
            type="email"
            optional
            value={draft.cardEmail}
            onChange={(cardEmail) => patch({ cardEmail })}
            {...field("cardEmail")}
          />
        </FieldRow>
        <TextField
          label="Website"
          optional
          value={draft.website}
          onChange={(website) => patch({ website })}
          {...field("website")}
        />
      </>
    ),
  };

  const form = (
    <form noValidate onSubmit={(event) => event.preventDefault()} className="grid gap-8">
      <p className="m-0 text-[13px] text-paper-70">{DRAFT_NOTICE}</p>

      <FieldGroup legend="What should the code open?">
        <div
          role="group"
          aria-label="Kind of code"
          className="grid grid-cols-[repeat(auto-fit,minmax(min(140px,100%),1fr))] gap-2"
        >
          {KINDS.map(({ value, label, icon: KindIcon }) => (
            <button
              key={value}
              type="button"
              aria-pressed={draft.kind === value}
              onClick={() => patch({ kind: value })}
              className={`${PILL} justify-start ${
                draft.kind === value
                  ? "border-volt bg-volt text-carbon"
                  : "border-hairline-dark text-paper-70 hover:bg-surface-dark hover:text-white"
              }`}
            >
              <KindIcon size={18} aria-hidden="true" />
              {label}
            </button>
          ))}
        </div>
      </FieldGroup>

      <FieldGroup legend="Details">{fields[draft.kind]}</FieldGroup>

      <FieldGroup legend="Look">
        <div className="grid gap-2">
          <span className="text-[13px] font-medium text-paper-70">Colours</span>
          <div role="group" aria-label="Colours" className="flex flex-wrap gap-2">
            {QR_COLOURS.map((option) => (
              <button
                key={option.id}
                type="button"
                aria-pressed={draft.colours === option.id}
                onClick={() => patch({ colours: option.id })}
                className={`${PILL} ${
                  draft.colours === option.id
                    ? "border-volt text-white"
                    : "border-hairline-dark text-paper-70 hover:text-white"
                }`}
              >
                <span
                  aria-hidden="true"
                  className="inline-block size-5 rounded-full border border-white/40"
                  style={{ background: `linear-gradient(135deg, ${option.dark} 50%, ${option.light} 50%)` }}
                />
                {option.label}
              </button>
            ))}
          </div>
          <span className="text-xs text-paper-60">{QR_COLOUR_NOTE}</span>
        </div>
        <SelectField
          label="Sturdiness"
          value={draft.errorLevel}
          options={LEVEL_OPTIONS}
          hint="A sturdier code still scans when it's scratched or partly covered, but packs in more squares."
          onChange={(errorLevel) => patch({ errorLevel: errorLevel as QrErrorLevel })}
        />
      </FieldGroup>
    </form>
  );

  const size = matrix ? matrix.length + QUIET_ZONE * 2 : 0;

  const preview = matrix && content ? (
    <article
      aria-label="Your QR code"
      className="dw-paper mx-auto grid w-full max-w-[420px] justify-items-center gap-4 rounded-sm bg-white p-[clamp(20px,4vw,32px)] text-carbon shadow-mock"
    >
      <svg
        viewBox={`0 0 ${size} ${size}`}
        role="img"
        aria-label={`QR code. ${content.summary}`}
        shapeRendering="crispEdges"
        className="block aspect-square w-full max-w-[300px]"
      >
        <rect width={size} height={size} fill={colours.light} />
        <path d={qrPath(matrix)} fill={colours.dark} />
      </svg>
      <p className="m-0 text-center text-[15px] text-ink-80">
        <span className="font-title font-semibold text-carbon">Scanning it: </span>
        {content.summary}
      </p>
      <details className="dw-no-print w-full text-[13px] text-ink-60">
        <summary className="min-h-11 cursor-pointer content-center">Exactly what's in the code</summary>
        <pre className="m-0 mt-1 font-mono text-xs whitespace-pre-wrap break-all text-carbon">
          {content.payload}
        </pre>
      </details>
      <DuoworkLockup className="w-[84px] justify-self-end" />
    </article>
  ) : (
    <p
      role={tooLong ? "alert" : undefined}
      className={`dw-no-print m-0 rounded-sm border border-dashed p-6 text-[15px] ${
        tooLong ? "border-alert text-alert" : "border-paper-40 text-paper-70"
      }`}
    >
      {tooLong || "Fill in the details, and your code appears here."}
    </p>
  );

  return (
    <Workbench
      form={form}
      preview={preview}
      sampleNote={sample ? "An example code that opens Duowork Tools. Yours replaces it as you type." : undefined}
      actions={
        <ToolActions
          primary={{
            label: "Download PNG",
            icon: DownloadSimple,
            busyLabel: "Preparing your image",
            run: async () => {
              const code = requireCode();
              downloadBlob(await qrPngBlob(code, colours, QUIET_ZONE), `qr-code-${draft.kind}.png`);
              return "Your QR code is downloading. Test it with your phone before you print it.";
            },
          }}
          secondary={[
            {
              label: "Download SVG",
              icon: FileSvg,
              run: () => {
                const code = requireCode();
                downloadBlob(
                  new Blob([qrSvg(code, draft.colours)], { type: "image/svg+xml" }),
                  `qr-code-${draft.kind}.svg`,
                );
                return "Your SVG is downloading. It stays sharp at any print size.";
              },
            },
            {
              label: "Print",
              icon: Printer,
              run: () => {
                requireCode();
                window.print();
                return "";
              },
            },
          ]}
          onClear={() => {
            setDraft(createQrDraft());
            reset();
          }}
        />
      }
    />
  );
}
