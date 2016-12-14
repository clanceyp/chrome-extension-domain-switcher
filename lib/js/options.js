/**
 * @author patcla
 */

(function(chrome){
    "use strict";

    var backgroundPage = chrome.extension.getBackgroundPage();

    $(document).ready(function(){
        $(document).on('click', "[data-custom-event-default]", function(e){
            e.preventDefault();
            var text = backgroundPage.options.getLocalStore("key-value-pair-domain"),
                newText = prompt("Bulk Edit Settings", text);
            if (newText !== text){
                backgroundPage.options.setLocalStore("key-value-pair-domain", newText);
                location.reload();
            }
        });
        $(document).on('click', "[data-custom-event-advanced]", function(e){
            e.preventDefault();
            var text = backgroundPage.options.getLocalStore("key-value-pair-advanced"),
                newText = prompt("Bulk Edit Advanced Settings", text);
            if (newText !== text){
                backgroundPage.options.setLocalStore("key-value-pair-advanced", newText);
                location.reload();
            }
        });
    });


})(window.chrome);
