export const metadata = {
  title: "Cooding test",
};

export default function CoodingTestLayout({ children }) {
  return (
    <html lang="en" className="max-h-[100dvh] overflow-hidden bg-heavy-metal">
      <body className="body-scroll mx-auto h-[100dvh] max-w-[1920px] overflow-x-hidden overflow-y-scroll rounded-[48px] bg-neutral-white p-3 !pr-[calc(0.75rem-12px)] font-satoshi font-normal">
        <main className="min-h-full rounded-[36px] bg-bg-frame p-[6px]">
          {children}
        </main>
      </body>
    </html>
  );
}
