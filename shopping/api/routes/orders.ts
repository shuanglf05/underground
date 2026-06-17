import { Router } from 'express';
import { mockOrders, mockTicketTypes, mockUsers, mockUserTickets } from '../mock/data';
import { generateOrderNo, generateQRCode } from '../../src/lib/utils';

const router = Router();

// 获取订单列表
router.get('/', (req, res) => {
  const { status, page = 1, pageSize = 10 } = req.query;
  
  let orders = [...mockOrders];
  
  if (status) {
    orders = orders.filter(o => o.status === status);
  }
  
  // 分页
  const start = (Number(page) - 1) * Number(pageSize);
  const end = start + Number(pageSize);
  const paginatedOrders = orders.slice(start, end);
  
  res.json({
    success: true,
    data: paginatedOrders,
    total: orders.length,
    page: Number(page),
    pageSize: Number(pageSize),
  });
});

// 获取订单详情
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const order = mockOrders.find(o => o.id === id);
  
  if (!order) {
    return res.json({
      success: false,
      error: '订单不存在',
    });
  }
  
  res.json({
    success: true,
    data: order,
  });
});

// 创建订单
router.post('/', (req, res) => {
  const { ticketId, quantity, couponId } = req.body;
  
  const ticket = mockTicketTypes.find(t => t.id === ticketId);
  
  if (!ticket) {
    return res.json({
      success: false,
      error: '票种不存在',
    });
  }
  
  if (ticket.stock < quantity) {
    return res.json({
      success: false,
      error: '库存不足',
    });
  }
  
  const user = mockUsers[0]; // 模拟当前用户
  const totalPrice = ticket.price * quantity;
  
  // 计算会员折扣
  const discountRate = user.memberLevel === 1 ? 1.0 : 
                       user.memberLevel === 2 ? 0.95 :
                       user.memberLevel === 3 ? 0.9 :
                       user.memberLevel === 4 ? 0.85 : 0.8;
  
  const discountAmount = totalPrice * (1 - discountRate);
  const payAmount = totalPrice - discountAmount;
  
  const order = {
    id: String(mockOrders.length + 1),
    orderNo: generateOrderNo(),
    userId: user.id,
    ticketId: ticket.id,
    ticketName: ticket.name,
    quantity,
    totalPrice,
    discountAmount,
    payAmount,
    status: 'pending' as const,
    paymentMethod: '',
    createdAt: new Date().toISOString(),
  };
  
  mockOrders.push(order);
  
  res.json({
    success: true,
    data: order,
    message: '订单创建成功',
  });
});

// 支付订单
router.post('/:id/pay', (req, res) => {
  const { id } = req.params;
  const { paymentMethod } = req.body;
  
  const order = mockOrders.find(o => o.id === id);
  
  if (!order) {
    return res.json({
      success: false,
      error: '订单不存在',
    });
  }
  
  if (order.status !== 'pending') {
    return res.json({
      success: false,
      error: '订单状态不正确',
    });
  }
  
  // 更新订单状态
  order.status = 'paid';
  order.paymentMethod = paymentMethod;
  
  // 更新库存
  const ticket = mockTicketTypes.find(t => t.id === order.ticketId);
  if (ticket) {
    ticket.stock -= order.quantity;
    ticket.sales += order.quantity;
  }
  
  // 生成用户门票
  for (let i = 0; i < order.quantity; i++) {
    mockUserTickets.push({
      id: String(mockUserTickets.length + 1),
      orderId: order.id,
      ticketId: order.ticketId,
      ticketName: order.ticketName,
      qrCode: generateQRCode(),
      status: 'unused',
      validFrom: new Date().toISOString().split('T')[0],
      validTo: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    });
  }
  
  res.json({
    success: true,
    data: order,
    message: '支付成功',
  });
});

// 申请退款
router.post('/:id/refund', (req, res) => {
  const { id } = req.params;
  const { reason } = req.body;
  
  const order = mockOrders.find(o => o.id === id);
  
  if (!order) {
    return res.json({
      success: false,
      error: '订单不存在',
    });
  }
  
  if (order.status !== 'paid') {
    return res.json({
      success: false,
      error: '订单状态不正确',
    });
  }
  
  // 更新订单状态
  order.status = 'refunded';
  
  // 恢复库存
  const ticket = mockTicketTypes.find(t => t.id === order.ticketId);
  if (ticket) {
    ticket.stock += order.quantity;
    ticket.sales -= order.quantity;
  }
  
  // 作废用户门票
  const userTickets = mockUserTickets.filter(t => t.orderId === order.id);
  userTickets.forEach(t => {
    t.status = 'expired';
  });
  
  res.json({
    success: true,
    data: order,
    message: '退款成功',
  });
});

// 取消订单
router.post('/:id/cancel', (req, res) => {
  const { id } = req.params;
  
  const order = mockOrders.find(o => o.id === id);
  
  if (!order) {
    return res.json({
      success: false,
      error: '订单不存在',
    });
  }
  
  if (order.status !== 'pending') {
    return res.json({
      success: false,
      error: '订单状态不正确',
    });
  }
  
  // 从列表中移除
  const index = mockOrders.findIndex(o => o.id === id);
  mockOrders.splice(index, 1);
  
  res.json({
    success: true,
    message: '订单已取消',
  });
});

export default router;
