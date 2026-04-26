interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** The style of the input field. @default 'primary' */
  variant?: "primary";
}

/**
 * A styled input field with label.
 *
 * @param variant The style of the input field. Defaults to "primary".
 */
export function InputField({
  variant = "primary",
  className = "",
  children,
  ...props
}: InputFieldProps) {
  const base =
    "h-[50px] w-full px-2 text-medium-text rounded-md border-[0.5px] border-dark-grey active:border-blue-300";
  const variants = {
    primary: "bg-white",
  };

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={props.id} className="text-medium-text text-secondary">
        {children}
      </label>
      <input
        className={`${base} ${variants[variant]} ${className} text-normal-text`}
        {...props}
      />
    </div>
  );
}
