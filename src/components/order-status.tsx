export type OrderStatusType =
  | "pending"
  | "canceled"
  | "processing"
  | "delivering"
  | "delivered";

interface IOrderStatusProps {
  status: OrderStatusType;
}

const orderStatusMap: Record<OrderStatusType, string> = {
  pending: "Pendente",
  canceled: "Cancelado",
  delivered: "Entregue",
  delivering: "Em Entrega",
  processing: "Em Preparo",
};

const OrderStatus = ({ status }: IOrderStatusProps) => {
  const getStatusType = (status: OrderStatusType) => {
    switch (status) {
      case "pending":
        return (
          <span
            data-testid="badge"
            className="h-2 w-2 rounded-full bg-slate-400"
          />
        );
      case "canceled":
        return (
          <span
            data-testid="badge"
            className="h-2 w-2 rounded-full bg-rose-500"
          />
        );
      case "delivered":
        return (
          <span
            data-testid="badge"
            className="h-2 w-2 rounded-full bg-emerald-500"
          />
        );
      case "processing":
        return (
          <span
            data-testid="badge"
            className="h-2 w-2 rounded-full bg-emerald-500"
          />
        );
      case "delivering":
        return (
          <span
            data-testid="badge"
            className="h-2 w-2 rounded-full bg-sky-500"
          />
        );
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
