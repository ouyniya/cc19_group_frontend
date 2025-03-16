import React, { useEffect, useState, useMemo } from "react";
import useUserStore from "../stores/userStore";
import LoadingAnimation from "../components/LoadingAnimation";


function ProtectRoutesGuest({ el }) {
  const [loading, setLoading] = useState(true);
  const actionGetMeOrGoogleLogin = useUserStore((state) => state.actionGetMeOrGoogleLogin);
  const user = useUserStore((state) => state.user);
  const token = useUserStore((state) => state.token);

  useEffect(() => {
    if (!user || !token) {
      actionGetMeOrGoogleLogin().catch((error) =>
        console.error("Failed to fetch user:", error)
      );
    }
  }, [token, user, actionGetMeOrGoogleLogin]);

  const isAuthorized = useMemo(
    () => user,
    [user]
  );

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingAnimation />;
  if (!isAuthorized) <>{el}</>;

  return <>{el}</>;
}

export default ProtectRoutesGuest;
