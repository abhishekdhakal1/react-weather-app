import { useEffect, useState } from "react";
import { FadeLoader } from "react-spinners";

const API_KEY = import.meta.env.VITE_APP_OPENWEATHER_API_KEY;

function Weather() {
  const [val, setVal] = useState("");
  const [city, setCity] = useState("Katmandu");
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
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
    fetchData(api);
  }, [city]);

  if (loading) return <FadeLoader />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="h-screen bg-primary-white flex justify-center items-center text-def-black">
      <div className="bg-sec-yellow h-80 w-80 rounded-xl p-2">
        <input
          type="text"
          value={val}
          onChange={(e) => {
            setVal(e.target.value);
          }}
          placeholder="Enter city name"
          className="w-full p-2 rounded mb-2 focus:outline-none"
        ></input>
        <button
          className="rounded bg-blue-500 text-primary-white p-2 w-full"
          onClick={handleClick}
        >
          Get Weather
        </button>{" "}
        {result && (
          <div className="mt-4">
            <p>City: {result.name}</p>
            <p>Temperature: {(result.main.temp - 273.15).toFixed(2)} °C</p>
          </div>
        )}
      </div>
    </div>
  );
}
export default Weather;
