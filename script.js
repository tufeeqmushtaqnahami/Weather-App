//  OpenWeatherMap API key
const apiKey = "f28428f9258e879035b6d4d5964ccd62";

//  main weather data container
const weatherData = document.getElementById('weather-data');

//  input field where user enters city name
const cityInput = document.getElementById("city-input");

// the form element
const formElemnet = document.querySelector('form');

// Add event listener for form submission
formElemnet.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevents page reload on form submit
  const cityValue = cityInput.value; // Get entered city name
  getWeatherData(cityValue); // Call API function
});

// Function to fetch and display weather data
async function getWeatherData(cityValue) {
  try {
    // Fetch weather data from OpenWeatherMap API
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`
    );

    // If API request fails, throw an error
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    // Convert API response into JSON format
    const data = await response.json();

    // Extract main data from response
    const temp = Math.round(data.main.temp); // Current temperature
    const description = data.weather[0].description; // Weather description
    const icon = data.weather[0].icon; // Weather icon ID

    // Additional details (feels like, humidity, wind speed)
    const details = [
      `Feels like: ${Math.round(data.main.feels_like)}°C`,
      `Humidity: ${data.main.humidity}%`,
      `Wind Speed: ${data.wind.speed} m/s`
    ];

    // Update weather icon
    weatherData.querySelector('.icon').innerHTML =
      `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather icon">`;

    // Update temperature
    weatherData.querySelector('.temperature').textContent = `${temp}°C`;

    // Update weather description
    weatherData.querySelector('.description').textContent = description;

    // Update weather details list
    weatherData.querySelector('.details').innerHTML = details
      .map((detail) => `<div>${detail}</div>`)
      .join("");

  } catch (error) {
    // If any error occurs, show error message to user

    // Clear icon
    weatherData.querySelector('.icon').innerHTML = "";

    // Clear temperature
    weatherData.querySelector('.temperature').textContent = "";

    // Show error message
    weatherData.querySelector('.description').textContent =
      "An Error Happened, please try again later!";

    // Clear details
    weatherData.querySelector('.details').innerHTML = "";
  }
};
