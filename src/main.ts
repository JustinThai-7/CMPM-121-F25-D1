import "./style.css";

const emojiButton = document.createElement("button");
emojiButton.classList.add("mine-button");
emojiButton.innerHTML = "🪨";
const counterDisplay = document.createElement("div");
const growthDisplay = document.createElement("div");

const priceFactor = 1.15;
let counter: number = 0;
let growthRate: number = 0; // units per second

// Clicker listener
emojiButton.addEventListener("click", () => {
  counter += 1;
  counterDisplay.textContent = `${counter} ores`;
});

interface UpgradeItem {
  name: string;
  baseCost: number;
  rate: number;
  cost: number; // current cost (increases with purchases)
  owned: number; // how many the player owns
  description: string;
}

const availableItems: UpgradeItem[] = [
  {
    name: "Pickaxe",
    baseCost: 10,
    rate: 0.1,
    cost: 10,
    owned: 0,
    description: "The tool that starts it all.",
  },
  {
    name: "Drill",
    baseCost: 50,
    rate: 1,
    cost: 50,
    owned: 0,
    description: "Mine deeper, faster.",
  },
  {
    name: "Excavator",
    baseCost: 100,
    rate: 2.5,
    cost: 100,
    owned: 0,
    description: "Things are starting to get fun.",
  },
  {
    name: "Blast Charge",
    baseCost: 500,
    rate: 15,
    cost: 500,
    owned: 0,
    description: "More bang for your buck.",
  },
  {
    name: "Auto-Miner",
    baseCost: 2000,
    rate: 100,
    cost: 2000,
    owned: 0,
    description: "Passive income.",
  },
];

const upgradesContainer = document.createElement("div");
upgradesContainer.classList.add("upgrades-container");
document.body.append(upgradesContainer);

// create buttons
const upgradeButtons: HTMLButtonElement[] = [];
for (const item of availableItems) {
  const button = document.createElement("button");
  button.classList.add("upgrade-button");
  button.disabled = true;
  button.title = item.description; // tooltip on hover
  updateButtonText(button, item);
  upgradesContainer.append(button);
  upgradeButtons.push(button);
}

function updateButtonText(button: HTMLButtonElement, item: UpgradeItem) {
  button.textContent = `${item.name}: $${
    Math.round(item.cost * 100) / 100
  } (Owned: ${item.owned})`;
}

// init listeners for buttons
for (let i = 0; i < availableItems.length; i++) {
  const item = availableItems[i];
  const button = upgradeButtons[i];
  button.addEventListener("click", () => {
    if (counter >= item.cost) {
      counter -= item.cost;
      growthRate += item.rate;
      item.owned += 1;
      item.cost = item.cost * priceFactor;
      updateButtonText(button, item);
    }
  });
}

let previousTime: number = performance.now();
function update(time: number) {
  const deltaTime = (time - previousTime) / 1000;
  previousTime = time;

  counter += growthRate * deltaTime;

  counterDisplay.textContent = `${counter.toFixed(2)} ores`;
  growthDisplay.textContent = `${growthRate.toFixed(2)} ores/sec`;

  // check if upgrades can be bought
  for (let i = 0; i < availableItems.length; i++) {
    upgradeButtons[i].disabled = counter < availableItems[i].cost;
  }

  requestAnimationFrame(update);
}

requestAnimationFrame(update);

// Append all elements
document.body.append(emojiButton);
document.body.append(counterDisplay);
document.body.append(growthDisplay);
