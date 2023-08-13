import { useState, useEffect, useCallback } from "react";

function useWindowSize() {
  const isClient = typeof window === 'object';

  const getSize = useCallback(() => {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined,
    };
  }, [isClient]);

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    if (!isClient) {
      // If we're not in a browser environment, return without doing anything
      return;
    }

    const handleResize = () => {
      setWindowSize(getSize());
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [getSize, isClient]); // Now we add the dependencies

  return windowSize;
}

export default useWindowSize;
