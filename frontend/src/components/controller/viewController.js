import React, { useState, useEffect } from "react";

function ResponsiveView({ desktopComponent: DesktopComponent, mobileComponent: MobileComponent }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile ? <MobileComponent /> : <DesktopComponent />;
}

export default ResponsiveView;
