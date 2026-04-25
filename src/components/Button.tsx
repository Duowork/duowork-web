/* eslint-disable @typescript-eslint/no-explicit-any */
type ButtonProps = {
  children: React.ReactNode;
  className: string;
  isLink?: boolean;
  linkTo?: any;
  btnType?: "button" | "submit" | "reset";
  btnDisabled?: boolean;
  btnClicked?: () => void;
};

export default function Button({
  children,
  isLink,
  className,
  linkTo,
  btnType,
  btnDisabled = false,
  btnClicked,
}: ButtonProps) {
  if (!isLink) {
    return (
      <button type={btnType} className={className} disabled={btnDisabled}>
        {children}
      </button>
    );
  }

  return (
    <button
      type={btnType}
      className={className}
      disabled={btnDisabled}
      onClick={btnClicked}
    >
      <a href={linkTo}>{children}</a>
    </button>
  );
}
