import React, { useEffect } from "react";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function RegisterPage() {
  const { register, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [navigate, user]);

  return (
    <div>
      <h2>Register</h2>
      <RegisterForm onRegister={register} />
      <div className="go-to-login-container">
        Already have an account? <Link to={"/login"}>Login</Link>
      </div>
    </div>
  );
}
