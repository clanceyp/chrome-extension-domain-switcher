var domainSwitcher = {
    menuItems:[],
    menuId: "domain-switcher",
    menuTitle: "Domain switcher",
    menuTitleSettings: "Settings",
    onClickHandler: function(info, tab) {
        var url = _.findWhere(domainSwitcher.menuItems, { id : info.menuItemId}).url;
        if (url) {
            chrome.tabs.create({ url: url });
        } else {
            console.log("Domain Switch: no url found", url, domainSwitcher.menuItems, info);
        }
    },
    loadMenu: function() {
        chrome.contextMenus.create({
            "title": domainSwitcher.menuTitle,
            "id": domainSwitcher.menuId,
            "contexts": ["page"]
        },function(){
            chrome.tabs.getSelected(null, function(tab) {
                domainSwitcher.loadSubMenu(tab.url);
            });
        });
    },
    loadSubMenuAndClean: function(){
        console.log('removing all')
        chrome.contextMenus.removeAll(function (){
            if (options.getLocalStore("online", false, "boolean")) {
                domainSwitcher.loadMenu();
            }
        });
    },
    isActive: function(){
        return !options.getLocalStore("online", false, "boolean");
    },
    loadSubMenu: function(tabUrl){
        if (!options.getLocalStore("online", false, "boolean")){
            return
        }
        var items = options.getLocalStore("key-value-pair-domain", "{}", "json"),
            menuItems;

        menuItems = domainSwitcher.buildSubMenuItems(tabUrl, items);

        menuItems.push({
            "id": domainSwitcher.menuId + "-settings",
            "url": chrome.extension.getURL("/options/index.html"),
            "title": domainSwitcher.menuTitleSettings
        });

        window.menuItems = menuItems;
        domainSwitcher.menuItems = menuItems;

        domainSwitcher.createContextMenuItems(menuItems);

    },
    buildSubMenuItems: function(tabUrl, items){
        var i= 0, length = items.length, menuItems=[];
        for (;i<length;i++){
            var re = new RegExp(items[i].key),
                val = items[i].value,
                id = domainSwitcher.menuId + performance.now(),
                url = tabUrl;
            if (url.match(re)) {
                url = url.replace(re, val);
                menuItems.push({
                    "id": id,
                    "url": url,
                    "title": url.split("//")[1].split("/").shift()
                })
            }
        }
        return _.sortBy(menuItems, "title");
    },
    createContextMenuItems: function(menuItems){
        var len, i;
        for (i=0,len = menuItems.length ; i<len; i++){
            chrome.contextMenus.create({
                "title": menuItems[i].title,
                "id": menuItems[i].id,
                "parentId": domainSwitcher.menuId
            });
        }
    }
}