import React from "react";
import './loading.css'; // Ensure you create a corresponding CSS file

const LoadingScreen = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="loader">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;