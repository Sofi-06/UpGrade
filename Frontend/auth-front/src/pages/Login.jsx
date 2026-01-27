import { useState } from "react";
import { login } from "../services/authService";

function Login({ onSwitchToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await login(email, password);
      localStorage.setItem("token", data.token);
      alert("Login exitoso");
    } catch (error) {
      alert(error.message || "Credenciales inválidas");
    }
  };

  return (
    <>
      <div className="form-header">
        <h1>Hola</h1>
        <p>Bienvenido a tu plataforma educativa</p>
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="forgot-password">
          <a href="#">¿Olvidaste tu contraseña?</a>
        </div>

        <div className="form-buttons">
          <button type="submit" className="btn-primary">
            Iniciar sesión
          </button>
        </div>
      </form>

      <div className="form-footer">
        ¿No tienes cuenta?{" "}
        <a onClick={onSwitchToRegister}>Registrarse</a>
      </div>
    </>
  );
}

export default Login;
