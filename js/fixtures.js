async function loadWeeks() {

  const res = await apiCall({
    action: "getWeeks",
    class: CLASS
  });

  if (!res || !res.weeks) return;

  const select = document.getElementById("week");
  select.innerHTML = "";

  res.weeks.forEach(w => {
    const opt = document.createElement("option");
    opt.value = w;
    opt.textContent = `Week ${w}`;
    select.appendChild(opt);
  });

  if (res.weeks.length) {
    loadMatches(res.weeks[0]);
  }
}

async function loadMatches(week) {

  const res = await apiCall({
    action: "getMatches",
    class: CLASS,
    week
  });

  if (!res || !res.matches) return;

  const container = document.getElementById("matches");
  container.innerHTML = "";

  res.matches.forEach(match => {

    const row = document.createElement("div");
    row.className = "match-row";

    if (match.played && match.played !== "") {
      row.classList.add("played");
    }

    row.innerHTML = `
      <div class="team">${match.home}</div>
      <div class="vs">vs</div>
      <div class="team">${match.away}</div>
    `;

    container.appendChild(row);
  });
}



document.getElementById("week").onchange = e => {
  loadMatches(e.target.value);
};

loadWeeks();
