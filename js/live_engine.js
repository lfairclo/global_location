const container = document.getElementById("liveContainer");

const data = JSON.parse(localStorage.getItem("liveMatches"));

if (!data || !data.matches || data.matches.length === 0) {
  container.innerHTML = "<h2>No live matches selected.</h2>";
} else {
  data.matches.slice(0, 4).forEach(match => {
    createPitch(match);
  });
}

function createPitch(match) {

  const wrapper = document.createElement("div");
  wrapper.className = "pitch-wrapper";

  const sideControls = document.createElement("div");
  sideControls.className = "pitch-controls";

  const upBtn = document.createElement("button");
  upBtn.textContent = "↑";

  const downBtn = document.createElement("button");
  downBtn.textContent = "↓";

  const centerBtn = document.createElement("button");
  centerBtn.textContent = "—";

  sideControls.append(upBtn, downBtn, centerBtn);

  const pitch = document.createElement("div");
  pitch.className = "pitch";
  pitch.style.backgroundImage =
    "url('https://raw.githubusercontent.com/YOUR_GITHUB_REPO/main/pitch.png')";

  const ball = document.createElement("div");
  ball.className = "ball";
  pitch.appendChild(ball);

  let ballPos = 3; // centre start
  updateBall();

  function updateBall() {
    const positions = [10, 90, 170, 225, 280, 360, 430];
    ball.style.top = positions[ballPos] + "px";
  }

  function moveBall(direction) {

    if (direction === "up") {
      ballPos--;
    } else {
      ballPos++;
    }

    if (ballPos < 0) ballPos = 0;
    if (ballPos > 6) ballPos = 6;

    // Goal detection
    if (ballPos === 0) {
      topPlayer.score();
      resetBall();
      return;
    }

    if (ballPos === 6) {
      bottomPlayer.score();
      resetBall();
      return;
    }

    updateBall();
  }

  function resetBall() {
    ballPos = 3;
    updateBall();
  }

  upBtn.onclick = () => moveBall("up");
  downBtn.onclick = () => moveBall("down");
  centerBtn.onclick = resetBall;

  const topPlayer = createPlayerPanel(match.home);
  const bottomPlayer = createPlayerPanel(match.away);

  wrapper.appendChild(sideControls);
  wrapper.appendChild(topPlayer.panel);
  wrapper.appendChild(pitch);
  wrapper.appendChild(bottomPlayer.panel);

  container.appendChild(wrapper);
}

function createPlayerPanel(name) {

  const panel = document.createElement("div");
  panel.className = "player-panel";

  let goals = 0;
  let ppLeft = 2;
  let bLeft = 1;
  let redCards = 0;
  let yellowCards = 0;

  const title = document.createElement("h3");
  title.textContent = `${name} - Goals: 0`;

  function updateTitle() {
    title.textContent = `${name} - Goals: ${goals}`;
  }

  function score() {
    goals++;
    updateTitle();
  }

  const ppBtn = document.createElement("button");
  const bBtn = document.createElement("button");

  function updatePowerButtons() {
    ppBtn.textContent = `PP (${ppLeft})`;
    bBtn.textContent = `B (${bLeft})`;

    ppBtn.disabled = ppLeft === 0;
    bBtn.disabled = bLeft === 0;
  }

  ppBtn.onclick = () => {
    if (ppLeft > 0) {
      ppLeft--;
      updatePowerButtons();
    }
  };

  bBtn.onclick = () => {
    if (bLeft > 0) {
      bLeft--;
      updatePowerButtons();
    }
  };

  updatePowerButtons();

  const redCard = createCardBox("red", () => redCards++);
  const yellowCard = createCardBox("yellow", () => yellowCards++);

  panel.appendChild(title);
  panel.appendChild(redCard);
  panel.appendChild(yellowCard);
  panel.appendChild(ppBtn);
  panel.appendChild(bBtn);

  return { panel, score };
}

function createCardBox(type, incrementCallback) {

  let count = 0;

  const wrapper = document.createElement("div");
  wrapper.style.display = "inline-block";
  wrapper.style.margin = "5px";

  const plus = document.createElement("button");
  plus.textContent = "+";

  const box = document.createElement("div");
  box.className = `card-box ${type}`;

  const minus = document.createElement("button");
  minus.textContent = "-";

  plus.onclick = () => {
    count++;
    incrementCallback();
  };

  minus.onclick = () => {
    if (count > 0) count--;
  };

  wrapper.appendChild(plus);
  wrapper.appendChild(box);
  wrapper.appendChild(minus);

  return wrapper;
}
