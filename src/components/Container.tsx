type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

/** The site's single content measure: 1280px capped, 24px gutters. */
export default function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-[1280px] px-6 ${className}`}>
      {children}
    </div>
  );
}
