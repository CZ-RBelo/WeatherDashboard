// Weather & New API Keys

//const WeatherAPIKey = config.WeatherAPIKey;
//const newsAPIKey = config.newsAPIKey;

const WeatherAPIKey = "d1e2d0763204896fd894698f5c6e27ee";
const newsAPIKey = "R1a31F4tBjCUaM2ho8GtIFsrSdtXt30M";

var pastSearchedCitiesEl = $('#history');

// function to hide the invalid city name alert
function alertClose() {
  document.getElementById('ms-alert').style.visibility = 'hidden';
};

// clear the local storage and the searches history 
function clearHistory() {
  // if is visible then hide the invalid city name alert
  alertClose()
  // clear the local storage
  localStorage.clear();
  var historyEl = document.getElementById('history');
  // clear the searches history 
  historyEl.innerHTML = '';
  return;
}

// Display search history function
displaySearchHistory()

function checkCity(city) {

  // Geocoding API - to get the lat & lon from each city
  var WeatherqueryGEO = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=0&appid=" + WeatherAPIKey;

  $.ajax({
    url: WeatherqueryGEO,
    method: "GET"
  })
    .then(function (response) {

      // Check the response length
      if (response.length === 0) {
        // Display an alert for invalid city name
        document.getElementById('ms-alert').style.visibility = 'visible';
      } else {

        // Save into the local storage the searched city    
        saveSearch(city);
        // Display into the search history the new city
        displaySearchHistory();
        // Display the city forecast into HTML
        searchCity(city);
        // Get local news from the search city
        searchCityNews(city);
      };
    });
};

// .on("click") function associated with the Search Button
$("#search-button").on("click", function (event) {
  event.preventDefault();
  // Searched city
  var city = $("#search-input")
    .val()
    .trim();

  $("#search-input").val('');

  if (city != "") {
    // Get geo coordinates from the search city
    checkCity(city);
  } else {
    // Display an alert for invalid city name
    document.getElementById('ms-alert').style.visibility = 'visible';
  };

});

// Save into the local storage the searched city
function saveSearch(city) {
  var storedCities = JSON.parse(localStorage.getItem("WeatherDashboard")) || [];
  // check if the local storage includes the searched city and the number of saved cities
  if (!storedCities.includes(city) && storedCities.length < 10) {
    storedCities.push(city);
    localStorage.setItem("WeatherDashboard", JSON.stringify(storedCities));
  };
};

// Display search history function
function displaySearchHistory() {
  var searchedCities = JSON.parse(localStorage.getItem("WeatherDashboard")) || [];
  var historyEl = document.getElementById('history');
  historyEl.innerHTML = '';
  for (i = 0; i < searchedCities.length; i++) {
    var newBTN = document.createElement("button");
    newBTN.classList.add("btn", "btn-light", "my-2", "past-city");
    newBTN.setAttribute("style", "width: 100%");
    newBTN.setAttribute("id", "saved-search-bt");
    newBTN.textContent = `${searchedCities[i]}`;
    historyEl.appendChild(newBTN);
  }
};

// .on("click") function associated with the Save Searches Button
function savedSearch(event) {
  var element = event.target;
  city = element.textContent;

  // Get geo coordinates from the search city
  checkCity(city);

};
pastSearchedCitiesEl.on("click", savedSearch);