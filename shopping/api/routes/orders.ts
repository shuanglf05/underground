import { Router } from 'express';
import { orderService } from '../src/services/orderService.js';

const router = Router();

// 获取订单列表
router.get('/', (req, res) => {
  const { page, pageSize, status, keyword } = req.query;
  const result = orderService.getOrders({
    page: page ? Number(page) : undefined,
    pageSize: pageSize ? Number(pageSize) : undefined,
    status: status as string,
    keyword: keyword as string,
  });
  res.json(result);
});

// 获取订单详情
router.get('/:id', (req, res) => {
  const result = orderService.getOrderById(Number(req.params.id));
  res.json(result);
});

// 创建订单
router.post('/', (req, res) => {
  const result = orderService.createOrder(req.body);
  res.json(result);
});

// 支付订单
router.post('/:id/pay', (req, res) => {
  const { payMethod } = req.body;
  const result = orderService.payOrder(Number(req.params.id), payMethod || 'wechat');
  res.json(result);
});

// 验票
router.post('/:id/verify', (req, res) => {
  const result = orderService.verifyOrder(Number(req.params.id));
  res.json(result);
});

// 退票
router.post('/:id/refund', (req, res) => {
  const result = orderService.refundOrder(Number(req.params.id), req.body.reason);
  res.json(result);
});

// 取消订单
router.post('/:id/cancel', (req, res) => {
  const result = orderService.cancelOrder(Number(req.params.id));
  res.json(result);
});

export default router;
