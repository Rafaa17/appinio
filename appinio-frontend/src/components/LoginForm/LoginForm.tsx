import React, { useState } from "react";

import "./LoginForm.css";
import { LoginCredentials } from "../../models/Login";

interface Props {
  onLogin: (credentials: LoginCredentials) => void;
}

export default function LoginForm(props: Props) {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = () => {
    if (!username || !password) {
      return;
    }

    props.onLogin({ username: username, password: password });
  };

  return (
    <div className="login-form">
      <div className="input-container">
        <input
          placeholder="Username"
          name="username"
          value={username}
          onChange={(ev) => setUsername(ev.target.value)}
        />
      </div>
      <div className="input-container">
        <input
          placeholder="Password"
          type="password"
          name="password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />
      </div>
      <div className="button-container" onClick={handleLogin}>
        <div className="button">Sign In</div>
      </div>
    </div>
  );
}
