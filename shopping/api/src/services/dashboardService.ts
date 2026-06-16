import { db } from '../config/database.js';
import { DashboardStats, ApiResponse, PayStatus, OrderStatus } from '../../../shared/types/index.js';

class DashboardService {
  // 获取工作台统计数据
  getStats(): ApiResponse<DashboardStats> {
    const today = new Date().toISOString().slice(0, 10);

    // 今日订单
    const todayOrders = db.orders.filter(o => o.createdAt.startsWith(today));
    const todayRevenue = todayOrders
      .filter(o => o.payStatus === PayStatus.PAID)
      .reduce((sum, o) => sum + o.totalAmount, 0);

    // 今日新增会员
    const todayMembers = db.members.filter(m => m.createdAt.startsWith(today)).length;

    // 今日验票人次
    const todayVisitors = todayOrders.filter(o => o.status === OrderStatus.USED).length;

    // 票种销售统计
    const ticketSalesMap = new Map<string, number>();
    todayOrders.forEach(order => {
      order.items.forEach(item => {
        const current = ticketSalesMap.get(item.ticketName || '未知') || 0;
        ticketSalesMap.set(item.ticketName || '未知', current + item.quantity);
      });
    });
    const ticketSales = Array.from(ticketSalesMap.entries()).map(([name, value]) => ({ name, value }));

    // 各渠道收入
    const channelRevenueMap = new Map<string, number>();
    todayOrders
      .filter(o => o.payStatus === PayStatus.PAID)
      .forEach(order => {
        const channel = order.payMethod || 'unknown';
        channelRevenueMap.set(channel, (channelRevenueMap.get(channel) || 0) + order.totalAmount);
      });
    const revenueByChannel = Array.from(channelRevenueMap.entries()).map(([name, value]) => ({ name, value }));

    // 最近订单
    const recentOrders = db.orders
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5);

    return {
      success: true,
      data: {
        todayRevenue,
        todayOrders: todayOrders.length,
        todayMembers,
        todayVisitors,
        ticketSales,
        revenueByChannel,
        recentOrders,
      },
    };
  }

  // 获取设备状态统计
  getDeviceStats(): ApiResponse<{ online: number; offline: number; error: number; total: number }> {
    const stats = {
      online: db.devices.filter(d => d.status === 'online').length,
      offline: db.devices.filter(d => d.status === 'offline').length,
      error: db.devices.filter(d => d.status === 'error').length,
      total: db.devices.length,
    };
    return { success: true, data: stats };
  }

  // 获取告警列表
  getAlerts(): ApiResponse<{ deviceId: number; deviceName: string; message: string; time: string }[]> {
    const alerts: { deviceId: number; deviceName: string; message: string; time: string }[] = [];

    db.devices.forEach(device => {
      if (device.status === 'offline') {
        alerts.push({
          deviceId: device.id,
          deviceName: device.name,
          message: `${device.name}已离线`,
          time: device.lastHeartbeat || new Date().toISOString(),
        });
      } else if (device.status === 'error') {
        alerts.push({
          deviceId: device.id,
          deviceName: device.name,
          message: `${device.name}发生故障`,
          time: device.lastHeartbeat || new Date().toISOString(),
        });
      }
    });

    return { success: true, data: alerts };
  }
}

export const dashboardService = new DashboardService();
