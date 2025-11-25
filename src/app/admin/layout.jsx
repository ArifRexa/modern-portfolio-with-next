'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import AdminNavbar from '@/Components/Admin/AdminNavbar';

export default function AdminLayout({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = () => {
      const storedAuth = sessionStorage.getItem('adminAuth');
      if (storedAuth === 'true') {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    };

    checkAuth();

    // Add storage event listener to handle auth changes from other tabs
    const handleStorageChange = () => {
      checkAuth();
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuth');
    setIsAuthenticated(false);
    // Redirect to login page
    window.location.href = '/admin-login';
  };

  // Show loading while checking auth
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-200 p-6">
        <div className="text-center py-12">Checking authentication...</div>
      </div>
    );
  }

  // If not authenticated and not on login page, redirect to login page
  if (isAuthenticated === false && pathname !== '/admin-login') {
    if (typeof window !== 'undefined') {
      window.location.href = '/admin-login';
    }
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200">
      <AdminNavbar onLogout={handleLogout} />
      <div className="p-6">
        {children}
      </div>
    </div>
  );
}