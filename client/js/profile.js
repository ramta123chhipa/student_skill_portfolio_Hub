async function loadProfile() {
  const token = getToken();
  if (!token) return (window.location.href = "login.html");

  const res = await fetch(`${API_URL}/students/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await res.json();
  if (!res.ok) {
    alert(data.message || "Failed to load profile");
    return;
  }

  document.getElementById("profileInfo").innerHTML = `
    <p><b>Username:</b> ${data.username}</p>
    <p><b>Branch:</b> ${data.branch}</p>
    <p><b>Year:</b> ${data.year}</p>
    <p><b>Skills:</b> ${data.skills?.join(", ") || "None"}</p>
  `;
}
window.onload = loadProfile;
