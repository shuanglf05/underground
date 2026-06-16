import { Router } from 'express';
import { memberService } from '../src/services/memberService.js';

const router = Router();

// 获取会员列表
router.get('/', (req, res) => {
  const { page, pageSize, keyword } = req.query;
  const result = memberService.getMembers({
    page: page ? Number(page) : undefined,
    pageSize: pageSize ? Number(pageSize) : undefined,
    keyword: keyword as string,
  });
  res.json(result);
});

// 获取会员详情
router.get('/:id', (req, res) => {
  const result = memberService.getMemberById(Number(req.params.id));
  res.json(result);
});

// 获取会员订单
router.get('/:id/orders', (req, res) => {
  const result = memberService.getMemberOrders(Number(req.params.id));
  res.json(result);
});

// 创建会员
router.post('/', (req, res) => {
  const result = memberService.createMember(req.body);
  res.json(result);
});

// 更新会员
router.put('/:id', (req, res) => {
  const result = memberService.updateMember(Number(req.params.id), req.body);
  res.json(result);
});

// 会员充值
router.post('/:id/recharge', (req, res) => {
  const { amount } = req.body;
  const result = memberService.recharge(Number(req.params.id), amount);
  res.json(result);
});

export default router;
