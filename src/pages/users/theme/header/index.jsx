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
import { memo } from "react";
import "./style.scss";
import { Link } from "react-router-dom";
import { AiOutlineSearch, AiOutlineUser, AiOutlineShoppingCart, AiOutlineMenu } from "react-icons/ai";

const Header = () => {
    return (
        <header className="header-container">
            {/* Tầng 1: Banner xanh teal */}
            <div className="header-top">
                <div className="container">
                    <p>NHẬP MÃ T03FREESHIP30K - GIẢM NGAY 30K CHO ĐƠN HÀNG 199K</p>
                </div>
            </div>

            {/* Tầng 2: Trắng (Logo & Search) */}
            <div className="header-middle">
                <div className="container content">
                    <div className="logo">
                        {/* Thay bằng link logo thật của bạn nhé */}
                        <img src="https://lamthaocosmetics.vn/logo.png" alt="Logo" />
                    </div>

                    <div className="search-box">
                        <input type="text" placeholder="Bạn cần tìm ...." />
                        <button><AiOutlineSearch /></button>
                    </div>

                    <div className="header-actions">
                        <AiOutlineUser className="icon" />
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
                            <Link to="/san-pham"> SẢN PHẨM</Link>
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
        </header>
    );
};

export default memo(Header);