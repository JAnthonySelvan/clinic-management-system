import { useEffect, useRef, useState } from "react";

/**
 * Wraps a section (or any block) and animates it into view once it
 * scrolls into the viewport. Animates only once — doesn't replay
 * every time you scroll past it.
 *
 * Props:
 * - as: element/tag to render (default "div")
 * - direction: "up" | "down" | "left" | "right" | "fade" (default "up")
 * - delay: ms delay before the animation starts (default 0)
 * - duration: ms duration of the animation (default 700)
 * - threshold: how much of the element must be visible to trigger (default 0.15)
 * - className: extra classes merged onto the wrapper
 */
const AnimatedSection = ({
  children,
  as: Tag = "div",
  direction = "up",
  delay = 0,
  duration = 700,
  threshold = 0.15,
  className = "",
  ...rest
}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold, rootMargin: "0px 0px -60px 0px" },
    );

    observer.observe(node);

    // Fallback: if the element is already inside the viewport at mount time,
    // the observer's first callback can be missed or delayed (e.g. right below
    // a full-height hero, or when a sticky sibling shifts layout after mount).
    // Without this, the element stays stuck at opacity-0 + its offset transform
    // forever — which visually reads as a blank gap since it still occupies
    // its grid cell.
    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setIsVisible(true);
      observer.disconnect();
    }

    return () => observer.disconnect();
  }, [threshold]);

  const offsets = {
    up: "translate-y-10",
    down: "-translate-y-10",
    left: "translate-x-10",
    right: "-translate-x-10",
    fade: "",
  };

  return (
    <Tag
      ref={ref}
      className={`transition-all ease-out ${
        isVisible
          ? "translate-x-0 translate-y-0 opacity-100"
          : `opacity-0 ${offsets[direction]}`
      } ${className}`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: isVisible ? `${delay}ms` : "0ms",
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export default AnimatedSection;