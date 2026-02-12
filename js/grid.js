async function loadGrid() {
  const res = await apiCall({ action: "getGrid", class: CLASS });

  if (res.error) {
    document.getElementById("gridContainer").textContent = res.error;
    return;
  }

  const container = document.getElementById("gridContainer");
  container.innerHTML = "";

  const table = document.createElement("table");
  table.className = "league-table";

  res.grid.forEach((row, r) => {
    const tr = document.createElement("tr");

    row.forEach((cell, c) => {
      const el = document.createElement(r === 0 || c === 0 ? "th" : "td");
      el.textContent = cell;

      // Diagonal
      if (r === c && r > 0) {
        el.classList.add("diagonal");
        el.textContent = "—";
      }

      tr.appendChild(el);
    });

    table.appendChild(tr);
  });

  container.appendChild(table);
}

function downloadPNG() {
  const target = document.getElementById("gridContainer");

  html2canvas(target).then(canvas => {
    const link = document.createElement("a");
    link.download = "league-grid.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  });
}

loadGrid();
