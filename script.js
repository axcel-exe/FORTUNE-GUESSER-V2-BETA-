const fortunes = {
  love: ["Love is plotting something 💘", "Someone misses you 👀💞"],
  money: ["Money coming soon 💸", "Stop spending bro 😭"],
  study: ["Focus era 📚🔥", "Last-minute grind incoming 😵"],
  chaos: ["Pure chaos ahead 😈", "Do NOT trust today 💀"]
};

function tellFortune() {
  const lastDate = localStorage.getItem("fortuneDate");
  const today = new Date().toDateString();

  if (lastDate === today) {
    alert("You already got your fortune today. Destiny needs rest.");
    return;
  }

  const mode = document.getElementById("mode").value;
  const fortuneArr = fortunes[mode];
  const fortune = fortuneArr[Math.floor(Math.random() * fortuneArr.length)];

  const luck = Math.floor(Math.random() * 100) + 1;
  const legendary = Math.random() < 0.05;

  document.getElementById("fortuneText").innerText =
    legendary ? "🌟 LEGENDARY 🌟 " + fortune : fortune;

  document.getElementById("luckBar").style.width = luck + "%";
  document.getElementById("luckText").innerText = `Luck Level: ${luck}%`;

  const card = document.getElementById("result");
  card.classList.remove("hidden", "legendary");
  if (legendary) card.classList.add("legendary");

  localStorage.setItem("fortuneDate", today);
}

function shareFortune() {
  const text = document.getElementById("fortuneText").innerText;
  navigator.clipboard.writeText(text + " 🔮");
  alert("Fortune copied. Go flex.");
}
