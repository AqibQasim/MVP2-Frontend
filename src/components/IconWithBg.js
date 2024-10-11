function IconWithBg({ className, icon, job }) {
  return (
    <span className={`${className} flex items-center justify-center`}>
      {/* {icon} */}
      {job}
    </span>
  );
}

export default IconWithBg;
