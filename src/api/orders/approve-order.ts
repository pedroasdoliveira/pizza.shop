import { api } from "@/lib/axios";

export interface IApproveOrderParams {
  orderId: string;
}

export const approveOrder = async ({ orderId }: IApproveOrderParams) => {
  await api.get(`/orders/${orderId}/approve`);
};
