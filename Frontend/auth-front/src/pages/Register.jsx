import { useState } from "react";
import { register } from "../services/authService";

function Register({ onSwitchToLogin }) {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rol, setRol] = useState("ESTUDIANTE");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
      const data = await register({
        nombre,
        apellido,
        email,
        password,
        rol,
      });
      // Guardar token en cookie
      document.cookie = `token=${data.token}; path=/`;
      document.cookie = `rol=${rol}; path=/`;
      
      alert("Registro exitoso");
      // Redirigir al dashboard
      window.location.href = "http://localhost:5500/Frontend/user-front/index.html";
    } catch (error) {
      alert(error.message || "Error en el registro");
    }
  };

  return (
    <>
      <div className="form-header">
        <h1>Crear cuenta</h1>
        <p>Únete a nuestra plataforma educativa</p>
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Apellido"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <select value={rol} onChange={(e) => setRol(e.target.value)} required>
          <option value="ESTUDIANTE">Estudiante</option>
          <option value="DOCENTE">Docente</option>
          <option value="DIRECTIVO">Directivo</option>
        </select>

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Confirmar contraseña"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <div className="form-buttons">
          <button type="submit" className="btn-primary">
            Registrarse
          </button>
        </div>
      </form>

      <div className="form-footer">
        ¿Ya tienes cuenta?{" "}
        <a onClick={onSwitchToLogin}>Iniciar sesión</a>
      </div>
    </>
  );
}

export default Register;
