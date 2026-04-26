import { memo, useEffect, useMemo, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { products } from "../../../data/product.js";
import "./style.scss";
import { formatVND } from "../../../utils/format.js";

// TODO: `products` đang đọc từ data local.
// Khi kết nối backend, thay bằng API lấy danh sách sản phẩm theo query/filter/pagination.

const PRICE_RANGES = [
    { value: "all", label: "Tất cả mức giá" },
    { value: "under-200", label: "Dưới 200.000 VND" },
    { value: "200-400", label: "200.000 - 400.000 VND" },
    { value: "400-600", label: "400.000 - 600.000 VND" },
    { value: "over-600", label: "Trên 600.000 VND" }
];

const SORT_OPTIONS = [
    { value: "featured", label: "Nổi bật" },
    { value: "price-asc", label: "Giá tăng dần" },
    { value: "price-desc", label: "Giá giảm dần" },
    { value: "name-asc", label: "Tên A-Z" },
    { value: "stock-desc", label: "Còn hàng nhiều" }
];

const ProductPage = () => {
    const [searchParams] = useSearchParams();
    const keyword = (searchParams.get("tu-khoa") || "").trim().toLowerCase();
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedPriceRange, setSelectedPriceRange] = useState("all");
    const [showHotOnly, setShowHotOnly] = useState(false);
    const [showInStockOnly, setShowInStockOnly] = useState(false);
    const [sortBy, setSortBy] = useState("featured");
    const [isSortOpen, setIsSortOpen] = useState(false);
    const sortDropdownRef = useRef(null);
    // TODO: Các state filter/sort hiện đang chỉ quản lý trên frontend.
    // Khi có backend, cần đồng bộ với query params và gửi lên API để lọc/sắp xếp ở server.

    const categories = useMemo(
        () => ["all", ...new Set(products.map((product) => product.category))],
        []
    );
    // TODO: `categories` đang được suy ra từ danh sách local.
    // Khi làm backend, cần xem có API categories riêng hoặc API products trả filter metadata hay không.

    const selectedSortOption = SORT_OPTIONS.find((option) => option.value === sortBy) ?? SORT_OPTIONS[0];

    const filteredProducts = useMemo(() => {
        let nextProducts = [...products];
        // TODO: Toàn bộ search/filter/sort đang xử lý client-side.
        // Khi danh sách lớn và có backend, nên đưa logic này sang API để tránh tải dữ liệu dư thừa.

        if (keyword) {
            nextProducts = nextProducts.filter((product) => (
                product.name.toLowerCase().includes(keyword)
            ));
            // TODO: Search hiện chỉ match theo `name` local.
            // Backend có thể cần full-text search, bỏ dấu, tìm theo category/sku/tag...
        }

        if (selectedCategory !== "all") {
            nextProducts = nextProducts.filter((product) => product.category === selectedCategory);
        }

        if (selectedPriceRange !== "all") {
            nextProducts = nextProducts.filter((product) => {
                if (selectedPriceRange === "under-200") {
                    return product.price < 200000;
                }

                if (selectedPriceRange === "200-400") {
                    return product.price >= 200000 && product.price <= 400000;
                }

                if (selectedPriceRange === "400-600") {
                    return product.price > 400000 && product.price <= 600000;
                }

                if (selectedPriceRange === "over-600") {
                    return product.price > 600000;
                }

                return true;
            });
        }

        if (showHotOnly) {
            nextProducts = nextProducts.filter((product) => product.isHot);
        }

        if (showInStockOnly) {
            nextProducts = nextProducts.filter((product) => product.stock > 0);
        }

        nextProducts.sort((firstProduct, secondProduct) => {
            if (sortBy === "price-asc") {
                return firstProduct.price - secondProduct.price;
            }

            if (sortBy === "price-desc") {
                return secondProduct.price - firstProduct.price;
            }

            if (sortBy === "name-asc") {
                return firstProduct.name.localeCompare(secondProduct.name);
            }

            if (sortBy === "stock-desc") {
                return secondProduct.stock - firstProduct.stock;
            }

            return Number(secondProduct.isHot) - Number(firstProduct.isHot);
        });
        // TODO: Thứ tự `featured` hiện đang ưu tiên `isHot` theo data local.
        // Cần đối chiếu với backend xem có trường ranking/score/pinned để sắp xếp nổi bật không.

        return nextProducts;
    }, [keyword, selectedCategory, selectedPriceRange, showHotOnly, showInStockOnly, sortBy]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!sortDropdownRef.current?.contains(event.target)) {
                setIsSortOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const resetFilters = () => {
        setSelectedCategory("all");
        setSelectedPriceRange("all");
        setShowHotOnly(false);
        setShowInStockOnly(false);
        setSortBy("featured");
        setIsSortOpen(false);
    };

    return (
        <div className="product-page">
            {/* <div className="product-page__hero">
                <div>
                    <h2>Sản phẩm</h2>
                </div>
            </div> */}

            {keyword && (
                <p className="search-result">
                    Kết quả tìm kiếm cho: "{searchParams.get("tu-khoa")}"
                </p>
            )}

            <div className="product-page__body">
                <aside className="filter-sidebar">
                    <div className="sidebar-card">
                        <h4>Danh mục</h4>
                        <div className="filter-stack">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    type="button"
                                    className={`sidebar-option ${selectedCategory === category ? "active" : ""}`}
                                    onClick={() => setSelectedCategory(category)}
                                >
                                    {category === "all" ? "Tất cả sản phẩm" : category}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="sidebar-card">
                        <h4>Mức giá</h4>
                        <div className="filter-stack">
                            {PRICE_RANGES.map((range) => (
                                <button
                                    key={range.value}
                                    type="button"
                                    className={`sidebar-option ${selectedPriceRange === range.value ? "active" : ""}`}
                                    onClick={() => setSelectedPriceRange(range.value)}
                                >
                                    {range.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="sidebar-card">
                        <h4>Trạng thái</h4>
                        <label className="check-option">
                            <input
                                type="checkbox"
                                checked={showHotOnly}
                                onChange={() => setShowHotOnly((prev) => !prev)}
                            />
                            <span>Chỉ hiển thị sản phẩm nổi bật</span>
                        </label>
                        <label className="check-option">
                            <input
                                type="checkbox"
                                checked={showInStockOnly}
                                onChange={() => setShowInStockOnly((prev) => !prev)}
                            />
                            <span>Chỉ hiển thị sản phẩm còn hàng</span>
                        </label>
                    </div>

                    <button type="button" className="reset-btn" onClick={resetFilters}>
                        Xóa bộ lọc
                    </button>
                </aside>

                <div className="product-content">
                    <div className="filter-bar">
                        <div className="filter-bar__summary">
                            <strong>{filteredProducts.length}</strong>
                            <span>sản phẩm phù hợp</span>
                        </div>

                        <div className="sort-field" ref={sortDropdownRef}>
                            <span>Sắp xếp</span>
                            <div className={`sort-dropdown ${isSortOpen ? "is-open" : ""}`}>
                                <button
                                    type="button"
                                    className="sort-dropdown__trigger"
                                    onClick={() => setIsSortOpen((prev) => !prev)}
                                    aria-haspopup="listbox"
                                    aria-expanded={isSortOpen}
                                >
                                    <span>{selectedSortOption.label}</span>
                                    <span className="sort-dropdown__arrow" aria-hidden="true">v</span>
                                </button>

                                {isSortOpen ? (
                                    <div className="sort-dropdown__menu" role="listbox">
                                        {SORT_OPTIONS.map((option) => (
                                            <button
                                                key={option.value}
                                                type="button"
                                                className={`sort-dropdown__option ${sortBy === option.value ? "active" : ""}`}
                                                onClick={() => {
                                                    setSortBy(option.value);
                                                    setIsSortOpen(false);
                                                }}
                                                role="option"
                                                aria-selected={sortBy === option.value}
                                            >
                                                {option.label}
                                            </button>
                                        ))}
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    </div>

                    {filteredProducts.length === 0 ? (
                        <p className="empty">Không tìm thấy sản phẩm phù hợp.</p>
                    ) : (
                        <div className="product-list">
                            {filteredProducts.map((item) => (
                                <Link to={`/san-pham/${item.id}`} key={item.id} className="product-card">
                                    {/* TODO: Đang điều hướng bằng id local.
                                        Khi có backend, đảm bảo id/slug route này khớp với API chi tiết sản phẩm. */}
                                    <div className="image-box">
                                        <img src={item.image} alt={item.name} />
                                    </div>

                                    <div className="product-card__content">
                                        <div className="product-card__meta">
                                            {/* TODO: UI đang giả định sản phẩm có `category` và `isHot`.
                                                Khi backend thật, cần map đúng các field badge/tag từ response. */}
                                            <span className="product-tag">{item.category}</span>
                                            {item.isHot ? <span className="product-badge">Nổi bật</span> : null}
                                        </div>

                                        <h3>{item.name}</h3>

                                        <div className="product-card__footer">
                                            <p className="price">{formatVND(item.price)}</p>
                                            {/* TODO: Trạng thái tồn kho hiện đang dựa trực tiếp vào `stock`.
                                                Khi có backend, cần xem dùng `stock`, `inventoryStatus` hay `availableQuantity`. */}
                                            <span className={`stock ${item.stock > 0 ? "in-stock" : "out-stock"}`}>
                                                {item.stock > 0 ? `Còn ${item.stock}` : "Hết hàng"}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default memo(ProductPage);

