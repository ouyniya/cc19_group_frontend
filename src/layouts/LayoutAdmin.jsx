import React from 'react'
import { Outlet } from 'react-router';
import AdminSidebar from '../components/Private/AdminSidebar';


function LayoutAdmin() {

  return (
    <>    
    <div className="flex min-h-screen bg-base-200">
      <AdminSidebar />
      <Outlet />
      {/* ใช้ Outlet เพื่อให้สามารถแสดงผลคอมโพเนนต์อื่นๆ ที่เข้ามาภายใน Layout นี้ได้ */}
     
    </div>
    </>
);
}

export default LayoutAdmin
