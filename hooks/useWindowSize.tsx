import { useState, useEffect } from 'react';

export const useWindowSize = () => {
  const width = typeof window !== 'undefined' ? window.innerWidth : undefined
  const height = typeof window !== 'undefined' ? window.innerHeight : undefined
  const [windowDimensions, setWindowDimensions] = useState({
    width: width,
    height: height
  });

  useEffect(() => {
    function handleResize() {
      setWindowDimensions({
        width: width,
        height: height
      });
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}