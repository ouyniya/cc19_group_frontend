import React from "react";
import { useNavigate } from "react-router";
import lock from "../icons/lock.png";
import c1 from "../icons/c1.png";
import c2 from "../icons/c2.png";
import c3 from "../icons/c3.png";
import c4 from "../icons/c4.png";
import whitePlane from "../icons/whiteplane.png";
import { motion } from "motion/react";

function ErrorUnauthorized() {
  const navigate = useNavigate();

  return (
    <div className="">
      <div className="flex flex-row items-center ">
        <div className="ml-60 mt-15 ">
          <h1 className="title">Forbidden</h1>

          <p className="message ml-15 -mt-5 ">
            Access to this resource on the server is denied!
          </p>
          <button
            className="btn glass  mt-10  text-2xl text-white bg-[#5caff0] h-12 rounded-2xl ml-55"
            onClick={() => navigate("/")}
          >
            Go to Home
          </button>
        </div>

        <div className="flex flex-col">
          <div className="flex">
            <motion.img
              src={c2}
              alt=""
              className="-ml-120 h-full w-full"
              initial={{ x: -10 }} // เริ่มต้นเคลื่อนที่ไปทางซ้ายเล็กน้อย
              animate={{ x: 30 }} // เคลื่อนที่ไปทางขวาเล็กน้อย
              transition={{ duration: 1, loop: Infinity, ease: "linear" }}
            />
            <motion.img
              src={c1}
              alt=""
              className="-ml-20"
              initial={{ x: 1 }} // เริ่มต้นเคลื่อนที่ไปทางขวาเล็กน้อย
              animate={{ x: -10 }} // เคลื่อนที่ไปทางซ้ายเล็กน้อย
              transition={{ duration: 1, loop: Infinity, ease: "linear" }}
            />
          </div>

          <div className="ml-10 w-90 h-110">
            <img src={lock} alt="" className="-mt-80 w-full h-full" />
          </div>
          <div className="ml-10 ">
            <motion.img
              src={c3}
              alt=""
              className="-mt-135 w-full h-full"
              initial={{ y: -1 }} // เริ่มต้นเคลื่อนที่ขึ้นเล็กน้อย
              animate={{ y: 10 }} // เคลื่อนที่ลงเล็กน้อย
              transition={{ duration: 1, loop: Infinity, ease: "linear" }}
            />
          </div>

          <div className="w-80 h-80 -mt-110 -ml-30">
            <motion.img
              src={whitePlane}
              alt="w-full h-full"
              className=""
              initial={{ scale: 0, opacity: 0 }} // ปรับปรุง initial prop
              animate={{ scale: 1, opacity: 1 }} // ปรับปรุง animate prop
              transition={{ duration: 1, loop: Infinity, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>

      {/* Animated Background */}
      <div className="background"></div>

      {/* Styling */}
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100vh;
          text-align: center;
          position: relative;
          z-index: 1;
        }
        .title {
          font-size: 8rem;
          font-weight: bold;
          color: #5caff0;
        }
        .subtitle {
          font-size: 2rem;
          margin-bottom: 10px;
          color: #333;
        }
        .message {
          font-size: 1.5rem;
          color: #666;
          max-width: 500px;
        }
        // .btn {
        //   margin-top: 20px;
        //   padding: 10px 20px;
        //   font-size: 1rem;
        //   font-weight: bold;
        //   background: #5caff0;
        //   color: white;
        //   border: none;
        //   border-radius: 5px;
        //   cursor: pointer;
        //   transition: 0.3s ease;
        // }
        .btn:hover {
          background: rgb(69, 152, 215);
        }

        /* Animated Background */
        .background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(
            circle,
            rgba(18, 159, 247, 0.3),
            transparent
          );
          animation: pulse 2s infinite;
          z-index: -1;
        }
        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.7;
          }
          100% {
            transform: scale(1);
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
}

export default ErrorUnauthorized;
