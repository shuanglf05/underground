import { useState, useEffect } from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import { Users, Shield, FileText, Plus, Search, Edit2, Trash2, CheckCircle, XCircle } from 'lucide-react';

interface User {
  id: number;
  username: string;
  name: string;
  roleId: number;
  roleName: string;
  status: string;
  createdAt: string;
}

interface Role {
  id: number;
  name: string;
  permissions: string[];
  description: string;
  createdAt: string;
}

interface Log {
  id: number;
  userId: number;
  username: string;
  action: string;
  time: string;
  description: string;
}

const permissionLabels: Record<string, string> = {
  dashboard: '工作台',
  tickets: '票务管理',
  members: '会员管理',
  orders: '订单管理',
  assets: '资产管理',
  cashier: '收银管理',
  reports: '报表中心',
  system: '系统管理',
};

export default function AdminSystem() {
  const [activeTab, setActiveTab] = useState('users');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [logs, setLogs] = useState<Log[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [newUser, setNewUser] = useState({ username: '', name: '', password: '', roleId: 1 });
  const [newRole, setNewRole] = useState({ name: '', description: '', permissions: [] as string[] });

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    if (activeTab === 'users') {
      const res = await fetch(`/api/system/users${searchKeyword ? `?keyword=${searchKeyword}` : ''}`);
      const data = await res.json();
      if (data.success) setUsers(data.data.list);
    } else if (activeTab === 'roles') {
      const res = await fetch('/api/system/roles');
      const data = await res.json();
      if (data.success) setRoles(data.data);
    } else if (activeTab === 'logs') {
      const res = await fetch('/api/system/logs');
      const data = await res.json();
      if (data.success) setLogs(data.data.list);
    }
  };

  const handleSearch = () => {
    fetchData();
  };

  const handleAddUser = async () => {
    const res = await fetch('/api/system/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser),
    });
    const data = await res.json();
    if (data.success) {
      setUsers([data.data, ...users]);
      setShowAddModal(false);
      setNewUser({ username: '', name: '', password: '', roleId: 1 });
    }
  };

  const handleAddRole = async () => {
    const res = await fetch('/api/system/roles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newRole),
    });
    const data = await res.json();
    if (data.success) {
      setRoles([data.data, ...roles]);
      setShowRoleModal(false);
      setNewRole({ name: '', description: '', permissions: [] });
    }
  };

  const handleDeleteUser = async (id: number) => {
    const res = await fetch(`/api/system/users/${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (data.success) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  const handleDeleteRole = async (id: number) => {
    const res = await fetch(`/api/system/roles/${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (data.success) {
      setRoles(roles.filter(r => r.id !== id));
    }
  };

  const togglePermission = (permission: string) => {
    setNewRole(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter(p => p !== permission)
        : [...prev.permissions, permission],
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="lg:ml-64 p-6">
        {/* Header */}
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">系统管理</h1>
            <p className="text-sm text-gray-500">用户、角色与权限管理</p>
          </div>
        </header>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="flex border-b border-gray-100">
            <button
              onClick={() => { setActiveTab('users'); setSearchKeyword(''); }}
              className={`flex-1 px-6 py-4 font-medium transition-colors flex items-center justify-center gap-2 ${
                activeTab === 'users' ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Users className="w-5 h-5" />
              用户管理
            </button>
            <button
              onClick={() => { setActiveTab('roles'); setSearchKeyword(''); }}
              className={`flex-1 px-6 py-4 font-medium transition-colors flex items-center justify-center gap-2 ${
                activeTab === 'roles' ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Shield className="w-5 h-5" />
              角色权限
            </button>
            <button
              onClick={() => { setActiveTab('logs'); setSearchKeyword(''); }}
              className={`flex-1 px-6 py-4 font-medium transition-colors flex items-center justify-center gap-2 ${
                activeTab === 'logs' ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <FileText className="w-5 h-5" />
              操作日志
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'users' && (
              <>
                <div className="flex items-center justify-between mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="搜索用户名或姓名..."
                      value={searchKeyword}
                      onChange={(e) => setSearchKeyword(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                      className="w-64 pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                    添加用户
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 text-left text-sm text-gray-500">
                        <th className="px-4 py-3 font-medium">用户名</th>
                        <th className="px-4 py-3 font-medium">姓名</th>
                        <th className="px-4 py-3 font-medium">角色</th>
                        <th className="px-4 py-3 font-medium">状态</th>
                        <th className="px-4 py-3 font-medium">创建时间</th>
                        <th className="px-4 py-3 font-medium">操作</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.id} className="border-t border-gray-100 hover:bg-gray-50">
                          <td className="px-4 py-3 font-medium">{user.username}</td>
                          <td className="px-4 py-3">{user.name}</td>
                          <td className="px-4 py-3">
                            <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded">
                              {user.roleName}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            {user.status === 'active' ? (
                              <span className="flex items-center gap-1 text-green-600">
                                <CheckCircle className="w-4 h-4" />
                                正常
                              </span>
                            ) : (
                              <span className="flex items-center gap-1 text-red-600">
                                <XCircle className="w-4 h-4" />
                                禁用
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-500">{user.createdAt}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg">
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteUser(user.id)}
                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {activeTab === 'roles' && (
              <>
                <div className="flex justify-end mb-4">
                  <button
                    onClick={() => setShowRoleModal(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                    添加角色
                  </button>
                </div>

                <div className="space-y-4">
                  {roles.map((role) => (
                    <div key={role.id} className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-bold text-gray-800">{role.name}</h3>
                          <p className="text-sm text-gray-500">{role.description}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteRole(role.id)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {role.permissions.map((permission) => (
                          <span key={permission} className="px-3 py-1 bg-white border border-gray-200 text-gray-600 text-sm rounded-full">
                            {permissionLabels[permission] || permission}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {activeTab === 'logs' && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 text-left text-sm text-gray-500">
                      <th className="px-4 py-3 font-medium">用户</th>
                      <th className="px-4 py-3 font-medium">操作</th>
                      <th className="px-4 py-3 font-medium">描述</th>
                      <th className="px-4 py-3 font-medium">时间</th>
                    </tr>
                  </thead>
                  <tbody>
                    {logs.map((log) => (
                      <tr key={log.id} className="border-t border-gray-100 hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium">{log.username}</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                            {log.action}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm">{log.description}</td>
                        <td className="px-4 py-3 text-sm text-gray-500">{log.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-800 mb-4">添加用户</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">用户名</label>
                <input
                  type="text"
                  value={newUser.username}
                  onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">姓名</label>
                <input
                  type="text"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">密码</label>
                <input
                  type="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">角色</label>
                <select
                  value={newUser.roleId}
                  onChange={(e) => setNewUser({ ...newUser, roleId: Number(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {roles.map((role) => (
                    <option key={role.id} value={role.id}>{role.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                取消
              </button>
              <button
                onClick={handleAddUser}
                className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
              >
                确认添加
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Role Modal */}
      {showRoleModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-4">添加角色</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">角色名称</label>
                <input
                  type="text"
                  value={newRole.name}
                  onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">角色描述</label>
                <textarea
                  value={newRole.description}
                  onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">权限列表</label>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(permissionLabels).map(([key, label]) => (
                    <button
                      key={key}
                      onClick={() => togglePermission(key)}
                      className={`px-3 py-1 rounded-full text-sm transition-colors ${
                        newRole.permissions.includes(key)
                          ? 'bg-primary-500 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowRoleModal(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                取消
              </button>
              <button
                onClick={handleAddRole}
                className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
              >
                确认添加
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
