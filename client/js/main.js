// main.js
// Depends on utils.js (API_URL, getToken, setToken, logout)

(function () {
  // Pages that require the user to be logged in
  const PROTECTED_ROUTES = ["/profile.html", "/search.html"];

  const getPath = () => window.location.pathname.toLowerCase();
  const hasToken = () => Boolean(getToken());

  // Redirect to login if user tries to visit a protected page without a token
  function enforceAuthGuard() {
    const isProtected = PROTECTED_ROUTES.some((p) => getPath().endsWith(p));
    if (isProtected && !hasToken()) {
      window.location.href = "login.html";
    }
  }

  // Wire up any logout buttons/links
  function bindLogout() {
    const els = document.querySelectorAll('#logoutBtn, [data-action="logout"]');
    els.forEach((el) =>
      el.addEventListener("click", (e) => {
        e.preventDefault();
        logout(); // from utils.js
      })
    );
  }

  // Toggle nav/link visibility based on auth state
  // Use classes:
  //  - .link-auth  (show when logged OUT)
  //  - .link-app   (show when logged IN)
  function updateNavState() {
    const loggedIn = hasToken();
    const show = (selector, shouldShow) => {
      document.querySelectorAll(selector).forEach((el) => {
        el.style.display = shouldShow ? "" : "none";
      });
    };

    show(".link-auth", !loggedIn);
    show(".link-app", loggedIn);

    // Optional: show simple status text
    const who = document.getElementById("whoami");
    if (who) {
      who.textContent = loggedIn ? "Logged in" : "Guest";
    }
  }

  // Add 'active' class to links that match current page
  // Use: <a data-route="profile.html" ...>
  function highlightActiveLink() {
    const links = document.querySelectorAll("a[data-route]");
    links.forEach((a) => {
      const route = (a.getAttribute("data-route") || "").toLowerCase();
      if (route && getPath().endsWith(route)) {
        a.classList.add("active");
      }
    });
  }

  function init() {
    enforceAuthGuard();
    bindLogout();
    updateNavState();
    highlightActiveLink();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
