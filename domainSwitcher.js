var domainSwitcher = {
    menuItems:[],
    onClickHandler: function(info, tab) {
        var url = _.findWhere(domainSwitcher.menuItems, { id : info.menuItemId}).url;
        if (url) {
            chrome.tabs.create({ url: url });
        } else {
            console.log("Domain Switch: no url found", url, domainSwitcher.menuItems, info);
        }
    },
    loadMenu: function() {
        console.log("menu loaded")
        chrome.contextMenus.create({
            "title": "Domain switcher",
            "id": "domain-switcher",
            "contexts": ["page"]
        });
    },
    loadSubMenuAndClean: function(){
        console.log('removing all')
        chrome.contextMenus.removeAll(function (){
            if (options.getLocalStore("online", false, "boolean")) {
                domainSwitcher.loadMenu();
                chrome.tabs.getSelected(null,function(tab) {
                    domainSwitcher.loadSubMenu(tab.url);
                });
            }
        });
    },
    isActive: function(){
        return !options.getLocalStore("online", false, "boolean");
    },
    loadSubMenu: function(tabUrl){
        console.log("derro")
        if (!options.getLocalStore("online", false, "boolean")){
            return
        }
        var items = options.getLocalStore("key-value-pair-domain", "{}", "json"),
            menuItems;

        menuItems = domainSwitcher.buildSubMenuItems(tabUrl, items);

        menuItems.push({
            "id": "settings-"+ performance.now(),
            "url": chrome.extension.getURL("/options/index.html"),
            "title": "Settings"
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
                id = "ds-" + performance.now(),
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
                "parentId": "domain-switcher"
            });
        }
    }
}