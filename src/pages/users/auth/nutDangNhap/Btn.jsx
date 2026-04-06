import React from "react";
import AuthModal from "../../../../components/AuthModal";
import { useState } from "react";

function Btn() {
    const [isAuthOpen, setIsAuthOpen] = useState(false);

    return (
        <header className="header-container">
            <div>

                {/* Gọi LoginButton và truyền lệnh mở */}
                <button onClick={() => setIsAuthOpen(true)} >
                    ĐĂNG NHẬP
                </button>
            </div>

            {/* Gọi AuthModal và truyền lệnh đóng */}
            {isAuthOpen && (
                <AuthModal onClose={() => setIsAuthOpen(false)} />
            )}

        </header>

    );
}

export default Btn;