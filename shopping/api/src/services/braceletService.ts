import { db } from '../config/database.js';
import { Bracelet, ApiResponse, BraceletStatus } from '../../../shared/types/index.js';

class BraceletService {
  // 获取手环列表
  getBracelets(params: { page?: number; pageSize?: number; status?: string } = {}): ApiResponse<PaginatedResponse<Bracelet>> {
    const { page = 1, pageSize = 10, status } = params;
    let filtered = [...db.bracelets];

    if (status) {
      filtered = filtered.filter(b => b.status === status);
    }

    const total = filtered.length;
    const list = filtered.slice((page - 1) * pageSize, page * pageSize);

    return {
      success: true,
      data: { list, pagination: { page, pageSize, total } },
    };
  }

  // 获取手环详情
  getBraceletById(id: number): ApiResponse<Bracelet> {
    const bracelet = db.bracelets.find(b => b.id === id);
    if (!bracelet) {
      return { success: false, error: '手环不存在' };
    }
    return { success: true, data: bracelet };
  }

  // 发放手环
  issueBracelet(memberId: number, deposit: number): ApiResponse<Bracelet> {
    const member = db.members.find(m => m.id === memberId);
    if (!member) {
      return { success: false, error: '会员不存在' };
    }

    const availableBracelet = db.bracelets.find(b => b.status === BraceletStatus.AVAILABLE);
    if (!availableBracelet) {
      return { success: false, error: '暂无可用手环' };
    }

    availableBracelet.status = BraceletStatus.IN_USE;
    availableBracelet.memberId = memberId;
    availableBracelet.memberName = member.name;
    availableBracelet.deposit = deposit;

    return { success: true, data: availableBracelet };
  }

  // 退还手环
  returnBracelet(id: number): ApiResponse<Bracelet> {
    const bracelet = db.bracelets.find(b => b.id === id);
    if (!bracelet) {
      return { success: false, error: '手环不存在' };
    }
    if (bracelet.status !== BraceletStatus.IN_USE) {
      return { success: false, error: '手环未在使用中' };
    }

    bracelet.status = BraceletStatus.AVAILABLE;
    bracelet.memberId = undefined;
    bracelet.memberName = undefined;
    bracelet.balance = 0;

    return { success: true, data: bracelet };
  }

  // 手环充值
  rechargeBracelet(id: number, amount: number): ApiResponse<Bracelet> {
    const bracelet = db.bracelets.find(b => b.id === id);
    if (!bracelet) {
      return { success: false, error: '手环不存在' };
    }
    if (bracelet.status !== BraceletStatus.IN_USE) {
      return { success: false, error: '手环未在使用中' };
    }

    bracelet.balance += amount;

    return { success: true, data: bracelet };
  }

  // 手环消费
  consumeBracelet(id: number, amount: number): ApiResponse<Bracelet> {
    const bracelet = db.bracelets.find(b => b.id === id);
    if (!bracelet) {
      return { success: false, error: '手环不存在' };
    }
    if (bracelet.status !== BraceletStatus.IN_USE) {
      return { success: false, error: '手环未在使用中' };
    }
    if (bracelet.balance < amount) {
      return { success: false, error: '余额不足' };
    }

    bracelet.balance -= amount;

    return { success: true, data: bracelet };
  }

  // 挂失手环
  reportLost(id: number): ApiResponse<Bracelet> {
    const bracelet = db.bracelets.find(b => b.id === id);
    if (!bracelet) {
      return { success: false, error: '手环不存在' };
    }

    bracelet.status = BraceletStatus.LOST;

    return { success: true, data: bracelet };
  }

  // 获取押金统计
  getDepositStats(): ApiResponse<{ totalDeposit: number; inUseDeposit: number; availableCount: number }> {
    const totalDeposit = db.bracelets.reduce((sum, b) => sum + b.deposit, 0);
    const inUseDeposit = db.bracelets
      .filter(b => b.status === BraceletStatus.IN_USE)
      .reduce((sum, b) => sum + b.deposit, 0);
    const availableCount = db.bracelets.filter(b => b.status === BraceletStatus.AVAILABLE).length;

    return {
      success: true,
      data: { totalDeposit, inUseDeposit, availableCount },
    };
  }
}

export const braceletService = new BraceletService();
