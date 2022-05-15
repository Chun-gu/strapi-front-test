export interface IMeta {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

export interface IProduct {
  id: number;
  attributes: {
    productId: string;
    productName: string;
    option: string;
    price: number;
    discountRate: number;
    stock: number;
    description: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

export interface IProducts {
  data: IProduct[];
  meta: IMeta;
}
