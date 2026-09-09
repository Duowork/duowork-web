import { Link } from "react-router-dom";
import Icon from "./Icon";
import type { IconName } from "../lib/icon-paths";

/**
 * The 2.0 pill button. Every variant is a 999px pill; the ones that carry an
 * action forward also carry a filled arrow circle on the right.
 */
export type ButtonVariant =
  | "primary" // carbon fill, white text, volt arrow circle — the default CTA
  | "secondary" // carbon outline on white
  | "volt" // volt fill on carbon backgrounds
  | "white" // white fill on carbon backgrounds
  | "ghost"; // transparent with a paper border, on carbon

type CommonProps = {
  children: React.ReactNode;
  variant?: ButtonVariant;
  /** Renders a filled circle holding this icon on the trailing edge. */
  icon?: IconName;
  iconSize?: number;
  className?: string;
};

type ButtonProps = CommonProps & {
  to?: string;
  href?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  target?: string;
  rel?: string;
  "aria-label"?: string;
};

const BASE =
  "inline-flex items-center justify-center gap-3 rounded-full font-body text-[15px] font-medium transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed";

/** Padding is asymmetric when a trailing circle is present, symmetric when not. */
const padding = (hasIcon: boolean) =>
  hasIcon ? "py-[13px] pr-[14px] pl-7" : "py-[13px] px-7";

const VARIANTS: Record<ButtonVariant, string> = {
  primary: "bg-carbon text-white hover:bg-[#1c1c1c]",
  secondary:
    "border border-carbon text-carbon hover:bg-hairline-strong bg-transparent",
  volt: "bg-volt text-carbon hover:bg-[#b0ff74]",
  white: "bg-white text-carbon hover:bg-white/90",
  ghost: "border border-paper-40 text-white hover:bg-white/10 bg-transparent",
};

/** The trailing circle inverts against its button's fill. */
const CIRCLES: Record<ButtonVariant, string> = {
  primary: "bg-volt text-carbon",
  secondary: "bg-volt text-carbon",
  volt: "bg-carbon text-volt",
  white: "bg-volt text-carbon",
  ghost: "bg-volt text-carbon",
};

export default function Button({
  children,
  variant = "primary",
  icon,
  iconSize = 26,
  className = "",
  to,
  href,
  type = "button",
  disabled,
  onClick,
  target,
  rel,
  ...rest
}: ButtonProps) {
  const classes = [BASE, padding(Boolean(icon)), VARIANTS[variant], className]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {children}
      {icon && (
        <span
          className={`inline-flex shrink-0 items-center justify-center rounded-full ${CIRCLES[variant]}`}
          style={{ width: iconSize, height: iconSize }}
        >
          <Icon name={icon} size={Math.round(iconSize * 0.54)} strokeWidth={2.4} />
        </span>
      )}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} onClick={onClick} {...rest}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        onClick={onClick}
        target={target}
        rel={rel}
        {...rest}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={`${classes} cursor-pointer`}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {content}
    </button>
  );
}
