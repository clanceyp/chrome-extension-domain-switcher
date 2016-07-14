
chrome.contextMenus.onClicked.addListener(domainSwitcher.onClickHandler);

chrome.runtime.onInstalled.addListener(domainSwitcher.loadMenu);

chrome.tabs.onActivated.addListener(domainSwitcher.loadSubMenuAndClean);

