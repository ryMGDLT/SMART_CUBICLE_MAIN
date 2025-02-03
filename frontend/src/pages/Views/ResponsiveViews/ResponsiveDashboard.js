import React, { useState, useEffect } from "react";
import DesktopDashboard from "../desktop/Dashboard";
import MobileDashboard from "../mobile/Dashboard";

function ResponsiveDashboard() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile ? <MobileDashboard /> : <DesktopDashboard />;
}

export default ResponsiveDashboard;
