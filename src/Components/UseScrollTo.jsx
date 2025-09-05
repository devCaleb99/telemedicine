import React, { useCallback } from 'react';

const useScrollTo = () => {
  return useCallback((id) => {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }

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
export default useScrollTo;