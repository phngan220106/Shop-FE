import { useContext, useState } from "react";
import { register } from "../../services/authServices.js";
import { AuthContext } from "../../context/AuthContext.jsx";
import "./style.scss";

function RegisterForm({ onClose }) {
    const { loginContext } = useContext(AuthContext);
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const data = await register(form);
            loginContext(data);
            onClose?.();
            window.location.href = "/";
        } catch {
            alert("Dang ky that bai");
        }
    };

    return (
        <form className="auth-form auth-form--register" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="register-name">Họ tên</label>
                <input
                    id="register-name"
                    placeholder="Nguyen Minh Anh"
                    value={form.name}
                    onChange={(event) => setForm({ ...form, name: event.target.value })}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="register-email">Email</label>
                <input
                    id="register-email"
                    type="email"
                    placeholder="hello@dearrose.vn"
                    value={form.email}
                    onChange={(event) => setForm({ ...form, email: event.target.value })}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="register-password">Mật khẩu</label>
                <input
                    id="register-password"
                    type="password"
                    placeholder="Tạo mật khẩu mới"
                    value={form.password}
                    onChange={(event) => setForm({ ...form, password: event.target.value })}
                    required
                />
            </div>



            <button className="btn-submit" type="submit">Tạo tài khoản</button>
        </form>
    );
}

export default RegisterForm;
