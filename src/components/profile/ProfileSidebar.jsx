import "./style.scss";
export default function ProfileSidebar({ user }) {
    return (
        <div className="sidebar">
            <div className="user-card">
                <p>Member</p>
                <h3>{user.name}</h3>
                <p>{user.email}</p>
            </div>

            <div className="menu">
                <div className="menu-item active">Thông tin tài khoản</div>
                <div className="menu-item">Lịch sử đơn hàng</div>
                <div className="menu-item">Địa chỉ đã lưu</div>
                <div className="menu-item">Khách hàng thân thiết</div>
            </div>
        </div>
    );
}