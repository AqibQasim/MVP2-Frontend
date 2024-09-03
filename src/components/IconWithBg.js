function IconWithBg({ className, icon }) {
  return (
    <span
      className={`${className} flex size-6 items-center justify-center rounded-full bg-neutral-white`}
    >
      {icon}
    </span>
  );
}

export default IconWithBg;
