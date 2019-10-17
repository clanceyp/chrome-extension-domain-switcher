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
        $(document).on("click", "[data-edit-key-value-item]", function(e){
            e.preventDefault();
            var key = $(e.target).data("key"),
                label = $(e.target).val(),
                value = backgroundPage.options.getLocalStore(key)||"",
                newValue = prompt(label+"?", value);
            if (newValue && newValue !== value){
                updateIfValidJson(key, newValue);
            }
        });
        $(document).on("click", "[data-reset-key-value-item]", function(e){
            e.preventDefault();
            var key = $(e.target).data("key"),
                label = $(e.target).val(),
                value = AEMPRESET,
                newValue = prompt(label+"?", value);
            if (newValue){
                updateIfValidJson(key, newValue);
            }
        });
        $(document).on("click", "[data-clear-key-value-item]", function(e){
            e.preventDefault();
            var key = $(e.target).data("key"),
                label = $(e.target).val(),
                value = confirm(label+"?");
            if (value){
                localStorage.removeItem(key);
                location.reload();
            }
        });
        $(document).on("click", ".navigation-link-proxy", function(e) {
            var href = $(e.target).attr("href");
            var selector = `.settings__navigation-list a[href='${href}']`;
            if ($(selector).length) {
                $(selector).trigger("click");
            }
        });
        $("[data-match]").text(COLONETITLE);
        $("[data-replace]").text(COLTWOTITLE);
    });


})(window.chrome);
