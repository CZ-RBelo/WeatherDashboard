function searchCity(WeatherqueryGEOlon, WeatherqueryGEOlat) {

  // Weather query URL
  var WeatherqueryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + WeatherqueryGEOlat + "&lon=" + WeatherqueryGEOlon + "&appid=" + WeatherAPIKey;

  $.ajax({
    url: WeatherqueryURL,
    method: "GET"
  })
    .then(function (response) {

      // Transfer content to HTML  

      // today forecast weather card

      // Convert the temp to Celsius
      var todayTemp = response.list[0].main.temp - 273.15;
      // Get date
      var todayDate = response.list[0].dt_txt
      // Weather icon        
      var todayIcon = response.list[0].weather[0].icon
      var todayIconUrl = "http://openweathermap.org/img/w/" + todayIcon + ".png";

      // Display current forecast into HTML
      $("#todayTitle").text(response.city.name);
      $("#todayDate").text(todayDate.substring(0, 10));
      $("#todayIcon").attr({ src: todayIconUrl, width: 60, height: 60 });
      $("#todayTemp").text(todayTemp.toFixed(2) + " °C");
      $("#todayWind").text(response.list[0].wind.speed + " KPH");
      $("#todayHumidity").text(response.list[0].main.humidity + " %");

      // five day forecast cards

      // Day 1 forecast

      // Convert the temp to Celsius
      var day1Temp = response.list[5].main.temp - 273.15;
      // Get date
      var day1date = response.list[5].dt_txt
      // Weather icon        
      var day1icon = response.list[5].weather[0].icon
      var day1iconUrl = "http://openweathermap.org/img/w/" + day1icon + ".png";

      // Display Day 1 forecast into HTML
      $("#day1date").text(day1date.substring(0, 10));
      $("#day1icon").attr({ src: day1iconUrl, width: 60, height: 60 });
      $("#day1temp").text(day1Temp.toFixed(2) + " °C");
      $("#day1wind").text(response.list[5].wind.speed + " KPH");
      $("#day1humidity").text(response.list[5].main.humidity + " %");

      // Day 2 forecast

      // Convert the temp to Celsius
      var day2Temp = response.list[13].main.temp - 273.15;
      // Get date
      var day2date = response.list[13].dt_txt
      // Weather icon        
      var day2icon = response.list[13].weather[0].icon
      var day2iconUrl = "http://openweathermap.org/img/w/" + day2icon + ".png";

      // Display Day 2 forecast into HTML
      $("#day2date").text(day2date.substring(0, 10));
      $("#day2icon").attr({ src: day2iconUrl, width: 60, height: 60 });
      $("#day2temp").text(day2Temp.toFixed(2) + " °C");
      $("#day2wind").text(response.list[13].wind.speed + " KPH");
      $("#day2humidity").text(response.list[13].main.humidity + " %");

      // Day 3 forecast

      // Convert the temp to Celsius
      var day3Temp = response.list[21].main.temp - 273.15;
      // Get date
      var day3date = response.list[21].dt_txt
      // Weather icon        
      var day3icon = response.list[21].weather[0].icon
      var day3iconUrl = "http://openweathermap.org/img/w/" + day3icon + ".png";

      // Display Day 3 forecast into HTML
      $("#day3date").text(day3date.substring(0, 10));
      $("#day3icon").attr({ src: day3iconUrl, width: 60, height: 60 });
      $("#day3temp").text(day3Temp.toFixed(2) + " °C");
      $("#day3wind").text(response.list[21].wind.speed + " KPH");
      $("#day3humidity").text(response.list[21].main.humidity + " %");

      // Day 4 forecast

      // Convert the temp to Celsius
      var day4Temp = response.list[29].main.temp - 273.15;
      // Get date
      var day4date = response.list[29].dt_txt
      // Weather icon        
      var day4icon = response.list[29].weather[0].icon
      var day4iconUrl = "http://openweathermap.org/img/w/" + day4icon + ".png";

      // Display Day 4 forecast into HTML
      $("#day4date").text(day4date.substring(0, 10));
      $("#day4icon").attr({ src: day4iconUrl, width: 60, height: 60 });
      $("#day4temp").text(day4Temp.toFixed(2) + " °C");
      $("#day4wind").text(response.list[29].wind.speed + " KPH");
      $("#day4humidity").text(response.list[29].main.humidity + " %");

      // Day 5 forecast

      // Convert the temp to Celsius
      var day5Temp = response.list[37].main.temp - 273.15;
      // Get date
      var day5date = response.list[37].dt_txt
      // Weather icon        
      var day5icon = response.list[37].weather[0].icon
      var day5iconUrl = "http://openweathermap.org/img/w/" + day5icon + ".png";

      // Display Day 5 forecast into HTML
      $("#day5date").text(day5date.substring(0, 10));
      $("#day5icon").attr({ src: day5iconUrl, width: 60, height: 60 });
      $("#day5temp").text(day5Temp.toFixed(2) + " °C");
      $("#day5wind").text(response.list[37].wind.speed + " KPH");
      $("#day5humidity").text(response.list[37].main.humidity + " %");

    });
};