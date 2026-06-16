import { db } from '../config/database.js';
import { ApiResponse } from '../../../shared/types/index.js';

class ReportService {
  // 获取经营分析报表
  getBusinessReport(params: { startDate?: string; endDate?: string; dimension?: string }): ApiResponse<{
    totalSales: number;
    orderCount: number;
    avgOrderValue: number;
    salesTrend: { date: string; amount: number; orders: number }[];
    channelContribution: { channel: string; amount: number; percentage: number }[];
  }> {
    const startDate = params.startDate || '2024-01-01';
    const endDate = params.endDate || new Date().toISOString().split('T')[0];

    const filteredOrders = db.orders.filter(
      o => o.createdAt >= startDate && o.createdAt <= endDate
    );

    const totalSales = filteredOrders.reduce((sum, o) => sum + o.totalAmount, 0);
    const orderCount = filteredOrders.length;
    const avgOrderValue = orderCount > 0 ? totalSales / orderCount : 0;

    const salesTrend = [];
    const dates = this.getDatesBetween(startDate, endDate);
    dates.forEach(date => {
      const dayOrders = filteredOrders.filter(o => o.createdAt === date);
      salesTrend.push({
        date,
        amount: dayOrders.reduce((sum, o) => sum + o.totalAmount, 0),
        orders: dayOrders.length,
      });
    });

    const channelMap: Record<string, number> = {};
    filteredOrders.forEach(o => {
      const channel = o.channel || 'unknown';
      channelMap[channel] = (channelMap[channel] || 0) + o.totalAmount;
    });
    const channelContribution = Object.entries(channelMap).map(([channel, amount]) => ({
      channel,
      amount,
      percentage: totalSales > 0 ? Math.round((amount / totalSales) * 100) : 0,
    }));

    return {
      success: true,
      data: { totalSales, orderCount, avgOrderValue, salesTrend, channelContribution },
    };
  }

  // 获取会员分析报表
  getMemberReport(params: { startDate?: string; endDate?: string }): ApiResponse<{
    totalMembers: number;
    newMembers: number;
    activeMembers: number;
    avgConsumption: number;
    memberGrowth: { date: string; count: number }[];
    levelDistribution: { level: string; count: number; percentage: number }[];
    retentionRate: number;
  }> {
    const startDate = params.startDate || '2024-01-01';
    const endDate = params.endDate || new Date().toISOString().split('T')[0];

    const totalMembers = db.members.length;
    const newMembers = db.members.filter(m => m.createdAt >= startDate && m.createdAt <= endDate).length;
    
    const activeMembers = db.members.filter(m => {
      const lastOrder = db.orders.find(o => o.memberId === m.id);
      return lastOrder && lastOrder.createdAt >= startDate;
    }).length;

    const totalConsumption = db.members.reduce((sum, m) => sum + m.totalConsumption, 0);
    const avgConsumption = totalMembers > 0 ? totalConsumption / totalMembers : 0;

    const memberGrowth = [];
    const dates = this.getDatesBetween(startDate, endDate);
    dates.forEach(date => {
      memberGrowth.push({
        date,
        count: db.members.filter(m => m.createdAt === date).length,
      });
    });

    const levelMap: Record<string, number> = {};
    db.members.forEach(m => {
      levelMap[m.level] = (levelMap[m.level] || 0) + 1;
    });
    const levelDistribution = Object.entries(levelMap).map(([level, count]) => ({
      level,
      count,
      percentage: totalMembers > 0 ? Math.round((count / totalMembers) * 100) : 0,
    }));

    const retentionRate = totalMembers > 0 ? Math.round((activeMembers / totalMembers) * 100) : 0;

    return {
      success: true,
      data: {
        totalMembers,
        newMembers,
        activeMembers,
        avgConsumption,
        memberGrowth,
        levelDistribution,
        retentionRate,
      },
    };
  }

  // 获取票务分析报表
  getTicketReport(params: { startDate?: string; endDate?: string }): ApiResponse<{
    totalTickets: number;
    verifiedTickets: number;
    refundedTickets: number;
    verificationRate: number;
    refundRate: number;
    ticketTypeSales: { type: string; sales: number; percentage: number }[];
    dailySales: { date: string; sales: number; verified: number }[];
  }> {
    const startDate = params.startDate || '2024-01-01';
    const endDate = params.endDate || new Date().toISOString().split('T')[0];

    const filteredOrders = db.orders.filter(
      o => o.createdAt >= startDate && o.createdAt <= endDate
    );

    const totalTickets = filteredOrders.reduce((sum, o) => 
      sum + o.items.reduce((itemSum, item) => itemSum + item.quantity, 0), 0
    );

    const verifiedTickets = filteredOrders.filter(o => o.status === 'verified').reduce((sum, o) => 
      sum + o.items.reduce((itemSum, item) => itemSum + item.quantity, 0), 0
    );

    const refundedOrders = db.orders.filter(o => o.status === 'refunded');
    const refundedTickets = refundedOrders.reduce((sum, o) => 
      sum + o.items.reduce((itemSum, item) => itemSum + item.quantity, 0), 0
    );

    const verificationRate = totalTickets > 0 ? Math.round((verifiedTickets / totalTickets) * 100) : 0;
    const refundRate = totalTickets > 0 ? Math.round((refundedTickets / totalTickets) * 100) : 0;

    const ticketTypeSales = [];
    const typeMap: Record<string, number> = {};
    filteredOrders.forEach(o => {
      o.items.forEach(item => {
        const ticket = db.tickets.find(t => t.id === item.ticketId);
        const type = ticket?.type || 'unknown';
        typeMap[type] = (typeMap[type] || 0) + item.quantity;
      });
    });
    const totalTypeSales = Object.values(typeMap).reduce((sum, val) => sum + val, 0);
    Object.entries(typeMap).forEach(([type, sales]) => {
      ticketTypeSales.push({
        type: type === 'single' ? '单项票' : type === 'combo' ? '通票' : type,
        sales,
        percentage: totalTypeSales > 0 ? Math.round((sales / totalTypeSales) * 100) : 0,
      });
    });

    const dailySales = [];
    const dates = this.getDatesBetween(startDate, endDate);
    dates.forEach(date => {
      const dayOrders = filteredOrders.filter(o => o.createdAt === date);
      const sales = dayOrders.reduce((sum, o) => 
        sum + o.items.reduce((itemSum, item) => itemSum + item.quantity, 0), 0
      );
      const verified = dayOrders.filter(o => o.status === 'verified').reduce((sum, o) => 
        sum + o.items.reduce((itemSum, item) => itemSum + item.quantity, 0), 0
      );
      dailySales.push({ date, sales, verified });
    });

    return {
      success: true,
      data: {
        totalTickets,
        verifiedTickets,
        refundedTickets,
        verificationRate,
        refundRate,
        ticketTypeSales,
        dailySales,
      },
    };
  }

  // 获取设备分析报表
  getDeviceReport(params: { startDate?: string; endDate?: string }): ApiResponse<{
    totalDevices: number;
    onlineDevices: number;
    offlineDevices: number;
    avgUsageHours: number;
    deviceUsage: { deviceId: number; name: string; usageCount: number; usageHours: number; status: string }[];
    failureRate: number;
  }> {
    const totalDevices = db.devices.length;
    const onlineDevices = db.devices.filter(d => d.status === 'online').length;
    const offlineDevices = db.devices.filter(d => d.status === 'offline').length;
    
    const avgUsageHours = totalDevices > 0 
      ? db.devices.reduce((sum, d) => sum + (d.totalUsageHours || 0), 0) / totalDevices 
      : 0;

    const deviceUsage = db.devices.map(d => ({
      deviceId: d.id,
      name: d.name,
      usageCount: d.usageCount || 0,
      usageHours: d.totalUsageHours || 0,
      status: d.status,
    }));

    const failureRate = totalDevices > 0 
      ? Math.round((db.devices.filter(d => d.errorCount && d.errorCount > 0).length / totalDevices) * 100) 
      : 0;

    return {
      success: true,
      data: {
        totalDevices,
        onlineDevices,
        offlineDevices,
        avgUsageHours,
        deviceUsage,
        failureRate,
      },
    };
  }

  // 辅助方法：获取日期范围内的所有日期
  private getDatesBetween(startDate: string, endDate: string): string[] {
    const dates: string[] = [];
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    while (start <= end) {
      dates.push(start.toISOString().split('T')[0]);
      start.setDate(start.getDate() + 1);
    }
    
    return dates;
  }
}

export const reportService = new ReportService();
