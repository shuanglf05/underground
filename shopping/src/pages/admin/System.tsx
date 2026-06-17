import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { toast } from '../../components/ui/Toast';
import { Plus, Edit, Trash2, Search, Users, Shield, Settings, FileText, CheckCircle, XCircle, Lock, Unlock } from 'lucide-react';

export default function AdminSystem() {
  const navigate = useNavigate();
  const { type } = useParams<{ type?: string }>();
  const activeTab = type || 'users';

  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<any>(null);

  const users = [
    { id: 'U001', username: 'admin', name: '管理员', email: 'admin@lanyuecheng.com', role: '超级管理员', status: 'active', createTime: '2024-01-01 09:00' },
    { id: 'U002', username: 'operator', name: '运营人员', email: 'operator@lanyuecheng.com', role: '运营管理员', status: 'active', createTime: '2024-01-05 10:30' },
    { id: 'U003', username: 'finance', name: '财务人员', email: 'finance@lanyuecheng.com', role: '财务管理员', status: 'active', createTime: '2024-01-10 14:00' },
    { id: 'U004', username: 'service', name: '服务台人员', email: 'service@lanyuecheng.com', role: '服务台人员', status: 'inactive', createTime: '2024-01-12 16:00' },
  ];

  const roles = [
    { id: 'R001', name: '超级管理员', permissions: ['all'], description: '拥有所有权限' },
    { id: 'R002', name: '运营管理员', permissions: ['tickets', 'members', 'reports'], description: '管理票务、会员和报表' },
    { id: 'R003', name: '财务管理员', permissions: ['cashier', 'fees', 'reports'], description: '管理收银和财务' },
    { id: 'R004', name: '服务台人员', permissions: ['sales', 'bracelet', 'service'], description: '服务台日常操作' },
    { id: 'R005', name: '运维人员', permissions: ['devices', 'maintenance', 'workorders'], description: '设备维护和工单处理' },
  ];

  const permissions = [
    { id: 'tickets', name: '票务管理', description: '票种管理、门票销售、验证、退票' },
    { id: 'cashier', name: '收银管理', description: '收银主流程、手环预存、押金管理' },
    { id: 'members', name: '会员管理', description: '会员等级、会员列表、折扣策略' },
    { id: 'assets', name: '资产管理', description: '资产档案、租赁管理、费用收缴' },
    { id: 'inventory', name: '进销存管理', description: '商品管理、采购、销售、库存' },
    { id: 'reports', name: '报表管理', description: '各类报表查看和导出' },
    { id: 'devices', name: '设备管理', description: '设备台账、维保、工单' },
    { id: 'config', name: '系统配置', description: '设备对接配置' },
    { id: 'system', name: '系统管理', description: '用户、角色、参数配置' },
  ];

  const systemParams = [
    { id: 'P001', name: '押金标准', value: '200', unit: '元', description: '手环押金标准金额' },
    { id: 'P002', name: '退票手续费率', value: '10', unit: '%', description: '退票时收取的手续费比例' },
    { id: 'P003', name: '日结时间', value: '23:00', unit: '', description: '每日自动日结时间' },
    { id: 'P004', name: '会员升级门槛', value: '1000', unit: '元', description: '会员升级所需累计消费' },
    { id: 'P005', name: '低库存预警', value: '10', unit: '件', description: '库存低于此值时触发预警' },
  ];

  const logs = [
    { id: 'L001', user: 'admin', action: '登录系统', time: '2024-01-15 10:30', ip: '192.168.1.100' },
    { id: 'L002', user: 'admin', action: '新增票种：单人夜场票', time: '2024-01-15 10:35', ip: '192.168.1.100' },
    { id: 'L003', user: 'operator', action: '审核退票申请 R001', time: '2024-01-15 11:00', ip: '192.168.1.101' },
    { id: 'L004', user: 'finance', action: '生成日报表', time: '2024-01-15 14:00', ip: '192.168.1.102' },
    { id: 'L005', user: 'admin', action: '修改系统参数：押金标准', time: '2024-01-15 15:30', ip: '192.168.1.100' },
  ];

  const tabs = [
    { id: 'users', label: '用户管理' },
    { id: 'roles', label: '角色权限' },
    { id: 'params', label: '系统参数' },
    { id: 'logs', label: '操作日志' },
  ];

  const handleToggleStatus = (userId: string) => {
    toast.success('状态已更新');
  };

  const handleDeleteUser = (userId: string) => {
    toast.success('删除成功');
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-gray-900">系统管理</h2>
          <div className="flex gap-2 mt-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => navigate(`/admin/system/${tab.id}`)}
                className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                  activeTab === tab.id ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        {(activeTab === 'users' || activeTab === 'roles') && (
          <Button onClick={() => setShowAddModal(true)}>
            <Plus className="w-4 h-4 mr-2" />
            {activeTab === 'users' ? '新增用户' : '新增角色'}
          </Button>
        )}
      </div>

      {activeTab === 'users' && (
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-base font-bold text-gray-900">用户列表</h3>
            <div className="flex gap-2">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="搜索用户名..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">用户名</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">姓名</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">邮箱</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">角色</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">状态</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">创建时间</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">操作</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-gray-900">{user.username}</td>
                    <td className="py-3 px-4">{user.name}</td>
                    <td className="py-3 px-4 text-sm text-gray-500">{user.email}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded">{user.role}</span>
                    </td>
                    <td className="py-3 px-4">
                      {user.status === 'active' ? (
                        <span className="flex items-center text-green-600">
                          <CheckCircle className="w-4 h-4 mr-1" /> 启用
                        </span>
                      ) : (
                        <span className="flex items-center text-gray-400">
                          <XCircle className="w-4 h-4 mr-1" /> 停用
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-500">{user.createTime}</td>
                    <td className="py-3 px-4">
                      <button className="text-blue-600 hover:text-blue-700 mr-2">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleToggleStatus(user.id)}
                        className={`mr-2 ${user.status === 'active' ? 'text-yellow-600 hover:text-yellow-700' : 'text-green-600 hover:text-green-700'}`}
                      >
                        {user.status === 'active' ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'roles' && (
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-base font-bold text-gray-900">角色列表</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">角色名称</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">权限数量</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">描述</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">操作</th>
                </tr>
              </thead>
              <tbody>
                {roles.map((role) => (
                  <tr key={role.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-gray-900">{role.name}</td>
                    <td className="py-3 px-4">{role.permissions.length}</td>
                    <td className="py-3 px-4 text-sm text-gray-500">{role.description}</td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => { setSelectedRole(role); setShowAddModal(true); }}
                        className="text-blue-600 hover:text-blue-700 mr-3"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'params' && (
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-base font-bold text-gray-900">系统参数</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">参数名称</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">当前值</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">单位</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">描述</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">操作</th>
                </tr>
              </thead>
              <tbody>
                {systemParams.map((param) => (
                  <tr key={param.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-gray-900">{param.name}</td>
                    <td className="py-3 px-4 font-medium text-blue-600">{param.value}</td>
                    <td className="py-3 px-4">{param.unit}</td>
                    <td className="py-3 px-4 text-sm text-gray-500">{param.description}</td>
                    <td className="py-3 px-4">
                      <button className="text-blue-600 hover:text-blue-700">
                        <Edit className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'logs' && (
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-base font-bold text-gray-900">操作日志</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">操作人</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">操作内容</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">操作时间</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">IP地址</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr key={log.id} className="border-b border-gray-100">
                    <td className="py-3 px-4 font-medium text-gray-900">{log.user}</td>
                    <td className="py-3 px-4">{log.action}</td>
                    <td className="py-3 px-4 text-sm text-gray-500">{log.time}</td>
                    <td className="py-3 px-4 text-sm text-gray-500">{log.ip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Modal
        isOpen={showAddModal}
        onClose={() => { setShowAddModal(false); setSelectedRole(null); }}
        title={activeTab === 'users' ? (selectedRole ? '修改用户' : '新增用户') : (selectedRole ? '修改角色' : '新增角色')}
      >
        <div className="space-y-4">
          {activeTab === 'users' ? (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">用户名</label>
                <input
                  type="text"
                  defaultValue={selectedRole?.username}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">姓名</label>
                <input
                  type="text"
                  defaultValue={selectedRole?.name}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">邮箱</label>
                <input
                  type="email"
                  defaultValue={selectedRole?.email}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">角色</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  {roles.map(role => (
                    <option key={role.id} value={role.id}>{role.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">密码</label>
                <input
                  type="password"
                  placeholder="请输入密码"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">角色名称</label>
                <input
                  type="text"
                  defaultValue={selectedRole?.name}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">描述</label>
                <textarea
                  defaultValue={selectedRole?.description}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">权限列表</label>
                <div className="grid grid-cols-2 gap-2">
                  {permissions.map((perm) => (
                    <label key={perm.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                      <input
                        type="checkbox"
                        defaultChecked={selectedRole?.permissions.includes(perm.id)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="text-sm">{perm.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            </>
          )}
          <div className="flex gap-2">
            <Button onClick={() => { setShowAddModal(false); setSelectedRole(null); }} variant="outline">取消</Button>
            <Button onClick={() => { toast.success(selectedRole ? '修改成功' : '添加成功'); setShowAddModal(false); setSelectedRole(null); }}>保存</Button>
          </div>
        </div>
      </Modal>
    </>
  );
}