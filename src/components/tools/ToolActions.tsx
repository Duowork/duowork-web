import { useState } from "react";
import type { Icon } from "@phosphor-icons/react";
import { DownloadSimple } from "@phosphor-icons/react";
import Button from "../Button";
import Spinner from "../Spinner";

export type ToolAction = {
  label: string;
  icon: Icon;
  /** Resolves to the message to announce; throw to report a failure. */
  run: () => string | Promise<string>;
};

type ToolActionsProps = {
  /** The main export, named for what it produces. */
  downloadLabel: string;
  onDownload: () => Promise<string>;
  secondary: ToolAction[];
  onClear: () => void;
};

/** The result row: one obvious next step, the alternatives, and a way to reset. */
export default function ToolActions({
  downloadLabel,
  onDownload,
  secondary,
  onClear,
}: ToolActionsProps) {
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const [failed, setFailed] = useState(false);
  const [confirming, setConfirming] = useState(false);

  const attempt = async (run: () => string | Promise<string>) => {
    setFailed(false);
    try {
      setStatus(await run());
    } catch (error) {
      setFailed(true);
      setStatus(
        error instanceof Error && error.message
          ? error.message
          : "Something went wrong. Your details are safe, so try again.",
      );
    }
  };

  const download = async () => {
    setBusy(true);
    setStatus("");
    await attempt(onDownload);
    setBusy(false);
  };

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2.5">
        <Button
          variant="volt"
          onClick={download}
          disabled={busy}
          iconNode={
            busy ? <Spinner isLoading size="sm" arcColor="#9eff51" /> : <DownloadSimple size={15} weight="bold" aria-hidden="true" />
          }
        >
          {busy ? "Preparing your PDF" : downloadLabel}
        </Button>

        {secondary.map(({ label, icon: ActionIcon, run }) => (
          <button
            key={label}
            type="button"
            onClick={() => attempt(run)}
            className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-paper-40 px-4 text-sm font-medium text-white transition-colors duration-200 hover:bg-white/10"
          >
            <ActionIcon size={17} aria-hidden="true" />
            {label}
          </button>
        ))}

        {confirming ? (
          <span className="inline-flex flex-wrap items-center gap-1 text-sm text-paper-70">
            Clear everything?
            <button
              type="button"
              onClick={() => {
                onClear();
                setConfirming(false);
                setFailed(false);
                setStatus("Cleared. You're starting fresh.");
              }}
              className="min-h-11 cursor-pointer px-2 font-medium text-volt underline underline-offset-3"
            >
              Yes, clear
            </button>
            <button
              type="button"
              onClick={() => setConfirming(false)}
              className="min-h-11 cursor-pointer px-2 font-medium text-white underline underline-offset-3"
            >
              Keep it
            </button>
          </span>
        ) : (
          <button
            type="button"
            onClick={() => setConfirming(true)}
            className="min-h-11 cursor-pointer px-2 text-sm text-paper-70 underline underline-offset-3 transition-colors duration-200 hover:text-white"
          >
            Clear
          </button>
        )}
      </div>

      <p
        aria-live="polite"
        className={`m-0 text-[13px] empty:hidden ${failed ? "mt-3 text-alert" : "mt-3 text-volt"}`}
      >
        {status}
      </p>
    </div>
  );
}
