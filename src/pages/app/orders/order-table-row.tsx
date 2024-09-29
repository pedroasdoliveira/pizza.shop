import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";
import { ArrowRight, Search, X } from "lucide-react";
import OrderDetails from "./orderDetails";
import OrderStatus, { OrderStatusType } from "@/components/order-status";

import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelOrder } from "@/api/orders/cancel-order";
import { IGetOrdersResponse } from "@/api/orders/get-orders";
import { approveOrder } from "@/api/orders/approve-order";
import { deliverOrder } from "@/api/orders/deliver-order";
import { dispatchOrder } from "@/api/orders/dispatch-order";

export interface IOrderTableRowProps {
  order: {
    orderId: string;
    createdAt: string;
    status: "pending" | "canceled" | "processing" | "delivering" | "delivered";
    customerName: string;
    total: number;
  };
}

const OrderTableRow = ({ order }: IOrderTableRowProps) => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const queryClient = useQueryClient();

  const updateOrderStatusOnCache = (
    orderId: string,
    status: OrderStatusType,
  ) => {
    const orderListCache = queryClient.getQueriesData<IGetOrdersResponse>({
      queryKey: ["orders"],
    });

    orderListCache.forEach(([cacheKey, cacheData]) => {
      if (!cacheData) {
        return;
      }

      queryClient.setQueryData<IGetOrdersResponse>(cacheKey, {
        ...cacheData,
        orders: cacheData.orders.map((order) => {
          if (order.orderId === orderId) {
            return { ...order, status };
          }

          return order;
        }),
      });
    });
  };

  const { mutateAsync: cancelOrderFn, isPending: isCancelPending } =
    useMutation({
      mutationFn: cancelOrder,
      async onSuccess(_, { orderId }) {
        updateOrderStatusOnCache(orderId, "canceled");
      },
    });

  const { mutateAsync: approveOrderFn, isPending: isApprovePending } =
    useMutation({
      mutationFn: approveOrder,
      async onSuccess(_, { orderId }) {
        updateOrderStatusOnCache(orderId, "processing");
      },
    });

  const { mutateAsync: dispatchOrderFn, isPending: isDispatchPending } =
    useMutation({
      mutationFn: dispatchOrder,
      async onSuccess(_, { orderId }) {
        updateOrderStatusOnCache(orderId, "delivering");
      },
    });

  const { mutateAsync: deliverOrderFn, isPending: isDeliverPending } =
    useMutation({
      mutationFn: deliverOrder,
      async onSuccess(_, { orderId }) {
        updateOrderStatusOnCache(orderId, "delivered");
      },
    });

  const componentOrderStatusType = (status: OrderStatusType) => {
    switch (status) {
      case "pending":
        return (
          <Button
            onClick={() => approveOrderFn({ orderId: order.orderId })}
            disabled={isApprovePending}
            variant={"outline"}
            size={"xs"}
          >
            <ArrowRight className="mr-2 h-3 w-3" />
            Aprovar
          </Button>
        );
      case "processing":
        return (
          <Button
            onClick={() => dispatchOrderFn({ orderId: order.orderId })}
            disabled={isDispatchPending}
            variant={"outline"}
            size={"xs"}
          >
            <ArrowRight className="mr-2 h-3 w-3" />
            Em Entrega
          </Button>
        );
      case "delivering":
        return (
          <Button
            onClick={() => deliverOrderFn({ orderId: order.orderId })}
            disabled={isDeliverPending}
            variant={"outline"}
            size={"xs"}
          >
            <ArrowRight className="mr-2 h-3 w-3" />
            Entregue
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <TableRow>
      <TableCell>
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogTrigger>
            <Button variant={"outline"} size={"xs"}>
              <Search className="h-3 w-3" />
              <span className="sr-only">Detalhes do pedido</span>
            </Button>
          </DialogTrigger>

          <OrderDetails orderId={order.orderId} open={isDetailsOpen} />
        </Dialog>
      </TableCell>
      <TableCell className="font-mono text-xs font-medium">
        {order.orderId}
      </TableCell>
      <TableCell className="text-muted-foreground">
        {formatDistanceToNow(order.createdAt, {
          locale: ptBR,
          addSuffix: true,
        })}
      </TableCell>
      <TableCell>
        <OrderStatus status={order.status} />
      </TableCell>
      <TableCell className="font-medium">{order.customerName}</TableCell>
      <TableCell className="font-medium">
        {(order.total / 100).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
      </TableCell>

      <TableCell>{componentOrderStatusType(order.status)}</TableCell>

      <TableCell>
        <Button
          disabled={
            !["pending", "processing"].includes(order.status) || isCancelPending
          }
          onClick={() => cancelOrderFn({ orderId: order.orderId })}
          variant={"ghost"}
          size={"xs"}
        >
          <X className="mr-2 h-3 w-3" />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default OrderTableRow;
