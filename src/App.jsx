// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/users/homePage/index.jsx"; // Gọi trang chủ
import BeautyBlog from "./pages/users/Blog/index.jsx";
import ProductPage from "./pages/users/productPage/index.jsx";
import Orders from "./pages/users/Orders/index.jsx";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Cho người dùng vào trang chủ luôn */}
        <Route path="/" element={<HomePage />} />
        {/* Bạn có thể thêm các route khác nếu cần */}
        <Route path="/san-pham" element={<ProductPage />} />
        <Route path="/blog" element={<BeautyBlog />} />
        <Route path="/don-hang" element={<Orders />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;