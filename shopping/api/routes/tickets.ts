import { Router } from 'express';
import { ticketService } from '../src/services/ticketService.js';

const router = Router();

// 获取票种列表
router.get('/', (req, res) => {
  const result = ticketService.getTickets();
  res.json(result);
});

// 获取票种详情
router.get('/:id', (req, res) => {
  const result = ticketService.getTicketById(Number(req.params.id));
  res.json(result);
});

// 创建票种
router.post('/', (req, res) => {
  const result = ticketService.createTicket(req.body);
  res.json(result);
});

// 更新票种
router.put('/:id', (req, res) => {
  const result = ticketService.updateTicket(Number(req.params.id), req.body);
  res.json(result);
});

// 删除票种
router.delete('/:id', (req, res) => {
  const result = ticketService.deleteTicket(Number(req.params.id));
  res.json(result);
});

export default router;
