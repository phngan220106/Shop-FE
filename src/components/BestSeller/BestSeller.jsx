import "./BestSeller.scss";
import { products } from "../../data/product.js";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
function BestSeller() {
    const hotProducts = products.filter(p => p.isHot);

    return (
        <div className="best-seller">
            <div className="header">
                <h2>Sản Phẩm Bán Chạy</h2>
                <Link to="/san-pham"><button>Xem tất cả</button></Link>
            </div>

            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                slidesPerView={4}
                spaceBetween={20}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                loop={hotProducts.length > 4}
                breakpoints={{
                    0: { slidesPerView: 1 },
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                    1280: { slidesPerView: 4 },
                }}
            >
                {hotProducts.map((item, index) => (
                    <SwiperSlide key={item.id}>
                        <Link to={`/san-pham/${item.id}`}>
                            <div className="product-card">
                                <div className="badge">#{index + 1}</div>
                                <div className="image-box">
                                    <img src={item.image} alt={item.name} />
                                </div>
                                <h4>{item.name}</h4>
                                <p className="price">
                                    {item.price.toLocaleString()} VND
                                </p>
                            </div>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
export default BestSeller;