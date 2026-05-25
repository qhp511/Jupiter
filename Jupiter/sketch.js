document.addEventListener("DOMContentLoaded", function () {
  const jupiter = document.getElementById("jupiter");

  const stormBtn = document.getElementById("stormBtn");
  const speedBtn = document.getElementById("speedBtn");
  const coreBtn = document.getElementById("coreBtn");

  const appearanceInfo = document.getElementById("appearanceInfo");
  const behaviorInfo = document.getElementById("behaviorInfo");
  const explorationInfo = document.getElementById("explorationInfo");

  const fact = document.getElementById("fact");

  let currentInfo = null;

  function hideAllInformation() {
    appearanceInfo.classList.remove("show");
    behaviorInfo.classList.remove("show");
    explorationInfo.classList.remove("show");

    jupiter.classList.remove("fast");
    jupiter.classList.remove("core-mode");

    fact.textContent = "Click the Great Red Spot, the star, or the Core to learn about Jupiter.";

    currentInfo = null;
  }

  function showInformation(infoBox, type) {
    const isSameBoxOpen = currentInfo === infoBox;

    if (isSameBoxOpen) {
      hideAllInformation();
      return;
    }

    appearanceInfo.classList.remove("show");
    behaviorInfo.classList.remove("show");
    explorationInfo.classList.remove("show");

    jupiter.classList.remove("fast");
    jupiter.classList.remove("core-mode");

    infoBox.classList.add("show");
    currentInfo = infoBox;

    if (type === "appearance") {
      fact.textContent = "The Great Red Spot is a huge storm on Jupiter.";
    }

    if (type === "behavior") {
      jupiter.classList.add("fast");
      fact.textContent = "Jupiter spins so fast that one day is less than 10 hours.";
    }

    if (type === "exploration") {
      jupiter.classList.add("core-mode");
      fact.textContent = "Scientists study Jupiter to learn what may be hidden inside.";
    }
  }

  stormBtn.addEventListener("click", function () {
    showInformation(appearanceInfo, "appearance");
  });

  speedBtn.addEventListener("click", function () {
    showInformation(behaviorInfo, "behavior");
  });

  coreBtn.addEventListener("click", function () {
    showInformation(explorationInfo, "exploration");
  });
});