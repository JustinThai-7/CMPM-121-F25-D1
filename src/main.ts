import "./style.css";
const emojiButton = document.createElement("button");
emojiButton.innerHTML = "🍪";
let counter: number = 0;
const counterDisplay = document.createElement("div");

emojiButton.addEventListener("click", () => { // button increments
  counter += 1;
  counterDisplay.textContent = `${counter} cookies`;
});

setInterval(() => { // automatic increments
  counter += 1;
  counterDisplay.textContent = `${counter} cookies`;
}, 1000);

document.body.append(emojiButton);
document.body.append(counterDisplay);
