import { PopupProvider } from "react-custom-popup";
import "./App.css";
import { AuthProvider } from "./components/AuthProvider";
import { AppRouter } from "./routes";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <PopupProvider>
          <AuthProvider>
            <AppRouter />
          </AuthProvider>
        </PopupProvider>
      </header>
    </div>
  );
}

export default App;
