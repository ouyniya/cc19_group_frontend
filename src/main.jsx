import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router' //ช่วยในการทำ routing (การเปลี่ยนหน้า) ในแอปพลิเคชันแบบ single-page application (SPA)


createRoot(document.getElementById('root')).render(
  <BrowserRouter> 
  {/* เปิดใช้งานการทำ routing ของ React */}
    <App />
  </BrowserRouter>,
)
