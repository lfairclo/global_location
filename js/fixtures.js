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

    const div = document.createElement("div");
    div.className = "match-card";

    div.innerHTML = `
      <strong>${match.home}</strong> vs <strong>${match.away}</strong>
      <div class="status">Played: ${match.played || "No"}</div>
    `;

    container.appendChild(div);
  });
}


document.getElementById("week").onchange = e => {
  loadMatches(e.target.value);
};

loadWeeks();
