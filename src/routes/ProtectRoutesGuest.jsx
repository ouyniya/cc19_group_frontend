import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useUserStore from "../stores/userStore";
import LoadingAnimation from "../components/LoadingAnimation";
import axios from "axios";

function ProtectRoutesGuest({ el, redirectTo = "/home" }) {
  const navigate = useNavigate();
  const actionGetMeOrGoogleLogin = useUserStore(
    (state) => state.actionGetMeOrGoogleLogin
  );
  const { user, googleLoginSuccessful, token } = useUserStore();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user details if not already logged in

    const fetchUser = async () => {
      try {
        console.log("Fetching user...");

        if (!user && token) {
          await actionGetMeOrGoogleLogin(); // Trigger Google login
          return;
        }

        if (response.status === 200) {
          console.log("User fetched successfully:", response.data);
        }
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

  if (loading) return <LoadingAnimation />;

  if (user) {
    console.log("Redirecting to:", redirectTo);
    navigate(redirectTo, { replace: true });
    return null; // Prevent rendering the element if redirected
  }

  return el; // Render the element if the user is not logged in
}

export default ProtectRoutesGuest;
