const API_URL = "https://script.google.com/macros/s/AKfycbw9JlOgwFD7jsZxG1jIeL9XCd4ECNUeeR8yEM6qKQsYAWi_dk4JPftn-2hq6Wp6_5FZdQ/exec";

async function apiCall(params) {
  const query = new URLSearchParams(params).toString();
  const response = await fetch(`${API_URL}?${query}`);
  return await response.json();
}

