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

export interface IRegisterUserValues {
  username: string;
  password: string;
  email: string;
  phone: string;
  nickname: string;
}

export interface IUser {
  blocked: boolean;
  confirmed: boolean;
  createdAt: string;
  email: string;
  id: number;
  money: number;
  nickname: string;
  phone: string;
  provider: string;
  updatedAt: string;
  userId: string;
  username: string;
}
