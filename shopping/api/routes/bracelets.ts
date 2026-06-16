import { Router } from 'express';
import { braceletService } from '../src/services/braceletService.js';

const router = Router();

// 获取手环列表
router.get('/', (req, res) => {
  const { page, pageSize, status } = req.query;
  const result = braceletService.getBracelets({
    page: page ? Number(page) : undefined,
    pageSize: pageSize ? Number(pageSize) : undefined,
    status: status as string,
  });
  res.json(result);
});

// 获取手环详情
router.get('/:id', (req, res) => {
  const result = braceletService.getBraceletById(Number(req.params.id));
  res.json(result);
});

// 发放手环
router.post('/issue', (req, res) => {
  const { memberId, deposit } = req.body;
  const result = braceletService.issueBracelet(memberId, deposit);
  res.json(result);
});

// 退还手环
router.post('/:id/return', (req, res) => {
  const result = braceletService.returnBracelet(Number(req.params.id));
  res.json(result);
});

// 手环充值
router.post('/:id/recharge', (req, res) => {
  const { amount } = req.body;
  const result = braceletService.rechargeBracelet(Number(req.params.id), amount);
  res.json(result);
});

// 手环消费
router.post('/:id/consume', (req, res) => {
  const { amount } = req.body;
  const result = braceletService.consumeBracelet(Number(req.params.id), amount);
  res.json(result);
});

// 挂失手环
router.post('/:id/lost', (req, res) => {
  const result = braceletService.reportLost(Number(req.params.id));
  res.json(result);
});

// 获取押金统计
router.get('/stats/deposit', (req, res) => {
  const result = braceletService.getDepositStats();
  res.json(result);
});

export default router;
