import "./BestSeller.scss";
import { products } from "../../data/product.js";
import { useState } from "react";
import { Link } from "react-router-dom";
function BestSeller() {
    const [startIndex, setStartIndex] = useState(0);

    const ITEMS_PER_PAGE = 4;

    const next = () => {
        if (startIndex + ITEMS_PER_PAGE < products.length) {
            setStartIndex(startIndex + ITEMS_PER_PAGE);
        }
    };

    const prev = () => {
        if (startIndex - ITEMS_PER_PAGE >= 0) {
            setStartIndex(startIndex - ITEMS_PER_PAGE);
        }
    };

    const visibleProducts = products.slice(
        startIndex,
        startIndex + ITEMS_PER_PAGE
    );

    return (
        <div className="best-seller">

            <div className="header">
                <h2>BEST SELLER</h2>
                <Link to="/san-pham">
                    <button>Xem tất cả</button>
                </Link>
            </div>

            <div className="slider">

                <button className="arrow left" onClick={prev} disabled={startIndex === 0}>‹</button>

                <div className="list">
                    {visibleProducts.map((item) => (
                        <Link to={`/san-pham/${item.id}`} key={item.id}>
                            <div className="card">

                                <div className="image">
                                    <img src={item.image} alt={item.name} />
                                </div>

                                <p className="name">{item.name}</p>
                                <p className="price">
                                    {item.price.toLocaleString()} VND
                                </p>

                            </div>
                        </Link>
                    ))}
                </div>

                <button className="arrow right" onClick={next} disabled={startIndex + ITEMS_PER_PAGE >= products.length}>›</button>

            </div>
        </div>
    );
}
export default BestSeller;