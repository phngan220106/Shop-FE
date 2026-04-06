import { memo } from "react";
import { useSearchParams } from "react-router-dom";
import { products } from "../../../data/product.js";
import "./style.scss";
import { Link } from "react-router-dom";
const ProductPage = () => {
    const [searchParams] = useSearchParams();
    const keyword = (searchParams.get("tu-khoa") || "").trim().toLowerCase();

    const filteredProducts = keyword
        ? products.filter((product) =>
            product.name.toLowerCase().includes(keyword)
        )
        : products;

    return (
        <div className="product-page">
            <h2>Sản phẩm</h2>

            {keyword && (
                <p className="search-result">
                    Kết quả tìm kiếm cho: "{searchParams.get("tu-khoa")}"
                </p>
            )}

            {filteredProducts.length === 0 ? (
                <p className="empty">Không tìm thấy sản phẩm phù hợp.</p>
            ) : (
                <div className="product-list">
                    {filteredProducts.map((item) => (
                        <Link to={`/san-pham/${item.id}`} key={item.id} className="product-card">
                            <div className="image-box">
                                <img src={item.image} alt={item.name} />
                            </div>
                            <h3>{item.name}</h3>
                            <p className="price">
                                {item.price.toLocaleString()} VND
                            </p>

                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};
export default memo(ProductPage);