import type {
  ApiResponse,
  Ticket,
  Member,
  Order,
  Asset,
  Contract,
  Bill,
  Device,
  Announcement,
  Investment,
  DashboardStats,
  PaginatedResponse,
  Bracelet,
} from '../types';

const API_BASE = '/api';

async function request<T>(url: string, options?: RequestInit): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE}${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });
    return await response.json();
  } catch (error) {
    return { success: false, error: '网络请求失败' };
  }
}

// 票务API
export const ticketApi = {
  getList: () => request<Ticket[]>('/tickets'),
  getById: (id: number) => request<Ticket>(`/tickets/${id}`),
  create: (data: Partial<Ticket>) => request<Ticket>('/tickets', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: number, data: Partial<Ticket>) => request<Ticket>(`/tickets/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: number) => request<void>(`/tickets/${id}`, { method: 'DELETE' }),
};

// 会员API
export const memberApi = {
  getList: (params?: { page?: number; pageSize?: number; keyword?: string }) => {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set('page', String(params.page));
    if (params?.pageSize) searchParams.set('pageSize', String(params.pageSize));
    if (params?.keyword) searchParams.set('keyword', params.keyword);
    const query = searchParams.toString();
    return request<PaginatedResponse<Member>>(`/members${query ? `?${query}` : ''}`);
  },
  getById: (id: number) => request<Member>(`/members/${id}`),
  getOrders: (id: number) => request<Order[]>(`/members/${id}/orders`),
  create: (data: Partial<Member>) => request<Member>('/members', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: number, data: Partial<Member>) => request<Member>(`/members/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  recharge: (id: number, amount: number) => request<Member>(`/members/${id}/recharge`, { method: 'POST', body: JSON.stringify({ amount }) }),
  updateBalance: (id: number, amount: number) => request<Member>(`/members/${id}/recharge`, { method: 'POST', body: JSON.stringify({ amount }) }),
};

// 订单API
export const orderApi = {
  getList: (params?: { page?: number; pageSize?: number; status?: string; keyword?: string }) => {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set('page', String(params.page));
    if (params?.pageSize) searchParams.set('pageSize', String(params.pageSize));
    if (params?.status) searchParams.set('status', params.status);
    if (params?.keyword) searchParams.set('keyword', params.keyword);
    const query = searchParams.toString();
    return request<PaginatedResponse<Order>>(`/orders${query ? `?${query}` : ''}`);
  },
  getById: (id: number) => request<Order>(`/orders/${id}`),
  create: (data: { memberId: number; items: { ticketId: number; quantity: number }[] }) =>
    request<Order>('/orders', { method: 'POST', body: JSON.stringify(data) }),
  pay: (id: number, payMethod: string) =>
    request<Order>(`/orders/${id}/pay`, { method: 'POST', body: JSON.stringify({ payMethod }) }),
  verify: (id: number) => request<Order>(`/orders/${id}/verify`, { method: 'POST' }),
  refund: (id: number) => request<Order>(`/orders/${id}/refund`, { method: 'POST' }),
};

// 资产API
export const assetApi = {
  getList: (params?: { page?: number; pageSize?: number; status?: string; keyword?: string }) => {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set('page', String(params.page));
    if (params?.pageSize) searchParams.set('pageSize', String(params.pageSize));
    if (params?.status) searchParams.set('status', params.status);
    if (params?.keyword) searchParams.set('keyword', params.keyword);
    const query = searchParams.toString();
    return request<PaginatedResponse<Asset>>(`/assets${query ? `?${query}` : ''}`);
  },
  getById: (id: number) => request<Asset>(`/assets/${id}`),
  create: (data: Partial<Asset>) => request<Asset>('/assets', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: number, data: Partial<Asset>) => request<Asset>(`/assets/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  getContracts: (assetId: number) => request<Contract[]>(`/assets/${assetId}/contracts`),
  getContractsList: (params?: { page?: number; pageSize?: number; status?: string }) => {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set('page', String(params.page));
    if (params?.pageSize) searchParams.set('pageSize', String(params.pageSize));
    if (params?.status) searchParams.set('status', params.status);
    const query = searchParams.toString();
    return request<PaginatedResponse<Contract>>(`/assets/contracts/list${query ? `?${query}` : ''}`);
  },
  createContract: (data: Partial<Contract>) => request<Contract>('/assets/contracts', { method: 'POST', body: JSON.stringify(data) }),
  getBills: (params?: { page?: number; pageSize?: number; status?: string; contractId?: number }) => {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set('page', String(params.page));
    if (params?.pageSize) searchParams.set('pageSize', String(params.pageSize));
    if (params?.status) searchParams.set('status', params.status);
    if (params?.contractId) searchParams.set('contractId', String(params.contractId));
    const query = searchParams.toString();
    return request<PaginatedResponse<Bill>>(`/assets/bills/list${query ? `?${query}` : ''}`);
  },
  generateBill: (data: { contractId: number; type: string; amount: number; dueDate: string }) =>
    request<Bill>('/assets/bills', { method: 'POST', body: JSON.stringify(data) }),
  payBill: (id: number) => request<Bill>(`/assets/bills/${id}/pay`, { method: 'POST' }),
};

// Dashboard API
export const dashboardApi = {
  getStats: () => request<DashboardStats>('/dashboard/stats'),
  getDeviceStats: () => request<{ online: number; offline: number; error: number; total: number }>('/dashboard/devices/stats'),
  getDevices: () => request<Device[]>('/dashboard/devices'),
  getAlerts: () => request<{ deviceId: number; deviceName: string; message: string; time: string }[]>('/dashboard/alerts'),
  getAnnouncements: () => request<Announcement[]>('/dashboard/announcements'),
  getInvestments: () => request<Investment[]>('/dashboard/investments'),
};

// 手环API
export const braceletApi = {
  getList: (params?: { page?: number; pageSize?: number; status?: string }) => {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set('page', String(params.page));
    if (params?.pageSize) searchParams.set('pageSize', String(params.pageSize));
    if (params?.status) searchParams.set('status', params.status);
    const query = searchParams.toString();
    return request<PaginatedResponse<Bracelet>>(`/bracelets${query ? `?${query}` : ''}`);
  },
  getById: (id: number) => request<Bracelet>(`/bracelets/${id}`),
  issue: (memberId: number, deposit: number) =>
    request<Bracelet>('/bracelets/issue', { method: 'POST', body: JSON.stringify({ memberId, deposit }) }),
  return: (id: number) => request<Bracelet>(`/bracelets/${id}/return`, { method: 'POST' }),
  recharge: (id: number, amount: number) =>
    request<Bracelet>(`/bracelets/${id}/recharge`, { method: 'POST', body: JSON.stringify({ amount }) }),
  consume: (id: number, amount: number) =>
    request<Bracelet>(`/bracelets/${id}/consume`, { method: 'POST', body: JSON.stringify({ amount }) }),
  reportLost: (id: number) => request<Bracelet>(`/bracelets/${id}/lost`, { method: 'POST' }),
  getDepositStats: () => request<{ totalDeposit: number; inUseDeposit: number; availableCount: number }>('/bracelets/stats/deposit'),
};
