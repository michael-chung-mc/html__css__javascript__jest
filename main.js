let latitude = 52.52;
let longitude = 13.41;
async function refresh() {
    console.log("fetching data ...")
    const response = await fetch(`KEY`);
    const forecast = await response.json();
    console.log(forecast);
    let genTime = forecast.generationtime_ms;
    let temp = forecast.current_weather.temperature;
    let windSpeed = forecast.current_weather.windspeed;
    let windDirection = forecast.current_weather.winddirection;
    document.getElementById("weather-content").innerHTML = ""
    document.getElementById("weather-content").innerHTML = `forecast time: ${genTime}ms`
    document.getElementById("weather-content").innerHTML += `temp: ${temp}`
    document.getElementById("weather-content").innerHTML += `wind speed: ${windSpeed}`
    document.getElementById("weather-content").innerHTML += `wind direction: ${windDirection}`;
}
let button = document.getElementById("lat-long-submit");
button.addEventListener("click", refresh);
document.getElementById("latitude").addEventListener("input", (e)=>{latitude = e.target.value});
document.getElementById("longitude").addEventListener("input", (e)=>{longitude = e.target.value});
