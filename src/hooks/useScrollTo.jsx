import { useCallback } from 'react';

export const useScrollTo = () => {
  return useCallback((id) => {
    const element = document.getElementById(id);
    if (element) {
      // Offset for fixed header (if needed)
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });
    }
  }, []);
};