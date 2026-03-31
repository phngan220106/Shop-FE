import { memo, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import "./style.scss";

const Cart = ({ onClose }) => {
    useEffect(() => {
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, []);

    return (
        <div className="cart-overlay" onClick={onClose}>
            {/* Dừng sự kiện nổi bọt để click vào bên trong giỏ hàng không bị đóng */}
            <div className="cart-sidebar" onClick={(e) => e.stopPropagation()}>
                <div className="cart-header">
                    <h2>Giỏ hàng</h2>
                    <AiOutlineClose className="close-icon" onClick={onClose} />
                </div>

                <div className="cart-content">
                    <div className="empty-cart">
                        {/* Nhớ thay path ảnh túi xách buồn của bạn vào đây */}
                        <img src="/path-to-your-empty-cart-icon.png" alt="Empty" />
                        <p>Chưa có sản phẩm trong giỏ hàng...</p>
                        <button className="btn-back" onClick={onClose}>
                            Trở về trang sản phẩm
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(Cart);