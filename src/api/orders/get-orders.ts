import { api } from "@/lib/axios";

export interface IGetOrdersQuery {
  pageIndex?: number | null;
}

export interface IGetOrdersResponse {
  orders: {
    orderId: string;
    createdAt: string;
    status: "pending" | "canceled" | "processing" | "delivering" | "delivered";
    customerName: string;
    total: number;
  }[];
  meta: {
    pageIndex: number;
    perPage: number;
    totalCount: number;
  };
}

export const getOrders = async ({ pageIndex }: IGetOrdersQuery) => {
  const response = await api.get<IGetOrdersResponse>("/orders", {
    params: {
      pageIndex,
    },
  });

  return response.data;
};
