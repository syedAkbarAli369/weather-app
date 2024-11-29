

const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "0e22c9811b7d6e624877491ce8bf30b8";

weatherForm.addEventListener("submit", async event => {

    event.preventDefault();
    const city = cityInput.value;

    if(city){
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }
        catch(error){
            console.error(error);
            displayError(error);
        }
    }
    else{
        displayError("Please Enter a City");
    }

});

async function getWeatherData(city){
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(apiUrl);
    if(!response.ok){
        throw new Error("Could not fetch Weather Data");
    }
    return await response.json();
}
function displayWeatherInfo(data){
    const {name: city, 
           main: {temp, humidity}, 
           weather: [{description, id}]} = data;

    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descriptionDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    cityDisplay.textContent = city;
    cityDisplay.classList.add("cityDisplay");
    card.appendChild(cityDisplay);

    tempDisplay.textContent = `${Math.round(temp - 273.15)}°C`;
    tempDisplay.classList.add("temperatureDisplay");
    card.appendChild(tempDisplay);

    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    humidityDisplay.classList.add("humidityDisplay");
    card.appendChild(humidityDisplay);

    descriptionDisplay.textContent = description;
    descriptionDisplay.classList.add("descriptionDisplay");
    card.appendChild(descriptionDisplay);

    weatherEmoji.textContent = getWeatherEmoji(id);
    weatherEmoji.classList.add("weatherEmoji");
    card.appendChild(weatherEmoji);

}
function getWeatherEmoji(weatherId){
    switch(true){
        case(weatherId >= 200 && weatherId < 300):
            return '⛈';
        case(weatherId >= 300 && weatherId < 400):
            return '🌧';
        case(weatherId >= 500 && weatherId < 600):
            return '🌧';
        case(weatherId >= 600 && weatherId < 700):
            return '❄';
        case(weatherId >= 700 && weatherId < 800):
            return '🌁';
        case(weatherId === 800):
            return '☀';
        case(weatherId >= 200 && weatherId < 300):
            return '☁';
        default:
            return '❓';


    }
}
function displayError(message){
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}