import { getToken } from "./auth.js";

const token = getToken();

if (!token) {
  window.location.href = "http://localhost:3000";
}

fetch("http://localhost:3002/users/me", {
  headers: { Authorization: `Bearer ${token}` }
})
  .then(res => res.json())
  .then(user => {
    document.getElementById("welcome").textContent =
      `Bienvenida ${user.nombre} (${user.rol})`;

    if (user.rol !== "SUPER_ADMIN" && user.rol !== "DIRECTIVO") {
      document.getElementById("usuariosLink").style.display = "none";
    }
  });
