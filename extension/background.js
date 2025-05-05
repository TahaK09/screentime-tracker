let activeTabId = null;
let activeDomain = null;
let startTime = null;

// const getDomain = (url) => {
//   try {
//     return new URL(url).hostname;
//   } catch (error) {
//     return null;
//   }
// };

setInterval(() => {
  getCurrentTab()
    .then((tab) => {
      console.log("Current Tab:", tab);
    })
    .catch((err) => {
      console.error("Error getting tab:", err);
    });
}, 10000);
