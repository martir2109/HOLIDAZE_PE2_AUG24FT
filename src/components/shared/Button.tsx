interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** The visual style variant of the button. @default 'primary' */
  variant?: "primary" | "secondary" | "profile" | "clear" | "newVenue";
}

/**
 * A reusable button component with primary style variant.
 *
 * @param props - Standard button HTML attributes plus custom variant styling.
 */
export function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const base = "text-medium-text py-2 transition-colors cursor-pointer";
  const variants = {
    primary:
      "bg-primary px-8 text-white font-bold border rounded-full border-[0.2px] border-primary hover:bg-white hover:text-secondary",
    secondary:
      "bg-white px-4 text-secondary rounded-[4px] border border-[0.5px] border-dark-grey hover:bg-light-grey hover:text-gray-500 hover:border-light-grey hover:text-secondary",
    profile:
      "px-4 rounded-[4px] border border-[0.5px] border-dark-grey hover:border-green-900 hover:bg-green-200 hover:text-green-900",
    clear:
      "bg-grey-200 rounded-[4px] text-dark-grey border border-dark-grey hover:bg-light-grey hover:border-light-grey hover:text-gray-500",
    newVenue:
      "bg-primary text-white font-bold px-4 rounded-[4px] hover:bg-gray-300 hover:text-gray-500",
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
