import React from "react";
import { useNavigate } from "react-router";

function ErrorUnauthorized() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1 className="title">403</h1>
      <h2 className="subtitle">Unauthorized Access</h2>
      <p className="message">
        Sorry, you don’t have permission to view this page.
      </p>
      <button className="btn" onClick={() => navigate("/")}>
        Go to Home
      </button>

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
          color: #5CAFF0;
        }
        .subtitle {
          font-size: 2rem;
          margin-bottom: 10px;
          color: #333;
        }
        .message {
          font-size: 1.2rem;
          color: #666;
          max-width: 400px;
        }
        .btn {
          margin-top: 20px;
          padding: 10px 20px;
          font-size: 1rem;
          font-weight: bold;
          background: #5CAFF0;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: 0.3s ease;
        }
        .btn:hover {
          background:rgb(69, 152, 215);
        }

        /* Animated Background */
        .background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle, rgba(18, 159, 247, 0.3), transparent);
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
