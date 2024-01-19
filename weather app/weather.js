const searchInput = document.querySelector("#searchInput")
searchButton = document.querySelector("#searchButton")
weatherIcon = document.querySelector("#weatherIcon")
windSpeed = document.querySelector("#windSpeed")
humidity = document.querySelector(".humidity")
weather = document.querySelector(".weather")
desc = document.querySelector(".desc")
API = "8cf5ac5621c8d0266298a149e49d7514";
const setWeatherDetails = (data) => {

    desc.innerHTML = data.weather[0].description;
    weather.innerHTML = Math.round(data.main.temp - 273.15) + "°c";
    humidity.innerHTML = data.main.humidity + "%";
    windSpeed.innerHTML = data.wind.speed + "km/h";
    switch (data.weather[0].main) {
        case 'Clouds':
            weatherIcon.src = "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiwFTkt5z_dxU6w1UnS1PxiZV3HDiPGsAW5Lrsp09MnlCmkQre9GzO8MnGytaaY1eZoqBN6SMJ4U578_uDtiuXswovr1T3o-Kt5KK0mlN_zC0RDodJFaKHQ3Uk-HIZ3vuMvAKNJi8DDFwWA7F6BOxz78Oh-UePwJTuc3PG0ZIZypPE1xlMPl5z46joaEw/s320/Clouds.png";
            break;
            case 'Clear':
                weatherIcon.src = "https://cdn0.iconfinder.com/data/icons/weather-forecast-17/128/forecast-weather_sun-clear-hot-512.png";
            case 'Rain':
                weatherIcon.src = "https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather07-1024.png";
                break;
            case 'Mist':
                weatherIcon.src = "https://cdn3.iconfinder.com/data/icons/weather-and-meteorology-4/85/weather_fog_foggy_mist-1024.png";
                break;
            case 'Snow':
                weatherIcon.src = "https://www.pinclipart.com/picdir/big/547-5470069_snow-cloud-clipart-transparent-background-snow-weather-icon.png";
                break;
            case 'Haze':
                weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/1779/1779807.png";
                break;
        }
    }
    
    const callAPI = (id) => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${id}`)
            .then(response => {
                // indicates whether the response is successful (status code 200-299) or not
                if (!response.ok) {
                    alert("Check spelling of City and try again or Something Went Wrong!");
                    throw new Error(`Request failed with status ${response.status}`)
                }
                return response.json()
            })
            .then(data => {
                setWeatherDetails(data);
            })
            .catch(error => console.log(error))
    }
    
    searchButton.addEventListener("click", (e) => {
        if (searchInput.value == "") {
            alert("Please Enter City Name.");
        } else {
            callAPI(API);
        }
    })
    searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            searchButton.click();
        }
    })
    
    searchButton.click();
    