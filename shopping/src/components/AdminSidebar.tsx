import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Ticket, Users, Building2,
  Settings, BarChart3, ChevronDown, ChevronRight,
  Menu, X, Bell, User, LogOut, Shield, FileText,
  Package, ShoppingCart, ClipboardList, AlertCircle
} from 'lucide-react';

interface MenuItem {
  id: string;
  label: string;
  icon: React.ElementType;
  path?: string;
  children?: MenuItem[];
}

export default function AdminSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['tickets', 'cashier', 'members', 'assets']);

  const menuItems: MenuItem[] = [
    { id: 'dashboard', label: '工作台', icon: LayoutDashboard, path: '/admin/dashboard' },
    {
      id: 'tickets',
      label: '综合票务管理',
      icon: Ticket,
      children: [
        { id: 'ticket-types', label: '票种管理', icon: Ticket, path: '/admin/tickets' },
        { id: 'ticket-sales', label: '门票销售', icon: Ticket, path: '/admin/tickets' },
        { id: 'ticket-verify', label: '门票验证', icon: Ticket, path: '/admin/tickets' },
        { id: 'ticket-refund', label: '退票管理', icon: Ticket, path: '/admin/tickets' },
      ]
    },
    {
      id: 'cashier',
      label: '收银管理',
      icon: BarChart3,
      children: [
        { id: 'cashier-main', label: '收银主流程', icon: BarChart3, path: '/admin/cashier' },
        { id: 'bracelet', label: '手环预存', icon: BarChart3, path: '/admin/cashier' },
        { id: 'deposit', label: '押金管理', icon: BarChart3, path: '/admin/cashier' },
        { id: 'settlement', label: '日结对账', icon: BarChart3, path: '/admin/cashier' },
      ]
    },
    {
      id: 'members',
      label: '会员管理',
      icon: Users,
      children: [
        { id: 'member-levels', label: '会员等级', icon: Users, path: '/admin/member-levels' },
        { id: 'member-list', label: '会员列表', icon: Users, path: '/admin/members' },
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
    { id: 'orders', label: '订单管理', icon: BarChart3, path: '/admin/orders' },
    {
      id: 'device-config',
      label: '设备对接配置',
      icon: Settings,
      children: [
        { id: 'access-control', label: '门禁系统', icon: Settings, path: '/admin/config/access' },
        { id: 'bracelet', label: '智能手环', icon: Settings, path: '/admin/config/bracelet' },
        { id: 'locker', label: '智能储物柜', icon: Settings, path: '/admin/config/locker' },
        { id: 'game-device', label: '游乐设备控制', icon: Settings, path: '/admin/config/game' },
        { id: 'vending-machine', label: '无人售货柜', icon: Settings, path: '/admin/config/vending' },
        { id: 'coin-machine', label: '自动售币机', icon: Settings, path: '/admin/config/coin' },
        { id: 'kitchen-display', label: '厨房显示系统', icon: Settings, path: '/admin/config/kitchen' },
        { id: 'edge-gateway', label: '边缘网关管理', icon: Settings, path: '/admin/config/gateway' },
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
        { id: 'replenish', label: '补货预警管理', icon: Bell, path: '/admin/replenish' },
        { id: 'vending', label: '无人售货柜联动', icon: Package, path: '/admin/vending' },
      ]
    },
    {
      id: 'reports',
      label: '报表管理',
      icon: BarChart3,
      children: [
        { id: 'sales-report', label: '销售日报/月报/年报', icon: BarChart3, path: '/admin/reports/sales' },
        { id: 'business-report', label: '业态经营分析报表', icon: BarChart3, path: '/admin/reports/business' },
        { id: 'member-report', label: '会员分析报表', icon: BarChart3, path: '/admin/reports/member' },
        { id: 'ticket-report', label: '票务分析报表', icon: BarChart3, path: '/admin/reports/ticket' },
        { id: 'device-report', label: '设备使用分析报表', icon: BarChart3, path: '/admin/reports/device' },
        { id: 'finance-report', label: '财务对账报表', icon: BarChart3, path: '/admin/reports/finance' },
        { id: 'asset-report', label: '资产运营报表', icon: BarChart3, path: '/admin/reports/asset' },
      ]
    },
    {
      id: 'system',
      label: '系统管理',
      icon: Settings,
      children: [
        { id: 'system-users', label: '用户管理', icon: Users, path: '/admin/system/users' },
        { id: 'system-roles', label: '角色权限', icon: Shield, path: '/admin/system/roles' },
        { id: 'system-params', label: '系统参数', icon: Settings, path: '/admin/system/params' },
        { id: 'system-logs', label: '操作日志', icon: FileText, path: '/admin/system/logs' },
      ]
    },
  ];

  const toggleMenu = (menuId: string) => {
    setExpandedMenus(prev =>
      prev.includes(menuId)
        ? prev.filter(id => id !== menuId)
        : [...prev, menuId]
    );
  };

  const renderMenuItem = (item: MenuItem, level: number = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedMenus.includes(item.id);
    const isActive = location.pathname === item.path;

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
    <aside className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-white border-r border-gray-200 flex flex-col transition-all duration-300 fixed left-0 top-0 bottom-0 z-50`}>
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
        {sidebarOpen && <h1 className="text-lg font-bold text-gray-900">揽月城广场</h1>}
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1 hover:bg-gray-100 rounded">
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* 菜单 */}
      <div className="flex-1 overflow-y-auto py-4">
        {sidebarOpen ? (
          menuItems.map(item => renderMenuItem(item))
        ) : (
          <div className="space-y-2 px-2">
            {menuItems.map(item => (
              <button
                key={item.id}
                onClick={() => item.path && navigate(item.path)}
                className="w-full p-2 hover:bg-gray-100 rounded flex justify-center"
                title={item.label}
              >
                <item.icon className="w-5 h-5 text-gray-700" />
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
  );
}