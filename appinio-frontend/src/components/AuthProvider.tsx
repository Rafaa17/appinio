import React, { useMemo } from "react";
import { AnimationType, DialogType, usePopup } from "react-custom-popup";
import { AppinioApi } from "../api/AppinioApi";
import { AuthContext } from "../context/auth.context";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LoginCredentials } from "../models/Login";
import { RegisterCredentials } from "../models/Register";
import { useLoading } from "../hooks/useLoading";

export const AuthProvider = ({
  children,
}: {
  children: React.ReactElement[];
}) => {
  const [user, setUser, removeValue] = useLocalStorage("user", null);

  const { showAlert } = usePopup();
  const { showLoading } = useLoading();

  const login = async (credentials: LoginCredentials) => {
    showLoading(true);
    AppinioApi.api
      .signInFromAuthController(credentials)
      .then((response) => {
        setUser(response.data);
      })
      .catch((e) => {
        showAlert({
          type: DialogType.WARNING,
          text: "Something went wrong",
          animationType: AnimationType.SWING,
        });
      })
      .finally(() => showLoading(false));
  };

  const register = async (credentials: RegisterCredentials) => {
    showLoading(true);
    AppinioApi.api
      .registerFromAuthController(credentials)
      .then((response) => {
        setUser(response.data);
      })
      .catch((e) => {
        showAlert({
          type: DialogType.WARNING,
          text: "Something went wrong",
          animationType: AnimationType.SWING,
        });
      })
      .finally(() => showLoading(false));
  };

  const logout = () => {
    removeValue();
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      register,
    }),
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
