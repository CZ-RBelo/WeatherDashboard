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

    // Get number of articles
    var numDocs = NYTData.response.docs.length

    // If there are no articles to show, remove the HTML title news
    if (numDocs == 0){
      $("#LocalNewsTitle").empty();
    };

    // Limit to five the number of results to display
    if (numDocs > 5) {
      var numArticles = 5;
    } else {
      var numArticles = numDocs
    };

    // Loop Articles to display
    for (var i = 0; i < numArticles; i++) {

      // Get the article info
      var article = NYTData.response.docs[i];
      var pubDate = article.pub_date;
      let newDate = pubDate.toString();
      var section = article.section_name;
      var byline = article.byline;
      var snippet = article.snippet;
      var headline = article.headline;
      var lead = article.lead_paragraph;
      var source = article.source;

      // Build the html card
      var futureCard = $(`
      <div class="card" style="width: 55rem;">
        <div class="card-body">
          <span class="badge badge-primary">${newDate.substr(0, 10)} </span>
          <span class="badge badge-warning">${section} </span>
          <span class="badge badge-success">${byline.original} </span>
          <hr class="hr weather-hr" />
          <h5 class="card-title mark">${headline.main}</h5>
          <h6 class="card-title">${snippet}</h6>
          <p class="card-title">${lead}</p>
          <hr class="hr weather-hr" />
          <span class="badge badge-success" align="right">${source}</span></br>
          <a href="${article.web_url}">${article.web_url}</a>
        </div>
      </div>`);

      // Append the HTML Card
      $("#LocalNews").append(futureCard);
    }
  }
  var queryURL = buildQueryURL();

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(updatePage);
};