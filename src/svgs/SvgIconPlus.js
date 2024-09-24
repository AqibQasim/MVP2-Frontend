function SvgIconPlus({ className }) {
  return (
    <svg
      className={`${className} `}
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_2347_37998)">
        <path
          d="M3.75 9H14.25"
          //   stroke="currentcolor"
          stroke="#9993B2"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9 14.25V3.75"
          //   stroke="currentcolor"
          stroke="#9993B2"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_2347_37998">
          <rect width="18" height="18" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default SvgIconPlus;
