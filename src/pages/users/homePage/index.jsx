// import { memo } from 'react';
// import { useState } from "react";
// import Btn from "./nutDangNhap/Btn.jsx";
// import Header from "../../../theme/header/index.jsx";
// import "./style.scss";

import { memo } from 'react';
import HomeSlider from './HomeSlider/HomeSlider.jsx';
import "./style.scss";
import BestSeller from '../../../components/BestSeller/BestSeller.jsx';

function HomePage() {
    return (
        <div className="home-page">
            <HomeSlider />
            <BestSeller />
        </div >
    );
}
export default memo(HomePage);