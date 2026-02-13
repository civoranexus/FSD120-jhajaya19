// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import {BrowserRouter, Routes, Route, Outlet} from "react-router-dom"
// import './index.css';
// import Home from './components/Home';
// import Navbar from './components/Navbar';
// import Visitors from './components/Visitors';
// import Maintenance from './components/Maintenance';
// import Billing from './components/Billing';
// import Announcement from './components/Announcement';
// import AdminLogin from './components/AdminLogin';
// import AdminDashboard from './components/AdminDashboard';
// import AdminLayout from './components/AdminLayout';
// import AdminVisitors from './components/AdminVisitors';
// import AdminMaintenance from './components/AdminMaintenance';
// import AdminAnnouncements from './components/AdminAnnouncements';
// import AdminBilling from './components/AdminBilling';
// import { Navigate } from 'react-router-dom';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <Routes>
//         {/* Public Routes with Navbar */}
//         <Route element={<><Navbar/><br/><br/><Outlet /></>}>
//           <Route path="/" element={<Home />}/>
//           <Route path="/visitors" element={<Visitors/>}/>
//           <Route path="/maintenance" element={<Maintenance/>}/>
//           <Route path="/billing" element={<Billing/>}/>
//           <Route path="/announcements" element={<Announcement/>}/>
//         </Route>

//         {/* Public Admin Login - without Navbar */}
//         <Route path="/admin/login" element={<AdminLogin />} />
        
//         {/* Protected Admin Routes - without Navbar */}
//         <Route path="/admin" element={<AdminLayout />}>
//           <Route index element={<Navigate to="/admin/dashboard" />} />
//           <Route path="dashboard" element={<AdminDashboard />} />
//           {/* <Route path="users" element={<UserManagement />} /> */}
//           <Route path="maintenance" element={<AdminMaintenance />} />
//           <Route path="visitors" element={<AdminVisitors />} />
//           <Route path="units" element={<div>Units Management</div>} />
//           <Route path="billing" element={<AdminBilling />} />
//           <Route path="announcements" element={<AdminAnnouncements />} />
//         </Route>
        
//         <Route path="*" element={<div>404 - Page Not Found</div>} />
//       </Routes>
//     </BrowserRouter>
//   </React.StrictMode>
// );


import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route, Outlet, Navigate} from "react-router-dom";
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

// Create a Protected Route wrapper for admin
const ProtectedAdminRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  if (!token || user.role !== 'admin') {
    return <Navigate to="/admin/login" replace />;
  }
  
  return children;
};

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

        {/* Public Admin Login - OUTSIDE any admin layout */}
        <Route path="/admin/login" element={<AdminLogin />} />
        
        {/* Protected Admin Routes - separate route group */}
        <Route path="/admin" element={
          <ProtectedAdminRoute>
            <AdminLayout />
          </ProtectedAdminRoute>
        }>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="maintenance" element={<AdminMaintenance />} />
          <Route path="visitors" element={<AdminVisitors />} />
          <Route path="units" element={<div>Units Management</div>} />
          <Route path="billing" element={<AdminBilling />} />
          <Route path="announcements" element={<AdminAnnouncements />} />
        </Route>
        
        {/* Catch all - 404 */}
        <Route path="*" element={<div style={{padding: '20px', textAlign: 'center'}}>
          <h2>404 - Page Not Found</h2>
          <p>The page you're looking for doesn't exist.</p>
          <button onClick={() => window.location.href = '/'}>
            Go to Home
          </button>
        </div>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);