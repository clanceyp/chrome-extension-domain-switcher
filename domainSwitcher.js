var domainSwitcher = {
    menuItems:[],
    menuItemId: "domain-switcher",
    menuTitle: "Domain switcher",
    menuTitleSettings: "Options",
    isMatch: function(tabUrl){
        var match = false,
            stackItems = options.getLocalStore("key-value-pair-domain", "{}", "json"),
            individualItems = options.getLocalStore("key-value-pair-individual", "{}", "json"),
            items = stackItems.concat(individualItems),
            i = 0,
            length = items.length,
            re;
        for (;i<length;i++){
            if (items[i].key === "ignore"){
                continue;
            }
            re = new RegExp(items[i].key);
            if (tabUrl.match(re)) {
                match = true;
                break;
            }
        }
        return match;
    },
    isActive: function(){
        return options.getLocalStore("online", false, "boolean");
    },
    buildMenu: function(callBack){
        var _stackItems = options.getLocalStore("key-value-pair-domain", "{}", "json"),
            _individualItems = options.getLocalStore("key-value-pair-individual", "{}", "json"),
            menuItems = [];
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, function(tabs) {
            console.log(tabs);
            if (tabs.length && tabs[0].url) {
                menuItems = domainSwitcher.getAllSorted(tabs[0].url, _stackItems, _individualItems, "title");
            }
            callBack(menuItems);
        });
    },
    getAllSorted: function(tabUrl, _stackItems, _individualItems, sortBy){
        var stackItems = domainSwitcher.getStack(tabUrl, _stackItems),
            individualItems = domainSwitcher.getIndividual(tabUrl, _individualItems),
            menuItems = stackItems.concat(individualItems),
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
                val = items[i].value,
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
                    val = items[i].value,
                    id = domainSwitcher.menuItemId + performance.now(),
                    url = tabUrl;
                if (url.match(re)) {
                    console.log("\""+ url +"\".replace("+re.toString() +", \""+ val +"\")");
                    url = url.replace(re, val);
                    menuItems.push({
                        "id": id,
                        "url": url,
                        "title": url.split("//")[1].split("/").shift(),
                        "type": "normal"
                    })
                }
            }
        }
        return menuItems;
    },
    getIndividual: function(tabUrl, items){
        var i= 0, length = items.length, menuItems=[],
            getTitle=function(url){
                if (url.indexOf("||") > -1){            // "Label||http://mydomain.com" = "Label"
                    return url.split("||")[0];
                } else if (url.indexOf("//") > -1) {    // "http://mydomain.com" = "mydomain.com"
                    return url.split("//")[1].split("/").shift();
                } else {
                    return url;
                }
            };
        for (;i<length;i++){
            var key = items[i].key,
                re = new RegExp(key),
                val = items[i].value,
                id = domainSwitcher.menuItemId + performance.now(),
                url = tabUrl;
            if (url.match(re)) {
                url = url.replace(re, val);
                menuItems.push({
                    "id": id,
                    "url": url,
                    "title": getTitle(url),
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
    }
}