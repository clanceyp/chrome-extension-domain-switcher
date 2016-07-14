
$(document).ready(function(){
    var backgroundPage = chrome.extension.getBackgroundPage();
    function test(e){
        e.preventDefault();
        var tabUrl = $("[name=test__input]").val(),
            items = backgroundPage.options.getLocalStore("key-value-pair-domain", "{}", "json");

        window.menuItems = [];

        if (!tabUrl){
            tabUrl = "http://author.dev1.foo-bar-baz.com:4502/path/to/my/page.html";
            $("[name=test__input]").val(tabUrl);
        }

        menuItems = domainSwitcher.buildSubMenuItems(tabUrl, items);

        $(".test__results").empty();

        for (var item in menuItems){
            var $li = $("<li />")
                .appendTo(".test__results");
            $li.text(menuItems[item].url);
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
    $("[name='test__input']").val( backgroundPage.options.getLocalStore("test__input", ""));
});




