import { useEffect, useState } from "react";
import { FadeLoader } from "react-spinners";
import { WiDaySunny, WiDayCloudyHigh, WiRain, WiSnow } from "react-icons/wi";

const API_KEY = import.meta.env.VITE_APP_OPENWEATHER_API_KEY;

function Weather() {
  const [val, setVal] = useState('');
  const [city, setCity] = useState("Kathmandu");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function handleClick() {
    if (val.trim()) setCity(val.trim());
  }

  const fetchData = async (url) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to Fetch Data");
      }
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError("City not found");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
    fetchData(api);
  }, [city]);

  if (loading) return <FadeLoader color="#000" />;

  if (error) return <p className="text-red-500">Error: {error}</p>;

  if (!result) return null; 

  const mainWeather = result.weather[0]?.main.toLowerCase();
  const cloudiness = result.clouds?.all;

  const getWeatherIcon = () => {
    if (mainWeather.includes('clear') && cloudiness < 20) return <WiDaySunny className="text-6xl" />;
    if (mainWeather.includes('clouds') || cloudiness >= 20) return <WiDayCloudyHigh className="text-6xl" />;
    if (mainWeather.includes('rain')) return <WiRain className="text-6xl" />;
    if (mainWeather.includes('snow')) return <WiSnow className="text-6xl" />;
    return null; 
  };

  return (
    <div className="h-screen bg-primary-white flex justify-center items-center text-def-black">
      <div className="bg-sec-yellow h-80 w-80 rounded-xl p-4 shadow-lg">
        <input
          type="text"
          value={val}
          onChange={(e) => setVal(e.target.value)}
          placeholder="Enter city name"
          className="w-full p-2 rounded mb-4 focus:outline-none border"
        />
        <button
          className="rounded bg-blue-500 text-primary-white p-2 w-full mb-4"
          onClick={handleClick}
        >
          Get Weather
        </button>
        <div className="text-center">
          {getWeatherIcon()}
          {result && (
            <div className="w-full">
              <p className="text-lg font-bold">City: {result.name}</p>
              <p>Temperature: {(result.main.temp - 273.15).toFixed(2)} °C</p>
              <p>Weather: {result.weather[0].description}</p>
              <p>Humidity: {result.main.humidity}%</p>
              <p>Cloudiness: {cloudiness}%</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Weather;
