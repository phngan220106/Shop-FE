import { useEffect, useState } from "react";
import { regionApi } from "../../apis/region";
import "./style.scss";

const fieldLabels = {
    name: "Họ và tên",
    dob: "Ngày sinh",
    gender: "Giới tính",
    phone: "Số điện thoại",
    email: "Email",
    address: "Địa chỉ",
    avatar: "Avatar",
};

const genderOptions = [
    { value: "", label: "Chọn giới tính" },
    { value: "male", label: "Nam" },
    { value: "female", label: "Nữ" },
    { value: "other", label: "Khác" },
];

export default function ProfileModal({
    field,
    value,
    setValue,
    onSave,
    onClose,
    saving = false,
}) {
    const isGender = field === "gender";
    const isDob = field === "dob";
    const isAddress = field === "address";
    const isAvatar = field === "avatar";
    const isLocked = field === "email";

    // Address state
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedWard, setSelectedWard] = useState("");
    const [detailAddress, setDetailAddress] = useState("");
    const [loadingAddress, setLoadingAddress] = useState(false);

    // Load provinces for address field
    useEffect(() => {
        if (isAddress) {
            loadProvinces();
        }
    }, [isAddress]);

    const loadProvinces = async () => {
        setLoadingAddress(true);
        try {
            const data = await regionApi.getProvinces();
            setProvinces(data || []);
        } catch (error) {
            console.error("Error loading provinces:", error);
        } finally {
            setLoadingAddress(false);
        }
    };

    const handleProvinceChange = async (provinceCode) => {
        setSelectedProvince(provinceCode);
        setSelectedDistrict("");
        setSelectedWard("");
        setDistricts([]);
        setWards([]);

        if (provinceCode) {
            setLoadingAddress(true);
            try {
                const data = await regionApi.getDistricts(provinceCode);
                setDistricts(data || []);
            } catch (error) {
                console.error("Error loading districts:", error);
            } finally {
                setLoadingAddress(false);
            }
        }
    };

    const handleDistrictChange = async (districtCode) => {
        setSelectedDistrict(districtCode);
        setSelectedWard("");
        setWards([]);

        if (districtCode) {
            setLoadingAddress(true);
            try {
                const data = await regionApi.getWards(districtCode);
                setWards(data || []);
            } catch (error) {
                console.error("Error loading wards:", error);
            } finally {
                setLoadingAddress(false);
            }
        }
    };

    const handleWardChange = (wardCode) => {
        setSelectedWard(wardCode);
    };

    const handleAddressSave = () => {
        // Build formatted address
        const ward = wards.find(w => w.code === parseInt(selectedWard));
        const district = districts.find(d => d.code === parseInt(selectedDistrict));
        const province = provinces.find(p => p.code === parseInt(selectedProvince));

        let fullAddress = "";
        if (detailAddress) fullAddress += detailAddress + ", ";
        if (ward) fullAddress += ward.name + ", ";
        if (district) fullAddress += district.name + ", ";
        if (province) fullAddress += province.name;

        // Remove trailing comma
        fullAddress = fullAddress.replace(/, $/, "");

        setValue(fullAddress);
        onSave();
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !saving) {
            onSave();
        }
    };

    // Locked field (email)
    if (isLocked) {
        return (
            <div className="modal-overlay">
                <div className="modal">
                    <h3>{fieldLabels[field]}</h3>
                    <p className="locked-field">Trường này không thể thay đổi</p>
                    <div className="modal-btns">
                        <button onClick={onClose}>Đóng</button>
                    </div>
                </div>
            </div>
        );
    }

    // Avatar upload
    if (isAvatar) {
        return (
            <div className="modal-overlay">
                <div className="modal modal-avatar">
                    <h3>Đổi avatar</h3>
                    <div className="avatar-upload">
                        <div className="upload-area">
                            <span className="upload-icon">📁</span>
                            <p>Nhấp để tải ảnh lên</p>
                            <span className="upload-hint">Chấp nhận .jpg, .png tối đa 5MB</span>
                        </div>
                    </div>
                    <div className="modal-btns">
                        <button onClick={onSave} disabled={saving}>
                            {saving ? "Đang lưu..." : "Lưu"}
                        </button>
                        <button onClick={onClose} disabled={saving}>Hủy</button>
                    </div>
                </div>
            </div>
        );
    }

    // Address with province/district/ward
    if (isAddress) {
        return (
            <div className="modal-overlay">
                <div className="modal">
                    <h3>{fieldLabels[field]}</h3>

                    <div className="address-selects">
                        {loadingAddress && (
                            <div className="loading-address">Đang tải...</div>
                        )}

                        <select
                            value={selectedProvince}
                            onChange={(e) => handleProvinceChange(e.target.value)}
                            disabled={loadingAddress}
                        >
                            <option value="">Chọn tỉnh/thành</option>
                            {provinces.map((p) => (
                                <option key={p.code} value={p.code}>
                                    {p.name}
                                </option>
                            ))}
                        </select>

                        <select
                            value={selectedDistrict}
                            onChange={(e) => handleDistrictChange(e.target.value)}
                            disabled={loadingAddress || !selectedProvince}
                        >
                            <option value="">Chọn quận/huyện</option>
                            {districts.map((d) => (
                                <option key={d.code} value={d.code}>
                                    {d.name}
                                </option>
                            ))}
                        </select>

                        <select
                            value={selectedWard}
                            onChange={(e) => handleWardChange(e.target.value)}
                            disabled={loadingAddress || !selectedDistrict}
                        >
                            <option value="">Chọn phường/xã</option>
                            {wards.map((w) => (
                                <option key={w.code} value={w.code}>
                                    {w.name}
                                </option>
                            ))}
                        </select>

                        <input
                            type="text"
                            value={detailAddress}
                            onChange={(e) => setDetailAddress(e.target.value)}
                            placeholder="Số nhà, đường,..."
                            disabled={saving}
                        />
                    </div>

                    <div className="modal-btns">
                        <button onClick={handleAddressSave} disabled={saving}>
                            {saving ? "Đang lưu..." : "Lưu"}
                        </button>
                        <button onClick={onClose} disabled={saving}>Hủy</button>
                    </div>
                </div>
            </div>
        );
    }

    // Default case - gender (select), dob (date), or other inputs
    return (
        <div className="modal-overlay">
            <div className="modal">
                <h3>{fieldLabels[field]}</h3>

                {isGender ? (
                    <select
                        value={value || ""}
                        onChange={(e) => setValue(e.target.value)}
                        disabled={saving}
                    >
                        {genderOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                ) : isDob ? (
                    <div className="date-input-wrapper">
                        <input
                            type="date"
                            value={value || ""}
                            onChange={(e) => setValue(e.target.value)}
                            max={new Date().toISOString().split("T")[0]}
                            disabled={saving}
                        />
                    </div>
                ) : (
                    <input
                        type={field === "phone" ? "tel" : "text"}
                        value={value || ""}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder={`Nhập ${fieldLabels[field]?.toLowerCase()}`}
                        onKeyDown={handleKeyDown}
                        disabled={saving}
                    />
                )}

                <div className="modal-btns">
                    <button onClick={onSave} disabled={saving}>
                        {saving ? "Đang lưu..." : "Lưu"}
                    </button>
                    <button onClick={onClose} disabled={saving}>Hủy</button>
                </div>
            </div>
        </div>
    );
}
