function SvgIconJobStatus({ status, className }) {
  if (!status) return null;

  const iconMap = {
    open: (
      <svg
        className={`${className}`}
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_2193_37341)">
          <path
            d="M10.9259 3.62305L12.0051 5.41388C12.1567 5.68805 12.2442 5.9972 12.2501 6.3122V10.203C12.2501 10.7455 12.0342 11.2647 11.6551 11.6439C11.2701 12.0289 10.7509 12.2389 10.2142 12.2447H3.80339C3.26089 12.2447 2.74172 12.0289 2.36255 11.6439C1.98338 11.2589 1.76755 10.7455 1.76172 10.203V6.3122C1.77922 5.9972 1.86673 5.68805 2.01257 5.41388L3.09172 3.62305"
            stroke="#6B50E6"
            stroke-miterlimit="10"
            stroke-linecap="round"
          />
          <path
            d="M1.75 6.41602L4.12417 6.88851C4.2875 6.92935 4.43333 7.01103 4.54999 7.12186C4.66666 7.2327 4.75417 7.37851 4.80084 7.53601L4.97583 8.22434C5.06917 8.5335 5.25583 8.80768 5.50667 9.00602C5.7575 9.20435 6.07249 9.31518 6.39333 9.32684H7.61833C7.93917 9.31518 8.24834 9.19851 8.49917 9.00018C8.75 8.80185 8.94251 8.52767 9.03001 8.22434L9.205 7.53601C9.25167 7.37851 9.33916 7.23853 9.45583 7.12186C9.57249 7.01103 9.71833 6.92935 9.88167 6.88851L12.1625 6.43353"
            stroke="#6B50E6"
            stroke-miterlimit="10"
            stroke-linecap="round"
          />
          <path
            d="M7 1.75V6.41667"
            stroke="#6B50E6"
            stroke-miterlimit="10"
            stroke-linecap="round"
          />
          <path
            d="M8.75 3.5L7 1.75L5.25 3.5"
            stroke="#6B50E6"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_2193_37341">
            <rect width="14" height="14" fill="white" />
          </clipPath>
        </defs>
      </svg>
    ),
    fulfilled: (
      <svg
        className={`${className}`}
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_2193_37303)">
          <path
            d="M10.2025 11.6673H3.78583C3.24333 11.6673 2.72416 11.4515 2.34499 11.0665C1.95999 10.6815 1.75 10.1623 1.75 9.61981V5.73483C1.76167 5.41983 1.84917 5.11064 1.99501 4.83647L3.07416 3.04563C3.21416 2.84147 3.39501 2.66648 3.61667 2.54398C3.83251 2.42148 4.07167 2.35148 4.3225 2.33398H9.66584C9.91084 2.34565 10.1617 2.41564 10.3775 2.54398C10.5933 2.66648 10.78 2.84147 10.92 3.04563L11.9992 4.83647C12.1567 5.11064 12.2442 5.41983 12.25 5.73483V9.61981C12.25 10.1623 12.0342 10.6815 11.6492 11.0665C11.2642 11.4515 10.7508 11.6673 10.2083 11.6673H10.2025Z"
            stroke="#6B50E6"
            stroke-miterlimit="10"
            stroke-linecap="round"
          />
          <path
            d="M1.75 5.83398L4.12417 6.30648C4.28167 6.34732 4.4275 6.42897 4.54417 6.54563C4.66084 6.65647 4.74833 6.79647 4.795 6.95397L4.96999 7.64814C5.06916 7.95148 5.25583 8.21981 5.50667 8.41231C5.7575 8.60481 6.06667 8.71566 6.38167 8.72733H7.60083C7.91583 8.71566 8.225 8.61064 8.47583 8.41231C8.7325 8.21981 8.91917 7.95148 9.01251 7.64814L9.1875 6.95397C9.23417 6.79647 9.3275 6.65647 9.44417 6.54563C9.56083 6.4348 9.70667 6.35316 9.86417 6.31232L12.2383 5.83982"
            stroke="#6B50E6"
            stroke-miterlimit="10"
            stroke-linecap="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_2193_37303">
            <rect width="14" height="14" fill="white" />
          </clipPath>
        </defs>
      </svg>
    ),
    hired: (
      <svg
        className={`${className} `}
        width="16"
        height="17"
        viewBox="0 0 16 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_2193_37424)">
          <path
            d="M9.89253 3.61035H12.3392V6.21702L14.0059 8.25035L12.3392 10.2837V12.8903H9.89253L7.99919 14.2503L6.07919 12.8903H3.61919V10.2837L2.00586 8.25702L3.61919 6.23035V3.617H6.07919L8.00586 2.26367L9.89919 3.62368L9.89253 3.61035Z"
            stroke="#6B50E6"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M6.19922 8.25077L7.39922 9.45077L9.79922 7.05078"
            stroke="#6B50E6"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
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
    ),
    trial: (
      <svg
        className={`${className} `}
        width="16"
        height="17"
        viewBox="0 0 16 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_2193_37424)">
          <path
            d="M9.89253 3.61035H12.3392V6.21702L14.0059 8.25035L12.3392 10.2837V12.8903H9.89253L7.99919 14.2503L6.07919 12.8903H3.61919V10.2837L2.00586 8.25702L3.61919 6.23035V3.617H6.07919L8.00586 2.26367L9.89919 3.62368L9.89253 3.61035Z"
            stroke="#6B50E6"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M6.19922 8.25077L7.39922 9.45077L9.79922 7.05078"
            stroke="#6B50E6"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
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
    ),
  };

  return iconMap[status];
}

export default SvgIconJobStatus;
