import { useParams } from "react-router-dom";

const OrderDetail = () => {
    const { id } = useParams();

    return <div>Chi tiết đơn hàng: {id}</div>;
};

export default OrderDetail;