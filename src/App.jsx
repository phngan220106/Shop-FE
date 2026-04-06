// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import AppRoutes from "./routes/default.jsx";
import Header from "./pages/users/theme/header/index.jsx";
import Footer from "./pages/users/theme/footer/index.jsx";
function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Header />
        <main className="app-content">
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;