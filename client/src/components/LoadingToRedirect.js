import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LoadingToRedirect () {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);

    count === 0 && navigate("/login");
    return () => clearInterval(interval);
  }, [count, navigate]);
  return (
    <div style={{ marginTop: "100px" }}>
      {/* <h5 style={{color:"#fff"}}>Redirecting you in {count} seconds</h5> */}
      <h5 style={{color:"#fff"}}>Yönlendiriliyorsunuz... {count} saniye</h5>
    </div>
  );
};

export default LoadingToRedirect;