import { useEffect, useRef, useState } from "react";

function Reveal({ children, className = "" }) {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.15,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={elementRef}
      className={`
        transition-all duration-700 ease-out
        ${
          isVisible
            ? "translate-y-0 opacity-100"
            : "translate-y-4 opacity-0"
        }
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export default Reveal;