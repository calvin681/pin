(function($) {
  var searchButtonOld = "<div class='ext-search-container'>" +
    "<a href='https://www.google.com/searchbyimage?image_url=#IMAGE_URL#&hl=en' " +
    "class='Button11 WhiteButton ext-search editbutton ContrastButton Button' target='_blank'>" +
    "<strong><em style='background: url("+chrome.extension.getURL('ext_search_action.png')+")'></em>" +
    "Search</strong><span></span></a></div>";

  var searchButton = "<button type='button' class='rounded Button likeSmall btn hasText searchButton'>\n" +
    "<em style='background: url("+chrome.extension.getURL('ext_search_action_2.png')+")'></em>\n" +
    "<span class='buttonText'>Search</span>\n</button>"
  
  var gaTrack = function() {
    chrome.extension.sendRequest({'track': true});
  };
  
  var injectSearch = function() {
    if ($("div.pin").length) {
      injectSearchOldDesign();
      return;
    }
    
    // Find all pins without the search button.
    var newPins = $("div.Pin").filter(function() {
      var $el = $(this);
      return $el.find(".repinLikeWrapper > .searchButton").length === 0 &&
        $el.find(".pinImageWrapper img.image").length && $el.find(".pinImageWrapper img.image.videoIndicator").length === 0;
    });
    
    // Append search button with image url.
    newPins.each(function() {
      var $el = $(this);
      var src = $el.find(".pinImageWrapper img.image").attr("src");
      
      var $search = $(searchButton);
      $el.find(".repinLikeWrapper").append($search);
      $search.click(function(event) {
        event.stopImmediatePropagation();
        event.preventDefault();
        gaTrack();
        window.open("https://www.google.com/searchbyimage?image_url="+encodeURIComponent(src)+"&hl=en", "_blank");
        return false;
      });
    });
  };

  var injectSearchOldDesign = function() {
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
      var $search = $(new String(searchButtonOld).replace("#IMAGE_URL#", encodeURIComponent(src)));
      $el.find(".actions").append($search);
      $search.click(gaTrack);
    });
  };
  
  injectSearch();

  $(window).bind("scroll", function() {
    setTimeout(injectSearch, 500);
  });
  
  $("#NewIndicator").click(function() {
    setTimeout(injectSearch, 500);
  });

  $('.mainContainer').mouseenter(function() {
    setTimeout(injectSearch, 500);
  });
  
})(jQuery);

