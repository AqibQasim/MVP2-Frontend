function Capsule({ children, icon = null, className = "", status = "none" }) {
  const statusClasses = {
    none: " ",
    paid: "bg-primary-tint-100 text-primary-tint-20",
    trial: "bg-primary-tint-100 text-primary-tint-20",
    fulfilled: "!bg-fulfilled-bg !text-fulfilled-text ",
    hired: "!bg-fulfilled-bg !text-fulfilled-text ",
  };

  const baseClasses =
    "rounded-[2.25rem] px-[1.125rem] py-[6px] text-sm font-medium capitalize";
  const iconClasses =
    "inline-flex items-center justify-center gap-2 !py-1 pl-1 pr-4 font-satoshi !font-bold text-primary-tint-30";
  const noIconClasses = "font-lufga text-grey-primary-shade-30";

  const containerClasses = `${icon ? iconClasses : noIconClasses} ${statusClasses[status]} ${baseClasses} bg-grey-primary-tint-90`;

  return (
    <div className={`${className} ${containerClasses}`}>
      {icon && icon}
      {children}
    </div>
  );
}

export default Capsule;
