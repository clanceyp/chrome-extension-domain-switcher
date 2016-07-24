var domainSwitcher = {
    menuItems:[],
    menuItemId: "domain-switcher",
    menuTitle: "Domain switcher",
    menuTitleSettings: "Settings",
    onClickHandler: function(info, tab) {
        console.log("info", info);
        console.log("tab", tab);
        var url = _.findWhere(domainSwitcher.menuItems, {id : info.menuItemId}).url;
        if (url) {
            chrome.tabs.create({ url: url });
        }
    },
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
    loadMenu: function(tab) {
        if (tab && tab.url) {
            chrome.contextMenus.create({
                "title": domainSwitcher.menuTitle,
                "id": domainSwitcher.menuItemId,
                "contexts": ["page"]
            }, function () {
                domainSwitcher.loadSubMenu(tab.url);
            });
        }
    },
    init: function(){
        chrome.contextMenus.removeAll(function () {
            domainSwitcher.menuItems = [];
            if (options.getLocalStore("online", false, "boolean")) {
                chrome.tabs.getSelected(null, function (tab) {
                    // domainSwitcher.menuItemId = "domain-switcher";
                    domainSwitcher.loadMenu(tab);
                });
            }
        });
    },
    getMenu: function(callBack){
        chrome.tabs.getSelected(null, function (tab) {
            // domainSwitcher.menuItemId = "domain-switcher";
            domainSwitcher.loadSubMenu(tab.url, callBack);
        });
    },
    isActive: function(){
        return !options.getLocalStore("online", false, "boolean");
    },
    buildMenu: function(tabUrl, callBack){
        var _stackItems = options.getLocalStore("key-value-pair-domain", "{}", "json"),
            _individualItems = options.getLocalStore("key-value-pair-individual", "{}", "json"),
            menuItems = domainSwitcher.getAllSorted(tabUrl, _stackItems, _individualItems, "title");

        callBack(menuItems);
    },
    loadSubMenu: function(tabUrl, callBack){

        var items = options.getLocalStore("key-value-pair-domain", "{}", "json"),
            menuItems = [];
        window.menuItems = domainSwitcher.menuItems = menuItems;

        menuItems = domainSwitcher.buildSubMenuItems(tabUrl, items);

        menuItems.push({
            "id": domainSwitcher.menuItemId + "-settings",
            "url": chrome.extension.getURL("/options/index.html"),
            "title": domainSwitcher.menuTitleSettings,
            "type": "normal"
        });

        window.menuItems = domainSwitcher.menuItems = menuItems;

        if (callBack){
            callBack(menuItems);
        } else {
           domainSwitcher.createContextMenuItems(menuItems);
        }

    },
    getAllSorted: function(tabUrl, _stackItems, _individualItems, sortBy){
        var stackItems = domainSwitcher.getStack(tabUrl, _stackItems),
            individualItems = domainSwitcher.getIndividual(tabUrl, _individualItems),
            menuItems = stackItems.concat(individualItems);

        menuItems = _.sortBy(menuItems, sortBy || "title");
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
        var i= 0, length = items.length, menuItems=[], sorted = [];
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
                    "title": url.split("//")[1].split("/").shift(),
                    "type": "normal"
                })
            }
        }
        return menuItems;
    },
    buildSubMenuItems: function(tabUrl, items){
        var i= 0, length = items.length, menuItems=[], sorted = [];
        for (;i<length;i++){
            var re = new RegExp(items[i].key),
                val = items[i].value,
                id = domainSwitcher.menuItemId + performance.now(),
                url = tabUrl;
            if (url.match(re)) {
                url = url.replace(re, val);
                menuItems.push({
                    "id": id,
                    "url": url,
                    "title": url.split("//")[1].split("/").shift(),
                    "type": "normal"
                })
            }
        }
        if (menuItems.length > 0){
            sorted = _.sortBy(menuItems, "title");
            sorted.push({
                "type" : "separator",
                "title" : "",
                "id" : "separator"
            });
        }
        return sorted;
    },
    createContextMenuItems: function(menuItems){
        var len, i;
        for (i=0, len = menuItems.length; i<len; i++){
            chrome.contextMenus.create({
                "title": menuItems[i].title,
                "id": menuItems[i].id,
                "parentId": domainSwitcher.menuItemId,
                "type" : menuItems[i].type
            });
        }
    }
}