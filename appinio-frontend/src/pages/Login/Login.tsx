import { Link, useNavigate } from "react-router-dom";
import LoginForm from "../../components/LoginForm/LoginForm";

import { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import "./Login.css";

export default function LoginPage() {
  const { user, login } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [navigate, user]);

  return (
    <div>
      <h2>Login</h2>
      <LoginForm onLogin={login} />
      <div className="go-to-register-container">
        Don't Have an account? <Link to={"/register"}>Register</Link>
      </div>
    </div>
  );
}
