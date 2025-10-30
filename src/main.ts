import "./style.css";
const emojiButton = document.createElement("button");
emojiButton.innerHTML = "🍪";
const counterDisplay = document.createElement("div");

let counter: number = 0;
const growthRate = 1; // units per second

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

  counterDisplay.textContent = `${counter.toFixed(2)} cookies`;
  requestAnimationFrame(update);
}

requestAnimationFrame(update);

document.body.append(emojiButton);
document.body.append(counterDisplay);
