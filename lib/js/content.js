
(function(window, document, chrome){
    if (document.readyState === "complete") {
        chrome.runtime.sendMessage({action:"checkUrl"}, function(response) {});
    }
    window.addEventListener("load", function(){
        chrome.runtime.sendMessage({action:"checkUrl"}, function(response) {});
    },false);
})(window, document, chrome);

