import "./style.scss";
export default function ProfileRow({ label, value, locked, onClick }) {
    return (
        <div className="row" onClick={!locked ? onClick : null}>
            <span>{label}</span>

            <span className={value ? "value" : "empty"}>
                {value || "Thêm thông tin"} {locked ? "🔒" : ">"}
            </span>
        </div>
    );
}