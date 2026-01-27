import { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Carousel } from "./components/Carousel";

function App() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className={`auth-container${isLogin ? "" : " reversed"}`}>
      <Carousel />
      <div className="form-section">
        {isLogin ? (
          <Login onSwitchToRegister={() => setIsLogin(false)} />
        ) : (
          <Register onSwitchToLogin={() => setIsLogin(true)} />
        )}
      </div>
    </div>
  );
}

export default App;
