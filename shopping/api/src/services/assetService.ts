import { db } from '../config/database.js';
import { Asset, Contract, Bill, ApiResponse, PaginatedResponse, BillType, BillStatus, AssetStatus } from '../../../shared/types/index.js';

class AssetService {
  // 获取资产列表
  getAssets(params: { page?: number; pageSize?: number; status?: string; keyword?: string } = {}): ApiResponse<PaginatedResponse<Asset>> {
    const { page = 1, pageSize = 10, status, keyword } = params;
    let filtered = db.assets;

    if (status) {
      filtered = filtered.filter(a => a.status === status);
    }
    if (keyword) {
      filtered = filtered.filter(a => a.name.includes(keyword) || a.code.includes(keyword));
    }

    const total = filtered.length;
    const list = filtered.slice((page - 1) * pageSize, page * pageSize);

    return {
      success: true,
      data: { list, pagination: { page, pageSize, total } },
    };
  }

  // 获取资产详情
  getAssetById(id: number): ApiResponse<Asset> {
    const asset = db.assets.find(a => a.id === id);
    if (!asset) {
      return { success: false, error: '资产不存在' };
    }
    return { success: true, data: asset };
  }

  // 创建资产
  createAsset(asset: Omit<Asset, 'id' | 'createdAt'>): ApiResponse<Asset> {
    const existing = db.assets.find(a => a.code === asset.code);
    if (existing) {
      return { success: false, error: '资产编号已存在' };
    }

    const newAsset: Asset = {
      ...asset,
      id: db.generateId(db.assets),
      createdAt: new Date().toISOString(),
    };
    db.assets.push(newAsset);
    return { success: true, data: newAsset };
  }

  // 更新资产
  updateAsset(id: number, updates: Partial<Asset>): ApiResponse<Asset> {
    const index = db.assets.findIndex(a => a.id === id);
    if (index === -1) {
      return { success: false, error: '资产不存在' };
    }
    db.assets[index] = { ...db.assets[index], ...updates };
    return { success: true, data: db.assets[index] };
  }

  // 获取合同列表
  getContracts(params: { page?: number; pageSize?: number; status?: string } = {}): ApiResponse<PaginatedResponse<Contract>> {
    const { page = 1, pageSize = 10, status } = params;
    let filtered = db.contracts;

    if (status) {
      filtered = filtered.filter(c => c.status === status);
    }

    const total = filtered.length;
    const list = filtered.slice((page - 1) * pageSize, page * pageSize);

    return {
      success: true,
      data: { list, pagination: { page, pageSize, total } },
    };
  }

  // 创建合同
  createContract(contract: Omit<Contract, 'id' | 'createdAt'>): ApiResponse<Contract> {
    const asset = db.assets.find(a => a.id === contract.assetId);
    if (!asset) {
      return { success: false, error: '资产不存在' };
    }

    const newContract: Contract = {
      ...contract,
      id: db.generateId(db.contracts),
      createdAt: new Date().toISOString(),
    };
    db.contracts.push(newContract);

    asset.status = AssetStatus.RENTED;

    return { success: true, data: newContract };
  }

  // 获取资产合同
  getAssetContracts(assetId: number): ApiResponse<Contract[]> {
    const contracts = db.contracts.filter(c => c.assetId === assetId);
    return { success: true, data: contracts };
  }

  // 获取账单列表
  getBills(params: { page?: number; pageSize?: number; status?: string; contractId?: number } = {}): ApiResponse<PaginatedResponse<Bill>> {
    const { page = 1, pageSize = 10, status, contractId } = params;
    let filtered = db.bills;

    if (status) {
      filtered = filtered.filter(b => b.status === status);
    }
    if (contractId) {
      filtered = filtered.filter(b => b.contractId === contractId);
    }

    const total = filtered.length;
    const list = filtered.slice((page - 1) * pageSize, page * pageSize);

    return {
      success: true,
      data: { list, pagination: { page, pageSize, total } },
    };
  }

  // 生成账单
  generateBill(contractId: number, type: BillType, amount: number, dueDate: string): ApiResponse<Bill> {
    const contract = db.contracts.find(c => c.id === contractId);
    if (!contract) {
      return { success: false, error: '合同不存在' };
    }

    const newBill: Bill = {
      id: db.generateId(db.bills),
      contractId,
      type,
      amount,
      dueDate,
      status: BillStatus.PENDING,
      createdAt: new Date().toISOString(),
    };
    db.bills.push(newBill);

    return { success: true, data: newBill };
  }

  // 支付账单
  payBill(id: number): ApiResponse<Bill> {
    const bill = db.bills.find(b => b.id === id);
    if (!bill) {
      return { success: false, error: '账单不存在' };
    }
    if (bill.status === BillStatus.PAID) {
      return { success: false, error: '账单已支付' };
    }

    bill.status = BillStatus.PAID;
    bill.paidAt = new Date().toISOString();

    return { success: true, data: bill };
  }
}

export const assetService = new AssetService();
