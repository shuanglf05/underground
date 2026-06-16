import { db } from '../config/database.js';
import { Order, OrderItem, PayStatus, OrderStatus, ApiResponse, PaginatedResponse } from '../../../shared/types/index.js';

class OrderService {
  // 获取订单列表
  getOrders(params: { page?: number; pageSize?: number; status?: string; keyword?: string } = {}): ApiResponse<PaginatedResponse<Order>> {
    const { page = 1, pageSize = 10, status, keyword } = params;
    let filtered = [...db.orders].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    if (status) {
      filtered = filtered.filter(o => o.status === status || o.payStatus === status);
    }

    if (keyword) {
      filtered = filtered.filter(o =>
        o.orderNo.includes(keyword) ||
        o.memberName?.includes(keyword)
      );
    }

    const total = filtered.length;
    const list = filtered.slice((page - 1) * pageSize, page * pageSize);

    return {
      success: true,
      data: {
        list,
        pagination: { page, pageSize, total },
      },
    };
  }

  // 获取订单详情
  getOrderById(id: number): ApiResponse<Order> {
    const order = db.orders.find(o => o.id === id);
    if (!order) {
      return { success: false, error: '订单不存在' };
    }
    return { success: true, data: order };
  }

  // 创建订单
  createOrder(data: { memberId: number; items: { ticketId: number; quantity: number }[] }): ApiResponse<Order> {
    const member = db.members.find(m => m.id === data.memberId);
    if (!member) {
      return { success: false, error: '会员不存在' };
    }

    const orderItems: OrderItem[] = [];
    let totalAmount = 0;

    for (const item of data.items) {
      const ticket = db.tickets.find(t => t.id === item.ticketId);
      if (!ticket) {
        return { success: false, error: `票种${item.ticketId}不存在` };
      }
      if (ticket.status !== 1) {
        return { success: false, error: `票种${ticket.name}已下架` };
      }

      const orderItem: OrderItem = {
        id: db.generateId(orderItems),
        orderId: 0,
        ticketId: ticket.id,
        ticketName: ticket.name,
        quantity: item.quantity,
        price: ticket.price,
      };
      orderItems.push(orderItem);
      totalAmount += ticket.price * item.quantity;
    }

    const newOrder: Order = {
      id: db.generateId(db.orders),
      orderNo: db.generateOrderNo(),
      memberId: member.id,
      memberName: member.name,
      items: orderItems,
      totalAmount,
      payStatus: PayStatus.PENDING,
      status: OrderStatus.PENDING,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    orderItems.forEach(item => (item.orderId = newOrder.id));
    db.orders.push(newOrder);

    return { success: true, data: newOrder };
  }

  // 支付订单
  payOrder(id: number, payMethod: string): ApiResponse<Order> {
    const order = db.orders.find(o => o.id === id);
    if (!order) {
      return { success: false, error: '订单不存在' };
    }
    if (order.payStatus !== PayStatus.PENDING) {
      return { success: false, error: '订单已支付或已退款' };
    }

    order.payStatus = PayStatus.PAID;
    order.payMethod = payMethod;
    order.updatedAt = new Date().toISOString();

    return { success: true, data: order };
  }

  // 验票
  verifyOrder(id: number): ApiResponse<Order> {
    const order = db.orders.find(o => o.id === id);
    if (!order) {
      return { success: false, error: '订单不存在' };
    }
    if (order.payStatus !== PayStatus.PAID) {
      return { success: false, error: '订单未支付' };
    }
    if (order.status !== OrderStatus.PENDING) {
      return { success: false, error: '订单已使用或已取消' };
    }

    order.status = OrderStatus.USED;
    order.updatedAt = new Date().toISOString();

    return { success: true, data: order };
  }

  // 退票
  refundOrder(id: number, reason?: string): ApiResponse<Order> {
    const order = db.orders.find(o => o.id === id);
    if (!order) {
      return { success: false, error: '订单不存在' };
    }
    if (order.payStatus === PayStatus.REFUNDED) {
      return { success: false, error: '订单已退款' };
    }
    if (order.status === OrderStatus.USED) {
      return { success: false, error: '已使用的订单无法退款' };
    }

    order.payStatus = PayStatus.REFUNDED;
    order.status = OrderStatus.CANCELLED;
    order.refundReason = reason;
    order.updatedAt = new Date().toISOString();

    return { success: true, data: order };
  }

  // 取消订单
  cancelOrder(id: number): ApiResponse<Order> {
    const order = db.orders.find(o => o.id === id);
    if (!order) {
      return { success: false, error: '订单不存在' };
    }
    if (order.payStatus === PayStatus.PAID) {
      return { success: false, error: '已支付订单请申请退款' };
    }
    if (order.status === OrderStatus.CANCELLED) {
      return { success: false, error: '订单已取消' };
    }

    order.status = OrderStatus.CANCELLED;
    order.updatedAt = new Date().toISOString();

    return { success: true, data: order };
  }
}

export const orderService = new OrderService();
