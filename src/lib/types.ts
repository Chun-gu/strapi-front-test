export interface IMeta {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

export interface IApiResponse<T> {
  data: T;
  meta: IMeta;
}

export type IIdArg = string | string[] | undefined;
export interface IProduct {
  id: number;
  attributes: {
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

export interface IAddProductValues {
  productName: string;
  option: string;
  price: number;
  discountRate: number;
  stock: number;
  categories: string;
  images: FileList;
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
  username: string;
}

export interface IAddReviewValues {
  product: number;
  rating: number;
  images: FileList;
  content: string;
}
