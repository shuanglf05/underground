// 会员等级枚举
export enum MemberLevel {
  NORMAL = 1,
  SILVER = 2,
  GOLD = 3,
  PLATINUM = 4,
}

// 票种类型枚举
export enum TicketType {
  UNIFIED = 'unified',    // 通票
  SINGLE = 'single',      // 单票
  PACKAGE = 'package',    // 套餐
}

// 支付状态枚举
export enum PayStatus {
  PENDING = 'pending',
  PAID = 'paid',
  REFUNDED = 'refunded',
}

// 订单状态枚举
export enum OrderStatus {
  PENDING = 'pending',
  USED = 'used',
  CANCELLED = 'cancelled',
  EXPIRED = 'expired',
}

// 手环状态枚举
export enum BraceletStatus {
  AVAILABLE = 'available',
  IN_USE = 'in_use',
  LOST = 'lost',
  DAMAGED = 'damaged',
}

// 资产状态枚举
export enum AssetStatus {
  AVAILABLE = 'available',
  RENTED = 'rented',
  MAINTENANCE = 'maintenance',
}

// 合同状态枚举
export enum ContractStatus {
  ACTIVE = 'active',
  EXPIRED = 'expired',
  TERMINATED = 'terminated',
}

// 账单类型枚举
export enum BillType {
  RENT = 'rent',
  PROPERTY = 'property',
  UTILITY = 'utility',
}

// 账单状态枚举
export enum BillStatus {
  PENDING = 'pending',
  PAID = 'paid',
  OVERDUE = 'overdue',
}

// 会员接口
export interface Member {
  id: number;
  openid: string;
  name: string;
  phone: string;
  level: MemberLevel;
  balance: number;
  points: number;
  createdAt: string;
  updatedAt: string;
}

// 票种接口
export interface Ticket {
  id: number;
  name: string;
  type: TicketType;
  price: number;
  rights: TicketRights;
  validDays: number;
  status: number;
  createdAt: string;
}

export interface TicketRights {
  billiards?: number;       // 台球次数
  vr?: number;              // VR体验次数
  trampoline?: number;       // 蹦床次数
  swimming?: boolean;        // 游泳
  footBath?: boolean;        // 足浴
  restaurant?: boolean;      // 餐饮
  movie?: boolean;           // 电影
}

// 订单接口
export interface Order {
  id: number;
  orderNo: string;
  memberId: number;
  memberName?: string;
  items: OrderItem[];
  totalAmount: number;
  payStatus: PayStatus;
  payMethod?: string;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
}

// 订单明细接口
export interface OrderItem {
  id: number;
  orderId: number;
  ticketId: number;
  ticketName?: string;
  quantity: number;
  price: number;
}

// 智能手环接口
export interface Bracelet {
  id: number;
  serialNo: string;
  status: BraceletStatus;
  memberId?: number;
  memberName?: string;
  balance: number;
  deposit: number;
  createdAt: string;
}

// 资产接口
export interface Asset {
  id: number;
  code: string;
  name: string;
  type: string;
  area: number;
  floor: string;
  status: AssetStatus;
  imageUrl?: string;
  createdAt: string;
}

// 租赁合同接口
export interface Contract {
  id: number;
  assetId: number;
  assetName?: string;
  tenantName: string;
  tenantPhone?: string;
  rent: number;
  propertyFee?: number;
  startDate: string;
  endDate: string;
  status: ContractStatus;
  createdAt: string;
}

// 账单接口
export interface Bill {
  id: number;
  contractId: number;
  type: BillType;
  amount: number;
  dueDate: string;
  status: BillStatus;
  paidAt?: string;
  createdAt: string;
}

// 系统用户接口
export interface SystemUser {
  id: number;
  username: string;
  name: string;
  role: string;
  phone?: string;
  email?: string;
  status: number;
  createdAt: string;
}

// 设备接口
export interface Device {
  id: number;
  code: string;
  name: string;
  type: string;
  status: 'online' | 'offline' | 'error';
  location: string;
  lastHeartbeat?: string;
}

// 公告接口
export interface Announcement {
  id: number;
  title: string;
  content: string;
  type: 'info' | 'warning' | 'activity';
  publishedAt: string;
  createdAt: string;
}

// 招租信息接口
export interface Investment {
  id: number;
  assetId: number;
  assetName?: string;
  title: string;
  description: string;
  area: number;
  expectedRent?: number;
  status: 'available' | 'reserved' | 'rented';
  createdAt: string;
}

// 登录请求接口
export interface LoginRequest {
  username: string;
  password: string;
}

// 登录响应接口
export interface LoginResponse {
  success: boolean;
  token?: string;
  user?: SystemUser;
  message?: string;
}

// API响应接口
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// 分页参数接口
export interface PaginationParams {
  page: number;
  pageSize: number;
  total?: number;
}

// 分页响应接口
export interface PaginatedResponse<T> {
  list: T[];
  pagination: PaginationParams;
}

// 统计数据接口
export interface DashboardStats {
  todayRevenue: number;
  todayOrders: number;
  todayMembers: number;
  todayVisitors: number;
  ticketSales: { name: string; value: number }[];
  revenueByChannel: { name: string; value: number }[];
  recentOrders: Order[];
}
