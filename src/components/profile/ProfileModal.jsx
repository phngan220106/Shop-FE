import "./style.scss";
export default function ProfileModal({
    field,
    value,
    setValue,
    onSave,
    onClose,
}) {
    return (
        <div className="modal-overlay">
            <div className="modal">
                <h3>Nhập {field}</h3>

                <input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />

                <div className="modal-btns">
                    <button onClick={onSave}>Lưu</button>
                    <button onClick={onClose}>Hủy</button>
                </div>
            </div>
        </div>
    );
}