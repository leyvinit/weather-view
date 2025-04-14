
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Cloud, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center weather-gradient">
      <div className="text-center glass-card p-8 max-w-md">
        <Cloud className="w-16 h-16 mx-auto mb-4 text-primary animate-bounce-in" />
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-6">Oops! The forecast for this page is cloudy with a chance of 404.</p>
        <Button asChild className="bg-primary hover:bg-primary/90">
          <a href="/" className="flex items-center">
            <Home className="mr-2 h-4 w-4" />
            Return to Weather
          </a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
