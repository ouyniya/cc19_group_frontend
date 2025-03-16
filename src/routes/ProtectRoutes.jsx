import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useUserStore from "../stores/userStore";
import ErrorUnauthorized from "../pages/ErrorUnauthorized";
import LoadingAnimation from "../components/LoadingAnimation";

function ProtectRoute({ el, allows }) {
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(null);
  const [loading, setLoading] = useState(true); // Independent loading state
  const { user } = useUserStore();

  useEffect(() => {
    const authorized = allows.includes(user?.role);
    setIsAuthorized(authorized);
    setLoading(false);
  }, []);

  // console.log(isAuthorized);

  // Show loading animation while user data is being fetched
  if (loading) return <LoadingAnimation />;

  // If no user is available or user is unauthorized, show the error page
  if (!user || !isAuthorized) {
    return <ErrorUnauthorized />;
  }

  return <>{el}</>;
}

export default ProtectRoute;
