import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100%' }}>
      <Sidebar />
      <main style={{ 
        flex: 1, 
        padding: '32px 48px',
        maxWidth: '1200px',
        margin: '0 auto',
        height: '100vh',
        overflowY: 'auto'
      }}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
