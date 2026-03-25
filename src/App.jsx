// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/users/homePage/index.jsx"; // Gọi trang chủ

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Cho người dùng vào trang chủ luôn */}
        <Route path="/" element={<HomePage />} />
        {/* Bạn có thể thêm các route khác nếu cần */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;