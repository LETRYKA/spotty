"use client";

import { animate, stagger } from "motion";
import { splitText } from "motion-plus";
import { useEffect, useRef } from "react";

interface SplitTextProps {
  tag?: any;
  children: string;
  className?: string;
  once?: boolean;
}

export default function SplitText({
  tag: Tag = "h1",
  children,
  className = "",
  once = true,
}: SplitTextProps) {
  const containerRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    el.style.visibility = "hidden";

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(async (entry) => {
          if (entry.isIntersecting) {
            if (once && hasAnimated.current) return;
            hasAnimated.current = true;

            el.style.visibility = "visible";

            const { words } = splitText(el);

            animate(
              words,
              { opacity: [0, 1], y: [10, 0] },
              {
                type: "spring",
                duration: 1.4,
                bounce: 0.25,
                delay: stagger(0.04),
              }
            );
          }
        });
      },
      {
        threshold: 0.4, // triggers when 40% of the element is in view
      }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [once]);

  return (
    <>
      <Tag ref={containerRef} className={`${className} split-text`}>
        {children}
      </Tag>
      <style>{`
        .split-text {
          visibility: hidden;
        }
        .split-word {
          will-change: transform, opacity;
        }
      `}</style>
    </>
  );
}
