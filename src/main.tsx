
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Analytics } from '@vercel/analytics/react';

// Force aggressive favicon cache refresh
const forceReload = () => {
  // Add a random query parameter to each favicon-related link
  const timestamp = new Date().getTime();
  const version = 'v=6';
  
  document.querySelectorAll("link[rel='icon'], link[rel='apple-touch-icon'], link[rel='manifest']").forEach(link => {
    const href = link.getAttribute('href');
    if (href) {
      // Strip any existing query parameters
      const baseUrl = href.split('?')[0];
      // Add new version and timestamp parameters
      link.setAttribute('href', `${baseUrl}?${version}&t=${timestamp}`);
      
      // Create a new link element to force browser to reload the resource
      const newLink = document.createElement('link');
      link.getAttributeNames().forEach(attr => {
        newLink.setAttribute(attr, link.getAttribute(attr) || '');
      });
      link.parentNode?.replaceChild(newLink, link);
    }
  });
  
  // Additionally, create fallback favicons if they don't exist
  if (!document.querySelector("link[rel='icon'][sizes='16x16']")) {
    const favicon16 = document.createElement('link');
    favicon16.rel = 'icon';
    favicon16.type = 'image/png';
    favicon16.sizes = '16x16';
    favicon16.href = `/site-favicon-16x16.png?${version}&t=${timestamp}`;
    document.head.appendChild(favicon16);
  }
  
  if (!document.querySelector("link[rel='icon'][sizes='32x32']")) {
    const favicon32 = document.createElement('link');
    favicon32.rel = 'icon';
    favicon32.type = 'image/png';
    favicon32.sizes = '32x32';
    favicon32.href = `/site-favicon-32x32.png?${version}&t=${timestamp}`;
    document.head.appendChild(favicon32);
  }
};

// Call immediately to refresh favicons
forceReload();

// Also refresh favicons when the document is fully loaded
window.addEventListener('load', forceReload);

// Add an extra attempt after a slight delay
setTimeout(forceReload, 1000);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <Analytics />
  </React.StrictMode>,
);
