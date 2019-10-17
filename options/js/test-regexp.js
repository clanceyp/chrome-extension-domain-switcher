
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
            _stackItemsSingle = _stackItems;
            _all = [].concat(_stackItems).concat(_stackItems2).concat(_stackItems3).concat(_stackItems4).concat(_stackItems5).concat(_stackItems6),
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
        window.menuItemsAll = [];


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
           $(".test__match--individual").html("<h3>Individual match(s) found <span>"+ (domainSwitcher.getAllSorted(tabUrl, [], [], [], [], [], [], _individualItems, "title").length - 1) + "</span></h3>");
        } else {
           $(".test__match--individual").html("<h3>No individual match</h3>");
        }

        if (stack === "secondary2"){
            _stackItemsSingle = _stackItems2;
            results+= "--stack-2"
        }
        if (stack === "secondary3"){
            _stackItemsSingle = _stackItems3;
            results+= "--stack-3"
        }
        if (stack === "secondary4"){
            _stackItemsSingle = _stackItems4;
            results+= "--stack-4"
        }
        if (stack === "secondary5"){
            _stackItemsSingle = _stackItems5;
            results+= "--stack-5"
        }
        if (stack === "secondary6"){
            _stackItemsSingle = _stackItems6;
            results+= "--stack-6"
        }
        if (!stack) {
            _stackItemsSingle = _individualItems;
            menuItems = domainSwitcher.getAllSorted(tabUrl, [], [], [], [], [], [], _individualItems, "title");
        } else {
            menuItems = domainSwitcher.getAllSorted(tabUrl, _stackItemsSingle, [], [], [], [], [], [], "title");
        }


        menuItemsAll = domainSwitcher.getAllSorted(tabUrl, _stackItems, _stackItems2, _stackItems3, _stackItems4, _stackItems5, _stackItems6, _individualItems, "title");

        $(".test__results, .test__results_all").empty();

        $(".status").html("Extension active: " + !!domainSwitcher.hasMatch(tabUrl, _all) );

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
                for (var i= 0,url, len = menuItemsAll.length; i<len; i++){
                    if (menuItemsAll[i].type !== "normal" || menuItemsAll[i].url.startsWith("chrome")){continue;}
                    $(`<li data-current="${menuItemsAll[i].current}">${getTitle(menuItemsAll[i].title)} <span style="opacity: 0.4">(${getUrl(menuItemsAll[i].url)})</span></li>`)
                        .appendTo( ".test__results_all" );
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
    function isEmpty(e){
        if (!e.target.value){
            $(e.target).addClass("empty");
        } else {
            $(e.target).removeClass("empty");
        }
    }
    $(document).on('click', ".test__button", test);
    $(document).on('keyup click', "[data-bind='value: key'], [data-bind='value: value']", isEmpty);
    $(document).on('click', "[data-bind='click: addPair']", function(e){
        $(e.target)
            .closest("table")
            .find("tbody tr:last-child [data-bind='value: key'], tbody tr:last-child [data-bind='value: value']")
            .trigger("click");
    });
    $(document).on('blur', "[data-bind='value: key']", validate);
    $(document).on('change', "[name='test__input']", function(e){
        var val = $(e.target).val();
        $("[name='test__input']").val(val);
    })
    $("[name='test__input']").val( backgroundPage.options.getLocalStore("test__input", ""));
});