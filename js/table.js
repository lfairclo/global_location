async function loadLeagueTable() {
  const res = await apiCall({
    action: "getGrid",
    class: CLASS
  });

  if (res.error) {
    alert(res.error);
    return;
  }

  renderGrid(res.grid);
}

function renderGrid(grid) {
  const container = document.getElementById("table-container");
  container.innerHTML = "";

  const table = document.createElement("table");
  table.className = "league-table";

  grid.forEach((row, r) => {
    const tr = document.createElement("tr");

    row.forEach((cell, c) => {
      const el = document.createElement(r === 0 || c === 0 ? "th" : "td");
      el.textContent = cell;
      tr.appendChild(el);
    });

    table.appendChild(tr);
  });

  container.appendChild(table);
}

// PNG export
document.getElementById("downloadBtn").onclick = () => {
  html2canvas(document.querySelector(".league-table"))
    .then(canvas => {
      const link = document.createElement("a");
      link.download = `${CLASS}_league_table.png`;
      link.href = canvas.toDataURL();
      link.click();
    });
};

loadLeagueTable();
