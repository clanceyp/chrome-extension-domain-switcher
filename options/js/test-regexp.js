
$(document).ready(function(){
    var backgroundPage = chrome.extension.getBackgroundPage();
    function test(e){
        e.preventDefault();
        var tabUrl = $("[name=test__input]").val(),
            items = backgroundPage.options.getLocalStore("key-value-pair-domain", "{}", "json"),
            _stackItems = backgroundPage.options.getLocalStore("key-value-pair-domain", "{}", "json"),
            _individualItems = backgroundPage.options.getLocalStore("key-value-pair-individual", "{}", "json");

        window.menuItems = [];

        if (!tabUrl){
            tabUrl = $("[name=test__input]").attr("placeholder");
            $("[name=test__input]").val(tabUrl);
        }
        // $("textarea.settings").val( backgroundPage.options.getLocalStore("key-value-pair-domain", "") )

        menuItems = domainSwitcher.getAllSorted(tabUrl, _stackItems, _individualItems, "url");

        $(".test__results").empty();

        if (menuItems.length === 0){
            $("<li>No match found</li>")
                .appendTo(".test__results");
        } else {
            setTimeout(function(){
                for (var i= 0, len = menuItems.length; i<len; i++){
                   if (menuItems[i].type !== "normal"){continue;}
                    $(`<li>${menuItems[i].url}</li>`)
                        .appendTo(".test__results");
                }
            },300);
        }

    }
    function validate(e){
        var $el = $(e.target), text = $el.val() || "()(", re, ok = true, outline;
        try {
            re = new RegExp(text);
        } catch(e){
            ok = false;
        } finally {
            outline = "0 0 3px 2px "+ (ok ? "rgba(100, 245, 100, 0.5)" : "rgba(245, 100, 100, 0.5)");
            $el.css("box-shadow", outline );
        }
    }
    $(document).on('click', ".test__button", test);
    $(document).on('blur', "[data-bind='value: key']", validate);
    $(document).on('change', "[name='test__input']", function(e){
        var val = $(e.target).val();
        $("[name='test__input']").val(val);
    })
    $("[name='test__input']").val( backgroundPage.options.getLocalStore("test__input", ""));
});




(function(cookieToDelete) {
    var cookies = {},
        c,
        i = 0,
        name,
        value,
        len;
    if (document.cookie && document.cookie.length > 0) {
        c = document.cookie.split(";");
        len = c.length;
        re = /^ /;
        for (; i < len; i = i + 1) {
            name = c[i].split("=").shift().replace(re,"");
            value = c[i].substring(name.length+1)||"";
            cookies[decodeURIComponent(name)] = decodeURIComponent(value);
        }
    }
    if (cookies[cookieToDelete]){
        document.cookie = cookieToDelete +'=; expires='+ (new Date(0).toUTCString()) +'; path=/; domain=.telegraph.co.uk'
    }
})("Ooyala");

