import "./style.css";
const emojiButton = document.createElement("button");
emojiButton.classList.add("mine-button");
emojiButton.innerHTML = "🪨";

const counterDisplay = document.createElement("div");
const growthDisplay = document.createElement("div");

const priceFactor = 1.15;
let counter: number = 0;
let growthRate: number = 0; // units per second

// clicker listener
emojiButton.addEventListener("click", () => { // button increments
  counter += 1;
  counterDisplay.textContent = `${counter} ores`;
});

interface UpgradeItem {
  name: string;
  baseCost: number;
  rate: number;
  cost: number; // current cost (increases with purchases)
  owned: number; // how many the player owns
}

const availableItems: UpgradeItem[] = [
  { name: "Pickaxe", baseCost: 10, rate: 0.1, cost: 10, owned: 0 },
  { name: "Drill", baseCost: 100, rate: 2, cost: 100, owned: 0 },
  { name: "Jackhammer", baseCost: 500, rate: 50, cost: 500, owned: 0 },
];

const upgradesContainer = document.createElement("div");
upgradesContainer.classList.add("upgrades-container");
document.body.append(upgradesContainer);

// initializing buttons
const upgradeButtons: HTMLButtonElement[] = [];

for (const item of availableItems) {
  const button = document.createElement("button");
  button.classList.add("upgrade-button");
  button.disabled = true;
  updateButtonText(button, item);
  upgradesContainer.append(button);
  upgradeButtons.push(button);
}
function updateButtonText(button: HTMLButtonElement, item: UpgradeItem) {
  button.textContent = `${item.name}: $${
    Math.round(item.cost * 100) / 100
  } (Owned: ${item.owned})`;
}

for (let i = 0; i < availableItems.length; i++) {
  const item = availableItems[i];
  const button = upgradeButtons[i];

  button.addEventListener("click", () => {
    if (counter >= item.cost) {
      counter -= item.cost;
      growthRate += item.rate;
      item.owned += 1;
      item.cost = item.cost * priceFactor; // increase price

      updateButtonText(button, item);
    }
  });
}

let previousTime: number = performance.now();
function update(time: number) { // frame by frame increments
  const deltaTime = (time - previousTime) / 1000; // seconds
  previousTime = time;

  counter += growthRate * deltaTime;

  counterDisplay.textContent = `$${counter.toFixed(2)} of ore`;
  growthDisplay.textContent = `$${growthRate.toFixed(2)} profit/sec`;

  for (let i = 0; i < availableItems.length; i++) { // check if any upgrades can be bought
    upgradeButtons[i].disabled = counter < availableItems[i].cost;
  }

  requestAnimationFrame(update);
}

requestAnimationFrame(update);

document.body.append(emojiButton);
document.body.append(counterDisplay);
document.body.append(growthDisplay);
