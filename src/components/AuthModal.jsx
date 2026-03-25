import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import "../style/pages/login.scss";
function AuthModal({ onClose }) {
    // 2. State để chuyển đổi qua lại giữa Login và Register
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="auth-overlay">
            <div className="auth-modal">
                {/* ĐÂY LÀ NÚT X CỦA BẠN */}
                <button
                    className="btn-close"
                    onClick={onClose}
                >
                    &times;
                </button>
                {/* 3. Header thay đổi nội dung linh hoạt theo State */}
                <div className="auth-header">
                    <h2>{isLogin ? "ĐĂNG NHẬP TÀI KHOẢN" : "TẠO TÀI KHOẢN MỚI"}</h2>
                    <p>{isLogin ? "Vui lòng nhập thông tin tài khoản:" : "Điền thông tin để đăng ký thành viên:"}</p>
                </div>

                {/* 4. Hiển thị Form tương ứng dựa trên isLogin */}
                {isLogin ? <LoginForm /> : <RegisterForm />}

                {/* 5. Footer chứa nút bấm để chuyển đổi trạng thái */}
                <div className="auth-footer">
                    <p>
                        {isLogin ? "Khách hàng mới?" : "Đã có tài khoản?"}
                        <button
                            className="link-pink"
                            onClick={() => setIsLogin(!isLogin)}
                        >
                            {isLogin ? " Tạo tài khoản" : " Đăng nhập ngay"}
                        </button>
                    </p>


                </div>

            </div>
        </div>
    );
}


export default AuthModal;