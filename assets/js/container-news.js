function searchCityNews(city) {

  // Get the current day and the last day of the same year
  var newsDay = moment().format('YYYYMMDD')
  var newsYear = moment().year() + "1231"

  // Function to empty out the articles
  $("#LocalNews").empty();

  /**
   * pulls information from the form and build the query URL
   * @returns {string} URL for NYT API based on form inputs
   */
  function buildQueryURL() {

    // Container News queryURL
    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";

    // Set the API key
    var queryParams = { "api-key": newsAPIKey };

    // Search city
    queryParams.q = city

    // Start Year     
    queryParams.begin_date = newsDay;

    // Last day of the same year         
    queryParams.end_date = newsYear;

    return queryURL + $.param(queryParams);
  };

  /**
   * takes API data (JSON/object) and turns it into elements on the page
   * @param {object} NYTData - object containing NYT API data
   */
  function updatePage(NYTData) {

    // Limit to five the number of results to display
    var numArticles = 5;

    // Loop Articles to display
    for (var i = 0; i < numArticles; i++) {

      // Get the article info
      var article = NYTData.response.docs[i];

      // Create the  list group to contain the articles and add the article content for each
      var $articleList = $("<div class='card' style='width: 55rem;'>");

      // Add the newly created element to the DOM
      $("#LocalNews").append($articleList);
      var $articleListItem = $("<div class='card-body' id='article-section'>");

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

      // Log byline, and append to document if exists
      var byline = article.byline;
      if (byline && byline.original) {
        $articleListItem.append("<span class='badge badge-success' align='right'>" + byline.original + "</span>");
      }

      // Append to document a line break
      $articleListItem.append("<hr class='hr weather-hr' />");

      // Log headline, and append to document if exists
      var headline = article.headline;
      if (headline && headline.main) {
        $articleListItem.append("<h5 class='card-title mark' id='day5date'> " + headline.main + "</h5>");
      };

      // Log snippet, and append to document if exists
      var snippet = article.snippet;
      if (snippet) {
        $articleListItem.append("<h6 class='card-title' id='day5date'> " + snippet + "</h6>");
      };

      // Log lead, and append to document if exists
      var lead = article.lead_paragraph;
      if (lead) {
        $articleListItem.append("<p class='card-title' id='day5date'> " + lead + "</p>");
      };

      // Append to document a line break
      $articleListItem.append("<hr class='hr weather-hr' />");

      // Log source, and append to document if exists
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

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(updatePage);
};