import { Router } from 'express';
import { reportService } from '../src/services/reportService.js';

const router = Router();

// 获取经营分析报表
router.get('/business', (req, res) => {
  const { startDate, endDate, dimension } = req.query;
  const result = reportService.getBusinessReport({
    startDate: startDate as string,
    endDate: endDate as string,
    dimension: dimension as string,
  });
  res.json(result);
});

// 获取会员分析报表
router.get('/member', (req, res) => {
  const { startDate, endDate } = req.query;
  const result = reportService.getMemberReport({
    startDate: startDate as string,
    endDate: endDate as string,
  });
  res.json(result);
});

// 获取票务分析报表
router.get('/ticket', (req, res) => {
  const { startDate, endDate } = req.query;
  const result = reportService.getTicketReport({
    startDate: startDate as string,
    endDate: endDate as string,
  });
  res.json(result);
});

// 获取设备分析报表
router.get('/device', (req, res) => {
  const { startDate, endDate } = req.query;
  const result = reportService.getDeviceReport({
    startDate: startDate as string,
    endDate: endDate as string,
  });
  res.json(result);
});

export default router;
