import React from "react"; // ใช้ในการสร้าง components
import { Route, Routes } from "react-router";
import Layout from "../layouts/Layout";

import LayoutUser from "../layouts/LayoutUser";
import LayoutAdmin from "../layouts/LayoutAdmin";
import ProtectRoutes from "./ProtectRoutes";
import NotFound from "../pages/main/NotFound";
import ContactUs from "../pages/main/ContactUs";

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
          <Route path="contact-us" element={"..."} />
          <Route path="contact-us" element={"..."} />

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
        <Route
          path="admin"
          element={<ProtectRoutes el={<LayoutAdmin />} allows={["ADMIN"]} />}
        >
          <Route index element={"admin profile"} />
          <Route path="user" element={"other"} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default AppRoutes;
