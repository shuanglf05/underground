import { Router } from 'express';
import { mockCoupons } from '../mock/data';

const router = Router();

// 获取优惠券列表
router.get('/', (req, res) => {
  const { status } = req.query;
  
  let coupons = [...mockCoupons];
  
  if (status) {
    coupons = coupons.filter(c => c.status === status);
  }
  
  res.json({
    success: true,
    data: coupons,
  });
});

// 领取优惠券
router.post('/:id/claim', (req, res) => {
  const { id } = req.params;
  
  const coupon = mockCoupons.find(c => c.id === id);
  
  if (!coupon) {
    return res.json({
      success: false,
      error: '优惠券不存在',
    });
  }
  
  if (coupon.status !== 'active') {
    return res.json({
      success: false,
      error: '优惠券已下架',
    });
  }
  
  res.json({
    success: true,
    message: '领取成功',
  });
});

// 获取用户优惠券
router.get('/my', (req, res) => {
  // 模拟用户优惠券
  const userCoupons = [
    {
      id: '1',
      couponId: '1',
      couponName: '新人专享券',
      type: 'cash',
      value: 20,
      minAmount: 100,
      status: 'unused',
      validTo: '2024-12-31',
    },
    {
      id: '2',
      couponId: '2',
      couponName: '满200减30',
      type: 'cash',
      value: 30,
      minAmount: 200,
      status: 'unused',
      validTo: '2024-12-31',
    },
  ];
  
  res.json({
    success: true,
    data: userCoupons,
  });
});

// 创建优惠券（管理端）
router.post('/', (req, res) => {
  const newCoupon = {
    id: String(mockCoupons.length + 1),
    ...req.body,
    status: 'active',
  };
  
  mockCoupons.push(newCoupon);
  
  res.json({
    success: true,
    data: newCoupon,
    message: '创建成功',
  });
});

// 更新优惠券（管理端）
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const index = mockCoupons.findIndex(c => c.id === id);
  
  if (index === -1) {
    return res.json({
      success: false,
      error: '优惠券不存在',
    });
  }
  
  mockCoupons[index] = {
    ...mockCoupons[index],
    ...req.body,
  };
  
  res.json({
    success: true,
    data: mockCoupons[index],
    message: '更新成功',
  });
});

// 删除优惠券（管理端）
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const index = mockCoupons.findIndex(c => c.id === id);
  
  if (index === -1) {
    return res.json({
      success: false,
      error: '优惠券不存在',
    });
  }
  
  mockCoupons.splice(index, 1);
  
  res.json({
    success: true,
    message: '删除成功',
  });
});

export default router;
