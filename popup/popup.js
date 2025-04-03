document.getElementById("toggleBtn").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
  if (tab.url?.startsWith("chrome://") || tab.url?.startsWith("about:")) {
    return;
  }

  const { enabled } = await chrome.storage.sync.get(["enabled"]);
  const newState = !enabled;

  await chrome.storage.sync.set({ enabled: newState });
  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['content.js']
  });
});

chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
  const tab = tabs[0];
  const btn = document.getElementById("toggleBtn");
  
  if (tab.url?.startsWith("chrome://")) {
    btn.textContent = "Not available on Chrome pages";
    btn.disabled = true;
    return;
  }

  const { enabled } = await chrome.storage.sync.get(["enabled"]);
  btn.textContent = enabled ? "Disable Reading Mode" : "Enable Reading Mode";
});