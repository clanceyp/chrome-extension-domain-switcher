
var initPopup = function(tab) {
    if (!tab||!tab.tabId){
        return;
    }
    chrome.tabs.get(tab.tabId,function(tab){
        domainSwitcher.setTabStatus(tab);
    });
};

chrome.tabs.onActivated.addListener(initPopup);
chrome.tabs.onCreated.addListener(initPopup);

chrome.runtime.onMessage.addListener(function(request, sender) {
    if (request.action === "checkUrl" && sender && sender.tab){
        domainSwitcher.setTabStatus(sender.tab);
    }
    return true;
});

chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.tabs.executeScript(tab.ib, {
        file: "lib/js/content.js"
    });
});
