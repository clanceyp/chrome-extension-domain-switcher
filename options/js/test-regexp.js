
$(document).ready(function(){
    var backgroundPage = chrome.extension.getBackgroundPage();
    function test(e){
        e.preventDefault();
        var tabUrl = $("[name=test__input]").val(),
            stack = $(e.target).data("stack"),
            results = ".test__results",
            _stackItems = backgroundPage.options.getLocalStore("key-value-pair-domain", "{}", "json"),
            _stackItems2 = backgroundPage.options.getLocalStore("key-value-pair-domain-2", "{}", "json"),
            _stackItems3 = backgroundPage.options.getLocalStore("key-value-pair-domain-3", "{}", "json"),
            _stackItems4 = backgroundPage.options.getLocalStore("key-value-pair-domain-4", "{}", "json"),
            _stackItems5 = backgroundPage.options.getLocalStore("key-value-pair-domain-5", "{}", "json"),
            _stackItems6 = backgroundPage.options.getLocalStore("key-value-pair-domain-6", "{}", "json"),
            _individualItems = backgroundPage.options.getLocalStore("key-value-pair-individual", "{}", "json"),
            getTitle=function(url){
                if (url.indexOf("||") > -1){            // "Label||http://mydomain.com" = "Label"
                    return url.split("||")[0];
                } else if (url.indexOf("//") > -1) {    // "http://mydomain.com" = "mydomain.com"
                    return url.split("//")[1].split("/")[0];
                } else {
                    return url;
                }
            },
            getUrl=function(url){
                return url.split("||").pop();
            };

        window.menuItems = [];

        if (!tabUrl){
            tabUrl = $("[name=test__input]").attr("placeholder");
            $("[name=test__input]").val(tabUrl);
        }
        // $("textarea.settings").val( backgroundPage.options.getLocalStore("key-value-pair-domain", "") )

        if (domainSwitcher.hasMatch(tabUrl, _stackItems)){
            $(".test__match--stack").html("Match found <span>"+ domainSwitcher.hasMatch(tabUrl, _stackItems) + "</span>");
        } else {
            $(".test__match--stack").html("No match in stack");
        }
        if (domainSwitcher.hasMatch(tabUrl, _stackItems2)){
            $(".test__match--stack-2").html("Match found <span>"+ domainSwitcher.hasMatch(tabUrl, _stackItems2) + "</span>");
        } else {
            $(".test__match--stack-2").html("No match in stack");
        }
        if (domainSwitcher.hasMatch(tabUrl, _stackItems3)){
            $(".test__match--stack-3").html("Match found <span>"+ domainSwitcher.hasMatch(tabUrl, _stackItems3) + "</span>");
        } else {
            $(".test__match--stack-3").html("No match in stack");
        }
        if (domainSwitcher.hasMatch(tabUrl, _stackItems4)){
            $(".test__match--stack-4").html("Match found <span>"+ domainSwitcher.hasMatch(tabUrl, _stackItems4) + "</span>");
        } else {
            $(".test__match--stack-4").html("No match in stack");
        }
        if (domainSwitcher.hasMatch(tabUrl, _stackItems5)){
            $(".test__match--stack-5").html("Match found <span>"+ domainSwitcher.hasMatch(tabUrl, _stackItems5) + "</span>");
        } else {
            $(".test__match--stack-5").html("No match in stack");
        }
        if (domainSwitcher.hasMatch(tabUrl, _stackItems6)){
            $(".test__match--stack-6").html("Match found <span>"+ domainSwitcher.hasMatch(tabUrl, _stackItems6) + "</span>");
        } else {
            $(".test__match--stack-6").html("No match in stack");
        }
        if (domainSwitcher.hasMatch(tabUrl, _individualItems)){
            $(".test__match--individual").html("Match found <span>"+ domainSwitcher.hasMatch(tabUrl, _individualItems) + "</span>");
        } else {
            $(".test__match--individual").html("No individual match");
        }

        if (stack === "secondary2"){
            _stackItems = _stackItems2;
            results+= "--stack-2"
        }
        if (stack === "secondary3"){
            _stackItems = _stackItems3;
            results+= "--stack-3"
        }
        if (stack === "secondary4"){
            _stackItems = _stackItems4;
            results+= "--stack-4"
        }
        if (stack === "secondary5"){
            _stackItems = _stackItems5;
            results+= "--stack-5"
        }
        if (stack === "secondary6"){
            _stackItems = _stackItems6;
            results+= "--stack-6"
        }

        menuItems = domainSwitcher.getAllSorted(tabUrl, _stackItems, [], [], [], [], [], _individualItems, "title");

        $(".test__results").empty();

        if (menuItems.length === 0){
            $("<li>No match found</li>")
                .appendTo(".test__results");
        } else {
            setTimeout(function(){
                for (var i= 0,url, len = menuItems.length; i<len; i++){
                   if (menuItems[i].type !== "normal" || menuItems[i].url.startsWith("chrome")){continue;}
                   $(`<li data-current="${menuItems[i].current}">${getTitle(menuItems[i].title)} <span style="opacity: 0.4">(${getUrl(menuItems[i].url)})</span></li>`)
                       .appendTo( results );
                }
            },300);
        }

    }
    function validate(e){
        var $el = $(e.target), text = $el.val() || "()(", re, ok = true, outline;
        if (text === "ignore"){
            return;
        }
        try {
            re = new RegExp(text);
        } catch(e){
            ok = false;
        } finally {
            outline = ok ? "valid" : "invalid";
            $el.removeClass("valid invalid").addClass(outline);
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

