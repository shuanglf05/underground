import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

console.log('main.tsx loaded');
console.log('React version:', React.version);

const rootElement = document.getElementById('root');
console.log('Root element:', rootElement);

if (rootElement) {
  const root = createRoot(rootElement);
  console.log('Root created successfully');
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
  console.log('App rendered');
} else {
  console.error('Root element not found!');
}