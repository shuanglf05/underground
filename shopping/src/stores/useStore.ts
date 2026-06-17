import { create } from 'zustand';
import type { User, TicketType, UserTicket, TicketOrder, MemberLevel, Coupon, UserCoupon, Announcement } from '../types';

interface AppState {
  // 用户状态
  user: User | null;
  isLoggedIn: boolean;
  
  // 会员等级
  memberLevels: MemberLevel[];
  
  // 票种
  ticketTypes: TicketType[];
  
  // 用户门票
  userTickets: UserTicket[];
  
  // 订单
  orders: TicketOrder[];
  
  // 优惠券
  coupons: Coupon[];
  userCoupons: UserCoupon[];
  
  // 公告
  announcements: Announcement[];
  
  // UI状态
  loading: boolean;
  
  // Actions
  initialize: () => Promise<void>;
  setUser: (user: User | null) => void;
  login: (phone: string, code: string) => Promise<boolean>;
  logout: () => void;
  
  // 票务相关
  fetchTicketTypes: () => Promise<void>;
  
  // 订单相关
  fetchOrders: () => Promise<void>;
  createOrder: (ticketId: string, quantity: number) => Promise<TicketOrder | null>;
  
  // 用户门票
  fetchUserTickets: () => Promise<void>;
  
  // 优惠券
  fetchCoupons: () => Promise<void>;
  claimCoupon: (couponId: string) => Promise<boolean>;
  
  // 公告
  fetchAnnouncements: () => Promise<void>;
}

export const useStore = create<AppState>((set, get) => ({
  // 初始状态 - 默认已登录
  user: {
    id: 'U001',
    phone: '13800138000',
    nickname: '测试用户',
    avatar: '',
    memberLevel: 2,
    memberPoints: 1580,
    balance: 500,
    createdAt: '2024-01-01 10:00:00',
  },
  isLoggedIn: true,
  memberLevels: [],
  ticketTypes: [
    {
      id: 'T001',
      name: '单人日场票',
      description: '适合单人游玩，有效期内可入场一次',
      price: 128,
      originalPrice: 168,
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
      category: '日场票',
      type: 'single',
      status: 'active',
      stock: 1000,
      sales: 2580,
      validityDays: 1,
      features: ['电子票', '无需换票', '当天有效'],
    },
    {
      id: 'T002',
      name: '单人夜场票',
      description: '适合夜场游玩，17:00后入场',
      price: 98,
      originalPrice: 128,
      image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400',
      category: '夜场票',
      type: 'single',
      status: 'active',
      stock: 800,
      sales: 1890,
      validityDays: 1,
      features: ['电子票', '夜场专用', '17:00后入场'],
    },
    {
      id: 'T003',
      name: '双人情侣票',
      description: '适合情侣或好友同行',
      price: 218,
      originalPrice: 298,
      image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400',
      category: '套票',
      type: 'package',
      status: 'active',
      stock: 500,
      sales: 1250,
      validityDays: 1,
      features: ['双人使用', '赠送小礼品', '周末可用'],
    },
    {
      id: 'T004',
      name: '家庭套票',
      description: '2大1小，适合家庭出游',
      price: 298,
      originalPrice: 398,
      image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400',
      category: '套票',
      type: 'package',
      status: 'active',
      stock: 300,
      sales: 890,
      validityDays: 1,
      features: ['2大1小', '儿童免票', '节假日通用'],
    },
    {
      id: 'T005',
      name: '单人年卡',
      description: '全年无限次游玩',
      price: 998,
      originalPrice: 1298,
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400',
      category: '年卡',
      type: 'annual',
      status: 'active',
      stock: 200,
      sales: 450,
      validityDays: 365,
      features: ['全年有效', '无限次', '专属权益'],
    },
    {
      id: 'T006',
      name: '亲子年卡',
      description: '1大1小全年无限次游玩',
      price: 1588,
      originalPrice: 1998,
      image: 'https://images.unsplash.com/photo-1511746315387-c4a76990fdce?w=400',
      category: '年卡',
      type: 'annual',
      status: 'active',
      stock: 150,
      sales: 280,
      validityDays: 365,
      features: ['1大1小', '全年有效', '亲子活动优先'],
    },
  ],
  userTickets: [],
  orders: [],
  coupons: [],
  userCoupons: [],
  announcements: [],
  loading: false,
  
  // 初始化
  initialize: async () => {
    set({ loading: true });
    try {
      // 并行获取初始数据
      await Promise.all([
        get().fetchTicketTypes(),
        get().fetchCoupons(),
        get().fetchAnnouncements(),
        get().fetchOrders(),
        get().fetchUserTickets(),
      ]);
    } catch (error) {
      console.error('初始化失败:', error);
    } finally {
      set({ loading: false });
    }
  },
  
  setUser: (user) => {
    set({ user, isLoggedIn: !!user });
  },
  
  login: async (phone: string, code: string) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, code }),
      });
      const data = await response.json();
      
      if (data.success) {
        set({ user: data.data.user, isLoggedIn: true });
        // 登录后获取用户相关数据
        await Promise.all([
          get().fetchOrders(),
          get().fetchUserTickets(),
        ]);
        return true;
      }
      return false;
    } catch (error) {
      console.error('登录失败:', error);
      return false;
    }
  },
  
  logout: () => {
    set({ 
      user: null, 
      isLoggedIn: false,
      orders: [],
      userTickets: [],
      userCoupons: [],
    });
  },
  
  fetchTicketTypes: async () => {
    try {
      const response = await fetch('/api/tickets/types');
      const data = await response.json();
      if (data.success) {
        set({ ticketTypes: data.data });
      }
    } catch (error) {
      console.error('获取票种失败:', error);
    }
  },
  
  fetchOrders: async () => {
    try {
      const response = await fetch('/api/orders');
      const data = await response.json();
      if (data.success) {
        set({ orders: data.data });
      }
    } catch (error) {
      console.error('获取订单失败:', error);
    }
  },
  
  createOrder: async (ticketId: string, quantity: number) => {
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticketId, quantity }),
      });
      const data = await response.json();
      
      if (data.success) {
        // 刷新订单列表
        await get().fetchOrders();
        return data.data;
      }
      return null;
    } catch (error) {
      console.error('创建订单失败:', error);
      return null;
    }
  },
  
  fetchUserTickets: async () => {
    try {
      const response = await fetch('/api/tickets/my');
      const data = await response.json();
      if (data.success) {
        set({ userTickets: data.data });
      }
    } catch (error) {
      console.error('获取用户门票失败:', error);
    }
  },
  
  fetchCoupons: async () => {
    try {
      const response = await fetch('/api/coupons');
      const data = await response.json();
      if (data.success) {
        set({ coupons: data.data });
      }
    } catch (error) {
      console.error('获取优惠券失败:', error);
    }
  },
  
  claimCoupon: async (couponId: string) => {
    try {
      const response = await fetch(`/api/coupons/${couponId}/claim`, {
        method: 'POST',
      });
      const data = await response.json();
      
      if (data.success) {
        await get().fetchCoupons();
        return true;
      }
      return false;
    } catch (error) {
      console.error('领取优惠券失败:', error);
      return false;
    }
  },
  
  fetchAnnouncements: async () => {
    try {
      const response = await fetch('/api/announcements');
      const data = await response.json();
      if (data.success) {
        set({ announcements: data.data });
      }
    } catch (error) {
      console.error('获取公告失败:', error);
    }
  },
}));
