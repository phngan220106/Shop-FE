import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile, updateProfile, changePassword } from "../../../services/userService.js";

import ProfileSidebar from "../../../components/profile/ProfileSidebar.jsx";
import ProfileInfo from "../../../components/profile/ProfileInfo.jsx";
import ProfileModal from "../../../components/profile/ProfileModal.jsx";
import "./style.scss";

export default function ProfilePage() {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [field, setField] = useState(null);
    const [tempValue, setTempValue] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const res = await getProfile();
        setUser(res.data);
    };

    const openModal = (f) => {
        setField(f);
        setTempValue(user[f] || "");
    };

    const handleSave = async () => {
        await updateProfile({ [field]: tempValue });

        setUser({
            ...user,
            [field]: tempValue,
        });

        setField(null);
    };

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    if (!user) return <p>Loading...</p>;

    return (
        <div className="profile-page">
            <div className="back-home" onClick={() => navigate("/")}>
                ← Trang chủ
            </div>

            <div className="profile-container">
                <ProfileSidebar user={user} />

                <ProfileInfo user={user} openModal={openModal} />
            </div>

            <button className="logout" onClick={logout}>
                Đăng xuất
            </button>

            {field && (
                <ProfileModal
                    field={field}
                    value={tempValue}
                    setValue={setTempValue}
                    onSave={handleSave}
                    onClose={() => setField(null)}
                />
            )}
        </div>
    );
}