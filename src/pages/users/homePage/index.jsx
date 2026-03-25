// import { memo } from 'react';
// import { useState } from "react";
// import Btn from "./nutDangNhap/Btn.jsx";
// import Header from "../../../theme/header/index.jsx";
// import "./style.scss";

import { memo } from 'react';
import Header from "../theme/header/index.jsx"; // Bỏ /index.jsx đi cho gọn, React tự hiểu
import "./style.scss";
function HomePage() {
    return (
        <div className="home-page">

            <Header />


        </div >

    );
}
export default memo(HomePage);