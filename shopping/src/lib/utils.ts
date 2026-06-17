import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return `¥${price.toFixed(2)}`;
}

export function formatDate(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}

export function formatDateTime(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function generateOrderNo(): string {
  const now = new Date();
  const timestamp = now.getTime().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${timestamp}${random}`;
}

export function generateQRCode(): string {
  return `QR${Date.now()}${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    // 通用状态
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-gray-100 text-gray-800',
    pending: 'bg-yellow-100 text-yellow-800',
    
    // 订单状态
    paid: 'bg-blue-100 text-blue-800',
    used: 'bg-gray-100 text-gray-800',
    refunded: 'bg-red-100 text-red-800',
    expired: 'bg-gray-100 text-gray-600',
    
    // 设备状态
    online: 'bg-green-100 text-green-800',
    offline: 'bg-red-100 text-red-800',
    maintenance: 'bg-yellow-100 text-yellow-800',
    
    // 资产状态
    available: 'bg-green-100 text-green-800',
    rented: 'bg-blue-100 text-blue-800',
    
    // 手环状态
    in_use: 'bg-blue-100 text-blue-800',
    lost: 'bg-red-100 text-red-800',
    damaged: 'bg-orange-100 text-orange-800',
    
    // 工单状态
    accepted: 'bg-blue-100 text-blue-800',
    processing: 'bg-yellow-100 text-yellow-800',
    completed: 'bg-green-100 text-green-800',
    
    // 其他
    contacted: 'bg-blue-100 text-blue-800',
    rejected: 'bg-red-100 text-red-800',
  };
  
  return colors[status] || 'bg-gray-100 text-gray-800';
}

export function getStatusText(status: string): string {
  const texts: Record<string, string> = {
    // 通用状态
    active: '正常',
    inactive: '停用',
    pending: '待处理',
    
    // 订单状态
    paid: '已支付',
    used: '已使用',
    refunded: '已退款',
    expired: '已过期',
    
    // 门票状态
    unused: '未使用',
    
    // 设备状态
    online: '在线',
    offline: '离线',
    maintenance: '维护中',
    
    // 资产状态
    available: '可租',
    rented: '已租',
    
    // 手环状态
    in_use: '使用中',
    lost: '已挂失',
    damaged: '已损坏',
    
    // 工单状态
    accepted: '已接单',
    processing: '处理中',
    completed: '已完成',
    
    // 工单类型
    repair: '维修',
    inspection: '巡检',
    
    // 其他
    contacted: '已联系',
    rejected: '已拒绝',
    
    // 优惠券类型
    discount: '折扣券',
    cash: '现金券',
    
    // 公告类型
    notice: '通知',
    activity: '活动',
    promotion: '促销',
  };
  
  return texts[status] || status;
}

export function calculateDiscount(level: number): number {
  const discounts: Record<number, number> = {
    1: 1.0,    // 普通会员
    2: 0.95,   // 银卡会员
    3: 0.9,    // 金卡会员
    4: 0.85,   // 铂金会员
    5: 0.8,    // 钻石会员
  };
  return discounts[level] || 1.0;
}

export function getMemberLevelName(level: number): string {
  const names: Record<number, string> = {
    1: '普通会员',
    2: '银卡会员',
    3: '金卡会员',
    4: '铂金会员',
    5: '钻石会员',
  };
  return names[level] || '普通会员';
}
