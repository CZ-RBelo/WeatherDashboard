function searchCityNews(city) {

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
    var queryParams = { "api-key":  newsAPIKey};
  
    // Grab text the user typed into the search input, add to the queryParams object
    queryParams.q = city
  
    // If the user provides a startYear, include it in the queryParams object
    var startYear = "20220101";
    
  
    // If the user provides an endYear, include it in the queryParams object
    var endYear = "20220101"
    
  
    // Logging the URL so we have access to it for troubleshooting
    console.log("---------------\nURL: " + queryURL + "\n---------------");
    console.log(queryURL + $.param(queryParams));
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
    console.log(NYTData);
    console.log("------------------------------------");
  
    // Loop through and build elements for the defined number of articles
    for (var i = 0; i < numArticles; i++) {
      // Get specific article info for current index
      var article = NYTData.response.docs[i];
  
      // Increase the articleCount (track article # - starting at 1)
      var articleCount = i + 1;
  
      // Create the  list group to contain the articles and add the article content for each
      var $articleList = $("<ul>");
      $articleList.addClass("list-group");
  
      // Add the newly created element to the DOM
      $("#article-section").append($articleList);
  
      // If the article has a headline, log and append to $articleList
      var headline = article.headline;
      var $articleListItem = $("<li class='list-group-item articleHeadline'>");
  
      if (headline && headline.main) {
        console.log(headline.main);
        $articleListItem.append(
          "<span class='label label-primary'>" +
            articleCount +
            "</span>" +
            "<h2> " +
            headline.main +
            "</h2>"
        );
      }
  
      // If the article has a byline, log and append to $articleList
      var byline = article.byline;
  
      if (byline && byline.original) {
        console.log(byline.original);
        $articleListItem.append("<h3>" + byline.original + "</h3>");
      }
  
      // Log section, and append to document if exists
      var section = article.section_name;
      console.log(article.section_name);
      if (section) {
        $articleListItem.append("<h5>Section: " + section + "</h5>");
      }
  
      // Log published date, and append to document if exists
      var pubDate = article.pub_date;
      console.log(article.pub_date);
      if (pubDate) {
        $articleListItem.append("<h5>" + article.pub_date + "</h5>");
      }
  
      // Append and log url
      $articleListItem.append("<a href='" + article.web_url + "'>" + article.web_url + "</a>");
      console.log(article.web_url);
  
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
