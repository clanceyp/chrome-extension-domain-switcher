
(function($, chrome, window) {
    "use strict";

    var createMenuHTML = function(menu){
            var i = 0,
                len = menu.length,
                li;
            $("ul").empty()
            if (len === 0){
                $("ul").append( "<li><a>No results</a>" );
            }
            console.log("menu", menu)
            for (;i<len;i++){
                if (menu[i].type !== "normal"){
                    continue;
                }
                li = '<li><a href="'+ menu[i].url +'">'+ menu[i].title +'</a></li>';
                $("ul").append( li );
            }
        };

    $(document).ready(function(){
        var backgroundPage = chrome.extension.getBackgroundPage();
        if (backgroundPage){
            $("ul").empty().append( "<li><a>Loading...</a>" );
            backgroundPage.domainSwitcher.buildMenu(createMenuHTML);
        } else {
            $("ul").empty().append( "<li><a>Cannot access background page</a>" );
        }

        $('body').on('click', 'nav a', function(e){
            var $link = $(e.target);
            e.preventDefault();
            chrome.tabs.create({url: $link.attr('href') });
        });
        $('body').on('mouseover', 'nav a', function(e){
            var $link = $(e.target);
            $link.focus();
        });
    });

})(window.$, window.chrome, window);




/*(function(){

    var count = 0,
        max = 24,
        togglePremium = function (){
            if ("tmgJQ" in window){
                console.log("set")
                tmgJQ(document).on("click", ".toggle-premium-on-lists", function(){
                    tmgJQ(".list-of-entities.version-3, .list-of-entities.version-6, .list-of-entities.version-14,  .list-of-entities.version-15, .list-of-entities.version-16, .list-of-entities.version-20").toggleClass("list-of-entities--premium");
                    tmgJQ(".segment-container--option").toggleClass("segment-container--premium");
                });
                tmgJQ("body").attr("toggle-premium-on-lists","true");
            } else if ( count < max ){
                console.log("not yet set", count);
                count++;
                setTimeout(togglePremium,1000);
            } else {
                console.log("giving up, cant find tmgJQ");
            }
        }
    togglePremium();
})();*/
