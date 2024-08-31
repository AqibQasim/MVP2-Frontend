function Heading({ className = "", children }) {
  return (
    <h1 className={`${className} text-nowrap font-lufga text-4xl font-bold`}>
      {children}
    </h1>
  );
}

export default Heading;
