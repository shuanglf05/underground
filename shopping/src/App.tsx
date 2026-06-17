import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './components/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import Members from './pages/admin/Members';
import MemberLevels from './pages/admin/MemberLevels';
import MemberDiscount from './pages/admin/MemberDiscount';
import MemberSync from './pages/admin/MemberSync';
import Tickets from './pages/admin/Tickets';
import Orders from './pages/admin/Orders';
import Products from './pages/admin/Products';
import Inventory from './pages/admin/Inventory';
import Purchase from './pages/admin/Purchase';
import Sales from './pages/admin/Sales';
import Fees from './pages/admin/Fees';
import Lease from './pages/admin/Lease';
import Investment from './pages/admin/Investment';
import Maintenance from './pages/admin/Maintenance';
import Scrap from './pages/admin/Scrap';
import Waste from './pages/admin/Waste';
import Replenish from './pages/admin/Replenish';
import Vending from './pages/admin/Vending';
import Devices from './pages/admin/Devices';
import DeviceConfig from './pages/admin/DeviceConfig';
import Assets from './pages/admin/Assets';
import Reports from './pages/admin/Reports';
import System from './pages/admin/System';
import WorkOrders from './pages/admin/WorkOrders';
import Cashier from './pages/admin/Cashier';
import ServiceHome from './pages/service/Home';
import ServiceProfile from './pages/service/Profile';
import ServiceWorkOrders from './pages/service/WorkOrders';
import ServiceDeviceReport from './pages/service/DeviceReport';
import ServiceDataDetail from './pages/service/DataDetail';
import ServiceAddOrder from './pages/service/AddOrder';
import ServiceVerify from './pages/service/Verify';
import CounterHome from './pages/counter/Home';
import CounterCashier from './pages/counter/Cashier';
import CounterSales from './pages/counter/Sales';
import CounterBracelets from './pages/counter/Bracelets';
import CounterService from './pages/counter/Service';
import CounterProfile from './pages/counter/Profile';
import CounterNotifications from './pages/counter/Notifications';
import CounterSettings from './pages/counter/Settings';
import CounterSecurity from './pages/counter/Security';
import CounterLogs from './pages/counter/Logs';
import CounterHelp from './pages/counter/Help';
import CounterLogin from './pages/counter/Login';
import UserHome from './pages/user/Home';
import UserProfile from './pages/user/Profile';
import UserTickets from './pages/user/Tickets';
import UserTicketDetail from './pages/user/TicketDetail';
import UserMember from './pages/user/Member';
import UserInvestment from './pages/user/Investment';
import UserLogin from './pages/user/Login';
import TestPage from './pages/TestPage';

function App() {
  return (
    <BrowserRouter basename="/underground">
      <Routes>
        <Route path="/test" element={<TestPage />} />
        
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="members" element={<Members />} />
          <Route path="member-levels" element={<MemberLevels />} />
          <Route path="member-discount" element={<MemberDiscount />} />
          <Route path="member-sync" element={<MemberSync />} />
          <Route path="tickets" element={<Tickets />} />
          <Route path="orders" element={<Orders />} />
          <Route path="products" element={<Products />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="purchase" element={<Purchase />} />
          <Route path="sales" element={<Sales />} />
          <Route path="fees" element={<Fees />} />
          <Route path="lease" element={<Lease />} />
          <Route path="investment" element={<Investment />} />
          <Route path="maintenance" element={<Maintenance />} />
          <Route path="scrap" element={<Scrap />} />
          <Route path="waste" element={<Waste />} />
          <Route path="replenish" element={<Replenish />} />
          <Route path="vending" element={<Vending />} />
          <Route path="devices" element={<Devices />} />
          <Route path="device-config" element={<DeviceConfig />} />
          <Route path="assets" element={<Assets />} />
          <Route path="reports" element={<Reports />} />
          <Route path="system" element={<System />} />
          <Route path="workorders" element={<WorkOrders />} />
          <Route path="cashier" element={<Cashier />} />
        </Route>
        
        <Route path="/service/profile" element={<ServiceProfile />} />
        <Route path="/service/workorders" element={<ServiceWorkOrders />} />
        <Route path="/service/device-report" element={<ServiceDeviceReport />} />
        <Route path="/service/data-detail" element={<ServiceDataDetail />} />
        <Route path="/service/add-order" element={<ServiceAddOrder />} />
        <Route path="/service/verify" element={<ServiceVerify />} />
        <Route path="/service" element={<ServiceHome />} />
        
        <Route path="/counter/login" element={<CounterLogin />} />
        <Route path="/counter/cashier" element={<CounterCashier />} />
        <Route path="/counter/sales" element={<CounterSales />} />
        <Route path="/counter/bracelets" element={<CounterBracelets />} />
        <Route path="/counter/service" element={<CounterService />} />
        <Route path="/counter/profile" element={<CounterProfile />} />
        <Route path="/counter/notifications" element={<CounterNotifications />} />
        <Route path="/counter/settings" element={<CounterSettings />} />
        <Route path="/counter/security" element={<CounterSecurity />} />
        <Route path="/counter/logs" element={<CounterLogs />} />
        <Route path="/counter/help" element={<CounterHelp />} />
        <Route path="/counter" element={<CounterHome />} />
        
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/profile" element={<UserProfile />} />
        <Route path="/user/tickets" element={<UserTickets />} />
        <Route path="/user/ticket/:id" element={<UserTicketDetail />} />
        <Route path="/user/member" element={<UserMember />} />
        <Route path="/user/investment" element={<UserInvestment />} />
        <Route path="/user/my-tickets" element={<UserTickets />} />
        <Route path="/user" element={<UserHome />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;