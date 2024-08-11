import { RefObject, useEffect } from 'react';

export default function useOnClickOutside(
  ref: RefObject<HTMLDivElement>,
  handler: () => void,
) {
  useEffect(() => {
    const listener = (e: MouseEvent | TouchEvent) => {
      if (!(e.target instanceof Node)) return;

      if (!ref.current || ref.current.contains(e.target)) {
        return;
      }

      handler();
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, []);
}
