import PropTypes from "prop-types";
import React from "react";

function ButtonRounded({ className = "", children, ...rest }) {
  // Use one and only one child component
  const clonedChild = React.isValidElement(children)
    ? React.cloneElement(children, {
        className: `${children.props.className || ""} group-[.svg-wrapper]:size-6`,
      })
    : children;

  return (
    <button
      className={`${className} svg-wrapper group rounded-full bg-grey-primary-tint-90 p-1.5 text-2xl text-grey-primary-shade-20`}
      {...rest}
    >
      <span className="relative flex items-center justify-center rounded-[9.375rem] bg-neutral-white px-2 py-1.5">
        {clonedChild}
      </span>
    </button>
  );
}

ButtonRounded.propTypes = {
  className: PropTypes.string,
  // Only one React element is allowed as children
  children: PropTypes.element.isRequired,
};

export default ButtonRounded;
