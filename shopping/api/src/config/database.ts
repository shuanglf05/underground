import {
  Member,
  Ticket,
  Order,
  Bracelet,
  Asset,
  Contract,
  Bill,
  SystemUser,
  Device,
  Announcement,
  Investment,
  MemberLevel,
  TicketType,
  PayStatus,
  OrderStatus,
  BraceletStatus,
  AssetStatus,
  ContractStatus,
  BillType,
  BillStatus,
} from '../../../shared/types/index.js';

// 模拟数据库
class MockDatabase {
  members: Member[] = [];
  tickets: Ticket[] = [];
  orders: Order[] = [];
  bracelets: Bracelet[] = [];
  assets: Asset[] = [];
  contracts: Contract[] = [];
  bills: Bill[] = [];
  users: SystemUser[] = [];
  roles: any[] = [];
  logs: any[] = [];
  devices: Device[] = [];
  announcements: Announcement[] = [];
  investments: Investment[] = [];

  constructor() {
    this.initData();
  }

  private initData() {
    // 初始化会员
    this.members = [
      { id: 1, openid: 'wx_001', name: '张三', phone: '13800138001', level: MemberLevel.GOLD, balance: 500, points: 1200, createdAt: '2024-01-15 10:00:00', updatedAt: '2024-06-10 15:30:00' },
      { id: 2, openid: 'wx_002', name: '李四', phone: '13800138002', level: MemberLevel.SILVER, balance: 200, points: 500, createdAt: '2024-02-20 11:00:00', updatedAt: '2024-06-01 09:00:00' },
      { id: 3, openid: 'wx_003', name: '王五', phone: '13800138003', level: MemberLevel.PLATINUM, balance: 2000, points: 5000, createdAt: '2023-12-01 08:00:00', updatedAt: '2024-06-12 18:00:00' },
      { id: 4, openid: 'wx_004', name: '赵六', phone: '13800138004', level: MemberLevel.NORMAL, balance: 50, points: 100, createdAt: '2024-06-05 14:00:00', updatedAt: '2024-06-05 14:00:00' },
    ];

    // 初始化票种
    this.tickets = [
      {
        id: 1,
        name: '全馆通票',
        type: TicketType.UNIFIED,
        price: 299,
        rights: { billiards: 2, vr: 1, trampoline: 1, swimming: true, footBath: true, restaurant: true, movie: true },
        validDays: 1,
        status: 1,
        createdAt: '2024-01-01 00:00:00',
      },
      {
        id: 2,
        name: '休闲单人票',
        type: TicketType.SINGLE,
        price: 99,
        rights: { billiards: 1, vr: 0, trampoline: 0, swimming: false, footBath: false, restaurant: false, movie: false },
        validDays: 1,
        status: 1,
        createdAt: '2024-01-01 00:00:00',
      },
      {
        id: 3,
        name: 'VR体验票',
        type: TicketType.SINGLE,
        price: 79,
        rights: { billiards: 0, vr: 1, trampoline: 0, swimming: false, footBath: false, restaurant: false, movie: false },
        validDays: 1,
        status: 1,
        createdAt: '2024-01-01 00:00:00',
      },
      {
        id: 4,
        name: '游泳健身套餐',
        type: TicketType.PACKAGE,
        price: 199,
        rights: { billiards: 0, vr: 0, trampoline: 0, swimming: true, footBath: true, restaurant: false, movie: false },
        validDays: 7,
        status: 1,
        createdAt: '2024-01-01 00:00:00',
      },
      {
        id: 5,
        name: '亲子畅玩票',
        type: TicketType.PACKAGE,
        price: 399,
        rights: { billiards: 2, vr: 2, trampoline: 2, swimming: true, footBath: false, restaurant: true, movie: true },
        validDays: 1,
        status: 1,
        createdAt: '2024-01-01 00:00:00',
      },
    ];

    // 初始化订单
    this.orders = [
      {
        id: 1,
        orderNo: 'ORD202406150001',
        memberId: 1,
        memberName: '张三',
        items: [{ id: 1, orderId: 1, ticketId: 1, ticketName: '全馆通票', quantity: 1, price: 299 }],
        totalAmount: 299,
        payStatus: PayStatus.PAID,
        payMethod: 'wechat',
        status: OrderStatus.USED,
        createdAt: '2024-06-15 10:30:00',
        updatedAt: '2024-06-15 10:30:00',
      },
      {
        id: 2,
        orderNo: 'ORD202406150002',
        memberId: 2,
        memberName: '李四',
        items: [{ id: 2, orderId: 2, ticketId: 3, ticketName: 'VR体验票', quantity: 2, price: 158 }],
        totalAmount: 158,
        payStatus: PayStatus.PAID,
        payMethod: 'wechat',
        status: OrderStatus.PENDING,
        createdAt: '2024-06-15 11:00:00',
        updatedAt: '2024-06-15 11:00:00',
      },
      {
        id: 3,
        orderNo: 'ORD202406140001',
        memberId: 3,
        memberName: '王五',
        items: [{ id: 3, orderId: 3, ticketId: 4, ticketName: '游泳健身套餐', quantity: 1, price: 199 }],
        totalAmount: 199,
        payStatus: PayStatus.PAID,
        payMethod: 'balance',
        status: OrderStatus.USED,
        createdAt: '2024-06-14 09:00:00',
        updatedAt: '2024-06-14 15:00:00',
      },
    ];

    // 初始化手环
    this.bracelets = [
      { id: 1, serialNo: 'BR20240001', status: BraceletStatus.AVAILABLE, balance: 0, deposit: 50, createdAt: '2024-01-01 00:00:00' },
      { id: 2, serialNo: 'BR20240002', status: BraceletStatus.IN_USE, memberId: 1, memberName: '张三', balance: 100, deposit: 50, createdAt: '2024-01-01 00:00:00' },
      { id: 3, serialNo: 'BR20240003', status: BraceletStatus.AVAILABLE, balance: 0, deposit: 50, createdAt: '2024-01-01 00:00:00' },
      { id: 4, serialNo: 'BR20240004', status: BraceletStatus.LOST, balance: 0, deposit: 50, createdAt: '2024-01-01 00:00:00' },
    ];

    // 初始化资产
    this.assets = [
      { id: 1, code: 'A101', name: 'A栋101店铺', type: 'retail', area: 120, floor: '1F', status: AssetStatus.RENTED, createdAt: '2023-06-01 00:00:00' },
      { id: 2, code: 'A102', name: 'A栋102店铺', type: 'restaurant', area: 200, floor: '1F', status: AssetStatus.RENTED, createdAt: '2023-06-01 00:00:00' },
      { id: 3, code: 'B201', name: 'B栋201商铺', type: 'entertainment', area: 350, floor: '2F', status: AssetStatus.AVAILABLE, createdAt: '2023-06-01 00:00:00' },
      { id: 4, code: 'B202', name: 'B栋202商铺', type: 'service', area: 80, floor: '2F', status: AssetStatus.MAINTENANCE, createdAt: '2023-06-01 00:00:00' },
      { id: 5, code: 'C301', name: 'C栋301办公室', type: 'office', area: 150, floor: '3F', status: AssetStatus.AVAILABLE, createdAt: '2023-06-01 00:00:00' },
    ];

    // 初始化合同
    this.contracts = [
      { id: 1, assetId: 1, assetName: 'A栋101店铺', tenantName: '潮流服饰', rent: 15000, propertyFee: 2000, startDate: '2024-01-01', endDate: '2025-12-31', status: ContractStatus.ACTIVE, createdAt: '2023-12-15 00:00:00' },
      { id: 2, assetId: 2, assetName: 'A栋102店铺', tenantName: '美食广场', rent: 25000, propertyFee: 3000, startDate: '2024-03-01', endDate: '2026-02-28', status: ContractStatus.ACTIVE, createdAt: '2024-02-20 00:00:00' },
    ];

    // 初始化账单
    this.bills = [
      { id: 1, contractId: 1, type: BillType.RENT, amount: 15000, dueDate: '2024-06-30', status: BillStatus.PAID, paidAt: '2024-06-25 10:00:00', createdAt: '2024-06-01 00:00:00' },
      { id: 2, contractId: 1, type: BillType.PROPERTY, amount: 2000, dueDate: '2024-06-30', status: BillStatus.PENDING, createdAt: '2024-06-01 00:00:00' },
      { id: 3, contractId: 2, type: BillType.RENT, amount: 25000, dueDate: '2024-07-31', status: BillStatus.PENDING, createdAt: '2024-06-01 00:00:00' },
    ];

    // 初始化系统用户
    this.users = [
      { id: 1, username: 'admin', name: '系统管理员', role: 'admin', phone: '13900000001', email: 'admin@lanyuecheng.com', status: 1, createdAt: '2023-01-01 00:00:00' },
      { id: 2, username: 'operator', name: '运营小王', role: 'operator', phone: '13900000002', email: 'operator@lanyuecheng.com', status: 1, createdAt: '2023-06-01 00:00:00' },
      { id: 3, username: 'finance', name: '财务小李', role: 'finance', phone: '13900000003', email: 'finance@lanyuecheng.com', status: 1, createdAt: '2023-06-01 00:00:00' },
    ];

    // 初始化角色
    this.roles = [
      { id: 1, name: '超级管理员', description: '拥有系统全部权限', permissions: ['dashboard', 'tickets', 'members', 'orders', 'assets', 'cashier', 'reports', 'system'], createdAt: '2023-01-01 00:00:00' },
      { id: 2, name: '运营管理员', description: '负责日常运营管理', permissions: ['dashboard', 'tickets', 'members', 'orders', 'cashier'], createdAt: '2023-01-01 00:00:00' },
      { id: 3, name: '财务管理员', description: '负责财务管理', permissions: ['dashboard', 'orders', 'assets', 'reports'], createdAt: '2023-01-01 00:00:00' },
      { id: 4, name: '设备管理员', description: '负责设备管理', permissions: ['dashboard', 'devices'], createdAt: '2023-01-01 00:00:00' },
    ];

    // 初始化操作日志
    this.logs = [
      { id: 1, userId: 1, username: 'admin', action: 'login', time: '2024-06-15 09:00:00', description: '用户登录系统' },
      { id: 2, userId: 1, username: 'admin', action: 'create', time: '2024-06-15 09:30:00', description: '创建票种：亲子畅玩票' },
      { id: 3, userId: 2, username: 'operator', action: 'update', time: '2024-06-15 10:00:00', description: '更新会员信息：张三' },
      { id: 4, userId: 3, username: 'finance', action: 'view', time: '2024-06-15 10:30:00', description: '查看财务报表' },
      { id: 5, userId: 1, username: 'admin', action: 'delete', time: '2024-06-15 11:00:00', description: '删除过期订单' },
    ];

    // 初始化设备
    this.devices = [
      { id: 1, code: 'GATE-01', name: '主入口闸机1', type: 'gate', status: 'online', location: '主入口', lastHeartbeat: '2024-06-15 12:00:00' },
      { id: 2, code: 'GATE-02', name: '主入口闸机2', type: 'gate', status: 'online', location: '主入口', lastHeartbeat: '2024-06-15 12:00:00' },
      { id: 3, code: 'GATE-03', name: '西门闸机', type: 'gate', status: 'offline', location: '西门', lastHeartbeat: '2024-06-15 10:30:00' },
      { id: 4, code: 'VR-01', name: 'VR体验设备1', type: 'vr', status: 'online', location: 'VR区', lastHeartbeat: '2024-06-15 12:00:00' },
      { id: 5, code: 'VR-02', name: 'VR体验设备2', type: 'vr', status: 'online', location: 'VR区', lastHeartbeat: '2024-06-15 12:00:00' },
      { id: 6, code: 'VR-03', name: 'VR体验设备3', type: 'vr', status: 'error', location: 'VR区', lastHeartbeat: '2024-06-15 11:45:00' },
      { id: 7, code: 'BILLIARDS-01', name: '台球桌1', type: 'billiards', status: 'online', location: '台球区', lastHeartbeat: '2024-06-15 12:00:00' },
      { id: 8, code: 'BILLIARDS-02', name: '台球桌2', type: 'billiards', status: 'online', location: '台球区', lastHeartbeat: '2024-06-15 12:00:00' },
      { id: 9, code: 'BILLIARDS-03', name: '台球桌3', type: 'billiards', status: 'offline', location: '台球区', lastHeartbeat: '2024-06-15 11:30:00' },
      { id: 10, code: 'VENDOR-01', name: '无人售货柜1', type: 'vendor', status: 'online', location: '休息区', lastHeartbeat: '2024-06-15 12:00:00' },
      { id: 11, code: 'VENDOR-02', name: '无人售货柜2', type: 'vendor', status: 'online', location: '餐饮区', lastHeartbeat: '2024-06-15 12:00:00' },
      { id: 12, code: 'VENDOR-03', name: '自动售币机', type: 'vendor', status: 'online', location: '电玩区', lastHeartbeat: '2024-06-15 12:00:00' },
      { id: 13, code: 'TRAMPOLINE-01', name: '蹦床区控制器', type: 'controller', status: 'online', location: '蹦床区', lastHeartbeat: '2024-06-15 12:00:00' },
      { id: 14, code: 'SWIMMING-01', name: '泳池门禁', type: 'gate', status: 'online', location: '游泳馆', lastHeartbeat: '2024-06-15 12:00:00' },
      { id: 15, code: 'SWIMMING-02', name: '泳池温控系统', type: 'controller', status: 'online', location: '游泳馆', lastHeartbeat: '2024-06-15 12:00:00' },
      { id: 16, code: 'FOOTBATH-01', name: '足浴区控制器', type: 'controller', status: 'online', location: '足浴区', lastHeartbeat: '2024-06-15 12:00:00' },
      { id: 17, code: 'KITCHEN-01', name: '厨房显示系统', type: 'controller', status: 'online', location: '厨房', lastHeartbeat: '2024-06-15 12:00:00' },
      { id: 18, code: 'LOCKER-01', name: '储物柜系统', type: 'locker', status: 'online', location: '更衣室', lastHeartbeat: '2024-06-15 12:00:00' },
      { id: 19, code: 'POS-01', name: '收银POS机1', type: 'pos', status: 'online', location: '服务台', lastHeartbeat: '2024-06-15 12:00:00' },
      { id: 20, code: 'POS-02', name: '收银POS机2', type: 'pos', status: 'error', location: '餐饮区', lastHeartbeat: '2024-06-15 11:50:00' },
    ];

    // 初始化公告
    this.announcements = [
      { id: 1, title: '端午节活动公告', content: '端午节期间，全馆通票8折优惠，欢迎光临！', type: 'activity', publishedAt: '2024-06-10 10:00:00', createdAt: '2024-06-10 10:00:00' },
      { id: 2, title: '设备维护通知', content: '台球区将于6月20日进行设备维护，届时暂停使用。', type: 'warning', publishedAt: '2024-06-15 08:00:00', createdAt: '2024-06-15 08:00:00' },
      { id: 3, title: '新增VR体验项目', content: '本商场新增2台VR体验设备，欢迎前来体验！', type: 'info', publishedAt: '2024-06-01 09:00:00', createdAt: '2024-06-01 09:00:00' },
    ];

    // 初始化招租信息
    this.investments = [
      { id: 1, assetId: 3, assetName: 'B栋201商铺', title: '黄金位置招商', description: '位于2楼核心区域，人流量大，适合各类业态。', area: 350, expectedRent: 30000, status: 'available', createdAt: '2024-06-01 00:00:00' },
      { id: 2, assetId: 5, assetName: 'C栋301办公室', title: '写字楼出租', description: '3楼办公室，精装修，带家具，可直接入驻。', area: 150, expectedRent: 12000, status: 'available', createdAt: '2024-06-01 00:00:00' },
    ];
  }

  // 生成ID
  generateId(array: any[]): number {
    return array.length > 0 ? Math.max(...array.map(item => item.id)) + 1 : 1;
  }

  // 生成订单号
  generateOrderNo(): string {
    const date = new Date();
    const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '');
    const count = this.orders.filter(o => o.orderNo.startsWith(`ORD${dateStr}`)).length + 1;
    return `ORD${dateStr}${String(count).padStart(4, '0')}`;
  }
}

export const db = new MockDatabase();
