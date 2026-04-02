fetch("http://localhost:3002/users/me", {
  credentials: "include"
})
  .then(res => {
    if (!res.ok) throw new Error("No autenticado");
    return res.json();
  })
  .then(user => {
    document.getElementById("welcome").innerText =
      `Bienvenida ${user.nombre} (${user.rol})`;
    document.getElementById("role-count").innerText = user.rol;

    document.getElementById("adminView").style.display = "none";
    document.getElementById("docenteView").style.display = "none";
    document.getElementById("estudianteView").style.display = "none";

    if (user.rol === "SUPER_ADMIN" || user.rol === "DIRECTIVO") {
      document.getElementById("adminView").style.display = "flex";
    }

    if (user.rol === "DOCENTE") {
      document.getElementById("docenteView").style.display = "flex";
    }

    if (user.rol === "ESTUDIANTE") {
      document.getElementById("estudianteView").style.display = "flex";
    }
  })
  .catch(err => {
    console.error(err);
    window.location.href = "http://localhost:5173";
  });

function logout() {
  document.cookie = "token=; Max-Age=0; path=/";
  document.cookie = "rol=; Max-Age=0; path=/";
  window.location.href = "http://localhost:5173";
}
