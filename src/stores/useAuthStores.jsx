import { create } from 'zustand';
import axios from 'axios';

const useAuthStores = create((set) => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
  
    login: (user, token) => {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
      set({ user, token });
    },
  
    logout: () => {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      set({ user: null, token: null });
    },
  
    handleGoogleSuccess: async (response) => {
      try {
        // console.log(response)
        // If using a Google Sign-In package, you will get an ID token as response
        const googleAPIUrl = "?access_token="
      const googleToken = response.credential;
        // const res = await axios.post('http://localhost:8899/api/auth/google/callback', {
        //   token: response.credential,
        //   withCredentials: true  // Make sure cookies are included
        // });
  
        // const data = res.data;
        // useAuthStores.getState().login(data.user, data.token); // Call login to store data
      } catch (err) {
        console.error('Login failed', err);
      }
    },
  }));
  
  export default useAuthStores;