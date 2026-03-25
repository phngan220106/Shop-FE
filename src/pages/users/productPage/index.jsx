import { memo } from "react";
import { useSearchParams } from "react-router-dom";

const products = [
    { id: 1, name: "Sữa rửa mặt dịu nhẹ" },
    { id: 2, name: "Kem chống nắng SPF50" },
    { id: 3, name: "Serum cấp ẩm HA" },
    { id: 4, name: "Toner hoa hồng" },
    { id: 5, name: "Son tint bóng" },
    { id: 6, name: "Kem dưỡng ban đêm" },
]; // Dữ liệu sản phẩm mẫu 

const ProductPage = () => {
    const [searchParams] = useSearchParams();
    const keyword = (searchParams.get("tu-khoa") || "").trim().toLowerCase();

    const filteredProducts = keyword
        ? products.filter((product) => product.name.toLowerCase().includes(keyword))
        : products;

    return (
        <div style={{ padding: "20px" }}>
            <h2>Sản phẩm</h2>
            {keyword ? <p>Kết quả tìm kiếm cho: "{searchParams.get("tu-khoa")}"</p> : null}

            {filteredProducts.length === 0 ? (
                <p>Không tìm thấy sản phẩm phù hợp.</p>
            ) : (
                <ul>
                    {filteredProducts.map((product) => (
                        <li key={product.id}>{product.name}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default memo(ProductPage);