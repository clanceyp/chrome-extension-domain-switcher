var domainSwitcher = {
    menuItems:[],
    menuItemId: "domain-switcher",
    menuTitle: "Domain switcher",
    menuTitleSettings: "Options",
    isMatch: function(tabUrl){
        var _stackItems = options.getLocalStore("key-value-pair-domain", "[]", "json"),
            _stackItems2 = options.getLocalStore("key-value-pair-domain-2", "[]", "json"),
            _stackItems3 = options.getLocalStore("key-value-pair-domain-3", "[]", "json"),
            individualItems = options.getLocalStore("key-value-pair-individual", "[]", "json"),
            items = _stackItems.concat(_stackItems2).concat(_stackItems3).concat(individualItems);

        return !!domainSwitcher.hasMatch(tabUrl, items);
    },
    hasMatch: function(tabUrl, items){
        var match = false,
            i = 0,
            length = items.length,
            re;
        for (;i<length;i++){
            if (items[i].key === "ignore"){
                continue;
            }
            re = new RegExp(items[i].key);
            if (tabUrl.match(re)) {
                match = items[i].key;
                break;
            }
        }
        return match;
    },
    isActive: function(){
        return options.getLocalStore("online", false, "boolean");
    },
    buildMenu: function(callBack){
        var _stackItems = options.getLocalStore("key-value-pair-domain", "[]", "json"),
            _stackItems2 = options.getLocalStore("key-value-pair-domain-2", "[]", "json"),
            _stackItems3 = options.getLocalStore("key-value-pair-domain-3", "[]", "json"),
            _individualItems = options.getLocalStore("key-value-pair-individual", "[]", "json"),
            menuItems = [];
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, function(tabs) {
            console.log(tabs);
            if (tabs.length && tabs[0].url) {
                menuItems = domainSwitcher.getAllSorted(tabs[0].url, _stackItems, _stackItems2, _stackItems3, _individualItems, "title");
            }
            callBack(menuItems);
        });
    },
    getAllSorted: function(tabUrl, _stackItems, _stackItems2, _stackItems3, _individualItems, sortBy){
        var stackItems = domainSwitcher.getStack(tabUrl, _stackItems),
            stackItems2 = domainSwitcher.getStack(tabUrl, _stackItems2),
            stackItems3 = domainSwitcher.getStack(tabUrl, _stackItems3),
            individualItems = domainSwitcher.getIndividual(tabUrl, _individualItems),
            menuItems = stackItems.concat(stackItems2).concat(stackItems3).concat(individualItems),
            length = menuItems.length,
            manifest = chrome.runtime.getManifest(),
            current;

        menuItems = _.sortBy(menuItems, sortBy || "title");
        current = _.findWhere(menuItems, {url: tabUrl});
        if (current){
            current.current = true;
        }
        if (length){
            menuItems.push({
                "id": "settings",
                "url": chrome.extension.getURL(manifest.options_page),
                "title": domainSwitcher.menuTitleSettings,
                "type": "normal"
            })
        }
        return menuItems;
    },
    getStack: function(tabUrl, items){
        var i= 0, length = items.length, menuItems=[], match = false;
        for (;i<length;i++){
            if (items[i].key === "ignore"){
                continue;
            }
            var key = items[i].key;
                re = new RegExp(key),
                val = domainSwitcher.getURL(items[i].value),
                id = domainSwitcher.menuItemId + performance.now(),
                url = tabUrl;
            if (url.match(re)) {
                match = re;
                if (match){
                    break;
                }
            }
        }
        if (match){
            for (i=0;i<length;i++){
                var re = match,
                    val = domainSwitcher.getURL(items[i].value),
                    id = domainSwitcher.menuItemId + performance.now(),
                    url = tabUrl;
                if (url.match(re)) {
                    console.log("\""+ url +"\".replace("+re.toString() +", \""+ val +"\")");
                    url = url.replace(re, val);
                    menuItems.push({
                        "id": id,
                        "url": domainSwitcher.cleanURL(url),
                        "title": domainSwitcher.getTitle(items[i].value, url),
                        "type": "normal"
                    })
                }
            }
        }
        return menuItems;
    },
    getIndividual: function(tabUrl, items){
        var i= 0, length = items.length, menuItems=[];
        for (;i<length;i++){
            var key = items[i].key,
                re = new RegExp(key),
                val = domainSwitcher.getURL(items[i].value),
                id = domainSwitcher.menuItemId + performance.now(),
                url = tabUrl;
            if (url.match(re)) {
                url = url.replace(re, val);
                menuItems.push({
                    "id": id,
                    "url": domainSwitcher.cleanURL(url),
                    "title": domainSwitcher.getTitle(items[i].value, url),
                    "type": "normal"
                })
            }
        }
        return menuItems;
    },
    setTabStatus: function(tab){
        if (!domainSwitcher.isActive()){
            chrome.pageAction.hide(tab.id);
            return;
        }
        var isMatch = domainSwitcher.isMatch(tab.url);
        if (isMatch){
            chrome.pageAction.show(tab.id);
        } else {
            chrome.pageAction.hide(tab.id);
        }
    },
    getTitle: function(raw, url){
        var label;
        if (raw.indexOf("||") > -1){            // "Label||http://mydomain.com" = "Label"
            label = raw.split("||")[0];
        } else if (url.indexOf("//") > -1) {    // "http://mydomain.com" = "mydomain.com"
            label = url.split("//")[1].split("/")[0];
        } else {
            label = url;
        }
        return label;
    },
    getURL: function(url){
        return url.split("||").pop();
    },
    cleanURL: function(url){
        /*
        * cleanURL("http://www.foo.com//bar/baz//qux/.html") == "http://www.foo.com/bar/baz/qux.html"
        *
        * */
        function replacer(match, p1, offset, string) {
            return match.substring(0, 2);
        }
        return url.replace(/\/\.html/,'.html').replace(/[^:](\/\/+)/g, replacer);
    }
};