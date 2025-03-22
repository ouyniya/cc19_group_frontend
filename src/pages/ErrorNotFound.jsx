import React from "react";
import { useNavigate } from "react-router";
import guy from "../icons/guy.png";
import book from "../icons/book.png";

function ErrorNotFound() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="flex flex-row">
        {" "}
        {/* Guy */}
        <div className="w-150 h-150 mt-50">
          <img src={guy} alt="" className="w-full h-full" />
        </div>
        {/* text 404 */}
        <div className="flex flex-col">
          {" "}
          <div className="flex">
            {" "}
            <p className="text-8xl -ml-50 mt-20 font-bold -rotate-4 text-[#808080]">
              Oops
            </p>
            <h1 className="text-8xl ml-2 mt-20 font-bold rotate-6 text-[#808080]">
              !
            </h1>
          </div>
          <div className="flex -mt-15">
            {" "}
            <h1 className="title -rotate-10">4</h1>
            <h1 className="title ml-2 -mt-7 rotate-6">0</h1>
            <h1 className="title ">4</h1>
          </div>
          <h2 className="subtitle font-bold -mt-20 ">Page Not Found</h2>
          <p className="message ml-10">
            The page you are looking for doesn't exist or has been moved.
          </p>
          <button
            className="btn glass bg-[#5caff0] w-50 h-15 text-2xl rounded-3xl mt-20 ml-38 text-white"
            onClick={() => navigate("/home")}
          >
            Go to Home
          </button>
        </div>
        {/* Passport book */}
        <div className="w-60 h-60 rotate-20 mt-100 ml-20">
          <img src={book} alt="" className="w-full h-full" />
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
          font-size: 15rem;
          font-weight: bold;
          color: #5caff0;
        }
        .subtitle {
          font-size: 3rem;
          margin-bottom: 10px;
          color: gray;
        }
        .message {
          font-size: 1.2rem;
          color: #666;
          max-width: 400px;
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

export default ErrorNotFound;
