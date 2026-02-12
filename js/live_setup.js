let selectedMatches = [];
let allMatches = [];

const classSelect = document.getElementById("classSelect");
const weekSelect = document.getElementById("weekSelect");
const matchList = document.getElementById("matchList");
const goBtn = document.getElementById("goBtn");

classSelect.onchange = loadWeeks;
weekSelect.onchange = loadMatches;

goBtn.onclick = startLive;


async function loadWeeks() {

  weekSelect.innerHTML = '<option value="">Select Week</option>';
  matchList.innerHTML = "";

  if (!classSelect.value) return;

  const res = await apiCall({
    action: "getWeeks",
    class: classSelect.value
  });

  if (!res || !res.weeks) return;

  res.weeks.forEach(w => {
    const opt = document.createElement("option");
    opt.value = w;
    opt.textContent = `Week ${w}`;
    weekSelect.appendChild(opt);
  });
}

async function loadMatches() {

  matchList.innerHTML = "";
  selectedMatches = [];

  if (!weekSelect.value) return;

  const res = await apiCall({
    action: "getMatches",
    class: classSelect.value,
    week: weekSelect.value
  });

  if (!res || !res.matches) return;

  allMatches = res.matches;

  // Sort: unplayed first
  allMatches.sort((a, b) => {
    if (a.played && !b.played) return 1;
    if (!a.played && b.played) return -1;
    return 0;
  });

  renderMatches();
}

function renderMatches() {

  matchList.innerHTML = "";

  allMatches.forEach((match, index) => {

    const row = document.createElement("div");
    row.className = "live-row";

    if (match.played) {
      row.classList.add("played");
    }

    row.innerHTML = `
      <div>${match.home}</div>
      <div>vs</div>
      <div>${match.away}</div>
      <input type="checkbox" ${match.played ? "disabled" : ""}>
    `;

    const checkbox = row.querySelector("input");

    checkbox.onchange = () => {

      if (checkbox.checked) {
        if (selectedMatches.length >= 4) {
          checkbox.checked = false;
          alert("Maximum 4 matches allowed.");
          return;
        }
        selectedMatches.push(match);
      } else {
        selectedMatches =
          selectedMatches.filter(m =>
            !(m.home === match.home && m.away === match.away)
          );
      }
    };

    matchList.appendChild(row);
  });

  addCustomMatchRow();
}

function addCustomMatchRow() {

  const unusedPlayers = getUnusedPlayers();

  if (unusedPlayers.length < 2) return;

  const row = document.createElement("div");
  row.className = "live-row";

  const select1 = document.createElement("select");
  const select2 = document.createElement("select");
  const checkbox = document.createElement("input");

  checkbox.type = "checkbox";

  populateSelect(select1, unusedPlayers);
  populateSelect(select2, unusedPlayers);

  checkbox.onchange = () => {

    if (checkbox.checked) {

      if (selectedMatches.length >= 4) {
        checkbox.checked = false;
        alert("Maximum 4 matches allowed.");
        return;
      }

      if (select1.value === select2.value) {
        alert("Cannot select same player.");
        checkbox.checked = false;
        return;
      }

      selectedMatches.push({
        home: select1.value,
        away: select2.value,
        custom: true
      });

    } else {
      selectedMatches =
        selectedMatches.filter(m => !m.custom);
    }
  };

  row.append(select1, document.createTextNode("vs"), select2, checkbox);
  matchList.appendChild(row);
}

function populateSelect(select, players) {
  players.forEach(p => {
    const opt = document.createElement("option");
    opt.value = p;
    opt.textContent = p;
    select.appendChild(opt);
  });
}

function getUnusedPlayers() {

  const used = new Set();

  allMatches.forEach(m => {
    used.add(m.home);
    used.add(m.away);
  });

  const selected = new Set();
  selectedMatches.forEach(m => {
    selected.add(m.home);
    selected.add(m.away);
  });

  return [...used].filter(p => !selected.has(p));
}

function startLive() {

  if (selectedMatches.length === 0) {
    alert("Select at least one match.");
    return;
  }

  localStorage.setItem("liveMatches",
    JSON.stringify({
      class: classSelect.value,
      week: weekSelect.value,
      matches: selectedMatches
    })
  );

  window.location.href = "live_match.html";
}

