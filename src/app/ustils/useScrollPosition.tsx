import { useEffect, useState } from 'react';

const useScrollPosition = (): number => {
  const [currPosition, setCurrPosition] = useState<number>(0);

  useEffect(() => {
    const updatePositionHandler = () => {
      setCurrPosition(window.scrollY);
    };
    window.addEventListener('scroll', updatePositionHandler);
    updatePositionHandler();
    return () => window.removeEventListener('scroll', updatePositionHandler);
  }, []);

  return currPosition;
};

export default useScrollPosition;
