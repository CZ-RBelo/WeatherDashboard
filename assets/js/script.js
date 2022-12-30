
// Weather API Key
var WeatherAPIKey = config.WeatherAPI;

var pastSearchedCitiesEl = $('#history');

var WeatherqueryGEOlon;
var WeatherqueryGEOlat;
var today = moment().format('YYYY/MM/DD')

// Display initial data into the Weather dashboard
$("#todayDate").text(today);
$("#day1date").text(moment().add(1, 'd').format('YYYY/MM/DD'));
$("#day2date").text(moment().add(2, 'd').format('YYYY/MM/DD'));
$("#day3date").text(moment().add(3, 'd').format('YYYY/MM/DD'));
$("#day4date").text(moment().add(4, 'd').format('YYYY/MM/DD'));
$("#day5date").text(moment().add(5, 'd').format('YYYY/MM/DD'));

// function to hide the invalid city name alert
function alertClose() {
  document.getElementById('ms-alert').style.visibility = 'hidden';
}

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

function getCityGEO(city) {

  // Geocoding API - to get the lat & lon from each city
  var WeatherqueryGEO = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=0&appid=" + WeatherAPIKey;

  var data = $.ajax({
    url: WeatherqueryGEO,
    method: "GET"
  })
    .then(function (response) {
      WeatherqueryGEOlon = response[0].lon;
      WeatherqueryGEOlat = response[0].lat;

      if (WeatherqueryGEOlon === "" || WeatherqueryGEOlat === "") 
      {
        // Display an alert for invalid city name
        document.getElementById('ms-alert').style.visibility = 'visible';
      } else { 
        searchCity(WeatherqueryGEOlon, WeatherqueryGEOlat);
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

  if (city != "") {
    getCityGEO(city);

    // Save into the local storage the searched city    
    saveSearch(city);
    // Display into the search history the new city
    displaySearchHistory();

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
    newBTN.classList.add("btn", "btn-primary", "my-2", "past-city");
    newBTN.setAttribute("style", "width: 100%");
    newBTN.setAttribute("id", "saved-search-bt");
    newBTN.textContent = `${searchedCities[i]}`;
    historyEl.appendChild(newBTN);
  }
};

// .on("click") function associated with the Save Searches Button
function savedSearch (event) {
  var element = event.target;
  city = element.textContent;
  getCityGEO(city);
};
pastSearchedCitiesEl.on("click", savedSearch);