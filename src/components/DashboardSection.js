"use client";

import PropTypes from "prop-types";
import Heading from "./Heading";
import Hr from "./Hr";

function DashboardSection({
  paragraph = "Hey [client.name], here's your new",
  heading = "Recommendations",
  children,
  className = "",
}) {
  return (
    <div className={`${className} rounded-3xl bg-neutral-white p-6`}>
      <div className="head">
        <p className="text-sm font-medium text-grey-primary-shade-30">
          {paragraph}
        </p>
        <Heading sm>{heading}</Heading>
      </div>
      <Hr />
      <div className="body"> {children} </div>
    </div>
  );
}

DashboardSection.propTypes = {
  paragraph: PropTypes.string,
  heading: PropTypes.string,
  children: PropTypes.node,
};

export default DashboardSection;
// button-capsule
