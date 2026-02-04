const API_URL = "https://script.google.com/macros/s/AKfycbw9JlOgwFD7jsZxG1jIeL9XCd4ECNUeeR8yEM6qKQsYAWi_dk4JPftn-2hq6Wp6_5FZdQ/exec";

async function apiCall(payload) {
  const res = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json"
    }
  });
  return res.json();
}
