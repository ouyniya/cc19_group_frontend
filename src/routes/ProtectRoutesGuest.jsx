import React, { useEffect, useState, useMemo } from "react";
import useUserStore from "../stores/userStore";
import LoadingAnimation from "../components/LoadingAnimation";
import { useNavigate } from "react-router";

function ProtectRoutesGuest({ el, redirectTo = "/home" }) {
  const navigate = useNavigate();
  const actionGetMeOrGoogleLogin = useUserStore((state) => state.actionGetMeOrGoogleLogin);
  const { user, token, actionGetMe } = useUserStore();
  
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchUser = async () => {
      if (!user || !token) {
        try {
          await actionGetMeOrGoogleLogin();
        } catch (error) {
          console.error("Failed to fetch user:", error);
        }
      }
      setLoading(false);
    };
    
    fetchUser();
  }, [user, token, actionGetMeOrGoogleLogin]);
  
  if (loading) return <LoadingAnimation />;
  
  // Redirect if user is logged in
  console.log('***', user)
  if (user) {
    navigate(redirectTo, { replace: true });
    return null;
  }

  return el;
}

export default ProtectRoutesGuest;
