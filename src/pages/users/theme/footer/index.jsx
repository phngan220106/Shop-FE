import { memo } from "react";
import "./style.scss";
import { FiPhoneCall, FiMail } from "react-icons/fi";

function Footer() {
    return (
        <footer className="shop-footer">
            <div className="container footer-top">
                <div className="brand-block">
                    <img src="/logo.png" alt="Dear Róse" className="brand-logo" />
                    <p className="brand-desc">
                        <strong>Dear Róse</strong> mang den nhung thiet ke vay dam nu tinh,
                        chat lieu mem mai, giup co gai tuoi 20 toa sang nhe nhang.
                    </p>
                    <div className="social-links">
                        <a href="#" aria-label="Facebook"><img src="/fb.png" alt="Facebook" /></a>
                        <a href="#" aria-label="Instagram"><img src="/ins.png" alt="Instagram" /></a>
                        <a href="#" aria-label="TikTok"><img src="/tiktok.png" alt="TikTok" /></a>
                        <a href="#" aria-label="Shopee"><img src="/shopee.png" alt="Shopee" /></a>
                    </div>

                    <p className="company-line">
                        Cong ty TNHH Lam Thao Cosmetics - Giay phep kinh doanh so 0318085848,
                        cap ngay 06/10/2023 boi So Ke Hoach va Dau Tu TP.HCM.
                    </p>

                    <img src="/icons.svg" alt="Phuong thuc thanh toan" className="payment-icons" />
                </div>

                <div className="feature-grid">
                    <img src="/giaohang.png" alt="Giao hang" className="feature-badge" />
                    <img src="/goiqua.png" alt="Goi qua" className="feature-badge" />
                    <img src="/xuatvat.png" alt="Xuat vat" className="feature-badge" />
                    <img src="/doitra.png" alt="Doi tra" className="feature-badge" />
                </div>
            </div>

            <div className="container footer-middle">
                <div className="policy-col">
                    <h3>CHAM SOC KHACH HANG</h3>
                    <ul>
                        <li><a href="#policy-doi-tra">Chinh sach doi tra</a></li>
                        <li><a href="#policy-bao-mat">Chinh sach bao mat</a></li>
                        <li><a href="#policy-thanh-toan">Chinh sach thanh toan</a></li>
                        <li><a href="#policy-dieu-khoan">Dieu khoan dich vu</a></li>
                    </ul>
                </div>

                <div className="contact-col">
                    <h3>GIO MO CUA</h3>
                    <p>Tu 9:00 - 21:30 tat ca cac ngay trong tuan (bao gom ca ngay le, ngay Tet).</p>
                    <h3>GOP Y - KHIEU NAI</h3>
                    <p><FiPhoneCall /> <a href="tel:0769661668">0769 661 668</a> - <a href="tel:02888899913">0288 889 9913</a></p>
                    <p><FiMail /> <a href="mailto:cskh@lamthaocosmetic.vn">cskh@lamthaocosmetic.vn</a></p>
                </div>
            </div>

            <div className="container policy-anchor-info" aria-hidden="true">
                <span id="policy-doi-tra">Doi tra trong 7 ngay.</span>
                <span id="policy-bao-mat">Bao mat thong tin khach hang.</span>
                <span id="policy-thanh-toan">Ho tro COD va chuyen khoan.</span>
                <span id="policy-dieu-khoan">Ap dung dieu khoan mua ban.</span>
            </div>

            <div className="container footer-bottom">
                <p>Dia chi: Dong Hoa, Thanh pho Ho Chi Minh</p>
            </div>
        </footer>
    );
}

export default memo(Footer);
