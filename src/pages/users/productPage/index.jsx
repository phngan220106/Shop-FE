import { memo } from "react";
import { useParams, useSearchParams } from "react-router-dom";

const categoryMap = {
    "quan-ao": "QUẦN ÁO",
    "giay-dep": "GIÀY DÉP",
    "tui-sach": "TÚI SÁCH"
};

const products = [
    { id: 1, name: "Áo sơ mi công sở", categorySlug: "quan-ao" },
    { id: 2, name: "Đầm dự tiệc", categorySlug: "quan-ao" },
    { id: 3, name: "Quần jeans basic", categorySlug: "quan-ao" },
    { id: 4, name: "Giày sneaker nữ", categorySlug: "giay-dep" },
    { id: 5, name: "Dép sandal mềm", categorySlug: "giay-dep" },
    { id: 6, name: "Giày cao gót 5cm", categorySlug: "giay-dep" },
    { id: 7, name: "Túi tote canvas", categorySlug: "tui-sach" },
    { id: 8, name: "Túi đeo chéo mini", categorySlug: "tui-sach" },
    { id: 9, name: "Ví cầm tay dự tiệc", categorySlug: "tui-sach" },
]; // Dữ liệu sản phẩm mẫu 

const ProductPage = () => {
    const { categorySlug } = useParams();
    const [searchParams] = useSearchParams();
    const keyword = (searchParams.get("tu-khoa") || "").trim().toLowerCase();
    const selectedCategory = categorySlug ? categoryMap[categorySlug] : "";

    const productsByCategory = categorySlug
        ? products.filter((product) => product.categorySlug === categorySlug)
        : products;

    const filteredProducts = keyword
        ? productsByCategory.filter((product) => product.name.toLowerCase().includes(keyword))
        : productsByCategory;

    return (
        <div style={{ padding: "20px" }}>
            <h2>Sản phẩm</h2>
            {selectedCategory ? <p>Danh mục: "{selectedCategory}"</p> : null}
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