export default function FeatureList({ items, variant = "light" }) {
  const isDark = variant === "dark";

  return (
    <ul className="space-y-0">
      {items.map((item, index) => (
        <li key={item}>
          <div className="flex items-start gap-4 py-5 md:gap-5">
            <span
              className={`landing-feature-num shrink-0 pt-0.5 ${
                isDark ? "landing-feature-num-dark" : ""
              }`}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <span
              className={`landing-feature-item ${
                isDark ? "landing-feature-item-dark" : ""
              }`}
            >
              {item}
            </span>
          </div>
          {index < items.length - 1 && (
            <hr
              className={`border-t ${
                isDark ? "landing-divider-dark" : "landing-divider"
              }`}
            />
          )}
        </li>
      ))}
    </ul>
  );
}
