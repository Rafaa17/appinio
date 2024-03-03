import React, { useState } from "react";

import "../LoginForm/LoginForm.css";
import { RegisterCredentials } from "../../models/Register";

interface Props {
  onRegister: (credentials: RegisterCredentials) => void;
}

export default function RegisterForm(props: Props) {
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [email, setEmail] = useState<string>();

  const handleRegister = () => {
    if (!username || !password || !email) {
      return;
    }

    props.onRegister({ username: username, password: password, email });
  };

  return (
    <div className="register-form">
      <div className="input-container">
        <input
          placeholder="Username"
          name="username"
          onChange={(ev) => setUsername(ev.target.value)}
        />
      </div>
      <div className="input-container">
        <input
          placeholder="Password"
          type="password"
          name="password"
          onChange={(ev) => setPassword(ev.target.value)}
        />
      </div>
      <div className="input-container">
        <input
          placeholder="Email"
          name="email"
          onChange={(ev) => setEmail(ev.target.value)}
        />
      </div>
      <div className="button-container" onClick={handleRegister}>
        <div className="button">Register</div>
      </div>
    </div>
  );
}
