import React, { useEffect, useState } from "react";
import useUserStore from "../stores/userStore";
import ErrorUnauthorized from "../pages/ErrorUnauthorized";
import LoadingAnimation from "../components/LoadingAnimation";

function ProtectRoute({ el, allows }) {
  const [ok, setOk] = useState(null);
  const [loading, setLoading] = useState(true); // เพิ่ม state สำหรับควบคุม loading

  const actionGetMe = useUserStore((state) => state.actionGetMe);
  const user = useUserStore((state) => state.user);
  const token = useUserStore((state) => state.token);

  useEffect(() => {
    const fetchUser = async () => {
      if (!user && token) {
        try {
          await actionGetMe(); // Fetch current user data if not available
        } catch (error) {
          console.error("Failed to fetch user:", error);
        }
      }
    };
    fetchUser();
  }, [token, user, actionGetMe]);

  useEffect(() => {
    if (user) {
      setOk(allows.includes(user.role));
    } else {
      setOk(false);
    }
  }, [user, allows]);

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        setOk(allows.includes(user.role));
        setLoading(false); // ปิด loading หลัง 1 วินาที
      }, 2000);
    } else {
      setTimeout(() => {
        setOk(false);
        setLoading(false); // ปิด loading หลัง 1 วินาที
      }, 2000);
    }
  }, [user, allows]);

  if (loading) return <LoadingAnimation />; // แสดง Loading Animation
  if (!ok) return <ErrorUnauthorized />;

  return <>{el}</>;
}

export default ProtectRoute;
