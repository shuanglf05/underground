import { useStore } from '../../stores/useStore';
import AdminSidebar from '../../components/AdminSidebar';
import { Ticket, Plus, Search, Edit2, Trash2, X } from 'lucide-react';
import { useState } from 'react';
import type { Ticket as TicketType } from '../../types';

export default function AdminTickets() {
  const { tickets, fetchTickets } = useStore();
  const [searchKeyword, setSearchKeyword] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingTicket, setEditingTicket] = useState<TicketType | null>(null);
  const [deletingTicket, setDeletingTicket] = useState<TicketType | null>(null);
  const [newTicket, setNewTicket] = useState({
    name: '',
    type: 'single',
    price: 0,
    validDays: 7,
    description: '',
  });

  const filteredTickets = tickets.filter((t) =>
    t.name.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  const formatPrice = (price: number) => `¥${price.toFixed(2)}`;

  const getTicketTypeName = (type: string) => {
    const names: Record<string, string> = {
      unified: '通票',
      single: '单票',
      package: '套餐',
    };
    return names[type] || type;
  };

  const getTicketTypeBadge = (type: string) => {
    const badges: Record<string, { bg: string; text: string }> = {
      unified: { bg: 'bg-purple-100', text: 'text-purple-600' },
      single: { bg: 'bg-blue-100', text: 'text-blue-600' },
      package: { bg: 'bg-orange-100', text: 'text-orange-600' },
    };
    return badges[type] || { bg: 'bg-gray-100', text: 'text-gray-600' };
  };

  const handleAddTicket = async () => {
    const res = await fetch('/api/tickets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTicket),
    });
    const data = await res.json();
    if (data.success) {
      await fetchTickets();
      setShowAddModal(false);
      setNewTicket({ name: '', type: 'single', price: 0, validDays: 7, description: '' });
    }
  };

  const handleEditTicket = async () => {
    if (!editingTicket) return;
    const res = await fetch(`/api/tickets/${editingTicket.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTicket),
    });
    const data = await res.json();
    if (data.success) {
      await fetchTickets();
      setShowEditModal(false);
      setEditingTicket(null);
    }
  };

  const handleDeleteTicket = async () => {
    if (!deletingTicket) return;
    const res = await fetch(`/api/tickets/${deletingTicket.id}`, {
      method: 'DELETE',
    });
    const data = await res.json();
    if (data.success) {
      await fetchTickets();
      setShowDeleteModal(false);
      setDeletingTicket(null);
    }
  };

  const openEditModal = (ticket: TicketType) => {
    setEditingTicket(ticket);
    setNewTicket({
      name: ticket.name,
      type: ticket.type,
      price: ticket.price,
      validDays: ticket.validDays,
      description: ticket.description || '',
    });
    setShowEditModal(true);
  };

  const openDeleteModal = (ticket: TicketType) => {
    setDeletingTicket(ticket);
    setShowDeleteModal(true);
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
            <h1 className="text-2xl font-bold text-gray-800">票务管理</h1>
            <p className="text-sm text-gray-500">管理票种配置和价格</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors"
          >
            <Plus className="w-5 h-5" />
            添加票种
          </button>
        </header>

        {/* Search */}
        <div className="bg-white rounded-2xl p-4 shadow-sm mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="搜索票种名称..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Tickets Table */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-left text-sm text-gray-500">
                <th className="px-6 py-4 font-medium">票种名称</th>
                <th className="px-6 py-4 font-medium">类型</th>
                <th className="px-6 py-4 font-medium">价格</th>
                <th className="px-6 py-4 font-medium">有效期</th>
                <th className="px-6 py-4 font-medium">状态</th>
                <th className="px-6 py-4 font-medium">操作</th>
              </tr>
            </thead>
            <tbody>
              {filteredTickets.map((ticket) => {
                const badge = getTicketTypeBadge(ticket.type);
                return (
                  <tr key={ticket.id} className="border-t border-gray-100 hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                          <Ticket className="w-5 h-5 text-primary-600" />
                        </div>
                        <span className="font-medium text-gray-800">{ticket.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${badge.bg} ${badge.text}`}>
                        {getTicketTypeName(ticket.type)}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium text-accent-600">{formatPrice(ticket.price)}</td>
                    <td className="px-6 py-4 text-gray-600">{ticket.validDays}天</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        ticket.status === 1 ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {ticket.status === 1 ? '上架' : '下架'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEditModal(ticket)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="编辑"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => openDeleteModal(ticket)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="删除"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filteredTickets.length === 0 && (
            <div className="text-center py-12">
              <Ticket className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">暂无票种数据</p>
            </div>
          )}
        </div>
      </main>

      {/* Add Ticket Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">添加票种</h2>
              <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">票种名称</label>
                <input
                  type="text"
                  value={newTicket.name}
                  onChange={(e) => setNewTicket({ ...newTicket, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="请输入票种名称"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">票种类型</label>
                <select
                  value={newTicket.type}
                  onChange={(e) => setNewTicket({ ...newTicket, type: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="single">单票</option>
                  <option value="unified">通票</option>
                  <option value="package">套餐</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">价格</label>
                <input
                  type="number"
                  value={newTicket.price}
                  onChange={(e) => setNewTicket({ ...newTicket, price: Number(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="请输入价格"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">有效期（天）</label>
                <input
                  type="number"
                  value={newTicket.validDays}
                  onChange={(e) => setNewTicket({ ...newTicket, validDays: Number(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="请输入有效期"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">描述</label>
                <textarea
                  value={newTicket.description}
                  onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="请输入票种描述"
                />
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
                onClick={handleAddTicket}
                className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
              >
                确认添加
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Ticket Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">编辑票种</h2>
              <button onClick={() => { setShowEditModal(false); setEditingTicket(null); }} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">票种名称</label>
                <input
                  type="text"
                  value={newTicket.name}
                  onChange={(e) => setNewTicket({ ...newTicket, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">票种类型</label>
                <select
                  value={newTicket.type}
                  onChange={(e) => setNewTicket({ ...newTicket, type: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="single">单票</option>
                  <option value="unified">通票</option>
                  <option value="package">套餐</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">价格</label>
                <input
                  type="number"
                  value={newTicket.price}
                  onChange={(e) => setNewTicket({ ...newTicket, price: Number(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">有效期（天）</label>
                <input
                  type="number"
                  value={newTicket.validDays}
                  onChange={(e) => setNewTicket({ ...newTicket, validDays: Number(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">描述</label>
                <textarea
                  value={newTicket.description}
                  onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => { setShowEditModal(false); setEditingTicket(null); }}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                取消
              </button>
              <button
                onClick={handleEditTicket}
                className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
              >
                确认修改
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && deletingTicket && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
                <Trash2 className="w-8 h-8 text-red-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">确认删除</h2>
              <p className="text-gray-600 mb-6">确定要删除票种「{deletingTicket.name}」吗？此操作无法撤销。</p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => { setShowDeleteModal(false); setDeletingTicket(null); }}
                  className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  取消
                </button>
                <button
                  onClick={handleDeleteTicket}
                  className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  确认删除
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
