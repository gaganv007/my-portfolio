import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import Portfolio from './Portfolio';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Portfolio />
  </React.StrictMode>
);

// Performance monitoring (optional)
const reportWebVitals = (metric) => {
  console.log('Performance:', metric);
};

// Measure performance
if (typeof window !== 'undefined' && window.performance) {
  window.addEventListener('load', () => {
    setTimeout(() => {
      const perfData = window.performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      console.log(`Page load time: ${pageLoadTime}ms`);
    }, 0);
  });
}

reportWebVitals();