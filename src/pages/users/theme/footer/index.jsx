import { memo } from "react";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import "./style.scss";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { SiShopee } from "react-icons/si";
function Footer() {
    return (
        <footer className="rosee-footer">
            <div className="container footer-grid">

                {/* BRAND */}
                <div className="footer-col brand">
                    <h2>Roseé Atelier</h2>
                    <p>
                        Tôn vinh vẻ đẹp thuần khiết và sự kiêu sa của người phụ nữ hiện đại
                        thông qua những thiết kế thời trang cao cấp.
                    </p>

                    <div className="socials">
                        <a href="https://facebook.com" target="_blank">
                            <FaFacebookF />
                        </a>

                        <a href="https://instagram.com" target="_blank">
                            <FaInstagram />
                        </a>

                        <a href="https://shopee.vn" target="_blank">
                            <SiShopee />
                        </a>
                    </div>
                </div>

                {/* ABOUT */}
                <div className="footer-col">
                    <h4>VỀ CHÚNG TÔI</h4>
                    <ul>
                        <li><Link to="/">Về Roseé Atelier</Link></li>
                        <li><Link to="/">Hệ thống cửa hàng</Link></li>
                        <li><Link to="/">Tuyển dụng</Link></li>
                        <li><Link to="/">Tin tức & Blog</Link></li>
                    </ul>
                </div>

                {/* POLICY */}
                <div className="footer-col">
                    <h4>CHÍNH SÁCH</h4>
                    <ul>
                        <li><Link to="/return">Chính sách đổi trả</Link></li>
                        <li><Link to="/shipping">Chính sách vận chuyển</Link></li>
                        <li><Link to="/privacy">Chính sách bảo mật</Link></li>
                        <li><Link to="/terms">Điều khoản dịch vụ</Link></li>
                    </ul>
                </div>

                {/* CONTACT */}
                <div className="footer-col">
                    <h4>LIÊN HỆ</h4>
                    <p><FaMapMarkerAlt /> 123 Đường Fashion, Quận 1, TP.HCM</p>
                    <p><FaPhone /> 1900 8888</p>
                    <p><FaEnvelope /> contact@rosee-atelier.vn</p>
                </div>

            </div>

            <div className="footer-bottom">
                © 2024 Roseé Atelier. All rights reserved.
            </div>
        </footer>
    );
}

export default memo(Footer);