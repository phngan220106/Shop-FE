import { Link } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import "./CheckoutHeader.scss";

function CheckoutHeader() {
    return (
        <header className="checkout-header">
            <div className="checkout-header__inner">
                <Link to="/" className="checkout-header__back">
                    <AiOutlineArrowLeft />
                    <span>Trở lại trang chủ</span>
                </Link>

                <Link to="/" className="checkout-header__brand">
                    <img src="/logo.png" alt="Dear Rose" />
                </Link>


            </div>
        </header>
    );
}

export default CheckoutHeader;
