function Input({
  as = "input",
  type = "text",
  error = false,
  required,
  className,
  placeholder = "",
  ...rest
}) {
  const commonClasses =
    " border border-gray-300 focus:!outline-none text-gray-900 rounded-full focus:ring-primary focus:border-primary block w-full px-5 py-2 transition-colors duration-300 ease-in-out placeholder:text-xs";

  if (as === "textarea") {
    return (
      <textarea
        className={`${commonClasses} ${className}`}
        placeholder={placeholder}
        {...rest}
      />
    );
  }

  return (
    <input
      type={type}
      className={`${commonClasses} ${className} ${error ? `!border-red-500` : " "}`}
      placeholder={placeholder}
      {...rest}
      required={required}
    />
  );
}

export default Input;
