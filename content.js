chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getState") {
    sendResponse({ 
      enabled: document.documentElement.classList.contains("dark-grayscale") 
    });
    return true;
  }
});

chrome.storage.sync.get(["enabled"], (data) => {
  if (data.enabled) {
    applyDarkGrayscale();
  } else {
    removeDarkGrayscale();
  }
});

chrome.runtime.onMessage.addListener((request) => {
  if (request.action === "toggle") {
    request.enabled ? applyDarkGrayscale() : removeDarkGrayscale();
  }
});

function applyDarkGrayscale() {
  if (document.getElementById("dark-grayscale-style")) return;

  const style = document.createElement("style");
  style.id = "dark-grayscale-style";
  style.textContent = `
    html.dark-grayscale, html.dark-grayscale body {
      filter: grayscale(100%) !important;
      background-color: #121212 !important;
      color: #e0e0e0 !important;
      transition: filter 0.3s ease, background-color 0.3s ease;
    }
    html.dark-grayscale img,
    html.dark-grayscale video,
    html.dark-grayscale iframe {
      filter: grayscale(100%) !important;
      transition: filter 0.3s ease;
    }
  `;
  document.head.appendChild(style);
  document.documentElement.classList.add("dark-grayscale");
}

function removeDarkGrayscale() {
  const style = document.getElementById("dark-grayscale-style");
  if (style) style.remove();
  document.documentElement.classList.remove("dark-grayscale");
}