const activeTabs = {};

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.url.startsWith("http")) {
    activeTabs[tabId] = {
      url: tab.url,
      openTime: new Date().toISOString(),
    };
  }
});

chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
  const tabData = activeTabs[tabId];
  if (tabData) {
    const session = {
      url: tabData.url,
      openTime: tabData.openTime,
      closeTime: new Date().toISOString(),
    };
    const d = new Date();
    let day = d.getDay();
    const diffInMs = new Date() - Date.parse(tabData.openTime);
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    console.log(diffInMinutes);

    try {
        await fetch("http://localhost:5000/api/save-url", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            url: tabData.url,
            timeWeekly: { [day]: diffInMinutes }, // Using bracket notation for dynamic key
          }),
        });
      } catch (error) {
        console.error("Failed to save to DB:", error);
      }

    delete activeTabs[tabId];
  }
});

chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed");
});

chrome.tabs.onRemoved.addListener((tabId) => {
  console.log("Tab closed:", tabId);
});
