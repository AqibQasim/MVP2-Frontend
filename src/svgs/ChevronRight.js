function ChevronRight({ className }) {
  return (
    <svg
      className={className}
      width="10"
      height="9"
      viewBox="0 0 10 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.75 3.7525L7.1 3.7525L4.62 1.2925C4.33 0.9925 4.33 0.5225 4.62 0.2225C4.91 -0.0675001 5.39 -0.0675001 5.68 0.2225L9.45 3.9725C9.73 4.2525 9.73 4.7525 9.45 5.0325L5.68 8.7825C5.39 9.0725 4.91 9.0725 4.62 8.7825C4.48 8.6325 4.4 8.4415 4.4 8.2525C4.4 8.0625 4.48 7.8625 4.62 7.7225L7.1 5.2525L0.75 5.2525C0.33 5.2525 0 4.9225 0 4.5025C0 4.0925 0.33 3.7525 0.75 3.7525Z"
        // fill="#0D0D0F"
        // use currentcolor for hover effects
        fill="currentcolor"
      />
    </svg>
  );
}

export default ChevronRight;
