import { api } from "@/lib/axios";

export interface ICancelOrderParams {
  orderId: string;
}

export const cancelOrder = async ({ orderId }: ICancelOrderParams) => {
  await api.get(`/orders/${orderId}/cancel`);
};
