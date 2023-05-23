const getStatusColor = (status: any) =>{
    return status ==="Confirmed"?"primary":status ==="Pending"
    ? "secondary"
    : status === "Cancelled"
    ? "danger"
    : status === "Completed"
    ? "success"
    : status === "Being_Cooked"
    ? "info"
    : status === "Ready" && "warning";

}
export default getStatusColor;