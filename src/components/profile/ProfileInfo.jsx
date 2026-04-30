import ProfileRow from "./ProfileRow";
import "./style.scss";
export default function ProfileInfo({ user, openModal }) {
    return (
        <div className="content">
            <h2>Thông tin cá nhân</h2>

            <div className="info-card">
                <ProfileRow
                    label="Họ và tên"
                    value={user.name}
                    onClick={() => openModal("name")}
                />

                <ProfileRow
                    label="Ngày sinh"
                    value={user.dob}
                    onClick={() => openModal("dob")}
                />

                <ProfileRow
                    label="Giới tính"
                    value={user.gender}
                    onClick={() => openModal("gender")}
                />

                <ProfileRow
                    label="Số điện thoại"
                    value={user.phone}
                    onClick={() => openModal("phone")}
                />

                <ProfileRow
                    label="Email"
                    value={user.email}
                    locked
                />
            </div>
        </div>
    );
}