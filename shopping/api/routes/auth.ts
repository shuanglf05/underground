import { Router } from 'express';
import { mockUsers } from '../mock/data';

const router = Router();

// 登录
router.post('/login', (req, res) => {
  const { phone, code } = req.body;
  
  // 模拟验证码验证
  if (code !== '123456') {
    return res.json({
      success: false,
      error: '验证码错误',
    });
  }
  
  // 查找或创建用户
  let user = mockUsers.find(u => u.phone === phone);
  
  if (!user) {
    // 创建新用户
    user = {
      id: String(mockUsers.length + 1),
      phone,
      nickname: `用户${phone.slice(-4)}`,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${phone}`,
      memberLevel: 1,
      memberPoints: 0,
      balance: 0,
      createdAt: new Date().toISOString().split('T')[0],
    };
    mockUsers.push(user);
  }
  
  res.json({
    success: true,
    data: { user, token: 'mock-token-' + user.id },
  });
});

// 微信授权登录
router.post('/wechat-login', (req, res) => {
  const { code } = req.body;
  
  // 模拟微信登录
  const user = mockUsers[0];
  
  res.json({
    success: true,
    data: { user, token: 'mock-token-' + user.id },
  });
});

// 获取当前用户信息
router.get('/me', (req, res) => {
  // 模拟获取用户信息
  const user = mockUsers[0];
  
  res.json({
    success: true,
    data: user,
  });
});

// 更新用户信息
router.put('/me', (req, res) => {
  const { nickname, avatar } = req.body;
  const user = mockUsers[0];
  
  if (nickname) user.nickname = nickname;
  if (avatar) user.avatar = avatar;
  
  res.json({
    success: true,
    data: user,
  });
});

// 发送验证码
router.post('/send-code', (req, res) => {
  const { phone } = req.body;
  
  // 模拟发送验证码
  console.log(`发送验证码到 ${phone}: 123456`);
  
  res.json({
    success: true,
    message: '验证码已发送',
  });
});

export default router;
