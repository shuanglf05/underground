import { db } from '../config/database.js';
import { Ticket, ApiResponse, PaginatedResponse } from '../../../shared/types/index.js';

class TicketService {
  // 获取票种列表
  getTickets(): ApiResponse<Ticket[]> {
    const activeTickets = db.tickets.filter(t => t.status === 1);
    return { success: true, data: activeTickets };
  }

  // 获取票种详情
  getTicketById(id: number): ApiResponse<Ticket> {
    const ticket = db.tickets.find(t => t.id === id);
    if (!ticket) {
      return { success: false, error: '票种不存在' };
    }
    return { success: true, data: ticket };
  }

  // 创建票种
  createTicket(ticket: Omit<Ticket, 'id' | 'createdAt'>): ApiResponse<Ticket> {
    const newTicket: Ticket = {
      ...ticket,
      id: db.generateId(db.tickets),
      createdAt: new Date().toISOString(),
    };
    db.tickets.push(newTicket);
    return { success: true, data: newTicket };
  }

  // 更新票种
  updateTicket(id: number, updates: Partial<Ticket>): ApiResponse<Ticket> {
    const index = db.tickets.findIndex(t => t.id === id);
    if (index === -1) {
      return { success: false, error: '票种不存在' };
    }
    db.tickets[index] = { ...db.tickets[index], ...updates };
    return { success: true, data: db.tickets[index] };
  }

  // 删除票种
  deleteTicket(id: number): ApiResponse<void> {
    const index = db.tickets.findIndex(t => t.id === id);
    if (index === -1) {
      return { success: false, error: '票种不存在' };
    }
    db.tickets.splice(index, 1);
    return { success: true };
  }
}

export const ticketService = new TicketService();
