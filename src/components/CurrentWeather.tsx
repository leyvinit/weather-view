
import React from 'react';
import { Wind, Droplets, Eye, Thermometer } from 'lucide-react';
import { WeatherData } from '../types/weather';
import { Card } from './ui/card';
import WeatherIcon from './WeatherIcon';

interface CurrentWeatherProps {
  data: WeatherData;
  className?: string;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data, className = "" }) => {
  const formatTime = (timestamp: number) => {
    const date = new Date((timestamp + data.timezone) * 1000);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'UTC'
    });
  };

  return (
    <div className={`animate-scale-in ${className}`}>
      <Card className="glass-card weather-gradient p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h2 className="text-2xl font-bold">{data.name}</h2>
            <p className="text-muted-foreground">{new Date().toLocaleDateString('en-US', { 
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</p>
          </div>
          
          <div className="flex flex-row items-center justify-center">
            <WeatherIcon 
              iconCode={data.weather[0].icon} 
              size={64} 
              className="text-primary" 
            />
            <div className="ml-4 text-center">
              <p className="text-5xl font-bold">{Math.round(data.main.temp)}°C</p>
              <p className="capitalize text-lg text-muted-foreground">
                {data.weather[0].description}
              </p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="flex flex-col items-center bg-white/30 rounded-xl p-3">
            <div className="flex items-center text-primary">
              <Thermometer size={20} className="mr-2" />
              <span>Feels Like</span>
            </div>
            <p className="text-xl font-semibold mt-1">{Math.round(data.main.feels_like)}°C</p>
          </div>
          
          <div className="flex flex-col items-center bg-white/30 rounded-xl p-3">
            <div className="flex items-center text-primary">
              <Wind size={20} className="mr-2" />
              <span>Wind</span>
            </div>
            <p className="text-xl font-semibold mt-1">{Math.round(data.wind.speed)} m/s</p>
          </div>
          
          <div className="flex flex-col items-center bg-white/30 rounded-xl p-3">
            <div className="flex items-center text-primary">
              <Droplets size={20} className="mr-2" />
              <span>Humidity</span>
            </div>
            <p className="text-xl font-semibold mt-1">{data.main.humidity}%</p>
          </div>
          
          <div className="flex flex-col items-center bg-white/30 rounded-xl p-3">
            <div className="flex items-center text-primary">
              <Eye size={20} className="mr-2" />
              <span>Visibility</span>
            </div>
            <p className="text-xl font-semibold mt-1">{(data.visibility / 1000).toFixed(1)} km</p>
          </div>
        </div>
        
        <div className="flex justify-between mt-6 text-sm text-muted-foreground">
          <div className="text-center">
            <p>Sunrise</p>
            <p className="font-medium">{formatTime(data.sys.sunrise)}</p>
          </div>
          <div className="text-center">
            <p>Sunset</p>
            <p className="font-medium">{formatTime(data.sys.sunset)}</p>
          </div>
          <div className="text-center">
            <p>Pressure</p>
            <p className="font-medium">{data.main.pressure} hPa</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CurrentWeather;
