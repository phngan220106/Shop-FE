// import { memo } from 'react';
// import { useState } from "react";
// import Btn from "./nutDangNhap/Btn.jsx";
// import Header from "../../../theme/header/index.jsx";
// import "./style.scss";

import { memo } from 'react';
import { Link } from "react-router-dom";
import Header from "../theme/header/index.jsx"; // Bỏ /index.jsx đi cho gọn, React tự hiểu
import Footer from "../theme/footer/index.jsx";
import "./style.scss";
import HomeSlider from './HomeSlider/HomeSlider.jsx';
function HomePage() {
    return (
        <div className="home-page">



            <section className="hero-banner" aria-label="Banner san pham noi bat">
                <div className="hero-overlay" />
                <div className="hero-content container">
                    <HomeSlider />
                </div>
            </section>


        </div >

    );
}
export default memo(HomePage);