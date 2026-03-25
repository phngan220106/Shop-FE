import React, { useState } from "react";

function RegisterForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = (e) => {
        e.preventDefault();

        // Kiểm tra dữ liệu đầu vào
        if (!name || !email || !password) {
            alert("Vui lòng nhập đầy đủ thông tin!");
            return;
        }

        // Tạo đối tượng user
        const newUser = {
            name: name,
            email: email,
            password: password,
        };

        // Lưu vào localStorage
        localStorage.setItem("user", JSON.stringify(newUser));
        alert("Đăng ký thành công! Giờ bạn có thể đăng nhập.");
    };

    return (
        <form className="auth-form" onSubmit={handleRegister}>
            <div className="form-group">
                <input
                    type="text"
                    placeholder="Họ và tên"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div className="form-group">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className="form-group">
                <input
                    type="password"
                    placeholder="Mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <button type="submit" className="btn-submit">
                ĐĂNG KÝ
            </button>
        </form>
    );
}

export default RegisterForm;