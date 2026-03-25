import { memo } from 'react';
import Header from '../theme/header/index.jsx';
import { useState } from "react";
import Btn from "./nutDangNhap/Btn.jsx";


function HomePage() {
    const [isAuthOpen, setIsAuthOpen] = useState(false);

    return (
        <div className="home-page">
            <Btn />


        </div >

    );
}
export default memo(HomePage);