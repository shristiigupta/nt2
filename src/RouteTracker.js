import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { trackPageView } from "./analytics";

const RouteTracker = () => {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location]);

  return null;
};

export default RouteTracker;
