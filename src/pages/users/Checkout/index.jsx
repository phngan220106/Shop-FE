import { useEffect, useMemo, useState } from "react";
import { FaMoneyBillWave } from "react-icons/fa";
import { MdQrCode2 } from "react-icons/md";
import { useLocation, useSearchParams } from "react-router-dom";
import { products } from "../../../data/product.js";
import "./style.scss";

const SHIPPING_FEE = 35000;
const COUPON_DISCOUNT = 30000;
const REGION_API_BASE_URL = "https://provinces.open-api.vn/api/v1";

const formatCurrency = (value) => `${value.toLocaleString("vi-VN")} VND`;

function CheckoutPage() {
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const productId = Number(searchParams.get("productId"));
    const product = products.find((item) => item.id === productId) ?? products[0];
    const fallbackItem = {
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        color: "Cream",
        size: "S",
        quantity: 1
    };

    const checkoutItems = useMemo(() => {
        const stateItems = location.state?.checkoutItems;

        if (Array.isArray(stateItems) && stateItems.length > 0) {
            return stateItems;
        }

        if (location.state?.checkoutItem) {
            return [location.state.checkoutItem];
        }

        return [fallbackItem];
    }, [fallbackItem, location.state]);

    const [formData, setFormData] = useState({
        country: "Vietnam",
        fullName: "",
        address: "",
        addressDetail: "",
        apartment: "",
        city: "",
        cityCode: "",
        postalCode: "",
        district: "",
        districtCode: "",
        ward: "",
        wardCode: "",
        phone: "",
        note: ""
    });
    const [couponCode, setCouponCode] = useState("");
    const [appliedCoupon, setAppliedCoupon] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("cod");
    const [isOrderPlaced, setIsOrderPlaced] = useState(false);
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [isLoadingProvinces, setIsLoadingProvinces] = useState(false);
    const [isLoadingDistricts, setIsLoadingDistricts] = useState(false);
    const [isLoadingWards, setIsLoadingWards] = useState(false);
    const [regionError, setRegionError] = useState("");

    const subtotal = useMemo(
        () => checkoutItems.reduce((total, item) => total + item.price * item.quantity, 0),
        [checkoutItems]
    );
    const couponDiscount = appliedCoupon ? COUPON_DISCOUNT : 0;
    const total = subtotal + SHIPPING_FEE - couponDiscount;

    useEffect(() => {
        const controller = new AbortController();

        async function loadProvinces() {
            setIsLoadingProvinces(true);
            setRegionError("");

            try {
                const response = await fetch(`${REGION_API_BASE_URL}/p/`, {
                    signal: controller.signal
                });

                if (!response.ok) {
                    throw new Error("Khong the tai danh sach tinh/thanh pho.");
                }

                const data = await response.json();
                setProvinces(Array.isArray(data) ? data : []);
            } catch (error) {
                if (error.name !== "AbortError") {
                    setRegionError("Khong tai duoc du lieu dia chi tu VN Region API.");
                }
            } finally {
                if (!controller.signal.aborted) {
                    setIsLoadingProvinces(false);
                }
            }
        }

        loadProvinces();

        return () => controller.abort();
    }, []);

    useEffect(() => {
        if (!formData.cityCode) {
            setDistricts([]);
            setWards([]);
            return;
        }

        const controller = new AbortController();

        async function loadDistricts() {
            setIsLoadingDistricts(true);
            setRegionError("");

            try {
                const response = await fetch(`${REGION_API_BASE_URL}/p/${formData.cityCode}?depth=2`, {
                    signal: controller.signal
                });

                if (!response.ok) {
                    throw new Error("Khong the tai danh sach quan/huyen.");
                }

                const data = await response.json();
                setDistricts(Array.isArray(data?.districts) ? data.districts : []);
            } catch (error) {
                if (error.name !== "AbortError") {
                    setRegionError("Khong tai duoc quan/huyen cho tinh thanh da chon.");
                }
            } finally {
                if (!controller.signal.aborted) {
                    setIsLoadingDistricts(false);
                }
            }
        }

        loadDistricts();

        return () => controller.abort();
    }, [formData.cityCode]);

    useEffect(() => {
        if (!formData.districtCode) {
            setWards([]);
            return;
        }

        const controller = new AbortController();

        async function loadWards() {
            setIsLoadingWards(true);
            setRegionError("");

            try {
                const response = await fetch(`${REGION_API_BASE_URL}/d/${formData.districtCode}?depth=2`, {
                    signal: controller.signal
                });

                if (!response.ok) {
                    throw new Error("Khong the tai danh sach phuong/xa.");
                }

                const data = await response.json();
                setWards(Array.isArray(data?.wards) ? data.wards : []);
            } catch (error) {
                if (error.name !== "AbortError") {
                    setRegionError("Khong tai duoc phuong/xa cho quan huyen da chon.");
                }
            } finally {
                if (!controller.signal.aborted) {
                    setIsLoadingWards(false);
                }
            }
        }

        loadWards();

        return () => controller.abort();
    }, [formData.districtCode]);

    const handleInputChange = ({ target }) => {
        const { name, value } = target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleProvinceChange = ({ target }) => {
        const selectedProvince = provinces.find((item) => String(item.code) === target.value);

        setFormData((prev) => ({
            ...prev,
            city: selectedProvince?.name ?? "",
            cityCode: target.value,
            district: "",
            districtCode: "",
            ward: "",
            wardCode: ""
        }));

        setDistricts([]);
        setWards([]);
    };

    const handleDistrictChange = ({ target }) => {
        const selectedDistrict = districts.find((item) => String(item.code) === target.value);

        setFormData((prev) => ({
            ...prev,
            district: selectedDistrict?.name ?? "",
            districtCode: target.value,
            ward: "",
            wardCode: ""
        }));

        setWards([]);
    };

    const handleWardChange = ({ target }) => {
        const selectedWard = wards.find((item) => String(item.code) === target.value);

        setFormData((prev) => ({
            ...prev,
            ward: selectedWard?.name ?? "",
            wardCode: target.value
        }));
    };

    const handleApplyCoupon = () => {
        const normalizedCode = couponCode.trim().toUpperCase();
        setAppliedCoupon(normalizedCode === "DEARROSE30" ? normalizedCode : "");
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsOrderPlaced(true);
    };

    return (
        <section className="checkout-page">
            <form className="checkout-layout" onSubmit={handleSubmit}>
                <div className="checkout-main">

                    <div className="checkout-columns">
                        <div className="checkout-column">
                            <div className="section-heading section-heading-inline">
                                <h1>Thông tin mua hàng</h1>
                                <p>Nhập đầy đủ thông tin liên hệ để tạo đơn hàng.</p>
                            </div>

                            <div className="field-list">
                                <select name="country" value={formData.country} onChange={handleInputChange}>
                                    <option value="Vietnam">Vietnam</option>
                                </select>

                                <input
                                    name="fullName"
                                    placeholder="Họ và tên"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    required
                                />

                                <input
                                    name="phone"
                                    placeholder="Số điện thoại"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    required
                                />

                                <input
                                    name="addressDetail"
                                    placeholder="Số nhà, tên đường, toà nhà..."
                                    value={formData.addressDetail}
                                    onChange={handleInputChange}
                                    required
                                />

                                <textarea
                                    name="note"
                                    rows="4"
                                    placeholder="Ghi chú đơn hàng"
                                    value={formData.note}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <div className="checkout-column">
                            <div className="section-heading section-heading-inline">
                                <h2>Vận chuyển</h2>
                                <div className="shipping-alert">Vui lòng nhập thông tin giao hàng.</div>
                            </div>

                            <div className="field-list">
                                <div className="grid-two">
                                    <select
                                        name="cityCode"
                                        value={formData.cityCode}
                                        onChange={handleProvinceChange}
                                        required
                                        disabled={isLoadingProvinces}
                                    >
                                        <option value="">
                                            {isLoadingProvinces ? "Dang tai..." : "Chọn Tỉnh/Thành phố"}
                                        </option>
                                        {provinces.map((province) => (
                                            <option key={province.code} value={province.code}>
                                                {province.name}
                                            </option>
                                        ))}
                                    </select>

                                    <select
                                        name="districtCode"
                                        value={formData.districtCode}
                                        onChange={handleDistrictChange}
                                        required
                                        disabled={!formData.cityCode || isLoadingDistricts}
                                    >
                                        <option value="">
                                            {!formData.cityCode
                                                ? "Chon Quan/Huyen"
                                                : isLoadingDistricts
                                                    ? "Dang tai quan/huyen..."
                                                    : "Chọn Quận/Huyện"}
                                        </option>
                                        {districts.map((district) => (
                                            <option key={district.code} value={district.code}>
                                                {district.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="grid-two">
                                    <select
                                        name="wardCode"
                                        value={formData.wardCode}
                                        onChange={handleWardChange}
                                        required
                                        disabled={!formData.districtCode || isLoadingWards}
                                    >
                                        <option value="">
                                            {!formData.districtCode
                                                ? "Chon Phuong/Xa"
                                                : isLoadingWards
                                                    ? "Dang tai phuong/xa..."
                                                    : "Chọn Phường/Xã"}
                                        </option>
                                        {wards.map((ward) => (
                                            <option key={ward.code} value={ward.code}>
                                                {ward.name}
                                            </option>
                                        ))}
                                    </select>


                                </div>

                                {regionError ? <p className="field-message error">{regionError}</p> : null}
                            </div>

                            <div className="checkout-block checkout-block-compact">
                                <h2>Thanh toán</h2>
                                <p className="helper-text">Toàn bộ giao dịch được bảo mật và mã hóa.</p>

                                <label className={`payment-card ${paymentMethod === "cod" ? "selected" : ""}`}>
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="cod"
                                        checked={paymentMethod === "cod"}
                                        onChange={(event) => setPaymentMethod(event.target.value)}
                                    />
                                    <span className="payment-icon payment-icon-cod" aria-hidden="true">
                                        <FaMoneyBillWave />
                                    </span>
                                    <div>
                                        <strong>(COD) Thanh toán khi nhận hàng</strong>
                                    </div>
                                </label>

                                <label className={`payment-card ${paymentMethod === "vnpay" ? "selected" : ""}`}>
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="vnpay"
                                        checked={paymentMethod === "vnpay"}
                                        onChange={(event) => setPaymentMethod(event.target.value)}
                                    />
                                    <span className="payment-icon payment-icon-vnpay" aria-hidden="true">
                                        <MdQrCode2 />
                                    </span>
                                    <div>
                                        <strong>VNPay QR</strong>
                                    </div>
                                </label>
                            </div>

                            <div className="checkout-block checkout-block-compact">
                                <h2>Phương thức vận chuyển</h2>
                                <label className="option-card selected">
                                    <input type="radio" checked readOnly />
                                    <span>Giao hàng tiêu chuẩn </span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {isOrderPlaced ? (
                        <p className="success-message">Don hang mau da duoc tao. Ban co the noi buoc nay voi API thanh toan sau.</p>
                    ) : null}
                </div>

                <aside className="checkout-summary">
                    <div className="summary-header">
                        <h2>Đơn hàng</h2>
                    </div>

                    <div className="summary-product-list">
                        {checkoutItems.map((item) => (
                            <div key={item.cartKey ?? `${item.id}-${item.color}-${item.size}`} className="summary-product">
                                <div className="product-thumb">
                                    <img src={item.image} alt={item.name} />
                                    <span className="quantity-badge">{item.quantity}</span>
                                </div>

                                <div className="product-meta">
                                    <h3>{item.name}</h3>
                                    <p>{item.size} / {item.color}</p>
                                </div>

                                <strong>{formatCurrency(item.price * item.quantity)}</strong>
                            </div>
                        ))}
                    </div>

                    <div className="voucher-box">
                        <div className="voucher-row">
                            <input
                                type="text"
                                placeholder="Nhập mã giảm giá"
                                value={couponCode}
                                onChange={(event) => setCouponCode(event.target.value)}
                            />
                            <button type="button" onClick={handleApplyCoupon}>Áp dụng</button>
                        </div>

                        {couponCode && !appliedCoupon ? (
                            <p className="coupon-note">Ma hop le hien tai la DEARROSE30.</p>
                        ) : null}
                    </div>

                    <div className="price-list">
                        <div className="price-row">
                            <span>Tạm tính</span>
                            <strong>{formatCurrency(subtotal)}</strong>
                        </div>
                        <div className="price-row">
                            <span>Phí vận chuyển</span>
                            <strong>{formatCurrency(SHIPPING_FEE)}</strong>
                        </div>
                        <div className="price-row muted">
                            <span>Giảm giá thành viên</span>
                            <strong>0 d</strong>
                        </div>
                        <div className="price-row muted">
                            <span>Giảm giá coupon</span>
                            <strong>- {couponDiscount.toLocaleString("vi-VN")} d</strong>
                        </div>
                    </div>

                    <div className="summary-footer">
                        <div className="total-row">
                            <span>Tổng cộng</span>
                            <strong>{formatCurrency(total)}</strong>
                        </div>

                        <button type="submit" className="place-order-btn">Đặt hàng</button>
                    </div>
                </aside>
            </form>
        </section>
    );
}

export default CheckoutPage;
