async function loadWeeks() {
  const res = await apiCall({ action: "getWeeks" });
  const select = document.getElementById("weekSelect");

  res.weeks.forEach(w => {
    const opt = document.createElement("option");
    opt.value = w;
    opt.textContent = "Week " + w;
    select.appendChild(opt);
  });

  loadWeek();
}

async function loadWeek() {
  const week = document.getElementById("weekSelect").value;
  const res = await apiCall({ action: "getMatches", week });
  document.getElementById("matches").innerHTML = res.html;
}

loadWeeks();
