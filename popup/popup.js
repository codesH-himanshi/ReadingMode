updateButtonState();

document.getElementById("toggleBtn").addEventListener("click", toggleMode);
async function toggleMode() {
  const btn = document.getElementById("toggleBtn");
  btn.disabled = true;

  try {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    if (tab.url?.startsWith("chrome://") || tab.url?.startsWith("about:")) return;

    const { enabled } = await chrome.storage.sync.get(["enabled"]);
    const newState = !enabled;

    await chrome.storage.sync.set({ enabled: newState });

    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["content.js"],
    });

    chrome.tabs.sendMessage(tab.id, { action: "toggle", enabled: newState });
  } catch (error) {
    console.error("Toggle failed:", error);
  } finally {
    updateButtonState();
  }
}

async function updateButtonState(state) {
  const btn = document.getElementById("toggleBtn");
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (tab.url?.startsWith("chrome://") || tab.url?.startsWith("about:")) {
    btn.textContent = "Not available on this page";
    btn.disabled = true;
    return;
  }

  try {
    const response = await chrome.tabs.sendMessage(tab.id, {
      action: "getState",
    });
    btn.textContent = response?.enabled ? "Disable" : "Enable";
  } catch (error) {
    const { enabled } = await chrome.storage.sync.get(["enabled"]);
    btn.textContent = enabled ? "Disable" : "Enable";
  }
  btn.disabled = false;
}

async function updateAllTabs(enabled) {
  const tabs = await chrome.tabs.query({});
  for (const tab of tabs) {
    if (tab.url?.startsWith("chrome://") || tab.url?.startsWith("about:")) {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["content.js"],
      });
    }
  }
  chrome.runtime.sendMessage({ action: "toggle", enabled });
}
