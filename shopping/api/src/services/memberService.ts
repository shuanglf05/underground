import { db } from '../config/database.js';
import { Member, Order, PayStatus, OrderStatus, ApiResponse, PaginatedResponse } from '../../../shared/types/index.js';

class MemberService {
  // 获取会员列表
  getMembers(params: { page?: number; pageSize?: number; keyword?: string } = {}): ApiResponse<PaginatedResponse<Member>> {
    const { page = 1, pageSize = 10, keyword = '' } = params;
    let filtered = db.members;

    if (keyword) {
      filtered = filtered.filter(m =>
        m.name.includes(keyword) || m.phone.includes(keyword)
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

  // 获取会员详情
  getMemberById(id: number): ApiResponse<Member> {
    const member = db.members.find(m => m.id === id);
    if (!member) {
      return { success: false, error: '会员不存在' };
    }
    return { success: true, data: member };
  }

  // 根据openid获取会员
  getMemberByOpenid(openid: string): ApiResponse<Member> {
    const member = db.members.find(m => m.openid === openid);
    if (!member) {
      return { success: false, error: '会员不存在' };
    }
    return { success: true, data: member };
  }

  // 创建会员
  createMember(member: Omit<Member, 'id' | 'createdAt' | 'updatedAt' | 'balance' | 'points'>): ApiResponse<Member> {
    const existing = db.members.find(m => m.openid === member.openid);
    if (existing) {
      return { success: false, error: '该微信已注册' };
    }

    const newMember: Member = {
      ...member,
      id: db.generateId(db.members),
      balance: 0,
      points: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    db.members.push(newMember);
    return { success: true, data: newMember };
  }

  // 更新会员
  updateMember(id: number, updates: Partial<Member>): ApiResponse<Member> {
    const index = db.members.findIndex(m => m.id === id);
    if (index === -1) {
      return { success: false, error: '会员不存在' };
    }
    db.members[index] = { ...db.members[index], ...updates, updatedAt: new Date().toISOString() };
    return { success: true, data: db.members[index] };
  }

  // 会员充值
  recharge(memberId: number, amount: number): ApiResponse<Member> {
    const member = db.members.find(m => m.id === memberId);
    if (!member) {
      return { success: false, error: '会员不存在' };
    }

    member.balance += amount;
    member.points += Math.floor(amount / 10);
    member.updatedAt = new Date().toISOString();

    return { success: true, data: member };
  }

  // 获取会员订单
  getMemberOrders(memberId: number): ApiResponse<Order[]> {
    const orders = db.orders.filter(o => o.memberId === memberId);
    return { success: true, data: orders };
  }
}

export const memberService = new MemberService();
