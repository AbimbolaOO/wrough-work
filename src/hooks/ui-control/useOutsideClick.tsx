import { MutableRefObject, useEffect } from 'react';

const useOutsideClick = (
  ref: MutableRefObject<HTMLElement | null>,
  callback: () => void,
  parentRootId?: string
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback, parentRootId]);
};

export default useOutsideClick;
