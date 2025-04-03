chrome.storage.sync.get(["enabled"], (data) => {
  if (data.enabled) {
    applyDarkGrayscale();
  } else {
    removeDarkGrayscale();
  }
});

function applyDarkGrayscale() {
  const style = document.createElement("style");
  style.id = "dark-grayscale-style";
  style.textContent = `
    html.dark-grayscale, html.dark-grayscale body {
      filter: grayscale(100%) !important;
      background-color: #121212 !important;
      color: #e0e0e0 !important;
    }
    html.dark-grayscale img,
    html.dark-grayscale video {
      filter: grayscale(100%) !important;
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