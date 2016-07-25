
var initPopup = function(tab) {
    console.log(tab)
    if (!tab||!tab.tabId){
        return;
    }
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
// chrome.tabs.onUpdated.addListener(initPopupA); returns id, not tab object
chrome.tabs.onCreated.addListener(initPopup);

