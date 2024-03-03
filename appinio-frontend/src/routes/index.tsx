import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddPostPage from "../pages/AddPost/AddPost";
import HomePage from "../pages/Home/Home";
import LoginPage from "../pages/Login/Login";
import RegisterPage from "../pages/Register/Register";
import { ProtectedRoute } from "./PrivateRoutes";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route
          path="add-post"
          element={
            <ProtectedRoute>
              <AddPostPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
