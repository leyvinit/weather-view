
import { WeatherData, ForecastData, DailyForecast } from "../types/weather";

const API_KEY = "7efa332cf48aeb9d2d391a51027f1a71";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export async function getCurrentWeather(lat: number, lon: number): Promise<WeatherData> {
  const response = await fetch(
    `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  );
  
  if (!response.ok) {
    throw new Error("Failed to fetch current weather data");
  }
  
  return response.json();
}

export async function getForecast(lat: number, lon: number): Promise<ForecastData> {
  const response = await fetch(
    `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  );
  
  if (!response.ok) {
    throw new Error("Failed to fetch forecast data");
  }
  
  return response.json();
}

export function getDailyForecasts(forecastData: ForecastData): DailyForecast[] {
  // Group forecast data by day
  const dailyData = forecastData.list.reduce<Record<string, ForecastItem[]>>((acc, item) => {
    const date = item.dt_txt.split(' ')[0];
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {});
  
  // Create daily forecasts (excluding today)
  const today = new Date().toISOString().split('T')[0];
  return Object.entries(dailyData)
    .filter(([date]) => date !== today)
    .slice(0, 5)
    .map(([date, items]) => {
      const dayOfWeek = new Date(date).toLocaleDateString('en-US', { weekday: 'short' });
      const minTemp = Math.min(...items.map(item => item.main.temp_min));
      const maxTemp = Math.max(...items.map(item => item.main.temp_max));
      // Get the noon weather condition or the middle of the day
      const middayItem = items.find(item => item.dt_txt.includes('12:00:00')) || items[Math.floor(items.length / 2)];
      
      return {
        date,
        dayOfWeek,
        temp: {
          min: Math.round(minTemp),
          max: Math.round(maxTemp)
        },
        weather: middayItem.weather[0]
      };
    });
}

export async function searchLocation(query: string): Promise<{lat: number, lon: number, name: string}> {
  const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=1&appid=${API_KEY}`);
  
  if (!response.ok) {
    throw new Error("Failed to search location");
  }
  
  const data = await response.json();
  
  if (!data.length) {
    throw new Error("Location not found");
  }
  
  return {
    lat: data[0].lat,
    lon: data[0].lon,
    name: `${data[0].name}, ${data[0].country}`
  };
}

export function getWeatherIcon(iconCode: string): string {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

// Utility to get browser geolocation
export function getCurrentLocation(): Promise<{lat: number, lon: number}> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by your browser"));
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          });
        },
        (error) => {
          reject(error);
        }
      );
    }
  });
}
