import axios from "axios";

export const trackView = async (postId, token) => {
  return await axios.post(
    "http://localhost:8899/api/track-view",
    {
      token,
      postId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};


// สร้าง token ถ้ายังไม่มี
export const getToken = () => {
    let token = localStorage.getItem("user_token");
    // console.log(token)
    if (!token) {
      token = Math.random().toString(36).substr(2, 16); // สุ่ม token
      localStorage.setItem("user_token", token);
    }
    return token;
  };