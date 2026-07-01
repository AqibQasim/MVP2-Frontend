import Image from "next/image";
import Link from "next/link";

export default function LandingButton({
  href,
  children,
  variant = "primary",
  dotColor = null,
  className = "",
  showArrow = true,
  onClick,
}) {
  const variantClass =
    variant === "outline"
      ? "landing-btn-outline"
      : variant === "orange"
        ? "landing-btn-orange"
        : variant === "orangeWhite"
          ? "landing-btn-orange-white"
          : variant === "glass"
            ? "landing-btn-glass"
            : variant === "dark"
              ? "landing-btn-dark"
              : "landing-btn-primary";

  const arrowClass =
    variant === "primary" ||
    variant === "dark" ||
    variant === "orangeWhite" ||
    variant === "glass"
      ? "landing-btn-arrow-light"
      : variant === "orange"
        ? "landing-btn-arrow-dark"
        : "";

  return (
    <Link
      href={href}
      className={`landing-btn ${variantClass} ${className}`}
      onClick={onClick}
    >
      {dotColor === "orange" && (
        <span className="landing-btn-indicator landing-btn-indicator-orange" />
      )}
      {dotColor === "blue" && (
        <span className="landing-btn-indicator landing-btn-indicator-blue" />
      )}
      <span>{children}</span>
      {showArrow && (
        <Image
          src="/icons/right-arrow.svg"
          alt=""
          width={16}
          height={16}
          className={`shrink-0 opacity-90 ${arrowClass}`}
        />
      )}
    </Link>
  );
}
