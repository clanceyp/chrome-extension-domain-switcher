
(function($, chrome, window) {
    "use strict";

    var backgroundPage = chrome.extension.getBackgroundPage(),
        createMenuHTML = function(menu){
            var i = 0,
                len = menu.length;

            for (;i<len;i++){
                if (menu[i].type !== "normal"){
                    continue;
                }
                $("ul").append(`<li><a href="${menu[i].url}">${menu[i].title}</a></li>`);
            }
        };

    $(document).ready(function(){
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

    backgroundPage.domainSwitcher.buildMenu(createMenuHTML);


})(window.$, window.chrome, window);