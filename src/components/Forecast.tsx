
import React from 'react';
import { Card } from './ui/card';
import { DailyForecast } from '../types/weather';
import WeatherIcon from './WeatherIcon';

interface ForecastProps {
  forecasts: DailyForecast[];
  className?: string;
}

const Forecast: React.FC<ForecastProps> = ({ forecasts, className = "" }) => {
  if (!forecasts.length) {
    return null;
  }

  return (
    <div className={`${className} animate-fade-in`}>
      <h2 className="text-xl font-semibold mb-4">5-Day Forecast</h2>
      <Card className="glass-card weather-gradient p-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {forecasts.map((forecast, index) => (
            <div 
              key={forecast.date} 
              className="flex flex-col items-center p-3 bg-white/30 rounded-xl"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <p className="font-medium">{forecast.dayOfWeek}</p>
              <WeatherIcon iconCode={forecast.weather.icon} size={36} className="my-2 text-primary" />
              <p className="text-sm capitalize">{forecast.weather.description}</p>
              <div className="flex justify-between w-full mt-2">
                <p className="font-semibold">{forecast.temp.max}°</p>
                <p className="text-muted-foreground">{forecast.temp.min}°</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Forecast;
