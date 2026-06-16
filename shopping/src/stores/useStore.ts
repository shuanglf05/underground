import { create } from 'zustand';
import type { Ticket, Member, Order, Asset, Contract, Bill, DashboardStats, Announcement, Investment, Device, Bracelet } from '../types';
import { ticketApi, memberApi, orderApi, assetApi, dashboardApi, braceletApi } from '../services/api';

interface AppState {
  // 票种
  tickets: Ticket[];
  ticketsLoading: boolean;
  fetchTickets: () => Promise<void>;

  // 会员
  currentMember: Member | null;
  members: Member[];
  membersLoading: boolean;
  fetchMembers: (params?: { page?: number; pageSize?: number; keyword?: string }) => Promise<void>;
  fetchMemberById: (id: number) => Promise<void>;
  updateMemberBalance: (memberId: number, amount: number) => Promise<void>;

  // 订单
  orders: Order[];
  ordersLoading: boolean;
  fetchOrders: (params?: { page?: number; pageSize?: number; status?: string; keyword?: string }) => Promise<void>;
  createOrder: (memberId: number, items: { ticketId: number; quantity: number }[]) => Promise<Order | null>;

  // 资产
  assets: Asset[];
  assetsLoading: boolean;
  fetchAssets: (params?: { page?: number; pageSize?: number; status?: string; keyword?: string }) => Promise<void>;

  // 合同
  contracts: Contract[];
  fetchContracts: (params?: { page?: number; pageSize?: number; status?: string }) => Promise<void>;

  // 账单
  bills: Bill[];
  fetchBills: (params?: { page?: number; pageSize?: number; status?: string; contractId?: number }) => Promise<void>;

  // 手环
  bracelets: Bracelet[];
  fetchBracelets: (params?: { page?: number; pageSize?: number; status?: string }) => Promise<void>;

  // Dashboard
  dashboardStats: DashboardStats | null,
  announcements: Announcement[];
  investments: Investment[];
  devices: Device[];
  fetchDashboard: () => Promise<void>;

  // 初始化
  initialize: () => Promise<void>;
}

export const useStore = create<AppState>((set, get) => ({
  // 票种
  tickets: [],
  ticketsLoading: false,
  fetchTickets: async () => {
    set({ ticketsLoading: true });
    const res = await ticketApi.getList();
    if (res.success && res.data) {
      set({ tickets: res.data, ticketsLoading: false });
    } else {
      set({ ticketsLoading: false });
    }
  },

  // 会员
  currentMember: null,
  members: [],
  membersLoading: false,
  fetchMembers: async (params) => {
    set({ membersLoading: true });
    const res = await memberApi.getList(params);
    if (res.success && res.data) {
      set({ members: res.data.list, membersLoading: false });
    } else {
      set({ membersLoading: false });
    }
  },
  fetchMemberById: async (id) => {
    const res = await memberApi.getById(id);
    if (res.success && res.data) {
      set({ currentMember: res.data });
    }
  },
  updateMemberBalance: async (memberId, amount) => {
    const res = await memberApi.updateBalance(memberId, amount);
    if (res.success) {
      set((state) => ({
        members: state.members.map((m) =>
          m.id === memberId ? { ...m, balance: m.balance + amount } : m
        ),
        currentMember: state.currentMember?.id === memberId
          ? { ...state.currentMember, balance: state.currentMember.balance + amount }
          : state.currentMember,
      }));
    }
  },

  // 订单
  orders: [],
  ordersLoading: false,
  fetchOrders: async (params) => {
    set({ ordersLoading: true });
    const res = await orderApi.getList(params);
    if (res.success && res.data) {
      set({ orders: res.data.list, ordersLoading: false });
    } else {
      set({ ordersLoading: false });
    }
  },
  createOrder: async (memberId, items) => {
    const res = await orderApi.create({ memberId, items });
    if (res.success && res.data) {
      const orders = get().orders;
      set({ orders: [res.data, ...orders] });
      return res.data;
    }
    return null;
  },

  // 资产
  assets: [],
  assetsLoading: false,
  fetchAssets: async (params) => {
    set({ assetsLoading: true });
    const res = await assetApi.getList(params);
    if (res.success && res.data) {
      set({ assets: res.data.list, assetsLoading: false });
    } else {
      set({ assetsLoading: false });
    }
  },

  // 合同
  contracts: [],
  fetchContracts: async (params) => {
    const res = await assetApi.getContractsList(params);
    if (res.success && res.data) {
      set({ contracts: res.data.list });
    }
  },

  // 账单
  bills: [],
  fetchBills: async (params) => {
    const res = await assetApi.getBills(params);
    if (res.success && res.data) {
      set({ bills: res.data.list });
    }
  },

  // 手环
  bracelets: [],
  fetchBracelets: async (params) => {
    const res = await braceletApi.getList(params);
    if (res.success && res.data) {
      set({ bracelets: res.data.list });
    }
  },

  // Dashboard
  dashboardStats: null,
  announcements: [],
  investments: [],
  devices: [],
  fetchDashboard: async () => {
    const [statsRes, announcementsRes, investmentsRes, devicesRes] = await Promise.all([
      dashboardApi.getStats(),
      dashboardApi.getAnnouncements(),
      dashboardApi.getInvestments(),
      dashboardApi.getDevices(),
    ]);

    set({
      dashboardStats: statsRes.success ? statsRes.data! : null,
      announcements: announcementsRes.success ? announcementsRes.data! : [],
      investments: investmentsRes.success ? investmentsRes.data! : [],
      devices: devicesRes.success ? devicesRes.data! : [],
    });
  },

  // 初始化
  initialize: async () => {
    await Promise.all([
      get().fetchTickets(),
      get().fetchMembers(),
      get().fetchDashboard(),
      get().fetchAssets(),
      get().fetchContracts(),
      get().fetchBills(),
      get().fetchBracelets(),
    ]);
  },
}));
