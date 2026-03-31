import { useParams } from "react-router-dom";

function CategoryPage() {
    const { slug } = useParams();

    return (
        <div>
            <h1>Danh mục sản phẩm: {slug}</h1>
        </div>
    );
}

export default CategoryPage;