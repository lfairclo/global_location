async function loadWeeks() {
  const res = await apiCall({
    action: "getWeeks",
    class: CLASS
  });

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

  const container = document.getElementById("matches");
  container.innerHTML = "";

  res.matches.forEach(match => {
    const div = document.createElement("div");
    div.className = "match-card";
    div.textContent = `${match.home} vs ${match.away}`;
    container.appendChild(div);
  });
}

document.getElementById("week").onchange = e => {
  loadMatches(e.target.value);
};

loadWeeks();
