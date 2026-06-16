import { Router } from 'express';
import { userService } from '../src/services/userService.js';

const router = Router();

// 获取用户列表
router.get('/users', (req, res) => {
  const { page, pageSize, keyword } = req.query;
  const result = userService.getUsers({
    page: page ? Number(page) : undefined,
    pageSize: pageSize ? Number(pageSize) : undefined,
    keyword: keyword as string,
  });
  res.json(result);
});

// 获取用户详情
router.get('/users/:id', (req, res) => {
  const result = userService.getUserById(Number(req.params.id));
  res.json(result);
});

// 创建用户
router.post('/users', (req, res) => {
  const { username, name, password, roleId } = req.body;
  const result = userService.createUser({ username, name, password, roleId });
  res.json(result);
});

// 更新用户
router.put('/users/:id', (req, res) => {
  const result = userService.updateUser(Number(req.params.id), req.body);
  res.json(result);
});

// 删除用户
router.delete('/users/:id', (req, res) => {
  const result = userService.deleteUser(Number(req.params.id));
  res.json(result);
});

// 获取角色列表
router.get('/roles', (req, res) => {
  const result = userService.getRoles();
  res.json(result);
});

// 获取角色详情
router.get('/roles/:id', (req, res) => {
  const result = userService.getRoleById(Number(req.params.id));
  res.json(result);
});

// 创建角色
router.post('/roles', (req, res) => {
  const { name, permissions, description } = req.body;
  const result = userService.createRole({ name, permissions, description });
  res.json(result);
});

// 更新角色
router.put('/roles/:id', (req, res) => {
  const result = userService.updateRole(Number(req.params.id), req.body);
  res.json(result);
});

// 删除角色
router.delete('/roles/:id', (req, res) => {
  const result = userService.deleteRole(Number(req.params.id));
  res.json(result);
});

// 获取权限列表
router.get('/permissions', (req, res) => {
  const result = userService.getPermissions();
  res.json(result);
});

// 获取操作日志
router.get('/logs', (req, res) => {
  const { page, pageSize, userId, action } = req.query;
  const result = userService.getLogs({
    page: page ? Number(page) : undefined,
    pageSize: pageSize ? Number(pageSize) : undefined,
    userId: userId ? Number(userId) : undefined,
    action: action as string,
  });
  res.json(result);
});

export default router;
