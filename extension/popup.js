document.addEventListener("DOMContentLoaded", () => {
  const viewStatsBtn = document.getElementById("view-stats");

  if (viewStatsBtn) {
    viewStatsBtn.addEventListener("click", () => {
      chrome.tabs.create({ url: "http://localhost:5173" });
    });
  } else {
    console.warn("view-stats button not found!");
  }

  chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
    const currentTab = tabs[0];
    const match = currentTab.url.match(
      /(?:https?:\/\/)?(?:www\.)?([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/
    );

    if (!match) return;
    const currentURL = match[1];

    // Defining the array
    let storedURLs = JSON.parse(localStorage.getItem("urls")) || [];

    if (!storedURLs.includes(currentURL)) {
      //Save to DB
      await fetch("http://localhost:5000/api/save-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: currentURL, timeWeekly: { sunday: 2 } }),
      });
    }

    //getting from DB
    const response = await fetch("http://localhost:5000/api/urls");
    const urlsFromDB = await response.json();

    //rendering to the DOM
    const listEl = document.getElementById("local-url");
    if (listEl) {
      listEl.innerHTML = "";
      urlsFromDB.forEach(({ url }) => {
        const li = document.createElement("li");
        li.textContent = url;
        listEl.appendChild(li);
      });
    } else {
      console.warn("Element with id 'local-url' not found in DOM.");
    }
  });
});
