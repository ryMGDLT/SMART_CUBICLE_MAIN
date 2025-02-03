import React, { useState, useEffect } from "react";
import DesktopSignup from "./desktop/Signup";
import MobileSignup from "./mobile/Signup";

function ResponsiveSignup() {
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
  return isMobile ? <MobileSignup /> : <DesktopSignup />;
}

export default ResponsiveSignup;
