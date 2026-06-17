import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, AlertCircle, Info } from 'lucide-react';
import { cn } from '../../lib/utils';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
  message: string;
  type?: ToastType;
  duration?: number;
  onClose: () => void;
}

export function Toast({ message, type = 'info', duration = 3000, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-500" />,
    error: <XCircle className="w-5 h-5 text-red-500" />,
    warning: <AlertCircle className="w-5 h-5 text-yellow-500" />,
    info: <Info className="w-5 h-5 text-blue-500" />,
  };

  const bgColors = {
    success: 'bg-green-50 border-green-200',
    error: 'bg-red-50 border-red-200',
    warning: 'bg-yellow-50 border-yellow-200',
    info: 'bg-blue-50 border-blue-200',
  };

  return (
    <div className={cn(
      'fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg animate-slide-in',
      bgColors[type]
    )}>
      {icons[type]}
      <span className="text-sm font-medium">{message}</span>
    </div>
  );
}

// Toast管理器
let toastId = 0;
const toastListeners: Set<(toast: any) => void> = new Set();

export const toast = {
  show: (message: string, type: ToastType = 'info') => {
    const id = ++toastId;
    const toastData = { id, message, type };
    toastListeners.forEach(listener => listener(toastData));
    return id;
  },
  success: (message: string) => toast.show(message, 'success'),
  error: (message: string) => toast.show(message, 'error'),
  warning: (message: string) => toast.show(message, 'warning'),
  info: (message: string) => toast.show(message, 'info'),
};

// Toast容器组件
export function ToastContainer() {
  const [toasts, setToasts] = useState<any[]>([]);

  useEffect(() => {
    const listener = (toast: any) => {
      setToasts(prev => [...prev, toast]);
    };
    toastListeners.add(listener);
    return () => {
      toastListeners.delete(listener);
    };
  }, []);

  const removeToast = (id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <>
      {toasts.map((t, index) => (
        <div key={t.id} style={{ top: `${(index * 60) + 16}px` }} className="fixed right-4 z-50">
          <Toast
            message={t.message}
            type={t.type}
            onClose={() => removeToast(t.id)}
          />
        </div>
      ))}
    </>
  );
}
