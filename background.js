
function onClickHandler(info, tab) {
    var url = _.findWhere(menuItems, { id : info.menuItemId}).url;
    if (url) {
        chrome.tabs.create({ url: url });
    } else {
        console.log("Domain Switch: no url found", url, menuItems, info);
    }
}

function loadMenu() {
    chrome.contextMenus.create({
        "title": "Domain switcher",
        "id": "domain-switcher",
        "contexts": ["page"]
    });
}

function loadSubMenu(tabUrl){
    if (!options.getLocalStore("online", false, "boolean")){
        return
    }
    var items = options.getLocalStore("key-value-pair-domain", "{}", "json"),
        i= 0,
        len = items.length;

    window.menuItems = [];

    if (!items){
        return;
    } else {
    }
    for (;i<len;i++){
        var re = new RegExp(items[i].key),
            matchQuote = new RegExp('"',"g"),
            arr = items[i].value.split(" "),
            id = "ds-" + performance.now(),
            url = tabUrl,
            i, len,
            sorted = [];
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
                "url": url,
                "title": url.split("//")[1].split("/").shift()
            })
        } else {
            console.log("no match", re, url)
        }
    }
    sorted = _.sortBy(menuItems, "title");

    sorted.push({
        "id": "settings-"+ performance.now(),
        "url": "/options/index.html",
        "title": "Settings"
    })

    for (i=0,len = sorted.length ; i<len; i++){
        chrome.contextMenus.create({
            "title": sorted[i].title,
            "id": sorted[i].id,
            "parentId": "domain-switcher"
        });
    }
    window.menuItems = menuItems;
}

function loadSubMenuAndClean(){
    console.log('removing all')
    chrome.contextMenus.removeAll(function (){
        if (options.getLocalStore("online", false, "boolean")) {
            loadMenu();
            chrome.tabs.getSelected(null,function(tab) {
                loadSubMenu(tab.url);
            });
        }
    });
}

chrome.contextMenus.onClicked.addListener(onClickHandler);

chrome.runtime.onInstalled.addListener(loadMenu);

chrome.tabs.onActivated.addListener(loadSubMenuAndClean);

