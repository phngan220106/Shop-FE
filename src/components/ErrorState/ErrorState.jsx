import { memo } from "react";
import { AiOutlineExclamationCircle, AiOutlineReload } from "react-icons/ai";
import "./style.scss";

function ErrorState({
    title = "Đã xảy ra lỗi",
    description = "Không thể tải dữ liệu ngay lúc này.",
    actionLabel = "Thử lại",
    onRetry
}) {
    return (
        <div className="error-state" role="alert">
            <div className="error-state__icon" aria-hidden="true">
                <AiOutlineExclamationCircle />
            </div>
            <div className="error-state__content">
                <strong>{title}</strong>
                <p>{description}</p>
            </div>
            {onRetry ? (
                <button type="button" className="error-state__action" onClick={onRetry}>
                    <AiOutlineReload />
                    <span>{actionLabel}</span>
                </button>
            ) : null}
        </div>
    );
}

export default memo(ErrorState);