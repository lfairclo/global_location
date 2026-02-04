async function loadGrid() {
  const res = await apiCall({ action: "getGrid" });

  if (res.error) {
    document.getElementById("gridContainer").textContent = res.error;
    return;
  }

  const table = document.createElement("table");
  table.style.borderCollapse = "collapse";
  table.style.marginTop = "20px";

  res.grid.forEach((row, r) => {
    const tr = document.createElement("tr");

    row.forEach((cell, c) => {
      const td = document.createElement("td");
      td.textContent = cell;
      td.style.border = "1px solid #333";
      td.style.padding = "6px 10px";
      td.style.textAlign = "center";

      // Diagonal (same player)
      if (r === c && r > 0) {
        td.style.background = "#ff9800";
        td.textContent = "—";
      }

      // Header row / column
      if (r === 0 || c === 0) {
        td.style.fontWeight = "bold";
        td.style.background = "#e5e7eb";
      }

      tr.appendChild(td);
    });

    table.appendChild(tr);
  });

  document.getElementById("gridContainer").appendChild(table);
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
