
import React, { useEffect, useState } from 'react';
import { toast } from '@/components/ui/sonner';
import { Loader2 } from 'lucide-react';
import LocationSearch from '@/components/LocationSearch';
import CurrentWeather from '@/components/CurrentWeather';
import Forecast from '@/components/Forecast';
import { 
  getCurrentWeather, 
  getForecast, 
  getDailyForecasts, 
  getCurrentLocation 
} from '@/api/weatherApi';
import { WeatherData, ForecastData, DailyForecast } from '@/types/weather';

const WeatherApp = () => {
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<DailyForecast[]>([]);
  const [locationName, setLocationName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeatherData = async (lat: number, lon: number, name?: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const [weatherData, forecastData] = await Promise.all([
        getCurrentWeather(lat, lon),
        getForecast(lat, lon)
      ]);
      
      setCurrentWeather(weatherData);
      setForecast(getDailyForecasts(forecastData));
      setLocationName(name || weatherData.name);
      
    } catch (err) {
      console.error("Error fetching weather data:", err);
      setError("Failed to load weather data. Please try again.");
      toast.error("Failed to load weather data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLocationSelect = (lat: number, lon: number, name: string) => {
    fetchWeatherData(lat, lon, name);
  };

  const handleMyLocationClick = async () => {
    try {
      const position = await getCurrentLocation();
      fetchWeatherData(position.lat, position.lon);
      toast.success("Using your current location");
    } catch (err) {
      console.error("Error getting current location:", err);
      toast.error("Could not get your location. Please search manually.");
    }
  };

  // On initial load, try to get user's location
  useEffect(() => {
    handleMyLocationClick();
  }, []);

  return (
    <div className="min-h-screen pb-10 weather-gradient">
      <div className="container mx-auto px-4 max-w-5xl py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 primary-gradient text-transparent bg-clip-text">
            Weather Forecast
          </h1>
          <p className="text-muted-foreground mb-6">
            Get real-time weather updates for any location
          </p>

          <LocationSearch 
            onLocationSelect={handleLocationSelect} 
            onMyLocationClick={handleMyLocationClick} 
          />
        </header>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center min-h-[300px]">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="mt-4 text-muted-foreground">Loading weather data...</p>
          </div>
        ) : error ? (
          <div className="text-center text-destructive">
            <p>{error}</p>
            <p className="mt-2">Please try searching for a different location.</p>
          </div>
        ) : (
          <>
            {currentWeather && (
              <CurrentWeather data={currentWeather} className="mb-8" />
            )}
            
            <Forecast forecasts={forecast} />
          </>
        )}
      </div>
      
      <footer className="mt-auto pt-6 text-center text-sm text-muted-foreground">
        <p>Weather data provided by OpenWeatherMap</p>
        <p className="mt-1">© {new Date().getFullYear()} Weather Forecast App</p>
      </footer>
    </div>
  );
};

export default WeatherApp;
