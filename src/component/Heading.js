import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

function Heading({ className = "", children }) {
  return (
    <h1
      className={`${inter.className} ${className} text-nowrap text-4xl font-semibold`}
    >
      {children}
    </h1>
  );
}

export default Heading;
