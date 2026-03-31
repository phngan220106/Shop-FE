import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Link } from "react-router-dom";
// Import CSS của Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './HomeSlider.scss';
import banner1 from "../../../../assets/users/banner1.webp";
import banner2 from "../../../../assets/users/banner2.webp";
import banner3 from "../../../../assets/users/banner3.webp";
import banner4 from "../../../../assets/users/banner4.webp";

function HomeSlider() {
    const slides = [
        {
            id: 1,
            title: "Dear Rose Collection",
            desc: "Nhẹ nhàng, ngọt ngào và đầy nữ tính.",
            img: banner1 // Thay bằng đường dẫn ảnh của bạn
        },
        {
            id: 2,
            title: "BST Mùa Xuân",
            desc: "Khám phá phong cách mới nhất dành cho nàng.",
            img: banner2
        },
        {
            id: 3,
            title: "Phong Cách Đường Phố",
            desc: "Năng động, cá tính và luôn nổi bật.",
            img: banner3

        },
        {
            id: 4,
            title: "BST Dạo Phố",
            desc: "Thoải mái, trẻ trung và đầy sức sống.",
            img: banner4
        }

    ];

    return (
        <div className="home-slider">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={0}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000 }}
                loop={true}
            >
                {slides.map(slide => (
                    <SwiperSlide key={slide.id}>
                        <div className="slide-item">
                            {/* Lớp nền mờ phía sau */}
                            <div className="blur-bg" style={{ backgroundImage: `url(${slide.img})` }}></div>

                            {/* Ảnh chính hiển thị đầy đủ */}
                            <img src={slide.img} alt={slide.title} className="main-img" />

                            <div className="slide-content">
                                <Link to="/san-pham/quan-ao" className="btn-shop">Mua ngay</Link>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default HomeSlider;