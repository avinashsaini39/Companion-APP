import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DashboardAdmin from './pages/Admin/Dashboard';
import Signin from './pages/signin/Signin';
import ProtectedRoute from './ProtectedRoute';
import UserDashboard from './pages/User/UserDashboard';

// Unauthorized component
const Unauthorized = () => (
  <div>
    <h1>Access Denied</h1>
    <p>You are not authorized to view this page.</p>
    <a href="/">Go to Sign-in</a>
  </div>
);

// 404 Component
const NotFound = () => (
  <div>
    <h1>404</h1>
    <p>Page not found.</p>
    <a href="/">Go to Sign-in</a>
  </div>
);

const App = () => (
  <Router>
    <Routes>
      {/* Public route for sign-in */}
      <Route path="/" element={<Signin />} />

      {/* Admin dashboard (admin-only) */}
      <Route
        path="/dashboard-admin"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <DashboardAdmin />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard-user"
        element={
          <ProtectedRoute allowedRoles={['manager', 'admin', 'user']}>
            <UserDashboard />
          </ProtectedRoute>
        }
      />
      

      {/* Unauthorized page */}
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Fallback route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
);

export default App;
