type ButtonProps = {
  value: string;
  btnClass: string;
  isLink?: boolean;
  linkTo?: any;
  btnType?: "button" | "submit" | "reset";
  btnDisabled?: boolean;
  btnClicked?: () => {};
};

export default function Button({
  value,
  isLink,
  btnClass,
  linkTo,
  btnType,
  btnDisabled = false,
  btnClicked,
}: ButtonProps) {
  if (!isLink) {
    return (
      <button type={btnType} className={btnClass} disabled={btnDisabled}>
        {value}
      </button>
    );
  }

  return (
    <button
      type={btnType}
      className={btnClass}
      disabled={btnDisabled}
      onClick={btnClicked}
    >
      <a href={linkTo}>{value}</a>
    </button>
  );
}
