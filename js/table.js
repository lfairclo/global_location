async function loadTable() {
  const res = await apiCall({ action: "getTable" });
  document.getElementById("tableContainer").innerHTML = res.html;
}

function downloadTable() {
  window.print(); // simple + effective for now
}

loadTable();
