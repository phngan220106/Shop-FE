import { useMemo, useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../../../context/CartContext";
import { products } from "../../../data/product.js";
import BestSeller from '../../../components/BestSeller/BestSeller.jsx';

import "./ProductDetail.scss";

function ProductDetail() {
    const { id } = useParams();
    const [selectedColor, setSelectedColor] = useState("Cream");
    const [selectedSize, setSelectedSize] = useState("S");
    const [quantity, setQuantity] = useState(1);
    const [addedSuccess, setAddedSuccess] = useState(false);

    const navigate = useNavigate();
    const { addToCart } = useContext(CartContext);

    const colors = useMemo(
        () => ["Cream", "Sky Blue", "Black"],
        []
    );

    const sizes = useMemo(() => ["S", "M", "L", "XL"], []);

    const product = products.find(p => p.id === Number(id));

    if (!product) {
        return <p>Không tìm thấy sản phẩm</p>;
    }

    const cartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity,
        color: selectedColor,
        size: selectedSize
    };

    const decreaseQuantity = () => {
        setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
    };

    const increaseQuantity = () => {
        setQuantity((prev) => prev + 1);
    };
    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth" // "smooth" giúp hiệu ứng cuộn mượt mà hơn
        });
    }, [id]);
    useEffect(() => {
        if (addedSuccess) {
            const timer = setTimeout(() => setAddedSuccess(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [addedSuccess]);

    return (
        <>
            <section className="product-detail" aria-label="Chi tiết sản phẩm">
                <div className="product-media">
                    <img src={product.image} alt={product.name} className="main-image" />
                </div>

                <div className="product-info">
                    <p className="brand">Dear Róse</p>
                    <h1>{product.name}</h1>
                    <p className="price">{product.price.toLocaleString()} VND</p>

                    <div className="option-group">
                        <span className="option-label">Màu sắc</span>
                        <div className="chip-list">
                            {colors.map((color) => (
                                <button
                                    key={color}
                                    type="button"
                                    className={`chip ${selectedColor === color ? "active" : ""}`}
                                    onClick={() => setSelectedColor(color)}
                                >
                                    {color}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="option-group">
                        <span className="option-label">Size</span>
                        <div className="chip-list size-list">
                            {sizes.map((size) => (
                                <button
                                    key={size}
                                    type="button"
                                    className={`chip ${selectedSize === size ? "active" : ""}`}
                                    onClick={() => setSelectedSize(size)}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="qty-row">
                        <span className="option-label">Số lượng</span>
                        <div className="qty-control">
                            <button type="button" onClick={decreaseQuantity} aria-label="Giảm số lượng">-</button>
                            <span>{quantity}</span>
                            <button type="button" onClick={increaseQuantity} aria-label="Tăng số lượng">+</button>
                        </div>
                    </div>

                    <div className="action-list">
                        <button type="button" className={`btn secondary ${addedSuccess ? 'added-success' : ''}`} onClick={async () => { setAddedSuccess(false); addToCart(cartItem); setAddedSuccess(true); }}>Thêm vào giỏ</button>
                        <button type="button" className="btn primary" onClick={() => { addToCart(cartItem); navigate('/thanh-toan', { state: { checkoutItems: [cartItem] } }); }}>Mua ngay</button>
                    </div>

                    <div className="meta-list">
                        <div className="meta-item">
                            <span>Thông tin sản phẩm</span>
                            <p>{product.description}</p>
                        </div>
                        <div className="meta-item">
                            <span>Chính sách vận chuyển</span>
                            <p>Giao hàng tiêu chuẩn từ 2 - 4 ngày.</p>
                        </div>
                        <div className="meta-item">
                            <span>Chính sách đổi trả</span>
                            <p>Hỗ trợ đổi trả trong vòng 14 ngày nếu sản phẩm còn nguyên tag.</p>
                        </div>
                    </div>
                </div>
            </section>
            <div>
                <BestSeller />
            </div>
        </>
    );

}

export default ProductDetail;