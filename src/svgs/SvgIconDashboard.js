function SvgIconDashboard({
  className,
  secondColor = "default",
  hover,
  active,
}) {
  const secondaryFill = {
    hover,
    active: "#4624E0",
    default: "#D6D4E0",
  };
  return (
    <svg
      className={`${className}`}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.2491 6.158C18.8861 5.838 18.4731 5.476 17.9811 5.021C17.7581 4.841 17.5141 4.635 17.2551 4.417C15.7951 3.186 13.7951 1.5 11.9721 1.5C10.1701 1.5 8.29906 3.092 6.79606 4.371C6.51806 4.607 6.25806 4.829 5.99306 5.044C5.52706 5.476 5.11406 5.839 4.75006 6.16C2.36306 8.261 1.91406 8.812 1.91406 13.713C1.91406 22.5 4.45506 22.5 12.0001 22.5C19.5441 22.5 22.0861 22.5 22.0861 13.713C22.0861 8.811 21.6371 8.26 19.2491 6.158Z"
        // fill="#9993B2"
        fill="currentcolor"
      />
      <path
        d="M9.09375 16.8848H14.9087C15.3227 16.8848 15.6587 16.5488 15.6587 16.1348C15.6587 15.7208 15.3227 15.3848 14.9087 15.3848H9.09375C8.67975 15.3848 8.34375 15.7208 8.34375 16.1348C8.34375 16.5488 8.67975 16.8848 9.09375 16.8848Z"
        fill={secondaryFill[secondColor]}
      />
    </svg>
  );
}

export default SvgIconDashboard;
