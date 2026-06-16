import { Router } from 'express';
import { dashboardService } from '../src/services/dashboardService.js';
import { db } from '../src/config/database.js';

const router = Router();

// 获取工作台统计
router.get('/stats', (req, res) => {
  const result = dashboardService.getStats();
  res.json(result);
});

// 获取设备统计
router.get('/devices/stats', (req, res) => {
  const result = dashboardService.getDeviceStats();
  res.json(result);
});

// 获取设备列表
router.get('/devices', (req, res) => {
  res.json({ success: true, data: db.devices });
});

// 获取告警列表
router.get('/alerts', (req, res) => {
  const result = dashboardService.getAlerts();
  res.json(result);
});

// 获取公告列表
router.get('/announcements', (req, res) => {
  res.json({ success: true, data: db.announcements });
});

// 获取招租信息
router.get('/investments', (req, res) => {
  res.json({ success: true, data: db.investments });
});

export default router;
