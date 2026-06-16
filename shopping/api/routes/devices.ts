import { Router } from 'express';
import { deviceService } from '../src/services/deviceService.js';

const router = Router();

// 获取设备列表
router.get('/', (req, res) => {
  const { page, pageSize, status, type } = req.query;
  const result = deviceService.getDevices({
    page: page ? Number(page) : undefined,
    pageSize: pageSize ? Number(pageSize) : undefined,
    status: status as string,
    type: type as string,
  });
  res.json(result);
});

// 获取设备详情
router.get('/devices/:id', (req, res) => {
  const result = deviceService.getDeviceById(Number(req.params.id));
  res.json(result);
});

// 添加设备
router.post('/devices', (req, res) => {
  const { name, type, location } = req.body;
  const result = deviceService.addDevice({ name, type, location });
  res.json(result);
});

// 更新设备信息
router.put('/devices/:id', (req, res) => {
  const result = deviceService.updateDevice(Number(req.params.id), req.body);
  res.json(result);
});

// 删除设备
router.delete('/devices/:id', (req, res) => {
  const result = deviceService.deleteDevice(Number(req.params.id));
  res.json(result);
});

// 更新设备状态
router.post('/devices/:id/status', (req, res) => {
  const { status } = req.body;
  const result = deviceService.updateDeviceStatus(Number(req.params.id), status);
  res.json(result);
});

// 控制设备
router.post('/devices/:id/control', (req, res) => {
  const { action } = req.body;
  const result = deviceService.controlDevice(Number(req.params.id), action);
  res.json(result);
});

// 获取设备统计
router.get('/devices/stats', (req, res) => {
  const result = deviceService.getDeviceStats();
  res.json(result);
});

// 获取设备告警
router.get('/alerts', (req, res) => {
  const result = deviceService.getAlerts();
  res.json(result);
});

// 批量导入设备
router.post('/devices/import', (req, res) => {
  const devices = req.body;
  const result = deviceService.importDevices(devices);
  res.json(result);
});

export default router;
