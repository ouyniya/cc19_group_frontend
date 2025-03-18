import { useParams } from "react-router";
import PostPage from "../components/PostPage";
import { useEffect } from "react";
import UserDashboard from "./UserDashboard";

function UserDashboardShow() {
  const { userId } = useParams(); // ดึงจาก URL

  return (
    <>
      <UserDashboard userId={userId} />
    </>
  );
}

export default UserDashboardShow;
