import { useEffect, useRef, useState } from "react";

function useScrollDirection() {
  const [direction, setDirection] = useState("down");
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const previousScrollY = lastScrollY.current;

      if (currentScrollY > previousScrollY) {
        setDirection("down");
      } else if (currentScrollY < previousScrollY) {
        setDirection("up");
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return direction;
}

export default useScrollDirection;