// import { memo } from "react";
// import './style.scss';
// const Header = () => {
//     return (
//         <div className="header_top">
//             <div className="container">
//                 Header
//             </div>
//         </div>
//     );
// }
// export default memo(Header);
import { memo, useState } from "react";
import "./style.scss";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineSearch, AiOutlineUser, AiOutlineShoppingCart, AiOutlineMenu } from "react-icons/ai";
import AuthModal from "../../../../components/AuthModal";
import CategoryMenu from "../../../../components/CategoryMenu";

const Header = () => {
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();

    const handleSearch = (event) => {
        event.preventDefault();
        const trimmedKeyword = keyword.trim();

        if (!trimmedKeyword) {
            navigate("/san-pham");
            return;
        }

        navigate(`/san-pham?tu-khoa=${encodeURIComponent(trimmedKeyword)}`);
    };

    return (
        <header className="header-container">
            {/* Tầng 1: Banner xanh teal */}
            <div className="header-top">
                <div className="container">
                    <div className="promo-marquee" aria-label="Khuyen mai">
                        <div className="promo-track">
                            <span>NHẬP MÃ T03FREESHIP30K - GIẢM NGAY 30K CHO ĐƠN HÀNG 199K</span>
                            <span>NHẬP MÃ T03FREESHIP30K - GIẢM NGAY 30K CHO ĐƠN HÀNG 199K</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tầng 2: Trắng (Logo & Search) */}
            <div className="header-middle">
                <div className="container content">
                    <div className="logo">
                        {/* Thay bằng link logo thật của bạn nhé */}
                        <img src="./logo.png" alt="Logo" />
                    </div>

                    <form className="search-box" onSubmit={handleSearch}>
                        <input
                            type="text"
                            placeholder="Bạn cần tìm ..."
                            value={keyword}
                            onChange={(event) => setKeyword(event.target.value)}
                        />
                        <button type="submit" aria-label="Tìm kiếm sản phẩm">
                            <AiOutlineSearch />
                        </button>
                    </form>

                    <div className="header-actions">
                        <button
                            type="button"
                            className="user-auth-btn"
                            onClick={() => setIsAuthOpen(true)}
                            aria-label="Đăng nhập"
                        >
                            <AiOutlineUser className="icon" />
                            <span className="auth-label">Đăng nhập</span>
                        </button>
                        <div className="cart-icon">
                            <AiOutlineShoppingCart className="icon" />
                            <span className="badge">0</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tầng 3: Hồng (Menu) */}
            <nav className="header-bottom">
                <div className="container">
                    <ul className="menu-list">
                        <li>
                            <CategoryMenu />
                        </li>
                        <li>
                            <Link to="/blog">BLOG</Link>
                        </li>
                        <li>
                            <Link to="/don-hang">ĐƠN HÀNG</Link>
                        </li>

                    </ul>
                </div>
            </nav>

            {isAuthOpen && <AuthModal onClose={() => setIsAuthOpen(false)} />}
        </header>
    );
};

export default memo(Header);