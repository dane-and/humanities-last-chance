
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Analytics } from '@vercel/analytics/react';

// Force aggressive favicon cache refresh
const forceReload = () => {
  // Add a random query parameter to each favicon-related link
  const timestamp = new Date().getTime();
  const version = 'v=5';
  
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
};

// Call immediately to refresh favicons
forceReload();

// Also refresh favicons when the document is fully loaded
window.addEventListener('load', forceReload);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <Analytics />
  </React.StrictMode>,
);
