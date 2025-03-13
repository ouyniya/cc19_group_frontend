import { GoogleLogin } from '@react-oauth/google';
import useAuthStores from '../stores/useAuthStores';
import { useEffect } from 'react';

const LoginGoogle = () => {
  const user = useAuthStores((state) => state.user);
  const handleGoogleSuccess = useAuthStores((state) => state.handleGoogleSuccess);

  useEffect(() => {
    handleGoogleSuccessPage()
  }, [])

  const handleGoogleSuccessPage = async () => {
    await handleGoogleSuccess
  }

  console.log(user)

  return (
    <div>
      <h2>Login</h2>
      <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => console.log('Google login failed')} />
    </div>
  );
};

export default LoginGoogle;