chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "getState") {
      chrome.storage.sync.get(["enabled"], sendResponse);
      return true;
    }
  });