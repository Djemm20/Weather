// Function to display current weather data
function displayCurrentWeather(data) {
    const cityNameElement = document.getElementById('city-name');
    const currentDateElement = document.getElementById('current-date');
    const currentTempElement = document.getElementById('current-temp');
    const currentConditionElement = document.getElementById('current-condition');
    const currentWindElement = document.getElementById('current-wind');
    const currentHumidityElement = document.getElementById('current-humidity');
    const currentPrecipitation = document.getElementById('current-precipitation');
  
    cityNameElement.textContent = data.location.name;
    currentDateElement.textContent = getCurrentDate();
    currentTempElement.textContent = `${data.current.temp_c}°C`;
    currentConditionElement.textContent = data.current.condition.text;
    currentWindElement.textContent = `Wind Speed: ${data.current.wind_kph} km/h`;
    currentHumidityElement.textContent = `Humidity: ${data.current.humidity}%`;
    currentPrecipitation.textContent = `Precipitation: ${data.current.precip_mm} mm`;
  }
  
  function getCurrentDate() {
    const currentDate = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
    return currentDate.toLocaleDateString(undefined, options);
  }

// Function to display forecast weather data
function displayForecastWeather(data) {
    const forecastDaysElement = document.getElementById('forecast-days');
    forecastDaysElement.innerHTML = ''; // Clear previous forecast data
  
    // Loop through the forecast days (excluding the current day)
    for (let i = 1; i < data.forecast.forecastday.length; i++) {
      const forecastDay = data.forecast.forecastday[i];
      const date = new Date(forecastDay.date);
      const day = date.toLocaleDateString('en-US', { weekday: 'long' });
      const formattedDate = `${day}, ${date.getDate()} ${date.toLocaleString('default', { month: 'long' })}, ${date.getFullYear()}`;
      const temperature = forecastDay.day.avgtemp_c;
      const condition = forecastDay.day.condition.text;
      const wind = forecastDay.day.maxwind_kph;
      const humidity = forecastDay.day.avghumidity;
      const precipitation = forecastDay.day.totalprecip_mm;
      // const icon = forecastDay.day.condition.icon;
  
      // Create a forecast day element
      const forecastDayElement = document.createElement('div');
      forecastDayElement.classList.add('forecast-day');
      forecastDayElement.setAttribute('id', `forecast-day-${i}`);
  
      // Create the HTML content for the forecast day
      const forecastDayHTML = `
        <div class="layer1">
            <p class="date">${formattedDate}</p>
        </div>
        <div class="update">
            <div class="pos-left">
                <div class="layer2">
                    <p class="temp">${temperature}°C</p>
                </div>
                <p class="layer2-out">${condition}</p>
            </div>
            <div class="pos-right">
                <div class="layer3">
                    <p class="side">Wind Speed: ${wind} km/h</p>
                    <p class="side">Humidity: ${humidity}%</p>
                    <p class="side">Precipitation: ${precipitation} mm</p>
                </div>
            </div>
        </div>
      `;
  
      forecastDayElement.innerHTML = forecastDayHTML;
      forecastDaysElement.appendChild(forecastDayElement);
    }
  }
  
  
  // Function to handle form submission
  function handleFormSubmit(event) {
    event.preventDefault(); // Prevent form submission
  
    const cityInput = document.getElementById('city-input');
    let city = cityInput.value.trim();
  
    if (city === '') {
      city = 'Accra';
    }
    cityInput.value = '';
  
    // Fetch the weather information for the entered city from the API
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=f3ddf72b64fd418a954150728232107&q=${city}&days=7`)
      .then(response => response.json())
      .then(data => {
        displayCurrentWeather(data);
        displayForecastWeather(data);
      })
      .catch(error => {
        console.log('Error:', error);
      });
  }
  
  // Perform initial data retrieval on page load
  window.addEventListener('DOMContentLoaded', () => {
    handleFormSubmit(new Event('submit'));
  });
  
  // Add form submit event listener
  const form = document.getElementById('search-form');
  form.addEventListener('submit', handleFormSubmit);
