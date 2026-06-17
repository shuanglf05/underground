// Mock数据存储
import type { 
  User, TicketType, UserTicket, TicketOrder, MemberLevel, 
  Coupon, UserCoupon, Announcement, Asset, Device, 
  MaintenanceOrder, Bracelet, Product, InvestmentInfo,
  VerifyRecord, ShiftRecord, DailyReport 
} from '../../src/types';

// 用户数据
export const mockUsers: User[] = [
  {
    id: '1',
    phone: '13800138000',
    nickname: '张三',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
    memberLevel: 3,
    memberPoints: 2580,
    balance: 500.00,
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    phone: '13900139000',
    nickname: '李四',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2',
    memberLevel: 2,
    memberPoints: 1200,
    balance: 200.00,
    createdAt: '2024-02-20',
  },
];

// 会员等级
export const mockMemberLevels: MemberLevel[] = [
  { id: 1, name: '普通会员', minPoints: 0, discount: 1.0, benefits: ['基础服务'] },
  { id: 2, name: '银卡会员', minPoints: 1000, discount: 0.95, benefits: ['基础服务', '生日礼遇', '优先排队'] },
  { id: 3, name: '金卡会员', minPoints: 2000, discount: 0.9, benefits: ['基础服务', '生日礼遇', '优先排队', '专属客服'] },
  { id: 4, name: '铂金会员', minPoints: 5000, discount: 0.85, benefits: ['基础服务', '生日礼遇', '优先排队', '专属客服', '免费停车'] },
  { id: 5, name: '钻石会员', minPoints: 10000, discount: 0.8, benefits: ['基础服务', '生日礼遇', '优先排队', '专属客服', '免费停车', 'VIP休息室'] },
];

// 票种数据
export const mockTicketTypes: TicketType[] = [
  {
    id: '1',
    name: '单人日场票',
    description: '适用于身高1.2米以上游客，日场使用',
    price: 128,
    originalPrice: 158,
    type: 'single',
    category: '日场票',
    stock: 500,
    sales: 320,
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
    validityDays: 30,
    features: ['不限次数', '含储物柜', '含洗浴'],
    status: 'active',
  },
  {
    id: '2',
    name: '双人情侣票',
    description: '情侣专享套票，浪漫之旅',
    price: 218,
    originalPrice: 316,
    type: 'package',
    category: '套票',
    stock: 100,
    sales: 85,
    image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=400',
    validityDays: 30,
    features: ['双人入场', '情侣礼包', '专属拍照'],
    status: 'active',
  },
  {
    id: '3',
    name: '家庭套票(2大1小)',
    description: '家庭欢乐时光，2位成人+1位儿童',
    price: 298,
    originalPrice: 394,
    type: 'package',
    category: '套票',
    stock: 80,
    sales: 65,
    image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400',
    validityDays: 30,
    features: ['家庭套餐', '儿童乐园', '家庭休息区'],
    status: 'active',
  },
  {
    id: '4',
    name: '年卡会员',
    description: '全年无限次畅玩',
    price: 998,
    originalPrice: 1288,
    type: 'annual',
    category: '年卡',
    stock: 200,
    sales: 150,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
    validityDays: 365,
    features: ['全年无限', '优先入场', '专属活动', '会员折扣'],
    status: 'active',
  },
  {
    id: '5',
    name: '夜场票',
    description: '晚间畅玩，18:00-22:00',
    price: 88,
    originalPrice: 108,
    type: 'single',
    category: '夜场票',
    stock: 300,
    sales: 280,
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400',
    validityDays: 30,
    features: ['夜场专享', '灯光秀', 'DJ表演'],
    status: 'active',
  },
];

// 用户门票
export const mockUserTickets: UserTicket[] = [
  {
    id: '1',
    orderId: '1',
    ticketId: '1',
    ticketName: '单人日场票',
    qrCode: 'QR202401010001',
    status: 'unused',
    validFrom: '2024-01-01',
    validTo: '2024-12-31',
  },
  {
    id: '2',
    orderId: '2',
    ticketId: '3',
    ticketName: '家庭套票(2大1小)',
    qrCode: 'QR202401010002',
    status: 'used',
    validFrom: '2024-01-01',
    validTo: '2024-12-31',
    usedAt: '2024-03-15 14:30:00',
    usedLocation: '揽月城广场入口',
  },
];

// 订单数据
export const mockOrders: TicketOrder[] = [
  {
    id: '1',
    orderNo: 'ORD202401010001',
    userId: '1',
    ticketId: '1',
    ticketName: '单人日场票',
    quantity: 2,
    totalPrice: 256,
    discountAmount: 25.6,
    payAmount: 230.4,
    status: 'paid',
    paymentMethod: 'wechat',
    createdAt: '2024-01-01 10:30:00',
  },
  {
    id: '2',
    orderNo: 'ORD202401020001',
    userId: '1',
    ticketId: '3',
    ticketName: '家庭套票(2大1小)',
    quantity: 1,
    totalPrice: 298,
    discountAmount: 29.8,
    payAmount: 268.2,
    status: 'used',
    paymentMethod: 'alipay',
    createdAt: '2024-01-02 14:20:00',
    usedAt: '2024-03-15 14:30:00',
  },
];

// 优惠券
export const mockCoupons: Coupon[] = [
  {
    id: '1',
    name: '新人专享券',
    type: 'cash',
    value: 20,
    minAmount: 100,
    validFrom: '2024-01-01',
    validTo: '2024-12-31',
    status: 'active',
  },
  {
    id: '2',
    name: '满200减30',
    type: 'cash',
    value: 30,
    minAmount: 200,
    validFrom: '2024-01-01',
    validTo: '2024-12-31',
    status: 'active',
  },
  {
    id: '3',
    name: '会员9折券',
    type: 'discount',
    value: 0.9,
    minAmount: 0,
    validFrom: '2024-01-01',
    validTo: '2024-12-31',
    status: 'active',
  },
];

// 公告
export const mockAnnouncements: Announcement[] = [
  {
    id: '1',
    title: '揽月城广场夏季狂欢节',
    content: '7月1日至8月31日，每周六晚8点，精彩演出等你来！',
    type: 'activity',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400',
    createdAt: '2024-06-15',
  },
  {
    id: '2',
    title: '系统升级通知',
    content: '系统将于6月20日凌晨2:00-4:00进行升级维护，届时部分功能暂停使用。',
    type: 'notice',
    createdAt: '2024-06-18',
  },
  {
    id: '3',
    title: '会员充值优惠',
    content: '充值满500送50，满1000送150，活动时间：6月1日-6月30日',
    type: 'promotion',
    createdAt: '2024-06-01',
  },
];

// 资产数据
export const mockAssets: Asset[] = [
  {
    id: '1',
    name: 'A区101商铺',
    type: 'shop',
    area: 120,
    floor: 1,
    location: 'A区东侧',
    status: 'rented',
    rentPrice: 15000,
    images: ['https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400'],
    description: '位于商场主入口，人流量大',
    facilities: ['空调', '消防', '网络'],
  },
  {
    id: '2',
    name: 'B区201办公室',
    type: 'office',
    area: 80,
    floor: 2,
    location: 'B区西侧',
    status: 'available',
    rentPrice: 8000,
    images: ['https://images.unsplash.com/photo-1497366216548-37526070297c?w=400'],
    description: '精装修办公室，采光好',
    facilities: ['空调', '电梯', '网络', '会议室'],
  },
];

// 设备数据
export const mockDevices: Device[] = [
  {
    id: '1',
    name: '入口闸机1号',
    type: 'entrance',
    location: '主入口',
    status: 'online',
    lastMaintenance: '2024-06-01',
    nextMaintenance: '2024-07-01',
  },
  {
    id: '2',
    name: '智能手环发放机',
    type: 'bracelet',
    location: '服务中心',
    status: 'online',
    lastMaintenance: '2024-06-05',
    nextMaintenance: '2024-07-05',
  },
  {
    id: '3',
    name: '储物柜A区',
    type: 'locker',
    location: 'A区更衣室',
    status: 'maintenance',
    lastMaintenance: '2024-06-10',
    nextMaintenance: '2024-07-10',
  },
];

// 维修工单
export const mockMaintenanceOrders: MaintenanceOrder[] = [
  {
    id: '1',
    deviceId: '3',
    deviceName: '储物柜A区',
    type: 'repair',
    description: '部分柜门无法正常开启',
    images: [],
    status: 'processing',
    reporter: '张三',
    handler: '李师傅',
    createdAt: '2024-06-15 09:30:00',
  },
];

// 手环数据
export const mockBracelets: Bracelet[] = [
  {
    id: '1',
    code: 'BR001',
    status: 'available',
    deposit: 50,
    balance: 0,
  },
  {
    id: '2',
    code: 'BR002',
    status: 'in_use',
    userId: '1',
    deposit: 50,
    balance: 120.5,
    issuedAt: '2024-06-15 10:00:00',
  },
];

// 商品数据
export const mockProducts: Product[] = [
  {
    id: '1',
    name: '矿泉水',
    category: '饮品',
    price: 3,
    cost: 1.5,
    stock: 200,
    minStock: 50,
    barcode: '6901234567890',
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400',
    status: 'active',
  },
  {
    id: '2',
    name: '泳衣',
    category: '服装',
    price: 88,
    cost: 45,
    stock: 50,
    minStock: 10,
    barcode: '6901234567891',
    image: 'https://images.unsplash.com/photo-1509749837427-ac94a2553d0e?w=400',
    status: 'active',
  },
];

// 招商信息
export const mockInvestments: InvestmentInfo[] = [
  {
    id: '1',
    title: '黄金地段商铺招租',
    area: 150,
    floor: 1,
    rentPrice: 20000,
    location: '揽月城广场主入口',
    images: ['https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400'],
    description: '位于商场主入口，人流量大，适合餐饮、零售',
    facilities: ['空调', '消防', '网络', '停车位'],
    contactPhone: '400-888-8888',
    status: 'available',
  },
];

// 验票记录
export const mockVerifyRecords: VerifyRecord[] = [
  {
    id: '1',
    ticketId: '1',
    ticketName: '单人日场票',
    userId: '1',
    userName: '张三',
    verifyTime: '2024-06-15 14:30:00',
    location: '主入口',
    operator: '王服务',
  },
];

// 交接班记录
export const mockShiftRecords: ShiftRecord[] = [
  {
    id: '1',
    operatorId: '1',
    operatorName: '张收银',
    startTime: '2024-06-15 08:00:00',
    endTime: '2024-06-15 16:00:00',
    totalSales: 15680.5,
    totalOrders: 45,
    cashAmount: 3200,
    cardAmount: 4500,
    wechatAmount: 5280.5,
    alipayAmount: 2700,
    notes: '正常交接',
  },
];

// 日报表
export const mockDailyReports: DailyReport[] = [
  {
    date: '2024-06-15',
    totalRevenue: 52800,
    totalOrders: 156,
    totalCustomers: 320,
    ticketRevenue: 38500,
    productRevenue: 14300,
    newMembers: 12,
    refundAmount: 1200,
  },
];
