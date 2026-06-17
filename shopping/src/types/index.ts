// 用户相关类型
export interface User {
  id: string;
  phone: string;
  nickname: string;
  avatar: string;
  openid?: string;
  memberLevel: number;
  memberPoints: number;
  balance: number;
  createdAt: string;
}

// 会员等级
export interface MemberLevel {
  id: number;
  name: string;
  minPoints: number;
  discount: number;
  benefits: string[];
}

// 票种类型
export interface TicketType {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  type: 'single' | 'package' | 'annual';
  category: string;
  stock: number;
  sales: number;
  image: string;
  validityDays: number;
  features: string[];
  status: 'active' | 'inactive';
}

// 门票订单
export interface TicketOrder {
  id: string;
  orderNo: string;
  userId: string;
  ticketId: string;
  ticketName: string;
  quantity: number;
  totalPrice: number;
  discountAmount: number;
  payAmount: number;
  status: 'pending' | 'paid' | 'used' | 'refunded' | 'expired';
  paymentMethod: string;
  createdAt: string;
  usedAt?: string;
}

// 用户门票
export interface UserTicket {
  id: string;
  orderId: string;
  ticketId: string;
  ticketName: string;
  qrCode: string;
  status: 'unused' | 'used' | 'expired';
  validFrom: string;
  validTo: string;
  usedAt?: string;
  usedLocation?: string;
}

// 资产类型
export interface Asset {
  id: string;
  name: string;
  type: 'shop' | 'office' | 'warehouse';
  area: number;
  floor: number;
  location: string;
  status: 'available' | 'rented' | 'maintenance';
  rentPrice: number;
  images: string[];
  description: string;
  facilities: string[];
}

// 租赁合同
export interface LeaseContract {
  id: string;
  assetId: string;
  tenantName: string;
  tenantPhone: string;
  startDate: string;
  endDate: string;
  monthlyRent: number;
  deposit: number;
  status: 'active' | 'expired' | 'terminated';
}

// 设备类型
export interface Device {
  id: string;
  name: string;
  type: 'entrance' | 'bracelet' | 'locker' | 'game' | 'vending';
  location: string;
  status: 'online' | 'offline' | 'maintenance';
  lastMaintenance: string;
  nextMaintenance: string;
}

// 维修工单
export interface MaintenanceOrder {
  id: string;
  deviceId: string;
  deviceName: string;
  type: 'repair' | 'maintenance' | 'inspection';
  description: string;
  images: string[];
  status: 'pending' | 'accepted' | 'processing' | 'completed';
  reporter: string;
  handler?: string;
  createdAt: string;
  completedAt?: string;
}

// 手环
export interface Bracelet {
  id: string;
  code: string;
  status: 'available' | 'in_use' | 'lost' | 'damaged';
  userId?: string;
  deposit: number;
  balance: number;
  issuedAt?: string;
  returnedAt?: string;
}

// 商品
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  cost: number;
  stock: number;
  minStock: number;
  barcode: string;
  image: string;
  status: 'active' | 'inactive';
}

// 商品订单
export interface ProductOrder {
  id: string;
  orderNo: string;
  items: OrderItem[];
  totalPrice: number;
  discountAmount: number;
  payAmount: number;
  paymentMethod: string;
  status: 'pending' | 'paid' | 'refunded';
  createdAt: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  subtotal: number;
}

// 公告
export interface Announcement {
  id: string;
  title: string;
  content: string;
  type: 'notice' | 'activity' | 'promotion';
  image?: string;
  createdAt: string;
}

// 优惠券
export interface Coupon {
  id: string;
  name: string;
  type: 'discount' | 'cash';
  value: number;
  minAmount: number;
  validFrom: string;
  validTo: string;
  status: 'active' | 'inactive';
}

// 用户优惠券
export interface UserCoupon {
  id: string;
  couponId: string;
  couponName: string;
  status: 'unused' | 'used' | 'expired';
  usedAt?: string;
}

// 招商信息
export interface InvestmentInfo {
  id: string;
  title: string;
  area: number;
  floor: number;
  rentPrice: number;
  location: string;
  images: string[];
  description: string;
  facilities: string[];
  contactPhone: string;
  status: 'available' | 'rented';
}

// 合作意向
export interface CooperationIntent {
  id: string;
  investmentId: string;
  name: string;
  phone: string;
  company?: string;
  message: string;
  status: 'pending' | 'contacted' | 'rejected';
  createdAt: string;
}

// 验票记录
export interface VerifyRecord {
  id: string;
  ticketId: string;
  ticketName: string;
  userId: string;
  userName: string;
  verifyTime: string;
  location: string;
  operator: string;
}

// 交接班记录
export interface ShiftRecord {
  id: string;
  operatorId: string;
  operatorName: string;
  startTime: string;
  endTime: string;
  totalSales: number;
  totalOrders: number;
  cashAmount: number;
  cardAmount: number;
  wechatAmount: number;
  alipayAmount: number;
  notes: string;
}

// 日报表
export interface DailyReport {
  date: string;
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  ticketRevenue: number;
  productRevenue: number;
  newMembers: number;
  refundAmount: number;
}

// API响应类型
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// 分页参数
export interface PaginationParams {
  page: number;
  pageSize: number;
}

// 分页响应
export interface PaginatedResponse<T> {
  list: T[];
  total: number;
  page: number;
  pageSize: number;
}
