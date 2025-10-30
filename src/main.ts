import "./style.css";
const emojiButton = document.createElement("button");
emojiButton.innerHTML = "🍪";
const counterDisplay = document.createElement("div");

//upgrades
const firstUpgradeButton = document.createElement("button");
firstUpgradeButton.textContent = "Cheap Auto-Clicker ($10)";
firstUpgradeButton.disabled = true; // Start disabled
document.body.append(firstUpgradeButton);
const secondUpgradeButton = document.createElement("button");
secondUpgradeButton.textContent = "Auto-Clicker ($100)";
secondUpgradeButton.disabled = true; // Start disabled
document.body.append(secondUpgradeButton);
const thirdUpgradeButton = document.createElement("button");
thirdUpgradeButton.textContent = "Deluxe Auto-Clicker ($1000)";
thirdUpgradeButton.disabled = true; // Start disabled
document.body.append(thirdUpgradeButton);

let counter: number = 0;
let growthRate: number = 0; // units per second

// upgrade event listeners
firstUpgradeButton.addEventListener("click", () => { // upgrading
  if (counter >= 10) {
    counter -= 10;
    growthRate += 0.1;
  }
});
secondUpgradeButton.addEventListener("click", () => { // upgrading
  if (counter >= 100) {
    counter -= 100;
    growthRate += 2;
  }
});
thirdUpgradeButton.addEventListener("click", () => { // upgrading
  if (counter >= 1000) {
    counter -= 1000;
    growthRate += 50;
  }
});

// clicker listener
emojiButton.addEventListener("click", () => { // button increments
  counter += 1;
  counterDisplay.textContent = `${counter} cookies`;
});

// Continuous growth using requestAnimationFrame
let previousTime: number = performance.now();

function update(time: number) { // frame by frame increments
  const deltaTime = (time - previousTime) / 1000; // seconds
  previousTime = time;

  counter += growthRate * deltaTime;

  firstUpgradeButton.disabled = counter < 10;
  secondUpgradeButton.disabled = counter < 100;
  thirdUpgradeButton.disabled = counter < 1000;

  counterDisplay.textContent = `${counter.toFixed(2)} cookies`;
  requestAnimationFrame(update);
}

requestAnimationFrame(update);

document.body.append(emojiButton);
document.body.append(counterDisplay);
