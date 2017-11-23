
(function(window, document, chrome){
    chrome.runtime.sendMessage({action:"checkUrl"}, function(response) {});
})(window, document, chrome);

