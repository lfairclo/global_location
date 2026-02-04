const API_URL = "https://script.google.com/macros/s/AKfycbxaGNDVw5caigEA3dBvPoRU-XLBJ6mAENO6AMbgZhREqbIKHhVfBS_gTpCXDmv8lC85FQ/exec";

async function apiCall(params) {
  const query = new URLSearchParams(params).toString();
  const response = await fetch(`${API_URL}?${query}`);
  return await response.json();
}

