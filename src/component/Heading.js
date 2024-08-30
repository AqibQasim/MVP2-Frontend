

function Heading({ className = "", children }) {
  return (
    <h1
      className={`${className} font-lufga text-nowrap text-4xl font-bold`}
    >
      {children}
    </h1>
  );
}

export default Heading;
