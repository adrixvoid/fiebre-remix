import { atom, useAtom } from "jotai";
import { useEffect, useRef } from "react";

const stickyAtom = atom(false);

const useStickyHeader = () => {
  const headerRef = useRef<HTMLElement | null>(null);
  const [isSticky, setSticky] = useAtom(stickyAtom);

  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current) {
        const sticky = headerRef.current.offsetTop;
        if (window.scrollY > sticky) {
          setSticky(true);
        } else {
          setSticky(false);
        }
      }
    };

    // When the user scrolls the page, execute handleScroll
    window.addEventListener("scroll", handleScroll);

    // Cleanup function
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [setSticky]);

  return {
    headerRef,
    isSticky,
  };
};

export default useStickyHeader;
