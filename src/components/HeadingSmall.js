import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

function HeadingSmall({ className = "", children }) {
  return (
    <h4
      className={`${inter.className} ${className} text-nowrap text-2xl font-semibold`}
    >
      {children}
    </h4>
  );
}

export default HeadingSmall;
