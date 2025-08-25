const API_URL = "http://localhost:5000/api"; // your backend

// Get token from localStorage
function getToken() {
  return localStorage.getItem("token");
}

// Set token
function setToken(token) {
  localStorage.setItem("token", token);
}

// Remove token
function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}
