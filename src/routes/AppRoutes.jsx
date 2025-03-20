import React from "react"; // ใช้ในการสร้าง components
import { Route, Routes } from "react-router";
import Layout from "../layouts/Layout";

import LayoutUser from "../layouts/LayoutUser";
import LayoutAdmin from "../layouts/LayoutAdmin";
import ProtectRoutes from "./ProtectRoutes";
import ContactUs from "../pages/main/ContactUs";
import AdminUser from "../pages/private/AdminUser";
import AdminAnalysis from "../pages/private/AdminAnalysis";
import AdminPost from "../pages/private/AdminPost";
import PostAndComment from "../pages/PostAndComment";
import Home from "../pages/Home";
import LandingPage from "../pages/LandingPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import UserDashboard from "../pages/UserDashboard";
import WishList from "../pages/WishList";
import CreatePost from "../pages/CreatePost";
import EditProfile from "../pages/EditProfile";
import ErrorNotFound from "../pages/ErrorNotFound";
import ProtectRoutesGuest from "./ProtectRoutesGuest";
import ErrorUnauthorized from "../pages/ErrorUnauthorized";
import UserDashboardShow from "../pages/UserDashboardShow";
import CreatePostPage from "../pages/CreatePostPage";
import AIPlanning from "../pages/private/AIPlanning";
import ProfanityFilter from "../pages/ฺBadword";
import FilterPageDraft from "../pages/FilterPageDraft";
import SuccessPost from "../pages/SuccessPost";

// Route ใช้ในการกำหนดเส้นทาง (route) เฉพาะหนึ่งเส้นทาง
// Routes จะตรวจสอบว่า URL ตรงกับ path ไหน และแสดงคอมโพเนนต์ที่ตรงกับเส้นทางนั้น
// {/* Layout เป็นเหมือนแม่แบบ (template) ที่สามารถแสดงผลได้หลายหน้าภายใน Layout เดียวกัน */}

function AppRoutes() {
  return (
    <>
      <Routes>
        {/* public */}
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="home" element={<Home />} />
          <Route path="filter-page" element={<FilterPageDraft/>} />

          {/* soft protect */}

          <Route
            path="register"
            element={<ProtectRoutesGuest el={<Register />} />}
          />
          <Route path="login" element={<ProtectRoutesGuest el={<Login />} />} />
          <Route
            path="user-dashboard/:userId"
            element={<UserDashboardShow />}
          />
          <Route path="/post/:postId" element={<PostAndComment />} />
        </Route>

        {/* Private: user */}
        <Route
          path="user"
          element={<ProtectRoutes el={<LayoutUser />} allows={["USER"]} />}
        >
          <Route index element={<WishList />} />
          <Route path="wishlist" element={<WishList />} />
          <Route path="plan" element={<AIPlanning />} />
          <Route path="create-post" element={<CreatePostPage />} />
          <Route path="edit-profile" element={<EditProfile />} />
          <Route path="badword" element={<ProfanityFilter/>} />
          <Route path="success-post" element={<SuccessPost/>} />
        </Route>

        {/* Private: Admin */}
        <Route
          path="admin"
          element={<ProtectRoutes el={<LayoutAdmin />} allows={["ADMIN"]} />}
        >
          {/* <Route path="admin" element={<LayoutAdmin />}> */}
          <Route index element={<AdminAnalysis />} />
          <Route path="usermanagement" element={<AdminUser />} />
          <Route path="analysis" element={<AdminAnalysis />} />
          <Route path="postmanagement" element={<AdminPost />} />
        </Route>

        <Route path="*" element={<ErrorNotFound />} />
        <Route path="403" element={<ErrorUnauthorized />} />
      </Routes>
    </>
  );
}

export default AppRoutes;
