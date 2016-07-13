
$(document).ready(function(){
    function test(e){
        e.preventDefault();
        var tabUrl = $("[name=test__input]").val(),
            backgroundPage = chrome.extension.getBackgroundPage(),
            items = backgroundPage.options.getLocalStore("key-value-pair-domain", "{}", "json"),
            i= 0,
            len = items.length,
            sorted = [];

        window.menuItems = [];

        if (!tabUrl){
            tabUrl = "http://author.dev1.foo-bar-baz.com:4502/path/to/my/page.html"
            $("[name=test__input]").val(tabUrl);
        }

        for (;i<len;i++){
            var re = new RegExp(items[i].key),
                matchQuote = new RegExp('"',"g"),
                arr = items[i].value.split(" "),
                id = "ds-" + performance.now(),
                url = tabUrl,
                i, len;
            if (url.match(re)) {
                console.log("match found", re, arr)
                url = url.replace(re, function () {
                    var temp = arguments[0], ii = 0, len = arr.length, val, m;
                    for (; ii < len; ii=ii+1) {
                        m = arguments[(ii + 1)];
                        console.log( temp +".replace("+ m +","+ arr[ii].replace(matchQuote, "") +")" );
                        val = arr[ii].replace(matchQuote, "");
                        temp = temp.replace(m, val);
                    }
                    console.log("temp", temp)
                    return temp;
                });
                menuItems.push({
                    "id": id,
                    "url": url
                })
            } else {
                console.log("no match", re, url)
            }
        }
        $(".test__results").empty();
        sorted = _.sortBy(menuItems, "url");
        for (var item in sorted){
            var $li = $("<li />")
                .appendTo(".test__results");
            $li.text(sorted[item].url);
        }

    }
    $(document).on('click', ".test__button", test);
});