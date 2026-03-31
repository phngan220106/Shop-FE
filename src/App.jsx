// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/users/homePage/index.jsx"; // Gọi trang chủ
import BeautyBlog from "./pages/users/Blog/index.jsx";
import ProductPage from "./pages/users/productPage/index.jsx";
import Orders from "./pages/users/Orders/index.jsx";
import Footer from "./pages/users/theme/footer/index.jsx";
import returnPolicy from "./pages/users/returnPolicy/index.jsx";
import shippingPolicy from "./pages/users/shippingPolicy/index.jsx";
import privacyPolicy from "./pages/users/privacyPolicy/index.jsx";
import termOfService from "./pages/users/termOfService/index.jsx";
function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <main className="app-content">
          <Routes>
            {/* Cho người dùng vào trang chủ luôn */}
            <Route path="/" element={<HomePage />} />
            {/* Bạn có thể thêm các route khác nếu cần */}
            <Route path="/san-pham" element={<ProductPage />} />
            <Route path="/san-pham/:categorySlug" element={<ProductPage />} />
            <Route path="/blog" element={<BeautyBlog />} />
            <Route path="/don-hang" element={<Orders />} />
            <Route path="/return" element={<returnPolicy />} />
            <Route path="/shipping" element={<shippingPolicy />} />
            <Route path="/privacy" element={<privacyPolicy />} />
            <Route path="/terms" element={<termOfService />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;