function HeadingSmall({ className = "", children }) {
  return (
    <h4
      className={`${className} text-nowrap font-lufga text-2xl font-semibold`}
    >
      {children}
    </h4>
  );
}

export default HeadingSmall;
