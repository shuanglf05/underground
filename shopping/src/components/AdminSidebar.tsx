import { Link, useLocation } from 'react-router-dom';
import {
  TrendingUp,
  Ticket,
  Users,
  DollarSign,
  Clock,
  FileText,
  Settings,
  Cpu,
} from 'lucide-react';

interface MenuItem {
  path: string;
  label: string;
  icon: typeof TrendingUp;
}

const menuItems: MenuItem[] = [
  { path: '/admin/dashboard', label: '工作台', icon: TrendingUp },
  { path: '/admin/tickets', label: '票务管理', icon: Ticket },
  { path: '/admin/members', label: '会员管理', icon: Users },
  { path: '/admin/cashier', label: '收银管理', icon: DollarSign },
  { path: '/admin/assets', label: '资产管理', icon: FileText },
  { path: '/admin/orders', label: '订单管理', icon: Clock },
  { path: '/admin/reports', label: '报表中心', icon: TrendingUp },
  { path: '/admin/system', label: '系统管理', icon: Settings },
  { path: '/admin/devices', label: '设备管理', icon: Cpu },
];

export default function AdminSidebar() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-primary-800 text-white p-6 hidden lg:block">
      <div className="mb-8">
        <h1 className="text-xl font-bold">揽月城广场管理系统</h1>
        <p className="text-xs text-primary-300 mt-1">Lanyuecheng Management</p>
      </div>
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const isActive = currentPath === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                isActive ? 'bg-white/10 text-white' : 'text-primary-300 hover:bg-white/10'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}