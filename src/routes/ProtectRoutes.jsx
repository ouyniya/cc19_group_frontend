import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useUserStore from "../stores/userStore";
import ErrorUnauthorized from "../pages/ErrorUnauthorized";
import LoadingAnimation from "../components/LoadingAnimation";

function ProtectRoute({ el, allows }) {
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(null);
  const [loading, setLoading] = useState(true); // Independent loading state
  const {
    user,
    actionGetMeOrGoogleLogin,
    isLoading,
    token,
    googleLoginSuccessful,
  } = useUserStore();

  // Fetch user data once the component mounts
  useEffect(() => {
    // Fetch user details if not already logged in

    const fetchUser = async () => {
      try {
        console.log("Fetching user...");
        await actionGetMeOrGoogleLogin(); // Trigger Google login
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false); // Stop loading state
      }
    };

    if (!user && (!googleLoginSuccessful || !!token)) {
      fetchUser();
    } else {
      setLoading(false); // Skip fetching if the user is already logged in
    }
  }, [user, googleLoginSuccessful, actionGetMeOrGoogleLogin]);

  // Check if the user is authorized once the user data is fetched
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isLoading && user) {
        const authorized = allows.includes(user.role);
        setIsAuthorized(authorized);

        if (!authorized) {
          navigate("/403"); // Redirect to 403 if unauthorized
        }
      }
    }, 1500); // Wait for 1500ms before checking authorization

    return () => clearTimeout(timeout); // Cleanup timeout on unmount
  }, [user, isLoading, allows, navigate]);

  // Show loading animation while user data is being fetched
  if (loading) return <LoadingAnimation />;

  // If no user is available or user is unauthorized, show the error page
  if (!user || isAuthorized === false) return <ErrorUnauthorized />;

  // Render the component if authorized
  return <>{el}</>;
}

export default ProtectRoute;
