import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router"; //ช่วยในการทำ routing (การเปลี่ยนหน้า) ในแอปพลิเคชันแบบ single-page application (SPA)
import { GoogleOAuthProvider } from "@react-oauth/google";

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
    {/* เปิดใช้งานการทำ routing ของ React */}
  </BrowserRouter>
);
