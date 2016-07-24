
// chrome.contextMenus.onClicked.addListener(domainSwitcher.onClickHandler);

// chrome.runtime.onInstalled.addListener(domainSwitcher.init);
// chrome.tabs.onActivated.addListener(domainSwitcher.init);
// chrome.tabs.onCreated.addListener(domainSwitcher.init);
// chrome.tabs.onUpdated.addListener(domainSwitcher.init);

var initPopup = function(tab) {
    chrome.tabs.get(tab.tabId,function(tab){
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
    });
}

chrome.tabs.onActivated.addListener(initPopup);
chrome.tabs.onUpdated.addListener(initPopup);
chrome.tabs.onCreated.addListener(initPopup);

//(function(){
//    var count = 0,
//        max = 12,
//        togglePremium = function (){
//            if ("tmgJQ" in window){
//                tmgJQ(document).on("click", ".toggle-premium-on-lists", function(){
//                    tmgJQ(".list-of-entities.version-3, .list-of-entities.version-6, .list-of-entities.version-14, .list-of-entities.version-16, .list-of-entities.version-20").toggleClass("list-of-entities--premium");
//                    tmgJQ(".segment-container--option").toggleClass("segment-container--premium");
//                });
//            } else if ( count < max ){
//                count++;
//                setTimeout(togglePremium,1000);
//            }
//        }
//    togglePremium();
//
//})();

//chrome.contextMenus.onClicked.addListener(mySwitcher.onClickHandler);
//
//chrome.runtime.onInstalled.addListener(mySwitcher.init);
//chrome.tabs.onActivated.addListener(mySwitcher.init);
//chrome.tabs.onCreated.addListener(mySwitcher.init);
//chrome.tabs.onUpdated.addListener(mySwitcher.init);
//
//
//var mySwitcher = {
//    menuItems:[],
//    menuItemId: "my-switcher",
//    menuTitle: "My Switcher",
//    onClickHandler: function(info, tab) {
//        var url = _.findWhere(mySwitcher.menuItems, {id : info.menuItemId}).url;
//        if (url) {
//            chrome.tabs.create({ url: url });
//        }
//    },
//    init: function(){
//        chrome.contextMenus.removeAll(function () {
//            chrome.tabs.getSelected(null, function (tab) {
//                mySwitcher.loadMenu(tab);
//            });
//        });
//    },
//    loadMenu: function(tab) {
//        if (tab && tab.url) {
//            chrome.contextMenus.create({
//                "title": mySwitcher.menuTitle,
//                "id": mySwitcher.menuItemId,
//                "contexts": ["page"]
//            }, function () {
//                mySwitcher.loadSubMenu(tab.url);
//            });
//        }
//    },
//    loadSubMenu: function(){
//        var menuItems = mySwitcher.menuItems = options.getLocalStore("my-domain", "{}", "json");
//
//        for (var i=0, len = menuItems.length; i<len; i++){
//            chrome.contextMenus.create({
//                "title": menuItems[i].title,
//                "id": menuItems[i].id,
//                "parentId": mySwitcher.menuItemId,
//                "type" : menuItems[i].type
//            });
//        }
//
//    }
//}