document.addEventListener("DOMContentLoaded", () => {
  const viewStatsBtn = document.getElementById("view-stats");

  viewStatsBtn.addEventListener("click", () => {
    chrome.tabs.create({ url: "http://localhost:5173" });
  });
});
