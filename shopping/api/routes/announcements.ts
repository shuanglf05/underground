import { Router } from 'express';
import { mockAnnouncements } from '../mock/data';

const router = Router();

// 获取公告列表
router.get('/', (req, res) => {
  const { type } = req.query;
  
  let announcements = [...mockAnnouncements];
  
  if (type) {
    announcements = announcements.filter(a => a.type === type);
  }
  
  res.json({
    success: true,
    data: announcements,
  });
});

// 获取公告详情
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const announcement = mockAnnouncements.find(a => a.id === id);
  
  if (!announcement) {
    return res.json({
      success: false,
      error: '公告不存在',
    });
  }
  
  res.json({
    success: true,
    data: announcement,
  });
});

// 创建公告（管理端）
router.post('/', (req, res) => {
  const newAnnouncement = {
    id: String(mockAnnouncements.length + 1),
    ...req.body,
    createdAt: new Date().toISOString().split('T')[0],
  };
  
  mockAnnouncements.push(newAnnouncement);
  
  res.json({
    success: true,
    data: newAnnouncement,
    message: '创建成功',
  });
});

// 更新公告（管理端）
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const index = mockAnnouncements.findIndex(a => a.id === id);
  
  if (index === -1) {
    return res.json({
      success: false,
      error: '公告不存在',
    });
  }
  
  mockAnnouncements[index] = {
    ...mockAnnouncements[index],
    ...req.body,
  };
  
  res.json({
    success: true,
    data: mockAnnouncements[index],
    message: '更新成功',
  });
});

// 删除公告（管理端）
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const index = mockAnnouncements.findIndex(a => a.id === id);
  
  if (index === -1) {
    return res.json({
      success: false,
      error: '公告不存在',
    });
  }
  
  mockAnnouncements.splice(index, 1);
  
  res.json({
    success: true,
    message: '删除成功',
  });
});

export default router;
