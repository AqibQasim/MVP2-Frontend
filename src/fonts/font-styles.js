import localFont from "next/font/local";

export const satoshi = localFont({
  src: [
    {
      path: "./satoshi/satoshi-light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./satoshi/satoshi-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./satoshi/satoshi-medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./satoshi/satoshi-bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./satoshi/satoshi-black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-satoshi",
});

export const lufga = localFont({
  src: [
    {
      path: "./lufga/lufga-thin.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "./lufga/lufga-extralight.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "./lufga/lufga-light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./lufga/lufga-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./lufga/lufga-medium.woff2",
      weight: "500",
      style: "normal",
    },

    {
      path: "./lufga/lufga-semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./lufga/lufga-bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./lufga/lufga-extrabold.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "./lufga/lufga-black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-lufga",
});
