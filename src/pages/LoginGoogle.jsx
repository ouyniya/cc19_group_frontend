import { useGoogleLogin } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import { googleLogout } from "@react-oauth/google";
import { useEffect } from "react";

const LoginGoogle = () => {

  const login = useGoogleLogin({
    onSuccess: codeResponse => console.log(codeResponse),
    flow: 'auth-code',
  });

  // console.log(user);

  return (
    <div>
      <h2>Login</h2>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log(credentialResponse);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
      <button className="btn btn-secondary" onClick={() => login()}>
        Sign in with Google 🚀
      </button>

      ; ;<h2>Logout</h2>
      {googleLogout()};
      <button className="btn btn-secondary" onClick={() => googleLogout()}>
         Logout 🚀
      </button>
    </div>
  );
};

export default LoginGoogle;
