(function($) {
  var searchButton = "<div class='ext-search-container'>" +
    "<a href='https://www.google.com/searchbyimage?image_url=#IMAGE_URL#&hl=en&safe=on' " +
    "class='Button Button11 WhiteButton ext-search' target='_blank'>" +
    "<strong><em style='background: url("+chrome.extension.getURL('ext_search_action.png')+")'></em>" +
    "Search</strong><span></span></a></div>";
  
  var numPins = 0;
  
  var injectSearch = function() {
    var count = $("div.pin").length;
    // Do only if there are new pins on the page.
    if (count > numPins) {
      numPins = count;
      
      // Find all pins without the search button.
      var newPins = $("div.pin").filter(function() {
        var $el = $(this);
        return $el.find("> .actions").length && $el.find("> a.ImgLink > img").length &&
          $el.find("> .actions > .ext-search-container").length === 0;
      });
      
      // Append search button with image url.
      newPins.each(function() {
        var $el = $(this);
        $el.find("> .actions").append(new String(searchButton).replace("#IMAGE_URL#",
          encodeURIComponent($el.find("> a.ImgLink > img").attr("src"))));
      });
    }
  };
  
  injectSearch();

  $(window).bind("scroll", function() {
    setTimeout(injectSearch, 500);
  });  
})(jQuery);

