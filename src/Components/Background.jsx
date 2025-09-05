import { useState, useEffect } from 'react';

const ResponsiveBackground = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate dynamic focal point based on aspect ratio
  const imageAspectRatio = 1448 / 716; // ≈2.02 (landscape)
  const screenAspectRatio = windowSize.width / windowSize.height;
  
  // Adjust focal point for different orientations
  const backgroundPosition = 
    screenAspectRatio > imageAspectRatio ? 'center 100%' : 'center right 20%';

  return (
    <div 
      className="absolute inset-0 -z-50 container mx-auto"
      style={{
        backgroundImage: 'url(src/assets/iCare1.jpg)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition,
        backgroundAttachment: windowSize.width > 768 ? '' : 'scroll',
      }}
    >
      {/* Optional gradient overlay for better content readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/20" />

    </div>
  );
};

export default ResponsiveBackground;