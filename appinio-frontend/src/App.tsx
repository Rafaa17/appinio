import { PopupProvider } from "react-custom-popup";
import "./App.css";
import { AuthProvider } from "./components/AuthProvider";
import { AppRouter } from "./routes";
import { LoadingProvider } from "./components/LoadingProvider";
import Loader from "./components/Loader/Loader";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <LoadingProvider>
          <PopupProvider>
            <AuthProvider>
              <Loader />
              <AppRouter />
            </AuthProvider>
          </PopupProvider>
        </LoadingProvider>
      </header>
    </div>
  );
}

export default App;
