// import { memo } from 'react';
// import { useState } from "react";
// import Btn from "./nutDangNhap/Btn.jsx";
// import Header from "../../../theme/header/index.jsx";
// import "./style.scss";

import { memo } from 'react';
import { Link } from "react-router-dom";
import Header from "../theme/header/index.jsx"; // Bỏ /index.jsx đi cho gọn, React tự hiểu
import "./style.scss";
function HomePage() {
    return (
        <div className="home-page">

            <Header />

            <section className="hero-banner" aria-label="Banner san pham noi bat">
                <div className="hero-overlay" />
                <div className="hero-content container">
                    <p className="hero-kicker">Bst moi</p>
                    <h1>Dear Róse Collection</h1>
                    <p>
                        Nhe nhang, ngot ngao va day nu tinh. Kham pha cac thiet ke moi nhat
                        danh cho nang.
                    </p>
                    <Link to="/san-pham" className="hero-cta">Xem san pham</Link>
                </div>
            </section>


        </div >

    );
}
export default memo(HomePage);