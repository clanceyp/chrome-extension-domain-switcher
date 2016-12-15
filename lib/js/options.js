/**
 * @author patcla
 */

(function(chrome){
    "use strict";

    var backgroundPage = chrome.extension.getBackgroundPage();

    function updateIfValidJson(key, str){
        var json;
        try {
            json = JSON.parse(str);
        } catch (e){
            alert("Not saving; \n"+  e);
            return;
        }
        backgroundPage.options.setLocalStore(key, str);
        location.reload();
    }

    $(document).ready(function(){
        $(document).on('click', "[data-custom-event-default]", function(e){
            e.preventDefault();
            var key = "key-value-pair-domain",
                value = backgroundPage.options.getLocalStore(key),
                newValue = prompt("Bulk Edit Settings", value);
            if (newValue && newValue !== value){
                updateIfValidJson(key, newValue);
            }
        });
        $(document).on('click', "[data-custom-event-advanced]", function(e){
            e.preventDefault();
            var key = "key-value-pair-individual",
                value = backgroundPage.options.getLocalStore(key),
                newValue = prompt("Bulk Edit Settings", value);
            if (newValue && newValue !== value){
                updateIfValidJson(key, newValue);
            }
        });
    });


})(window.chrome);
