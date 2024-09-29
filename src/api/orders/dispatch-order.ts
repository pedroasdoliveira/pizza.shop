import { api } from "@/lib/axios";

export interface IDispatchOrderParams {
  orderId: string;
}

export const dispatchOrder = async ({ orderId }: IDispatchOrderParams) => {
  await api.get(`/orders/${orderId}/dispatch`);
};
