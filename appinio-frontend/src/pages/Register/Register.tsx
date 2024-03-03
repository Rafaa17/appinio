import React from "react";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function RegisterPage() {
  const { register } = useAuth();
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
