function Capsule({ children, icon = null }) {
  const baseClasses =
    "rounded-[2.25rem] px-[1.125rem] py-[6px] text-sm font-medium capitalize";
  const iconClasses =
    "inline-flex items-center justify-center gap-2 !py-1 pl-1 pr-4 font-satoshi !font-bold text-primary-tint-30";
  const noIconClasses = "font-lufga text-grey-primary-shade-30";

  const containerClasses = `bg-grey-primary-tint-90 ${icon ? iconClasses : noIconClasses} ${baseClasses}`;

  return (
    <div className={containerClasses}>
      {icon && (
        <span className="flex size-6 items-center justify-center rounded-full bg-neutral-white">
          {icon}
        </span>
      )}
      {children}
    </div>
  );
}

export default Capsule;
