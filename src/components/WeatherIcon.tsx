
import React from 'react';
import { 
  Cloud, 
  CloudDrizzle, 
  CloudFog, 
  CloudLightning, 
  CloudRain, 
  CloudSnow, 
  Sun, 
  SunDim
} from 'lucide-react';

interface WeatherIconProps {
  iconCode: string;
  className?: string;
  size?: number;
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ iconCode, className = "", size = 24 }) => {
  // Map OpenWeatherMap icon codes to Lucide icons
  const getIcon = () => {
    // First two characters represent the weather condition
    const condition = iconCode.substring(0, 2);
    
    switch (condition) {
      case '01': // clear sky
        return <Sun size={size} className={className} />;
      case '02': // few clouds
        return <SunDim size={size} className={className} />;
      case '03': // scattered clouds
      case '04': // broken clouds
        return <Cloud size={size} className={className} />;
      case '09': // shower rain
        return <CloudDrizzle size={size} className={className} />;
      case '10': // rain
        return <CloudRain size={size} className={className} />;
      case '11': // thunderstorm
        return <CloudLightning size={size} className={className} />;
      case '13': // snow
        return <CloudSnow size={size} className={className} />;
      case '50': // mist
        return <CloudFog size={size} className={className} />;
      default:
        return <Sun size={size} className={className} />;
    }
  };

  return getIcon();
};

export default WeatherIcon;
