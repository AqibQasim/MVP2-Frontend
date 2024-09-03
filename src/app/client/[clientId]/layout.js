function layout({ children }) {
  return (
    <div className="grid size-full min-h-[calc(100dvh-2.25rem)] grid-cols-[17.0625rem_1fr] grid-rows-[max-content_1fr] gap-[6px]">
      <header className="rounded-4xl bg-neutral-white p-4">
        HEADER
        <p>Lorem, ipsum.</p>
        <p>Lorem, ipsum dolor.</p>
        <p>Lorem ipsum dolor sit.</p>
      </header>
      <aside className="col-start-1 row-span-2 row-start-1 rounded-4xl bg-neutral-white p-4">
        ASIDE
      </aside>
      <div className="bg-transparent"> {children} </div>
    </div>
  );
}

export default layout;
