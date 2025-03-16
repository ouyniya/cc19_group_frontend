import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useUserStore from "../stores/userStore";
import ErrorUnauthorized from "../pages/ErrorUnauthorized";
import LoadingAnimation from "../components/LoadingAnimation";

function ProtectRoute({ el, allows }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(null);

  const { user, token, actionGetMe } = useUserStore();

  useEffect(() => {
    const fetchUser = async () => {
      if (!user && token) {
        try {
          await actionGetMe();
        } catch (error) {
          console.error("Failed to fetch user:", error);
        }
      }
      setTimeout(() => setLoading(false), 1500); 
    };

    fetchUser();
  }, [user, token, actionGetMe]);

  useEffect(() => {
    if (!loading) {
      const authorized = user ? allows.includes(user.role) : false;
      setIsAuthorized(authorized);
      if (!authorized) {
        navigate("/403"); // Redirect if unauthorized
      }
    }
  }, [user, allows, loading, navigate]);

  if (loading) return <LoadingAnimation />;
  if (isAuthorized === false) return <ErrorUnauthorized />;

  return <>{el}</>;
}

export default ProtectRoute;
