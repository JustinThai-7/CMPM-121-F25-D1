import "./style.css";
const emojiButton = document.createElement("button");
emojiButton.innerHTML = "🍪";
const counterDisplay = document.createElement("div");
const upgradeButton = document.createElement("button");
upgradeButton.textContent = "Buy Auto-Clicker ($10)";
upgradeButton.disabled = true; // Start disabled
document.body.append(upgradeButton);

let counter: number = 0;
let growthRate: number = 0; // units per second

upgradeButton.addEventListener("click", () => { // upgrading
  if (counter >= 10) {
    counter -= 10;
    growthRate += 1; // Now passive growth goes up!
    // Button will re-enable if they still have >=10
  }
});
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

  upgradeButton.disabled = counter < 10;
  counterDisplay.textContent = `${counter.toFixed(2)} cookies`;
  requestAnimationFrame(update);
}

requestAnimationFrame(update);

document.body.append(emojiButton);
document.body.append(counterDisplay);
