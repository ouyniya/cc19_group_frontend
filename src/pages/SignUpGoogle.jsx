import React from "react";

const SignUpGoogle = () => {

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
      >Sign up with Google</button>
    </div>
  );
};

export default SignUpGoogle;
