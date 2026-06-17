import React from 'react';
import { createRoot } from 'react-dom/client';

function TestApp() {
  return (
    <div className="min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold text-blue-600">测试页面正常</h1>
    </div>
  );
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TestApp />
  </React.StrictMode>,
);
