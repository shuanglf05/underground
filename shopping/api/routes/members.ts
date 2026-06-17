import { Router } from 'express';
import { mockUsers, mockMemberLevels } from '../mock/data';

const router = Router();

// 获取会员等级列表
router.get('/levels', (req, res) => {
  res.json({
    success: true,
    data: mockMemberLevels,
  });
});

// 获取会员列表（管理端）
router.get('/', (req, res) => {
  const { level, keyword, page = 1, pageSize = 10 } = req.query;
  
  let members = [...mockUsers];
  
  if (level) {
    members = members.filter(m => m.memberLevel === Number(level));
  }
  
  if (keyword) {
    members = members.filter(m => 
      m.nickname.includes(String(keyword)) || 
      m.phone.includes(String(keyword))
    );
  }
  
  // 分页
  const start = (Number(page) - 1) * Number(pageSize);
  const end = start + Number(pageSize);
  const paginatedMembers = members.slice(start, end);
  
  res.json({
    success: true,
    data: paginatedMembers,
    total: members.length,
    page: Number(page),
    pageSize: Number(pageSize),
  });
});

// 获取会员详情
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const member = mockUsers.find(m => m.id === id);
  
  if (!member) {
    return res.json({
      success: false,
      error: '会员不存在',
    });
  }
  
  res.json({
    success: true,
    data: member,
  });
});

// 会员充值
router.post('/:id/recharge', (req, res) => {
  const { id } = req.params;
  const { amount } = req.body;
  
  const member = mockUsers.find(m => m.id === id);
  
  if (!member) {
    return res.json({
      success: false,
      error: '会员不存在',
    });
  }
  
  // 更新余额
  member.balance += amount;
  
  // 充值赠送
  let bonus = 0;
  if (amount >= 1000) {
    bonus = 150;
  } else if (amount >= 500) {
    bonus = 50;
  }
  
  if (bonus > 0) {
    member.balance += bonus;
  }
  
  res.json({
    success: true,
    data: member,
    message: `充值成功${bonus > 0 ? `，赠送${bonus}元` : ''}`,
  });
});

// 更新会员等级
router.put('/:id/level', (req, res) => {
  const { id } = req.params;
  const { level } = req.body;
  
  const member = mockUsers.find(m => m.id === id);
  
  if (!member) {
    return res.json({
      success: false,
      error: '会员不存在',
    });
  }
  
  member.memberLevel = level;
  
  res.json({
    success: true,
    data: member,
    message: '等级更新成功',
  });
});

// 获取会员消费记录
router.get('/:id/records', (req, res) => {
  const { id } = req.params;
  const { type, page = 1, pageSize = 10 } = req.query;
  
  // 模拟消费记录
  const records = [
    {
      id: '1',
      type: 'recharge',
      amount: 500,
      balance: 1000,
      description: '充值',
      createdAt: '2024-06-15 10:30:00',
    },
    {
      id: '2',
      type: 'consume',
      amount: -128,
      balance: 872,
      description: '购买门票',
      createdAt: '2024-06-15 14:20:00',
    },
    {
      id: '3',
      type: 'refund',
      amount: 128,
      balance: 1000,
      description: '门票退款',
      createdAt: '2024-06-16 09:00:00',
    },
  ];
  
  res.json({
    success: true,
    data: records,
    total: records.length,
    page: Number(page),
    pageSize: Number(pageSize),
  });
});

export default router;
