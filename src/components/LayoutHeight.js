import PropTypes from "prop-types";
import React, { cloneElement } from "react";

function LayoutHeight({ children }) {
  if (!React.isValidElement(children)) {
    return null;
  }

  return cloneElement(children, {
    className: `${
      children?.props?.className ? children.props.className + " " : ""
    } size-full min-h-[calc(100dvh-2.25rem)] rounded-[2rem]`,
  });
}

LayoutHeight.propTypes = {
  children: PropTypes.element.isRequired,
};

export default LayoutHeight;
