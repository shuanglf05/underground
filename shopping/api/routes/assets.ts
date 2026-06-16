import { Router } from 'express';
import { assetService } from '../src/services/assetService.js';

const router = Router();

// 获取资产列表
router.get('/', (req, res) => {
  const { page, pageSize, status, keyword } = req.query;
  const result = assetService.getAssets({
    page: page ? Number(page) : undefined,
    pageSize: pageSize ? Number(pageSize) : undefined,
    status: status as string,
    keyword: keyword as string,
  });
  res.json(result);
});

// 获取资产详情
router.get('/:id', (req, res) => {
  const result = assetService.getAssetById(Number(req.params.id));
  res.json(result);
});

// 创建资产
router.post('/', (req, res) => {
  const result = assetService.createAsset(req.body);
  res.json(result);
});

// 更新资产
router.put('/:id', (req, res) => {
  const result = assetService.updateAsset(Number(req.params.id), req.body);
  res.json(result);
});

// 获取资产合同
router.get('/:id/contracts', (req, res) => {
  const result = assetService.getAssetContracts(Number(req.params.id));
  res.json(result);
});

// 获取合同列表
router.get('/contracts/list', (req, res) => {
  const { page, pageSize, status } = req.query;
  const result = assetService.getContracts({
    page: page ? Number(page) : undefined,
    pageSize: pageSize ? Number(pageSize) : undefined,
    status: status as string,
  });
  res.json(result);
});

// 创建合同
router.post('/contracts', (req, res) => {
  const result = assetService.createContract(req.body);
  res.json(result);
});

// 获取账单列表
router.get('/bills/list', (req, res) => {
  const { page, pageSize, status, contractId } = req.query;
  const result = assetService.getBills({
    page: page ? Number(page) : undefined,
    pageSize: pageSize ? Number(pageSize) : undefined,
    status: status as string,
    contractId: contractId ? Number(contractId) : undefined,
  });
  res.json(result);
});

// 生成账单
router.post('/bills', (req, res) => {
  const { contractId, type, amount, dueDate } = req.body;
  const result = assetService.generateBill(contractId, type, amount, dueDate);
  res.json(result);
});

// 支付账单
router.post('/bills/:id/pay', (req, res) => {
  const result = assetService.payBill(Number(req.params.id));
  res.json(result);
});

export default router;
