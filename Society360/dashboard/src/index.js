import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route, Outlet} from "react-router-dom"
import './index.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Visitors from './components/Visitors';
import Maintenance from './components/Maintenance';
import Billing from './components/Billing';
import Announcement from './components/Announcement';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import AdminLayout from './components/AdminLayout';
import AdminVisitors from './components/AdminVisitors';
import AdminMaintenance from './components/AdminMaintenance';
import AdminAnnouncements from './components/AdminAnnouncements';
import AdminBilling from './components/AdminBilling';
import { Navigate } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Public Routes with Navbar */}
        <Route element={<><Navbar/><br/><br/><Outlet /></>}>
          <Route path="/" element={<Home />}/>
          <Route path="/visitors" element={<Visitors/>}/>
          <Route path="/maintenance" element={<Maintenance/>}/>
          <Route path="/billing" element={<Billing/>}/>
          <Route path="/announcements" element={<Announcement/>}/>
        </Route>

        {/* Public Admin Login - without Navbar */}
        <Route path="/admin/login" element={<AdminLogin />} />
        
        {/* Protected Admin Routes - without Navbar */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          {/* <Route path="users" element={<UserManagement />} /> */}
          <Route path="maintenance" element={<AdminMaintenance />} />
          <Route path="visitors" element={<AdminVisitors />} />
          <Route path="units" element={<div>Units Management</div>} />
          <Route path="billing" element={<AdminBilling />} />
          <Route path="announcements" element={<AdminAnnouncements />} />
        </Route>
        
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);