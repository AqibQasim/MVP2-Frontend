import Heading from "./Heading";

function Logo() {
  return (
    <div className="flex items-center justify-start gap-2">
      {/* icon */}
      <svg
        className="!size-9"
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M18 36C27.9412 36 36.0001 27.9411 36.0001 18C36.0001 8.05888 27.9412 0 18 0C8.05887 0 0 8.05888 0 18C0 27.9411 8.05887 36 18 36ZM23.6154 8.38516C23.8887 7.41425 22.9465 6.84012 22.086 7.45317L10.0738 16.0106C9.1406 16.6755 9.28739 18 10.2943 18H13.4575V17.9755H19.6223L14.5991 19.7479L12.3847 27.6149C12.1113 28.5858 13.0534 29.1599 13.914 28.5468L25.9262 19.9894C26.8595 19.3246 26.7126 18 25.7057 18H20.9089L23.6154 8.38516Z"
          fill="#4624E0"
        />
      </svg>
      <Heading toxm className="!text-primary">
        Singularity
      </Heading>
    </div>
  );
}

export default Logo;
