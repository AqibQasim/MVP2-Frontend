import localFont from "next/font/local";

export const satoshiRegular = localFont({
    src: "./satoshi/satoshi-regular.woff2",
    subsets: ["latin"],
    display: 'swap',
    variable: "--font-satoshi-regular",
})

export const satoshiBlack = localFont({
    src: "./satoshi/satoshi-black.woff2",
    subsets: ["latin"],
    display: 'swap',
    variable: "--font-satoshi-black",
})
export const satoshiBold = localFont({
    src: "./satoshi/satoshi-bold.woff2",
    subsets: ["latin"],
    display: 'swap',
    variable: "--font-satoshi-bold",
})
export const satoshiLight = localFont({
    src: "./satoshi/satoshi-light.woff2",
    subsets: ["latin"],
    display: 'swap',
    variable: "--font-satoshi-light",
})
export const satoshiMedium = localFont({
    src: "./satoshi/satoshi-medium.woff2",
    subsets: ["latin"],
    display: 'swap',
    variable: "--font-satoshi-medium",
})