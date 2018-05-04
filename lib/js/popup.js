
(function($, chrome, window) {
    "use strict";

    var createMenuHTML = function(menu, qs){
            var i = 0,
                len = menu.length,
                li,
                title,
                href,
                getHref = function(href){
                    if (qs && href.indexOf("?")>0){
                        href+="&"+qs;
                    } else if (qs){
                        href+="?"+qs;
                    }
                    return href;
                };
            $("ul").empty();
            if (len === 0){
                $("ul").append( "<li><a>Sorry, no match found</a>" );
            }
            for (;i<len;i++){
                if (menu[i].type !== "normal" || menu[i].current){
                    continue;
                }
                href = getHref(menu[i].url);
                title = href.startsWith("chrome") ? "Extension options page" : href;
                li = `<li title="${ title }"><a href="${ href }">${ menu[i].title }</a></li>`;
                $("ul").append( li );
            }
        };

    $(document).ready(function(){
        var backgroundPage, message = "";
        $("ul").empty();
        try {
            backgroundPage = chrome.extension.getBackgroundPage();
        } catch(e){
            message = e;
        } finally {
            if (backgroundPage){
                $("ul").append( "<li><a>Loading...</a>" );
                backgroundPage.domainSwitcher.buildMenu(createMenuHTML);
            } else {
                $("ul").append( `<li><a>Cannot access background page; ${message}</a>` );
            }
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