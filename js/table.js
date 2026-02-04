async function loadTable() {
  const res = await apiCall({
    action: "getGrid",
    class: CLASS
  });

  renderGrid(res.grid);
}

function downloadTable() {
  window.print(); // simple + effective for now
}

loadTable();
