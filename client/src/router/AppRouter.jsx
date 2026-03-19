import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../components/common/ProtectedRoute';
import RoleRoute from '../components/common/RoleRoute';
import DashboardLayout from '../components/layout/DashboardLayout';
import PublicLayout from '../components/layout/PublicLayout';
import { ROLES } from '../constants/roles';
import AdminDashboard from '../pages/admin/AdminDashboard';
import ClientDashboard from '../pages/client/ClientDashboard';
import MyBookings from '../pages/client/MyBookings';
import Profile from '../pages/client/Profile';
import FinanceDashboard from '../pages/finance/FinanceDashboard';
import MarketingDashboard from '../pages/marketing/MarketingDashboard';
import Contact from '../pages/public/Contact';
import Home from '../pages/public/Home';
import Login from '../pages/public/Login';
import PackageDetails from '../pages/public/PackageDetails';
import Packages from '../pages/public/Packages';
import Register from '../pages/public/Register';
import SupportDashboard from '../pages/support/SupportDashboard';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/packages/:id" element={<PackageDetails />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/my-bookings" element={<MyBookings />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>

        <Route element={<RoleRoute allowedRoles={[ROLES.REGISTERED_CLIENT]} />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<ClientDashboard />} />
          </Route>
        </Route>

        <Route element={<RoleRoute allowedRoles={[ROLES.ADMIN]} />}>
          <Route element={<DashboardLayout />}>
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>
        </Route>

        <Route element={<RoleRoute allowedRoles={[ROLES.MARKETING_MANAGER, ROLES.ADMIN]} />}>
          <Route element={<DashboardLayout />}>
            <Route path="/marketing" element={<MarketingDashboard />} />
          </Route>
        </Route>

        <Route element={<RoleRoute allowedRoles={[ROLES.FINANCE_MANAGER, ROLES.ADMIN]} />}>
          <Route element={<DashboardLayout />}>
            <Route path="/finance" element={<FinanceDashboard />} />
          </Route>
        </Route>

        <Route element={<RoleRoute allowedRoles={[ROLES.SUPPORT_AGENT, ROLES.ADMIN]} />}>
          <Route element={<DashboardLayout />}>
            <Route path="/support" element={<SupportDashboard />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
