import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useStore } from './stores/useStore';

// Pages - H5
import H5Home from './pages/h5/Home';
import H5Tickets from './pages/h5/Tickets';
import H5TicketDetail from './pages/h5/TicketDetail';
import H5Member from './pages/h5/Member';
import H5MyTickets from './pages/h5/MyTickets';
import H5Orders from './pages/h5/Orders';
import H5Investment from './pages/h5/Investment';

// Pages - Admin
import AdminDashboard from './pages/admin/Dashboard';
import AdminTickets from './pages/admin/Tickets';
import AdminMembers from './pages/admin/Members';
import AdminAssets from './pages/admin/Assets';
import AdminOrders from './pages/admin/Orders';
import AdminCashier from './pages/admin/Cashier';
import AdminReports from './pages/admin/Reports';
import AdminSystem from './pages/admin/System';
import AdminDevices from './pages/admin/Devices';

function App() {
  const initialize = useStore((state) => state.initialize);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <Router>
      <Routes>
        {/* H5 用户端路由 */}
        <Route path="/" element={<Navigate to="/h5/home" replace />} />
        <Route path="/h5" element={<Navigate to="/h5/home" replace />} />
        <Route path="/h5/home" element={<H5Home />} />
        <Route path="/h5/tickets" element={<H5Tickets />} />
        <Route path="/h5/ticket/:id" element={<H5TicketDetail />} />
        <Route path="/h5/member" element={<H5Member />} />
        <Route path="/h5/my-tickets" element={<H5MyTickets />} />
        <Route path="/h5/orders" element={<H5Orders />} />
        <Route path="/h5/investment" element={<H5Investment />} />

        {/* Admin 管理后台路由 */}
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/tickets" element={<AdminTickets />} />
        <Route path="/admin/members" element={<AdminMembers />} />
        <Route path="/admin/cashier" element={<AdminCashier />} />
        <Route path="/admin/assets" element={<AdminAssets />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/admin/reports" element={<AdminReports />} />
        <Route path="/admin/system" element={<AdminSystem />} />
        <Route path="/admin/devices" element={<AdminDevices />} />
      </Routes>
    </Router>
  );
}

export default App;
