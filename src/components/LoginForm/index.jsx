import { useContext, useState } from "react";
import { login } from "../../services/authServices.js";
import { AuthContext } from "../../context/AuthContext.jsx";
import "./style.scss";

function LoginForm({ onClose }) {
    const { loginContext } = useContext(AuthContext);
    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const data = await login(form);
            loginContext(data);
            onClose?.();
            window.location.href = "/";
        } catch {
            alert("Sai tai khoan hoac mat khau");
        }
    };

    return (
        <form className="auth-form auth-form--login" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="login-email">Email</label>
                <input
                    id="login-email"
                    type="email"
                    placeholder="hello@dearrose.vn"
                    value={form.email}
                    onChange={(event) => setForm({ ...form, email: event.target.value })}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="login-password">Mật khẩu</label>
                <input
                    id="login-password"
                    type="password"
                    placeholder="Nhập mật khẩu của bạn"
                    value={form.password}
                    onChange={(event) => setForm({ ...form, password: event.target.value })}
                    required
                />
            </div>



            <button className="btn-submit" type="submit">Đăng nhập</button>
        </form>
    );
}

export default LoginForm;
