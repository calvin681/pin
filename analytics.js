var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-27036924-1']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

chrome.extension.onRequest.addListener(
  function(request, sender, sendResponse) {
    if (request['track']) {
      _gaq.push(['_trackEvent', 'pin-search', 'clicked']);
    }
  });