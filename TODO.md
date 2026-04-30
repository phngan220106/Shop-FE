# TODO - Xây dựng chức năng đăng nhập

## Plan
- [x] 1. Phân tích các file liên quan (AuthContext, authServices, LoginForm, RegisterForm, AuthModal, Header, App, routes)
- [x] 2. Sửa `src/App.jsx` - Bọc toàn bộ app trong `<AuthProvider>`
- [x] 3. Sửa `src/context/AuthContext.jsx` - Fix `logout()` redirect về `/`, tránh gọi logout khi chưa có token
- [x] 4. Cải thiện `src/components/LoginForm/index.jsx` - Thêm loading state, hiển thị lỗi inline, disable nút submit
- [x] 5. Cải thiện `src/components/RegisterForm/index.jsx` - Tương tự LoginForm
- [x] 6. Đồng bộ `src/services/authServices.js` - Chuẩn hóa throw error để form bắt được message
- [x] 7. Bổ sung style `src/components/AuthModal/login.scss` - Thêm `.auth-error`, `:disabled`
- [x] 8. Kiểm tra build
