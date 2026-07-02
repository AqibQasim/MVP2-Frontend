"use client";

import { useEffect, useRef, useState } from "react";

const DESKTOP_MIN_WIDTH = 1024;

function getStickyTopPx() {
  if (typeof window === "undefined") return 16;

  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue("--profile-sticky-offset")
    .trim();
  const value = raw || "1rem";

  if (value.endsWith("rem")) {
    const rem = parseFloat(value);
    const rootSize = parseFloat(
      getComputedStyle(document.documentElement).fontSize,
    );
    return rem * rootSize;
  }

  if (value.endsWith("px")) {
    return parseFloat(value);
  }

  return 16;
}

export default function ProfileStickySidebar({ children }) {
  const columnRef = useRef(null);
  const innerRef = useRef(null);
  const [style, setStyle] = useState(null);

  useEffect(() => {
    const column = columnRef.current;
    const inner = innerRef.current;
    if (!column || !inner) return;

    let frame = 0;

    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (window.innerWidth < DESKTOP_MIN_WIDTH) {
          setStyle(null);
          return;
        }

        const grid = column.closest(".profile-content-grid");
        if (!grid) {
          setStyle(null);
          return;
        }

        const stickyTop = getStickyTopPx();
        const gridRect = grid.getBoundingClientRect();
        const columnRect = column.getBoundingClientRect();
        const innerHeight = inner.offsetHeight;
        const scrollY = window.scrollY;
        const gridTop = scrollY + gridRect.top;
        const gridBottom = gridTop + grid.offsetHeight;
        const stickyStart = gridTop - stickyTop;
        const stickyEnd = gridBottom - innerHeight - stickyTop;

        if (scrollY <= stickyStart) {
          setStyle(null);
          return;
        }

        if (scrollY >= stickyEnd) {
          setStyle({
            position: "absolute",
            top: `${grid.offsetHeight - innerHeight}px`,
            left: 0,
            width: "100%",
          });
          return;
        }

        setStyle({
          position: "fixed",
          top: `${stickyTop}px`,
          left: `${columnRect.left}px`,
          width: `${columnRect.width}px`,
          zIndex: 20,
        });
      });
    };

    update();

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(column);
    resizeObserver.observe(inner);

    const grid = column.closest(".profile-content-grid");
    if (grid) {
      resizeObserver.observe(grid);
    }

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className="profile-sidebar-column" ref={columnRef}>
      <div
        ref={innerRef}
        className="profile-sidebar-sticky-inner"
        style={style || undefined}
      >
        {children}
      </div>
    </div>
  );
}
