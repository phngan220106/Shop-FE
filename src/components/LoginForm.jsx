import React, { useState } from "react";

function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        const user = JSON.parse(localStorage.getItem("user"));

        if (!user) {
            alert("Chưa có tài khoản!");
            return;
        }

        if (email === user.email && password === user.password) {
            alert("Đăng nhập thành công!");
        } else {
            alert("Sai tài khoản hoặc mật khẩu!");
        }
    };

    return (
        <form className="auth-form" onSubmit={handleLogin}>
            <div className="form-group">
                <input
                    type="email"
                    placeholder="Nhập email của bạn"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>

            <div className="form-group">
                <input
                    type="password"
                    placeholder="Nhập mật khẩu của bạn"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>


            <button type="submit" className="btn-submit">
                ĐĂNG NHẬP
            </button>
        </form>
    );
}

export default LoginForm;