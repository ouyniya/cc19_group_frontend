import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useUserStore from "../stores/userStore";
import LoadingAnimation from "../components/LoadingAnimation";

function ProtectRoutesGuest({ el, redirectTo = "/home" }) {
  const navigate = useNavigate();
  const { user, token, actionGetMe } = useUserStore();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (!user && token) {
        try {
          await actionGetMe();
        } catch (error) {
          console.error("Failed to fetch user:", error);
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, [user, token, actionGetMe]);

  if (loading) return <LoadingAnimation />;

  // Redirect if user is logged in
  if (user) {
    navigate(redirectTo, { replace: true });
    return null;
  }

  return el;
}

export default ProtectRoutesGuest;
