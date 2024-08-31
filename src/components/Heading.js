import PropTypes from "prop-types";

function Heading({ className = "", children, sm = false, xm = false }) {
  let HeadingTag = "h1";
  let textSizeClass = "text-4xl";
  let fontWeightClass = "font-bold";

  switch (true) {
    case sm:
      HeadingTag = "h4";
      textSizeClass = "text-2xl";
      break;
    case xm:
      HeadingTag = "h6";
      textSizeClass = "text-lg";
      break;
    // Add more cases for h3, h2, etc. as needed
    default:
      break;
  }

  return (
    <HeadingTag
      className={`${className} text-nowrap font-lufga ${textSizeClass} ${fontWeightClass}`}
    >
      {children}
    </HeadingTag>
  );
}

Heading.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  sm: PropTypes.bool,
  xm: PropTypes.bool,
};

export default Heading;
