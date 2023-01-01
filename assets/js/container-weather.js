function searchCity(city) {

  // Clear HTML current day forecast weather card element
  $("#today").empty();

  // // Clear HTML five day forecast weather cards element
  $("#forecast").empty();  
  
  // Current day forecast weather query URL  
  var currentDayURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + WeatherAPIKey;

  $.ajax({
    url: currentDayURL,
    method: "GET"
  })
    .then(function (response) {

      /*
      // Current day forecast weather card
      */      
      
      $("#todayTitle").text(response.name);    
      
      // Build the html card
      var currentCard = $(`
      <div class="card bg-light" style="width: 55rem;">
        <div class="card-body">
        <h4 class="card-title">${moment().format('YYYY/MM/DD')}</h4>
        <h2 class="card-subtitle mb-2 text-muted"><img src="https://openweathermap.org/img/w/${response.weather[0].icon}.png" alt="Weather icon"/></h2>
          <h5>Temp: <span class="badge badge-secondary">${response.main.temp} °C</span></h5></br>
          <h5>Wind: <span class="badge badge-secondary">${response.wind.speed} KPH</span></h5></br>
          <h5>Humidity: <span class="badge badge-secondary">${response.main.humidity} %</span></h5></br>
        </div>
      </div>`);

      // Append the HTML Card
      $("#today").append(currentCard);

      /*
      // Five day forecast cards
      */

      // Geo coordinates to build the five days forecast weather query URL
      var WeatherqueryGEOlon = response.coord.lon
      var WeatherqueryGEOlat = response.coord.lat

      // Five days forecast weather query URL
      var fiveDayURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + WeatherqueryGEOlat + "&lon=" + WeatherqueryGEOlon + "&units=metric&exclude=current,minutely,hourly,alerts&&appid=" + WeatherAPIKey;

      $.ajax({
        url: fiveDayURL,
        method: "GET"
      }).then(function (response) {

        // Build the html card of each day
        for (let i = 1; i < 6; i++) {
          var fiveDayCard = $(`
          <div class="card bg-light" style="width: 11rem;">
            <div class="card-body">
              <h5 class="card-title">${moment.unix(response.daily[i].dt).format("YYYY/MM/DD")}</h5>
              <h6 class="card-subtitle mb-2 text-muted"><img src="https://openweathermap.org/img/w/${response.daily[i].weather[0].icon}.png" alt="Weather icon"/></h6>
              <h7>Temp: <span class="badge badge-secondary">${response.daily[i].temp.day} °C</span></h7></br>
              <h7>Wind: <span class="badge badge-secondary">${response.daily[i].wind_speed} KPH</span></h7></br>
              <h7>Humidity: <span class="badge badge-secondary">${response.daily[i].humidity} %</span></h7></br>
            </div>
          </div>`);

          // Append the HTML Card for each day
          $("#forecast").append(fiveDayCard);
        };
      });

    });
};