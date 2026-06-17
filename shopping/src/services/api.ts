import type {
  ApiResponse,
  TicketType,
  User,
  TicketOrder,
  Asset,
  LeaseContract,
  Device,
  Announcement,
  InvestmentInfo,
  DailyReport,
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
  getList: () => request<TicketType[]>('/tickets/types'),
  getById: (id: string) => request<TicketType>(`/tickets/types/${id}`),
  create: (data: Partial<TicketType>) => request<TicketType>('/tickets/types', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: Partial<TicketType>) => request<TicketType>(`/tickets/types/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: string) => request<void>(`/tickets/types/${id}`, { method: 'DELETE' }),
};

// 会员API
export const memberApi = {
  getList: (params?: { page?: number; pageSize?: number; keyword?: string }) => {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set('page', String(params.page));
    if (params?.pageSize) searchParams.set('pageSize', String(params.pageSize));
    if (params?.keyword) searchParams.set('keyword', params.keyword);
    const query = searchParams.toString();
    return request<PaginatedResponse<User>>(`/members${query ? `?${query}` : ''}`);
  },
  getById: (id: string) => request<User>(`/members/${id}`),
  getOrders: (id: string) => request<TicketOrder[]>(`/members/${id}/orders`),
  create: (data: Partial<User>) => request<User>('/members', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: Partial<User>) => request<User>(`/members/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  recharge: (id: string, amount: number) => request<User>(`/members/${id}/recharge`, { method: 'POST', body: JSON.stringify({ amount }) }),
  updateBalance: (id: string, amount: number) => request<User>(`/members/${id}/recharge`, { method: 'POST', body: JSON.stringify({ amount }) }),
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
    return request<PaginatedResponse<TicketOrder>>(`/orders${query ? `?${query}` : ''}`);
  },
  getById: (id: string) => request<TicketOrder>(`/orders/${id}`),
  create: (data: { ticketId: string; quantity: number }) =>
    request<TicketOrder>('/orders', { method: 'POST', body: JSON.stringify(data) }),
  pay: (id: string, paymentMethod: string) =>
    request<TicketOrder>(`/orders/${id}/pay`, { method: 'POST', body: JSON.stringify({ paymentMethod }) }),
  verify: (id: string) => request<TicketOrder>(`/orders/${id}/verify`, { method: 'POST' }),
  refund: (id: string) => request<TicketOrder>(`/orders/${id}/refund`, { method: 'POST' }),
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
  getById: (id: string) => request<Asset>(`/assets/${id}`),
  create: (data: Partial<Asset>) => request<Asset>('/assets', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: Partial<Asset>) => request<Asset>(`/assets/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  getContracts: (assetId: string) => request<LeaseContract[]>(`/assets/${assetId}/contracts`),
  getContractsList: (params?: { page?: number; pageSize?: number; status?: string }) => {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set('page', String(params.page));
    if (params?.pageSize) searchParams.set('pageSize', String(params.pageSize));
    if (params?.status) searchParams.set('status', params.status);
    const query = searchParams.toString();
    return request<PaginatedResponse<LeaseContract>>(`/assets/contracts/list${query ? `?${query}` : ''}`);
  },
  createContract: (data: Partial<LeaseContract>) => request<LeaseContract>('/assets/contracts', { method: 'POST', body: JSON.stringify(data) }),
};

// Dashboard API
export const dashboardApi = {
  getStats: () => request<DailyReport>('/dashboard/stats'),
  getDeviceStats: () => request<{ online: number; offline: number; error: number; total: number }>('/dashboard/devices/stats'),
  getDevices: () => request<Device[]>('/dashboard/devices'),
  getAlerts: () => request<{ deviceId: string; deviceName: string; message: string; time: string }[]>('/dashboard/alerts'),
  getAnnouncements: () => request<Announcement[]>('/announcements'),
  getInvestments: () => request<InvestmentInfo[]>('/investments'),
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
  getById: (id: string) => request<Bracelet>(`/bracelets/${id}`),
  issue: (userId: string, deposit: number) =>
    request<Bracelet>('/bracelets/issue', { method: 'POST', body: JSON.stringify({ userId, deposit }) }),
  return: (id: string) => request<Bracelet>(`/bracelets/${id}/return`, { method: 'POST' }),
  recharge: (id: string, amount: number) =>
    request<Bracelet>(`/bracelets/${id}/recharge`, { method: 'POST', body: JSON.stringify({ amount }) }),
  consume: (id: string, amount: number) =>
    request<Bracelet>(`/bracelets/${id}/consume`, { method: 'POST', body: JSON.stringify({ amount }) }),
  reportLost: (id: string) => request<Bracelet>(`/bracelets/${id}/lost`, { method: 'POST' }),
  getDepositStats: () => request<{ totalDeposit: number; inUseDeposit: number; availableCount: number }>('/bracelets/stats/deposit'),
};
