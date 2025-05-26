document.addEventListener("DOMContentLoaded", () => {
  const viewStatsBtn = document.getElementById("viewDashboardBtn");
  const timeDisplay = document.getElementById("timeValue");

  viewStatsBtn.addEventListener("click", () => {
    chrome.tabs.create({ url: "http://localhost:5173" });
  });

  const fetchScreenTime = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/urls");
      const data = await res.json();

      if (data && Array.isArray(data)) {
        const today = new Date().toISOString().split("T")[0];

        const screenTimes = data.map((item) => item.screentime?.[today] || 0);

        let totalScreenTime = 0;
        for (let i = 0; i < screenTimes.length; i++) {
          totalScreenTime += screenTimes[i];
        }
        const OverThree = totalScreenTime / 60 >= 3;

        const hours = Math.floor(totalScreenTime / 60);
        const minutes = totalScreenTime % 60;
        timeDisplay.innerText =
          hours > 0 ? `${hours}h ${minutes}min` : `${minutes}min`;
        timeDisplay.style.color = OverThree ? "red" : "#FBBF24";
      } else {
        timeDisplay.innerText = "0min";
      }
    } catch (error) {
      console.error("Error fetching screen time:", error);
      timeDisplay.innerText = "Error";
    }
  };

  fetchScreenTime();
});
