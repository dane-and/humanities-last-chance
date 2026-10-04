
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Follow section links; otherwise start each new page at the top. */
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const target = hash ? document.getElementById(hash.slice(1)) : null;
      if (target) target.scrollIntoView();
      else window.scrollTo(0, 0);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [pathname, hash]);

  return null; // This component doesn't render anything
};

export default ScrollToTop;
