import { useId, useState } from "react";
import { ImageSquare, Trash } from "@phosphor-icons/react";
import { readLogo } from "../../lib/tools/files";

type LogoFieldProps = {
  value: string | null;
  onChange: (logo: string | null) => void;
};

/** Optional logo. Read and resized in the browser; never uploaded. */
export default function LogoField({ value, onChange }: LogoFieldProps) {
  const id = useId();
  const [error, setError] = useState("");

  const pick = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    try {
      onChange(await readLogo(file));
      setError("");
    } catch (failure) {
      setError(failure instanceof Error ? failure.message : "We couldn't read that image.");
    }
  };

  return (
    <div className="grid gap-1.5">
      <span className="text-[13px] font-medium text-paper-70">
        Logo <span className="font-normal text-paper-60">(optional)</span>
      </span>

      <div className="flex flex-wrap items-center gap-3">
        {value && (
          <img src={value} alt="Your logo" className="block h-11 max-w-[120px] rounded-md bg-white object-contain p-1" />
        )}

        <input
          id={id}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          onChange={pick}
          className="peer sr-only"
        />
        <label
          htmlFor={id}
          className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-paper-40 px-4 text-sm font-medium text-white transition-colors duration-200 peer-focus-visible:border-volt peer-focus-visible:outline-2 peer-focus-visible:outline-volt hover:bg-white/10"
        >
          <ImageSquare size={17} aria-hidden="true" />
          {value ? "Change logo" : "Add logo"}
        </label>

        {value && (
          <button
            type="button"
            onClick={() => onChange(null)}
            className="inline-flex min-h-11 cursor-pointer items-center gap-2 px-2 text-sm text-paper-70 transition-colors duration-200 hover:text-white"
          >
            <Trash size={17} aria-hidden="true" />
            Remove
          </button>
        )}
      </div>

      {error && (
        <span role="alert" className="text-[13px] text-alert">
          {error}
        </span>
      )}
    </div>
  );
}
