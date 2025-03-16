
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Analytics } from '@vercel/analytics/react';

// Force favicon cache refresh
const linkEl = document.querySelector("link[rel~='icon']");
if (linkEl) {
  const href = linkEl.getAttribute('href');
  if (href) {
    linkEl.setAttribute('href', href + '?' + new Date().getTime());
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <Analytics />
  </React.StrictMode>,
);
