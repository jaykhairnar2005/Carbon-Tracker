
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import AddActivity from './pages/AddActivity';
import Reports from './pages/Reports';
import Tips from './pages/Tips';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import AboutUs from './pages/AboutUs';
import Helpline from './pages/Helpline';
import { AuthProvider, useAuth } from './context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="p-4 text-center">Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="add" element={<ProtectedRoute><AddActivity /></ProtectedRoute>} />
            <Route path="reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
            <Route path="tips" element={<ProtectedRoute><Tips /></ProtectedRoute>} />
            <Route path="profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="helpline" element={<ProtectedRoute><Helpline /></ProtectedRoute>} />
            <Route path="about" element={<AboutUs />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
