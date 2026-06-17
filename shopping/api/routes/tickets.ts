import { Router } from 'express';
import { mockTicketTypes, mockUserTickets, mockUsers } from '../mock/data';
import { generateQRCode } from '../../src/lib/utils';

const router = Router();

// 获取票种列表
router.get('/types', (req, res) => {
  const { category, type } = req.query;
  
  let tickets = mockTicketTypes.filter(t => t.status === 'active');
  
  if (category) {
    tickets = tickets.filter(t => t.category === category);
  }
  
  if (type) {
    tickets = tickets.filter(t => t.type === type);
  }
  
  res.json({
    success: true,
    data: tickets,
  });
});

// 获取票种详情
router.get('/types/:id', (req, res) => {
  const { id } = req.params;
  const ticket = mockTicketTypes.find(t => t.id === id);
  
  if (!ticket) {
    return res.json({
      success: false,
      error: '票种不存在',
    });
  }
  
  res.json({
    success: true,
    data: ticket,
  });
});

// 获取用户门票
router.get('/my', (req, res) => {
  const { status } = req.query;
  
  let tickets = [...mockUserTickets];
  
  if (status) {
    tickets = tickets.filter(t => t.status === status);
  }
  
  res.json({
    success: true,
    data: tickets,
  });
});

// 获取门票详情
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const ticket = mockUserTickets.find(t => t.id === id);
  
  if (!ticket) {
    return res.json({
      success: false,
      error: '门票不存在',
    });
  }
  
  res.json({
    success: true,
    data: ticket,
  });
});

// 验票
router.post('/verify', (req, res) => {
  const { qrCode } = req.body;
  
  const ticket = mockUserTickets.find(t => t.qrCode === qrCode);
  
  if (!ticket) {
    return res.json({
      success: false,
      error: '门票不存在',
    });
  }
  
  if (ticket.status === 'used') {
    return res.json({
      success: false,
      error: '门票已使用',
    });
  }
  
  if (ticket.status === 'expired') {
    return res.json({
      success: false,
      error: '门票已过期',
    });
  }
  
  // 更新门票状态
  ticket.status = 'used';
  ticket.usedAt = new Date().toISOString();
  ticket.usedLocation = '主入口';
  
  const user = mockUsers.find(u => u.id === ticket.ticketId);
  
  res.json({
    success: true,
    data: {
      ticket,
      user: user ? { nickname: user.nickname, phone: user.phone } : null,
    },
    message: '验票成功',
  });
});

// 创建票种（管理端）
router.post('/types', (req, res) => {
  const newTicket = {
    id: String(mockTicketTypes.length + 1),
    ...req.body,
    sales: 0,
    status: 'active',
  };
  
  mockTicketTypes.push(newTicket);
  
  res.json({
    success: true,
    data: newTicket,
    message: '创建成功',
  });
});

// 更新票种（管理端）
router.put('/types/:id', (req, res) => {
  const { id } = req.params;
  const index = mockTicketTypes.findIndex(t => t.id === id);
  
  if (index === -1) {
    return res.json({
      success: false,
      error: '票种不存在',
    });
  }
  
  mockTicketTypes[index] = {
    ...mockTicketTypes[index],
    ...req.body,
  };
  
  res.json({
    success: true,
    data: mockTicketTypes[index],
    message: '更新成功',
  });
});

// 删除票种（管理端）
router.delete('/types/:id', (req, res) => {
  const { id } = req.params;
  const index = mockTicketTypes.findIndex(t => t.id === id);
  
  if (index === -1) {
    return res.json({
      success: false,
      error: '票种不存在',
    });
  }
  
  mockTicketTypes.splice(index, 1);
  
  res.json({
    success: true,
    message: '删除成功',
  });
});

export default router;
