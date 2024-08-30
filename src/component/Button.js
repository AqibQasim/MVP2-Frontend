import Link from "next/link";

function Button({ as = "button", href = "/", className, children, ...rest }) {
  const commonClasses =
    "bg-primary hover:bg-primary-hover transition-colors duration-300 ease-in-out active:bg-primary-hover focus:outline-none focus:ring focus:ring-offset-2 focus:ring-primary-hover text-base font-medium text-white py-4 px-12 rounded";

  if (as === "link")
    return (
      <Link href={href} className={`${commonClasses} ${className}`}>
        {children}
      </Link>
    );
  return (
    <button {...rest} className={`${commonClasses} ${className}`}>
      {children}
    </button>
  );
}

export default Button;
