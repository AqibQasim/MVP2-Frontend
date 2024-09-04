import { lufga, satoshi } from "@/fonts/font-styles";
import "@/styles/globals.css";

export const metadata = {
  title: {
    template: "%s / MVP2",
    default: "Welcome / MVP2",
  },
  description: "Welcome to the official MVP2 site ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="max-h-[100dvh] overflow-hidden bg-heavy-metal">
      <body
        className={`${satoshi.variable} ${lufga.variable} body-scroll mx-auto h-[100dvh] max-w-[1920px] overflow-x-hidden overflow-y-scroll rounded-[48px] bg-neutral-white p-3 !pr-[calc(0.75rem-12px)] font-satoshi font-normal`}
      >
        <main className="min-h-full rounded-[36px] bg-bg-frame p-[6px]">
          {children}
        </main>
      </body>
    </html>
  );
}
