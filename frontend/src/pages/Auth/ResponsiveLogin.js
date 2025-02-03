import React, { useState, useEffect } from "react";
import DesktopLogin from "./desktop/Login";
import MobileLogin from "./mobile/Login";

function ResponsiveLogin() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    // Handle window resize
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Render either mobile or desktop component based on screen size
  return isMobile ? <MobileLogin /> : <DesktopLogin />;
}

export default ResponsiveLogin;
