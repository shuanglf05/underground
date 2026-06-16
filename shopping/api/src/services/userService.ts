import { db } from '../config/database.js';
import { ApiResponse, User, Role } from '../../../shared/types/index.js';

class UserService {
  // 获取用户列表
  getUsers(params: { page?: number; pageSize?: number; keyword?: string } = {}): ApiResponse<PaginatedResponse<User>> {
    const { page = 1, pageSize = 10, keyword } = params;
    let filtered = [...db.users];

    if (keyword) {
      filtered = filtered.filter(u => 
        u.username.toLowerCase().includes(keyword.toLowerCase()) ||
        u.name.toLowerCase().includes(keyword.toLowerCase())
      );
    }

    const total = filtered.length;
    const list = filtered.slice((page - 1) * pageSize, page * pageSize);

    return {
      success: true,
      data: { list, pagination: { page, pageSize, total } },
    };
  }

  // 获取用户详情
  getUserById(id: number): ApiResponse<User> {
    const user = db.users.find(u => u.id === id);
    if (!user) {
      return { success: false, error: '用户不存在' };
    }
    return { success: true, data: user };
  }

  // 创建用户
  createUser(data: { username: string; name: string; password: string; roleId: number }): ApiResponse<User> {
    const exists = db.users.find(u => u.username === data.username);
    if (exists) {
      return { success: false, error: '用户名已存在' };
    }

    const role = db.roles.find(r => r.id === data.roleId);
    if (!role) {
      return { success: false, error: '角色不存在' };
    }

    const newUser: User = {
      id: Date.now(),
      username: data.username,
      name: data.name,
      password: data.password,
      roleId: data.roleId,
      roleName: role.name,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'active',
    };

    db.users.push(newUser);
    return { success: true, data: newUser };
  }

  // 更新用户
  updateUser(id: number, data: Partial<User>): ApiResponse<User> {
    const index = db.users.findIndex(u => u.id === id);
    if (index === -1) {
      return { success: false, error: '用户不存在' };
    }

    if (data.username) {
      const exists = db.users.find(u => u.username === data.username && u.id !== id);
      if (exists) {
        return { success: false, error: '用户名已存在' };
      }
    }

    if (data.roleId) {
      const role = db.roles.find(r => r.id === data.roleId);
      if (role) {
        data.roleName = role.name;
      }
    }

    db.users[index] = { ...db.users[index], ...data };
    return { success: true, data: db.users[index] };
  }

  // 删除用户
  deleteUser(id: number): ApiResponse<void> {
    const index = db.users.findIndex(u => u.id === id);
    if (index === -1) {
      return { success: false, error: '用户不存在' };
    }

    db.users.splice(index, 1);
    return { success: true };
  }

  // 获取角色列表
  getRoles(): ApiResponse<Role[]> {
    return { success: true, data: db.roles };
  }

  // 获取角色详情
  getRoleById(id: number): ApiResponse<Role> {
    const role = db.roles.find(r => r.id === id);
    if (!role) {
      return { success: false, error: '角色不存在' };
    }
    return { success: true, data: role };
  }

  // 创建角色
  createRole(data: { name: string; permissions: string[]; description?: string }): ApiResponse<Role> {
    const exists = db.roles.find(r => r.name === data.name);
    if (exists) {
      return { success: false, error: '角色名称已存在' };
    }

    const newRole: Role = {
      id: Date.now(),
      name: data.name,
      permissions: data.permissions,
      description: data.description || '',
      createdAt: new Date().toISOString().split('T')[0],
    };

    db.roles.push(newRole);
    return { success: true, data: newRole };
  }

  // 更新角色
  updateRole(id: number, data: Partial<Role>): ApiResponse<Role> {
    const index = db.roles.findIndex(r => r.id === id);
    if (index === -1) {
      return { success: false, error: '角色不存在' };
    }

    if (data.name) {
      const exists = db.roles.find(r => r.name === data.name && r.id !== id);
      if (exists) {
        return { success: false, error: '角色名称已存在' };
      }
    }

    db.roles[index] = { ...db.roles[index], ...data };
    return { success: true, data: db.roles[index] };
  }

  // 删除角色
  deleteRole(id: number): ApiResponse<void> {
    const index = db.roles.findIndex(r => r.id === id);
    if (index === -1) {
      return { success: false, error: '角色不存在' };
    }

    const hasUsers = db.users.some(u => u.roleId === id);
    if (hasUsers) {
      return { success: false, error: '该角色下存在用户，无法删除' };
    }

    db.roles.splice(index, 1);
    return { success: true };
  }

  // 获取权限列表
  getPermissions(): ApiResponse<string[]> {
    const permissions = [
      'dashboard',
      'tickets',
      'members',
      'orders',
      'assets',
      'cashier',
      'reports',
      'system',
    ];
    return { success: true, data: permissions };
  }

  // 获取操作日志
  getLogs(params: { page?: number; pageSize?: number; userId?: number; action?: string } = {}): ApiResponse<PaginatedResponse<{ id: number; userId: number; username: string; action: string; time: string; description: string }>> {
    const { page = 1, pageSize = 10, userId, action } = params;
    let filtered = [...db.logs];

    if (userId) {
      filtered = filtered.filter(l => l.userId === userId);
    }
    if (action) {
      filtered = filtered.filter(l => l.action === action);
    }

    const total = filtered.length;
    const list = filtered.slice((page - 1) * pageSize, page * pageSize);

    return {
      success: true,
      data: { list, pagination: { page, pageSize, total } },
    };
  }
}

export const userService = new UserService();
