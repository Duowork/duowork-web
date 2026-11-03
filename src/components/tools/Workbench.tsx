import Container from "../Container";
import { Segmented } from "./fields";

export type WorkbenchMode = "edit" | "preview";

type WorkbenchProps = {
  mode: WorkbenchMode;
  onModeChange: (mode: WorkbenchMode) => void;
  form: React.ReactNode;
  actions: React.ReactNode;
  preview: React.ReactNode;
  /** Shown above the paper while it holds sample content. */
  sampleNote?: string;
};

const MODES = [
  { value: "edit", label: "Edit" },
  { value: "preview", label: "Preview" },
] as const;

/**
 * Every generator's work area: a carbon desk with the form on one side and
 * white paper on the other. Below lg the two share the screen through a switch,
 * and print styles reduce the whole thing to the paper alone.
 */
export default function Workbench({
  mode,
  onModeChange,
  form,
  actions,
  preview,
  sampleNote,
}: WorkbenchProps) {
  return (
    <section
      id="workbench"
      aria-label="Work area"
      className="dw-print-reset bg-carbon py-[clamp(40px,6vw,80px)] text-white"
    >
      <Container className="dw-print-reset">
        <div className="dw-no-print mb-6 lg:hidden">
          <Segmented
            label="Show"
            value={mode}
            onChange={onModeChange}
            options={MODES}
            className="w-full"
          />
        </div>

        <div className="dw-print-reset grid items-start gap-[clamp(32px,4vw,56px)] lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
          <div className={`dw-no-print min-w-0 ${mode === "edit" ? "" : "max-lg:hidden"}`}>
            {form}
          </div>

          <div
            className={`dw-print-reset min-w-0 lg:sticky lg:top-24 ${
              mode === "preview" ? "" : "max-lg:hidden"
            }`}
          >
            <div className="dw-no-print mb-5">{actions}</div>
            {sampleNote && (
              <p className="dw-no-print mt-0 mb-3 text-[13px] text-paper-70">
                {sampleNote}
              </p>
            )}
            <div className="dw-print-reset lg:max-h-[calc(100vh-15rem)] lg:overflow-y-auto">
              {preview}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
