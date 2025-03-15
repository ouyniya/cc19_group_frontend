import React from "react";

const LoginGoogle1 = () => {

  const googleAuth = () => {
		window.open(
			`http://localhost:8899/auth/google/callback`,
			"_self"
		);
	};
  
  return (
    <div>
      <button
        className="btn btn-primary"
        onClick={googleAuth}
      >Sign in with Google</button>
    </div>
  );
};

export default LoginGoogle1;
