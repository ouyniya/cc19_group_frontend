import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import useUserStore from "../stores/userStore";
import { useNavigate } from "react-router";

const LoginGoogle = () => {
  const navigate = useNavigate();
  const actionGoogleLogin = useUserStore((state) => state.actionGoogleLogin);
  const actionGetMe = useUserStore((state) => state.actionGetMe);

  const handleGoogleLogin = async (e) => {
    try {
      const input = {
        username: credentialResponse.credential.family_name,
        email: credentialResponse.credential.email,
        password: null
      }
      const res = await actionGoogleLogin(input);
      // console.log("login success");
      navigate("/home");

      await actionGetMe(res.token);
      return createAlert("success", `Login Success`);
    } catch (error) {
      console.log(error);

      if (error instanceof ZodError) {
        console.log("error,errors", error.errors);
        const errMsg = error.errors.reduce((acc, cur) => {
          acc[cur.path] = cur.message;
          return acc;
        }, {});
        console.log(errMsg);
        setErrorInput(errMsg);
        return console.log("login invalid");
      }
    } 
  };

  return (
    <div>
      <h2>Login</h2>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          // console.log(credentialResponse);
          // family_name
          // email
          // picture
          console.log(jwtDecode(credentialResponse.credential));
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
      {/* <button className="btn btn-secondary" onClick={() => login()}>
        Sign in with Google 🚀
      </button>

      ; ;<h2>Logout</h2>
      {googleLogout()};
      <button className="btn btn-secondary" onClick={() => googleLogout()}>
         Logout 🚀
      </button> */}
    </div>
  );
};

export default LoginGoogle;
