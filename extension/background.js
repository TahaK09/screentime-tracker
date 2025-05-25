const activeTabs = {};

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.url.startsWith("http")) {
    activeTabs[tabId] = {
      url: tab.url,
      openTime: new Date().toISOString(),
    };
  }
});
chrome.tabs.onRemoved.addListener(async (tabId, removeInfo) => {
  const tabData = activeTabs[tabId];
  if (!tabData) return;

  const match = tabData.url.match(
    /(?:https?:\/\/)?(?:www\.)?([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/
  );
  if (!match) return;

  const currentURL = match[1];
  const openTime = new Date(tabData.openTime);
  const closeTime = new Date();
  const diffInMinutes = Math.floor((closeTime - openTime) / (1000 * 60));
  const today = new Date().toISOString().split("T")[0];
  console.log(openTime);
  console.log(closeTime);
  console.log(diffInMinutes);
  try {
    const res = await fetch("http://localhost:5000/api/check-url", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: currentURL }),
    });

    const urlExist = await res.json();

    if (urlExist.success) {
      const currentData = urlExist.data.screentime;
      const currentTime = currentData?.[today] || 0;
      const updatedTime = currentTime + diffInMinutes;

      await fetch("http://localhost:5000/api/update-screentime", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: currentURL,
          screentime: { [today]: updatedTime },
        }),
      });
    } else {
      await fetch("http://localhost:5000/api/save-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: currentURL,
          screentime: { [today]: diffInMinutes },
        }),
      });
    }
  } catch (error) {
    console.error("Error tracking screen time:", error);
  }

  delete activeTabs[tabId];
});

chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed");
});
