function requireRole(rolesPermitidos) {
  fetch("http://localhost:3002/users/me", {
    credentials: "include"
  })
    .then(res => {
      if (!res.ok) throw new Error("No autenticado");
      return res.json();
    })
    .then(user => {
      if (!rolesPermitidos.includes(user.rol)) {
        document.body.innerHTML = "<h2>Acceso denegado</h2>";
      }
    })
    .catch(err => {
      console.error(err);
      window.location.href = "http://localhost:5173";
    });
}