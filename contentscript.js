(function($) {
  var searchButton = "<div class='ext-search-container'>" +
    "<a href='https://www.google.com/searchbyimage?image_url=#IMAGE_URL#&hl=en' " +
    "class='Button11 WhiteButton ext-search editbutton ContrastButton Button' target='_blank'>" +
    "<strong><em style='background: url("+chrome.extension.getURL('ext_search_action.png')+")'></em>" +
    "Search</strong><span></span></a></div>";
  
  var numPins = 0;
  
  var gaTrack = function() {
    chrome.extension.sendRequest({'track': true});
  };
  
  var injectSearch = function() {
    var count = $("div.pin").length;
    // Do only if there are new pins on the page.
    if (count > numPins) {
      numPins = count;
      
      // Find all pins without the search button.
      var newPins = $("div.pin").filter(function() {
        var $el = $(this);
        return $el.find(".actions").length &&
          $el.find(".actions > .ext-search-container").length === 0 &&
          $el.find("a.PinImage.ImgLink > img").length && $el.find("a.PinImage.ImgLink > img.video").length === 0;
      });
      
      // Append search button with image url.
      newPins.each(function() {
        var $el = $(this);
        var src = $el.find("a.PinImage.ImgLink > img").attr("data-src") || $el.find("a.PinImage.ImgLink > img").attr("src");
        src = src.replace("_b.jpg", "_f.jpg");
        var $search = $(new String(searchButton).replace("#IMAGE_URL#", encodeURIComponent(src)));
        $el.find(".actions").append($search);
        $search.click(gaTrack);
      });
    }
  };
  
  injectSearch();

  $(window).bind("scroll", function() {
    setTimeout(injectSearch, 500);
  });
  
  $("#NewIndicator").click(function() {
    setTimeout(injectSearch, 500);
  });
  
})(jQuery);

