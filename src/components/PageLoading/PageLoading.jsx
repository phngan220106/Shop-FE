import { memo } from "react";
import "./style.scss";

function PageLoading({ title = "Đang tải...", description = "Vui lòng chờ trong giây lát.", compact = false }) {
    return (
        <div className={`page-loading ${compact ? "page-loading--compact" : ""}`} role="status" aria-live="polite">
            <div className="page-loading__spinner" aria-hidden="true" />
            <div className="page-loading__content">
                <strong>{title}</strong>
                <p>{description}</p>
            </div>
        </div>
    );
}

export default memo(PageLoading);