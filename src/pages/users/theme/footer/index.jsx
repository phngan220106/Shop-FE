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
                    <h2>Dear Róse</h2>
                    <p>
                        Mang đến những thiết kế váy đầm nữ tính, chất liệu mềm mại, giúp cô gái tuổi 20 tỏa sáng nhẹ nhàng. Mỗi trang phục là một lời nhắn nhủ yêu thương, tôn vinh nét đẹp trong trẻo, ngọt ngào và tự tin nhất.
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
                        <li><Link to="/">Về Dear Róse</Link></li>
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
                    <p><FaMapMarkerAlt /> Linh Trung, Thủ Đức, TP.HCM</p>
                    <p><FaPhone /> 1900 1234</p>
                    <p><FaEnvelope /> contact@dearrose.vn</p>
                </div>

            </div>

            <div className="footer-bottom">
                © 2026 Dear Róse. All rights reserved.
            </div>
        </footer>
    );
}

export default memo(Footer);