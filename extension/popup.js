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

  function formatDuration(start, end) {
    const startTime = new Date(start);
    const endTime = new Date(end);
    const diffMs = endTime - startTime;

    const seconds = Math.floor((diffMs / 1000) % 60);
    const minutes = Math.floor((diffMs / 1000 / 60) % 60);
    const hours = Math.floor(diffMs / 1000 / 60 / 60);

    return `${hours}h ${minutes}m ${seconds}s`;
  }

  chrome.storage.local.get("siteLogs", (result) => {
    const logs = result.siteLogs || [];
    const logsContainer = document.getElementById("logs");

    if (logs.length === 0) {
      logsContainer.textContent = "No sessions tracked yet.";
      return;
    }

    logs.reverse().forEach((log) => {
      const div = document.createElement("div");
      div.className = "log";
      div.innerHTML = `
        <strong>URL:</strong> ${log.url}<br>
        <strong>Opened:</strong> ${new Date(log.openTime).toLocaleString()}<br>
        <strong>Closed:</strong> ${new Date(log.closeTime).toLocaleString()}<br>
        <strong>Duration:</strong> ${formatDuration(
          log.openTime,
          log.closeTime
        )}
      `;
      logsContainer.appendChild(div);
    });
  });
});
