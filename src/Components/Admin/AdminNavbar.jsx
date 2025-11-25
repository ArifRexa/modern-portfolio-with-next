'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const AdminNavbar = ({ onLogout }) => {
  const pathname = usePathname();

  // Determine which tab is active based on current path
  const getActiveIndex = () => {
    if (pathname.includes('/admin/chat')) return 0;
    if (pathname.includes('/admin/contact-messages')) return 1;
    return 0; // default to chat
  };

  const activeIndex = getActiveIndex();

  return (
    <nav className="admin-navbar">
      <div className="admin-nav-container">
        <div className="glass-nav-group">
          <Link href="/admin/chat" className={`nav-link ${pathname.includes('/admin/chat') ? 'active' : ''}`}>
            Chat Messages
          </Link>
          <Link href="/admin/contact-messages" className={`nav-link ${pathname.includes('/admin/contact-messages') ? 'active' : ''}`}>
            Contact Messages
          </Link>
          <div
            className="glass-nav-glider"
            style={{ transform: `translateX(${activeIndex * 100}%)` }}
          />
        </div>

        <div className="admin-actions">
          <button
            onClick={onLogout}
            className="logout-btn"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;