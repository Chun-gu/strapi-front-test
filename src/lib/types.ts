export interface IMeta {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

export interface IProducts {
  products: {
    data: [
      {
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
    ];
    meta: IMeta;
  };
}
