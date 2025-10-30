import "./style.css";
const emojiButton = document.createElement("button");
emojiButton.innerHTML = "🍪";
let counter: number = 0;
const counterDisplay = document.createElement("div");

emojiButton.addEventListener("click", () => {
  counter += 1;
  counterDisplay.textContent = `${counter} cookies`;
});
document.body.append(emojiButton);
document.body.append(counterDisplay)