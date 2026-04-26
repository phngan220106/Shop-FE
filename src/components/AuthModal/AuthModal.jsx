import { useState } from "react";
import LoginForm from "../LoginForm/index.jsx";
import RegisterForm from "../RegisterForm/index.jsx";
import "./login.scss";

function AuthModal({ onClose }) {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="auth-overlay" onClick={onClose}>
            <div className="auth-modal" onClick={(event) => event.stopPropagation()}>
                <button className="btn-close" onClick={onClose} aria-label="Dong modal">
                    &times;
                </button>

                <div className="auth-header">
                    <span className="auth-badge">{isLogin ? "Welcome Back" : "Join Dear Rose"}</span>
                    <h2>{isLogin ? "Đăng nhập tài khoản" : "Tạo tài khoản mới"}</h2>

                </div>

                {isLogin ? <LoginForm onClose={onClose} /> : <RegisterForm onClose={onClose} />}

                <div className="auth-footer">
                    <p>
                        {isLogin ? "Khách hàng mới?" : "Đã có tài khoản"}
                        <button
                            className="link-pink"
                            type="button"
                            onClick={() => setIsLogin((prev) => !prev)}
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
