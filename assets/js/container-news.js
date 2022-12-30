function searchCityNews(city) {

  // Get the current day and the last day of the same year
  var newsDay = moment().format('YYYYMMDD')
  var newsYear = moment().year() + "1231"

  // Function to empty out the articles
  $("#article-section").empty();

  /**
   * pulls information from the form and build the query URL
   * @returns {string} URL for NYT API based on form inputs
   */
  function buildQueryURL() {
    // queryURL is the url we'll use to query the API
    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";

    // Begin building an object to contain our API call's query parameters
    // Set the API key
    var queryParams = { "api-key": newsAPIKey };

    // Grab text the user typed into the search input, add to the queryParams object
    queryParams.q = city

    // If the user provides a startYear, include it in the queryParams object      
    queryParams.begin_date = newsDay;

    // If the user provides an endYear, include it in the queryParams object         
    queryParams.end_date = newsYear;



    return queryURL + $.param(queryParams);
  };

  /**
   * takes API data (JSON/object) and turns it into elements on the page
   * @param {object} NYTData - object containing NYT API data
   */
  function updatePage(NYTData) {
    // Get from the form the number of results to display
    // API doesn't have a "limit" parameter, so we have to do this ourselves
    var numArticles = 5;

    // Log the NYTData to console, where it will show up as an object
    //console.log(NYTData);

    // Loop through and build elements for the defined number of articles
    for (var i = 0; i < numArticles; i++) {

      // Get specific article info for current index
      var article = NYTData.response.docs[i];

      // Create the  list group to contain the articles and add the article content for each
      var $articleList = $("<ul>");
      $articleList.addClass("list-group");

      // Add the newly created element to the DOM
      $("#article-section").append($articleList);
      var $articleListItem = $("<li class='list-group-item articleHeadline' style='width: 55rem;'>");

      // Log published date, and append to document if exists
      var pubDate = article.pub_date;
      let formatDate = pubDate.substr(0, 10);
      if (pubDate) {
        $articleListItem.append("<span class='badge badge-primary'>" + formatDate + "</span> ");
      };

      // Log section, and append to document if exists
      var section = article.section_name;
      if (section) {
        $articleListItem.append("<span class='badge badge-warning'>" + section + "</span> ");
      }

      // If the article has a byline, log and append to $articleList
      var byline = article.byline;
      if (byline && byline.original) {
        $articleListItem.append("<span class='badge badge-success' align='right'>" + byline.original + "</span>");
      }

      $articleListItem.append("<hr class='hr weather-hr' />");





      // If the article has a headline, log and append to $articleList
      var headline = article.headline;
      if (headline && headline.main) {
        $articleListItem.append("<h5 class='card-title mark' id='day5date'> " + headline.main + "</h5>");
      };

      var snippet = article.snippet;
      if (snippet) {
        $articleListItem.append("<h6 class='card-title' id='day5date'> " + snippet + "</h6>");
      };

      var lead = article.lead_paragraph;
      if (lead) {
        $articleListItem.append("<p class='card-title' id='day5date'> " + lead + "</p>");
      };

      $articleListItem.append("<hr class='hr weather-hr' />");




      // If the article has a byline, log and append to $articleList
      var source = article.source;
      if (source) {
        $articleListItem.append("<span class='badge badge-success' align='right'>" + source + "</span></br>");
      }

      // Append and log url
      $articleListItem.append("<a href='" + article.web_url + "'>" + article.web_url + "</a>");

      // Append the article
      $articleList.append($articleListItem);
    }
  }
  var queryURL = buildQueryURL();

  // Make the AJAX request to the API - GETs the JSON data at the queryURL.
  // The data then gets passed as an argument to the updatePage function
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(updatePage);
};
