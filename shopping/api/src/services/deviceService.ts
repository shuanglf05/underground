import { db } from '../config/database.js';
import { ApiResponse, Device, DeviceStatus } from '../../../shared/types/index.js';

class DeviceService {
  // 获取设备列表
  getDevices(params: { page?: number; pageSize?: number; status?: string; type?: string } = {}): ApiResponse<PaginatedResponse<Device>> {
    const { page = 1, pageSize = 10, status, type } = params;
    let filtered = [...db.devices];

    if (status) {
      filtered = filtered.filter(d => d.status === status);
    }
    if (type) {
      filtered = filtered.filter(d => d.type === type);
    }

    const total = filtered.length;
    const list = filtered.slice((page - 1) * pageSize, page * pageSize);

    return {
      success: true,
      data: { list, pagination: { page, pageSize, total } },
    };
  }

  // 获取设备详情
  getDeviceById(id: number): ApiResponse<Device> {
    const device = db.devices.find(d => d.id === id);
    if (!device) {
      return { success: false, error: '设备不存在' };
    }
    return { success: true, data: device };
  }

  // 更新设备状态
  updateDeviceStatus(id: number, status: DeviceStatus): ApiResponse<Device> {
    const index = db.devices.findIndex(d => d.id === id);
    if (index === -1) {
      return { success: false, error: '设备不存在' };
    }

    db.devices[index].status = status;
    return { success: true, data: db.devices[index] };
  }

  // 远程控制设备
  controlDevice(id: number, action: 'start' | 'stop' | 'restart'): ApiResponse<Device> {
    const index = db.devices.findIndex(d => d.id === id);
    if (index === -1) {
      return { success: false, error: '设备不存在' };
    }

    const device = db.devices[index];
    if (device.status === 'offline') {
      return { success: false, error: '设备离线，无法控制' };
    }

    if (action === 'start') {
      device.status = 'online';
      device.usageCount = (device.usageCount || 0) + 1;
    } else if (action === 'stop') {
      device.status = 'online';
    } else if (action === 'restart') {
      device.status = 'online';
    }

    return { success: true, data: device };
  }

  // 获取设备统计
  getDeviceStats(): ApiResponse<{ online: number; offline: number; error: number; total: number }> {
    const total = db.devices.length;
    const online = db.devices.filter(d => d.status === 'online').length;
    const offline = db.devices.filter(d => d.status === 'offline').length;
    const error = db.devices.filter(d => d.errorCount && d.errorCount > 0).length;

    return { success: true, data: { online, offline, error, total } };
  }

  // 获取设备告警
  getAlerts(): ApiResponse<{ deviceId: number; deviceName: string; message: string; time: string }[]> {
    const alerts = [];
    db.devices.forEach(device => {
      if (device.status === 'offline') {
        alerts.push({
          deviceId: device.id,
          deviceName: device.name,
          message: '设备离线',
          time: new Date().toISOString().slice(0, 19).replace('T', ' '),
        });
      }
      if (device.errorCount && device.errorCount > 0) {
        alerts.push({
          deviceId: device.id,
          deviceName: device.name,
          message: `设备异常 (${device.errorCount}次)`,
          time: new Date().toISOString().slice(0, 19).replace('T', ' '),
        });
      }
    });
    return { success: true, data: alerts };
  }

  // 添加设备
  addDevice(data: { name: string; type: string; location: string }): ApiResponse<Device> {
    const newDevice: Device = {
      id: Date.now(),
      name: data.name,
      type: data.type,
      location: data.location,
      status: 'offline',
      usageCount: 0,
      totalUsageHours: 0,
      errorCount: 0,
      lastMaintenance: new Date().toISOString().split('T')[0],
    };

    db.devices.push(newDevice);
    return { success: true, data: newDevice };
  }

  // 删除设备
  deleteDevice(id: number): ApiResponse<void> {
    const index = db.devices.findIndex(d => d.id === id);
    if (index === -1) {
      return { success: false, error: '设备不存在' };
    }

    db.devices.splice(index, 1);
    return { success: true };
  }

  // 更新设备信息
  updateDevice(id: number, data: Partial<Device>): ApiResponse<Device> {
    const index = db.devices.findIndex(d => d.id === id);
    if (index === -1) {
      return { success: false, error: '设备不存在' };
    }

    db.devices[index] = { ...db.devices[index], ...data };
    return { success: true, data: db.devices[index] };
  }

  // 批量导入设备
  importDevices(devices: Array<{ name: string; type: string; location: string }>): ApiResponse<number> {
    if (!devices || devices.length === 0) {
      return { success: false, error: '请提供设备数据' };
    }

    let successCount = 0;
    devices.forEach(deviceData => {
      if (deviceData.name && deviceData.type) {
        const newDevice: Device = {
          id: Date.now() + Math.random(),
          name: deviceData.name,
          type: deviceData.type,
          location: deviceData.location || '',
          status: 'offline',
          usageCount: 0,
          totalUsageHours: 0,
          errorCount: 0,
          lastMaintenance: new Date().toISOString().split('T')[0],
        };
        db.devices.push(newDevice);
        successCount++;
      }
    });

    return { success: true, data: successCount };
  }
}

export const deviceService = new DeviceService();
