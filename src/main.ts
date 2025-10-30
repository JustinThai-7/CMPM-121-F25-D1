import "./style.css";
const emojiButton = document.createElement("button");
emojiButton.innerHTML = "🍪";
const counterDisplay = document.createElement("div");
const growthDisplay = document.createElement("div");

//upgrades
const firstUpgradeButton = document.createElement("button");
let price1: number = 10;
let owned1: number = 0;
firstUpgradeButton.textContent = `Cheap Auto-Clicker: $${
  Math.round(price1 * 100) / 100
} (Owned: ${owned1})`;
firstUpgradeButton.disabled = true; // Start disabled
document.body.append(firstUpgradeButton);
const secondUpgradeButton = document.createElement("button");
let price2: number = 100;
let owned2: number = 0;
secondUpgradeButton.textContent = `Auto-Clicker: $${
  Math.round(price2 * 100) / 100
} (Owned: ${owned2})`;
secondUpgradeButton.disabled = true; // Start disabled
document.body.append(secondUpgradeButton);
const thirdUpgradeButton = document.createElement("button");
let price3: number = 1000;
let owned3: number = 0;
thirdUpgradeButton.textContent = `Cheap Auto-Clicker: $${
  Math.round(price3 * 100) / 100
} (Owned: ${owned3})`;
thirdUpgradeButton.disabled = true; // Start disabled
document.body.append(thirdUpgradeButton);

let counter: number = 0;
let growthRate: number = 0; // units per second

// upgrade event listeners
firstUpgradeButton.addEventListener("click", () => { // upgrading
  if (counter >= price1) {
    counter -= price1;
    growthRate += 0.1;
    owned1 += 1;
    price1 = price1 * 1.15;
    firstUpgradeButton.textContent = `Cheap Auto-Clicker: $${
      Math.round(price1 * 100) / 100
    } (Owned: ${owned1})`;
  }
});
secondUpgradeButton.addEventListener("click", () => { // upgrading
  if (counter >= 100) {
    counter -= 100;
    growthRate += 2;
    owned2 += 1;
    price2 = price2 * 1.15;
    secondUpgradeButton.textContent = `Auto-Clicker: $${
      Math.round(price2 * 100) / 100
    } (Owned: ${owned2})`;
  }
});
thirdUpgradeButton.addEventListener("click", () => { // upgrading
  if (counter >= 1000) {
    counter -= 1000;
    growthRate += 50;
    owned3 += 1;
    price3 = price3 * 1.15;
    thirdUpgradeButton.textContent = `Deluxe Auto-Clicker: $${
      Math.round(price3 * 100) / 100
    } (Owned: ${owned3})`;
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
  growthDisplay.textContent = `${growthRate} cookies/sec`;
  requestAnimationFrame(update);
}

requestAnimationFrame(update);

document.body.append(emojiButton);
document.body.append(counterDisplay);
document.body.append(growthDisplay);
