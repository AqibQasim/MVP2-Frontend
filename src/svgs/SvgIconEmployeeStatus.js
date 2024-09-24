function SvgIconEmployeeStatus({ status, className }) {
  if (status === "hired")
    return (
      <svg
        className={`${className} `}
        width="16"
        height="17"
        viewBox="0 0 16 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_2193_37424)">
          <path
            d="M9.89253 3.61035H12.3392V6.21702L14.0059 8.25035L12.3392 10.2837V12.8903H9.89253L7.99919 14.2503L6.07919 12.8903H3.61919V10.2837L2.00586 8.25702L3.61919 6.23035V3.617H6.07919L8.00586 2.26367L9.89919 3.62368L9.89253 3.61035Z"
            stroke="#6B50E6"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6.19922 8.25077L7.39922 9.45077L9.79922 7.05078"
            stroke="#6B50E6"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_2193_37424">
            <rect
              width="16"
              height="16"
              fill="white"
              transform="translate(0 0.25)"
            />
          </clipPath>
        </defs>
      </svg>
    );

  if (status === "trial")
    return (
      <svg
        className={`${className} `}
        width="16"
        height="17"
        viewBox="0 0 16 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_2193_37424)">
          <path
            d="M9.89253 3.61035H12.3392V6.21702L14.0059 8.25035L12.3392 10.2837V12.8903H9.89253L7.99919 14.2503L6.07919 12.8903H3.61919V10.2837L2.00586 8.25702L3.61919 6.23035V3.617H6.07919L8.00586 2.26367L9.89919 3.62368L9.89253 3.61035Z"
            stroke="#6B50E6"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6.19922 8.25077L7.39922 9.45077L9.79922 7.05078"
            stroke="#6B50E6"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_2193_37424">
            <rect
              width="16"
              height="16"
              fill="white"
              transform="translate(0 0.25)"
            />
          </clipPath>
        </defs>
      </svg>
    );

  return null;
}

export default SvgIconEmployeeStatus;
