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

  // Top arrow controls
  const topControls = document.createElement("div");
  topControls.className = "pitch-top-controls";

  const upBtn = document.createElement("button");
  upBtn.textContent = "↑";

  const downBtn = document.createElement("button");
  downBtn.textContent = "↓";

  const centerBtn = document.createElement("button");
  centerBtn.textContent = "Center";

  topControls.append(upBtn, downBtn, centerBtn);

  // Main pitch row
  const row = document.createElement("div");
  row.className = "pitch-row";

  const leftPlayer = createPlayerColumn(match.home);
  const rightPlayer = createPlayerColumn(match.away);

  const pitch = document.createElement("div");
  pitch.className = "pitch";
  pitch.style.backgroundImage =
    "url('https://raw.githubusercontent.com/YOUR_GITHUB_REPO/main/pitch.png')";

  const ball = document.createElement("div");
  ball.className = "ball";
  pitch.appendChild(ball);

  row.append(leftPlayer.column);
  row.append(pitch);
  row.append(rightPlayer.column);

  wrapper.append(topControls, row);
  container.appendChild(wrapper);

  // Ball positions (7 total)
  // 0 goal top
  // 1 top final
  // 2 top mid
  // 3 centre
  // 4 bottom mid
  // 5 bottom final
  // 6 goal bottom

  let ballPos = 3;
  let centreLocked = false;

  const positions = [10, 80, 150, 215, 280, 350, 420];

  function updateBall() {
    ball.style.top = positions[ballPos] + "px";
  }

  function resetBall() {
    ballPos = 3;
    centreLocked = false;
    updateBall();
  }

  function moveBall(direction) {

    if (direction === "up") {

      if (ballPos === 3) {
        ballPos = 2;
        centreLocked = true;
      } else if (ballPos > 0) {
        ballPos--;
      }

    } else {

      if (ballPos === 3) {
        ballPos = 4;
        centreLocked = true;
      } else if (ballPos < 6) {
        ballPos++;
      }
    }

    // Prevent returning to centre
    if (centreLocked && ballPos === 3) {
      if (direction === "up") ballPos = 2;
      else ballPos = 4;
    }

    // Goal check
    if (ballPos === 0) {
      leftPlayer.score();
      resetBall();
      return;
    }

    if (ballPos === 6) {
      rightPlayer.score();
      resetBall();
      return;
    }

    updateBall();
  }

  upBtn.onclick = () => moveBall("up");
  downBtn.onclick = () => moveBall("down");
  centerBtn.onclick = resetBall;

  updateBall();
}

function createPlayerColumn(name) {

  const column = document.createElement("div");
  column.className = "player-column";

  let goals = 0;
  let ppLeft = 2;
  let bLeft = 1;
  let redCount = 0;
  let yellowCount = 0;

  const nameLabel = document.createElement("strong");
  nameLabel.textContent = name;

  const goalLabel = document.createElement("div");
  goalLabel.textContent = "Goals: 0";

  function score() {
    goals++;
    goalLabel.textContent = "Goals: " + goals;
  }

  // Cards
  const redCard = createCard("red", () => redCount++);
  const yellowCard = createCard("yellow", () => yellowCount++);

  // PP button
  const ppBtn = document.createElement("button");
  const bBtn = document.createElement("button");

  function updateButtons() {
    ppBtn.textContent = `PP (${ppLeft})`;
    bBtn.textContent = `B (${bLeft})`;
    ppBtn.disabled = ppLeft === 0;
    bBtn.disabled = bLeft === 0;
  }

  ppBtn.onclick = () => {
    if (ppLeft > 0) {
      ppLeft--;
      updateButtons();
    }
  };

  bBtn.onclick = () => {
    if (bLeft > 0) {
      bLeft--;
      updateButtons();
    }
  };

  updateButtons();

  column.append(
    nameLabel,
    goalLabel,
    redCard,
    yellowCard,
    ppBtn,
    bBtn
  );

  return { column, score };
}

function createCard(type, incrementCallback) {

  let count = 0;

  const wrapper = document.createElement("div");
  wrapper.style.display = "flex";
  wrapper.style.flexDirection = "column";
  wrapper.style.alignItems = "center";

  const plus = document.createElement("button");
  plus.textContent = "+";

  const box = document.createElement("div");
  box.className = `card-box ${type}`;
  box.textContent = "0";

  const minus = document.createElement("button");
  minus.textContent = "-";

  plus.onclick = () => {
    count++;
    box.textContent = count;
    incrementCallback();
  };

  minus.onclick = () => {
    if (count > 0) {
      count--;
      box.textContent = count;
    }
  };

  wrapper.append(plus, box, minus);

  return wrapper;
}
