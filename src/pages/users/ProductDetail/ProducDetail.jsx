import { useParams } from "react-router-dom";
import { products } from "../../../data/product.js";
import "./ProductDetail.scss";
function ProductDetail() {
    const { id } = useParams();

    const product = products.find(p => p.id === Number(id));

    if (!product) {
        return <p>Không tìm thấy sản phẩm</p>;
    }

    return (
        <div style={{ padding: "40px", display: "flex", gap: "40px" }}>

            <img
                src={product.image}
                alt={product.name}
                style={{ width: "300px" }}
            />

            <div>
                <h2>{product.name}</h2>
                <p>{product.price.toLocaleString()} VND</p>
                <p>{product.description}</p>

                <button>Thêm vào giỏ</button>
            </div>

        </div>
    );
}

export default ProductDetail;