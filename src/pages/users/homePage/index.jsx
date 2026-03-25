// import { memo } from 'react';
// import { useState } from "react";
// import Btn from "./nutDangNhap/Btn.jsx";
// import Header from "../../../theme/header/index.jsx";
// import "./style.scss";

import { memo, useState } from 'react';
import Header from "../theme/header/index.jsx"; // Bỏ /index.jsx đi cho gọn, React tự hiểu
import Btn from "../auth/nutDangNhap/Btn.jsx";
import "./style.scss";
function HomePage() {
    const [isAuthOpen, setIsAuthOpen] = useState(false);

    return (
        <div className="home-page">

            <Header />
            <Btn />

        </div >

    );
}
export default memo(HomePage);