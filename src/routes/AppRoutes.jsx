import React from "react"; // ใช้ในการสร้าง components
import { Route, Routes } from "react-router";
import Layout from "../layouts/Layout";

import LayoutUser from "../layouts/LayoutUser";
import LayoutAdmin from "../layouts/LayoutAdmin";
import ProtectRoutes from "./ProtectRoutes";
import NotFound from "../pages/main/NotFound";
import ContactUs from "../pages/main/ContactUs";
import AdminUser from "../pages/private/AdminUser";
import AdminAnalysis from "../pages/private/AdminAnalysis";
import AdminPost from "../pages/private/AdminPost";
import PostAndComment from "../pages/PostAndComment";

// Route ใช้ในการกำหนดเส้นทาง (route) เฉพาะหนึ่งเส้นทาง
// Routes จะตรวจสอบว่า URL ตรงกับ path ไหน และแสดงคอมโพเนนต์ที่ตรงกับเส้นทางนั้น
// {/* Layout เป็นเหมือนแม่แบบ (template) ที่สามารถแสดงผลได้หลายหน้าภายใน Layout เดียวกัน */}

function AppRoutes() {
  return (
    <>
      <Routes>
        {/* public */}
        <Route path="/" element={<Layout />}>
          <Route index element={"home"} />
          <Route path="contact-us" element={<ContactUs />} />
          <Route path="/post/:postId" element={<PostAndComment />} />

        </Route>

        {/* Private: user */}
        <Route
          path="user"
          element={<ProtectRoutes el={<LayoutUser />} allows={["USER"]} />}
        >
          <Route index element={<ContactUs />} />

          <Route path="other" element={"other"} />
          <Route path="user" element={"other"} />
        </Route>

        {/* Private: Admin */}
        {/* <Route
          path="admin"
          element={<ProtectRoutes el={<LayoutAdmin />} allows={["ADMIN"]} />}
        > */}
        
        <Route path="admin" element={<LayoutAdmin />}>
          <Route index element={<AdminAnalysis />} />
          <Route path="usermanagement" element={<AdminUser />} />
          <Route path="analysis" element={<AdminAnalysis />} />
          <Route path="postmanagement" element={<AdminPost/>} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default AppRoutes;
