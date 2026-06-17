import React, { useState } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import {
  LayoutDashboard, Ticket, Users, Building2,
  Settings, BarChart3, ChevronDown, ChevronRight,
  Menu, X, Bell, User, LogOut, Shield, FileText,
  Package, ShoppingCart, ClipboardList, AlertCircle, Bell as BellIcon
} from 'lucide-react';

interface MenuItem {
  id: string;
  label: string;
  icon: React.ElementType;
  path?: string;
  children?: MenuItem[];
}

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['members', 'assets', 'inventory']);

  const menuItems: MenuItem[] = [
    { id: 'dashboard', label: '工作台', icon: LayoutDashboard, path: '/admin/dashboard' },
    { id: 'tickets', label: '票务管理', icon: Ticket, path: '/admin/tickets' },
    { id: 'orders', label: '订单管理', icon: BarChart3, path: '/admin/orders' },
    { id: 'cashier', label: '收银管理', icon: BarChart3, path: '/admin/cashier' },
    {
      id: 'members',
      label: '会员管理',
      icon: Users,
      children: [
        { id: 'member-list', label: '会员列表', icon: Users, path: '/admin/members' },
        { id: 'member-levels', label: '会员等级', icon: Users, path: '/admin/member-levels' },
        { id: 'discount', label: '折扣策略', icon: Users, path: '/admin/member-discount' },
        { id: 'sync', label: '超市会员同步', icon: Users, path: '/admin/member-sync' },
      ]
    },
    {
      id: 'assets',
      label: '资产管理',
      icon: Building2,
      children: [
        { id: 'asset-list', label: '房屋资产档案', icon: Building2, path: '/admin/assets' },
        { id: 'lease', label: '租赁管理', icon: Building2, path: '/admin/lease' },
        { id: 'fees', label: '费用收缴管理', icon: Building2, path: '/admin/fees' },
        { id: 'investment', label: '招租信息发布', icon: Building2, path: '/admin/investment' },
        { id: 'equipment', label: '设备资产台账', icon: Building2, path: '/admin/devices' },
        { id: 'maintenance', label: '设备维保管理', icon: Building2, path: '/admin/maintenance' },
        { id: 'workorders', label: '故障工单管理', icon: Building2, path: '/admin/workorders' },
        { id: 'scrap', label: '报废管理', icon: Building2, path: '/admin/scrap' },
      ]
    },
    {
      id: 'inventory',
      label: '商品进销存管理',
      icon: Package,
      children: [
        { id: 'products', label: '商品档案管理', icon: Package, path: '/admin/products' },
        { id: 'purchase', label: '采购入库管理', icon: ShoppingCart, path: '/admin/purchase' },
        { id: 'sales', label: '销售出库管理', icon: BarChart3, path: '/admin/sales' },
        { id: 'inventory-check', label: '库存盘点管理', icon: ClipboardList, path: '/admin/inventory' },
        { id: 'waste', label: '损耗报损管理', icon: AlertCircle, path: '/admin/waste' },
        { id: 'replenish', label: '补货预警管理', icon: BellIcon, path: '/admin/replenish' },
        { id: 'vending', label: '无人售货柜联动', icon: Package, path: '/admin/vending' },
      ]
    },
    { id: 'reports', label: '报表管理', icon: BarChart3, path: '/admin/reports' },
    { id: 'device-config', label: '设备配置', icon: Settings, path: '/admin/device-config' },
    { id: 'system', label: '系统管理', icon: Settings, path: '/admin/system' },
  ];

  const toggleMenu = (menuId: string) => {
    setExpandedMenus(prev =>
      prev.includes(menuId)
        ? prev.filter(id => id !== menuId)
        : [...prev, menuId]
    );
  };

  const isPathActive = (path?: string) => {
    if (!path) return false;
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const renderMenuItem = (item: MenuItem, level: number = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedMenus.includes(item.id);
    const isActive = isPathActive(item.path);

    return (
      <div key={item.id}>
        <button
          onClick={() => {
            if (hasChildren) {
              toggleMenu(item.id);
            } else if (item.path) {
              navigate(item.path);
            }
          }}
          className={`w-full flex items-center justify-between px-4 py-2.5 text-left transition-colors ${
            isActive
              ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
              : 'text-gray-700 hover:bg-gray-50'
          }`}
          style={{ paddingLeft: `${level * 16 + 16}px` }}
        >
          <div className="flex items-center gap-3">
            <item.icon className="w-5 h-5" />
            <span className="text-sm">{item.label}</span>
          </div>
          {hasChildren && (
            isExpanded
              ? <ChevronDown className="w-4 h-4" />
              : <ChevronRight className="w-4 h-4" />
          )}
        </button>
        {hasChildren && isExpanded && (
          <div className="bg-gray-50">
            {item.children!.map(child => renderMenuItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* 侧边栏 */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-white border-r border-gray-200 flex flex-col transition-all duration-300 fixed left-0 top-0 bottom-0 z-50 overflow-y-auto`}>
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
          {sidebarOpen && <h1 className="text-lg font-bold text-gray-900">揽月城广场</h1>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1 hover:bg-gray-100 rounded">
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* 菜单 */}
        <div className="flex-1 py-4">
          {sidebarOpen ? (
            menuItems.map(item => renderMenuItem(item))
          ) : (
            <div className="space-y-2 px-2">
              {menuItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.path) {
                      navigate(item.path);
                    } else if (item.children && item.children.length > 0) {
                      toggleMenu(item.id);
                      setSidebarOpen(true);
                    }
                  }}
                  className={`w-full p-2 rounded flex justify-center transition-colors ${
                    isPathActive(item.path) ? 'bg-blue-100' : 'hover:bg-gray-100'
                  }`}
                  title={item.label}
                >
                  <item.icon className={`w-5 h-5 ${isPathActive(item.path) ? 'text-blue-600' : 'text-gray-700'}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 用户信息 */}
        {sidebarOpen && (
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
                A
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">管理员</p>
                <p className="text-xs text-gray-500">admin@lanyuecheng.com</p>
              </div>
              <button className="p-1 hover:bg-gray-100 rounded">
                <LogOut className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          </div>
        )}
      </aside>

      {/* 主内容区 */}
      <div className="flex-1 flex flex-col" style={{ marginLeft: sidebarOpen ? '256px' : '64px' }}>
        {/* 顶部栏 */}
        <div className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <span className="text-lg font-bold text-gray-900">揽月城广场管理系统</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 hover:bg-gray-100 rounded-lg transition-colors">
              <div className="w-7 h-7 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">A</div>
              <span className="text-sm text-gray-700">管理员</span>
            </button>
          </div>
        </div>

        {/* 内容区 */}
        <div className="flex-1 p-4 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}