type OrderStatus =
  | "pending"
  | "canceled"
  | "processing"
  | "delivering"
  | "delivered";

interface IOrderStatusProps {
  status: OrderStatus;
}

const orderStatusMap: Record<OrderStatus, string> = {
  pending: "Pendente",
  canceled: "Cancelado",
  delivered: "Entregue",
  delivering: "Em Entrega",
  processing: "Em Preparo",
};

const OrderStatus = ({ status }: IOrderStatusProps) => {
  const getStatusType = (status: OrderStatus) => {
    switch (status) {
      case "pending":
        return <span className="h-2 w-2 rounded-full bg-slate-400" />;
      case "canceled":
        <span className="h-2 w-2 rounded-full bg-rose-500" />;
      case "delivered":
        <span className="h-2 w-2 rounded-full bg-emerald-500" />;
      case "processing":
        <span className="h-2 w-2 rounded-full bg-amber-500" />;
      case "delivering":
        <span className="h-2 w-2 rounded-full bg-sky-500" />;
      default:
        null;
    }
  };

  return (
    <div className="flex items-center gap-2">
      {getStatusType(status)}

      <span className="font-medium text-muted-foreground">
        {orderStatusMap[status]}
      </span>
    </div>
  );
};

export default OrderStatus;
