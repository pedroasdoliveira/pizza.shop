import { api } from "@/lib/axios";

export interface IDeliverOrderParams {
  orderId: string;
}

export const deliverOrder = async ({ orderId }: IDeliverOrderParams) => {
  await api.get(`/orders/${orderId}/deliver`);
};
