// This is our API key
var APIKey = "9edb3bba8245d02c6ef9c27be0924a9d";

// Here we are building the URL we need to query the database
var queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=37.1289771&lon=-84.0832646&appid=" + APIKey;


// Here we run our AJAX call to the OpenWeatherMap API
$.ajax({
  url: queryURL,
  method: "GET"
})
  // We store all of the retrieved data inside of an object called "response"
  .then(function(response) {

    // Log the queryURL
    console.log(queryURL);

    // Log the resulting object
    console.log(response);

    // Transfer content to HTML


    // today forecast weather card

        // Convert the temp to Celsius
        var todayTemp = response.list[0].main.temp - 273.15;
        // Get date
        var todayDate = response.list[0].dt_txt 
        // Weather icon        
        var todayIcon = response.list[0].weather[0].icon        
        var todayIconUrl = "http://openweathermap.org/img/w/" + todayIcon + ".png";
        

        $("#todayTitle").text(response.city.name);
        $("#todayDate").text(todayDate.substring(0, 10));
        $("#todayIcon").attr('src', todayIconUrl);
        $("#todayTemp").text("Temp: " + todayTemp.toFixed(2) + " °C");
        $("#todayWind").text("Wind Speed: " + response.list[0].wind.speed + " KPH");
        $("#todayHumidity").text("Humidity: " + response.list[0].main.humidity + " %");

    // five day forecast cards

    // Day 1 forecast

        // Convert the temp to Celsius
        var day1Temp = response.list[5].main.temp - 273.15;
        // Get date
        var day1date = response.list[5].dt_txt      
        // Weather icon        
        var day1icon = response.list[5].weather[0].icon        
        var day1iconUrl = "http://openweathermap.org/img/w/" + day1icon + ".png";

        $("#day1date").text(day1date.substring(0, 10));
        $("#day1icon").attr('src', day1iconUrl);
        $("#day1temp").text("Temp: " + day1Temp.toFixed(2) + " °C");
        $("#day1wind").text("Wind Speed: " + response.list[5].wind.speed + " KPH");
        $("#day1humidity").text("Humidity: " + response.list[5].main.humidity + " %");

    // Log the data in the console as well
    console.log("City name: " + response.city.name);
    console.log("Wind Speed: " + response.list[0].wind.speed);
    console.log("Humidity: " + response.list[0].main.humidity);
    console.log("Temperature (C): " + todayTemp);
  });