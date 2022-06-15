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
  productName: string;
  price: number;
  discountRate: number;
  stock: number;
  description: string;
  images: IImage[];
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
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  money: number;
  phone: string;
  nickname: string;
  isSeller: boolean;
}

export interface IAddReviewValues {
  product: number;
  rating: number;
  images: FileList;
  content: string;
}

export interface IAddCommentValues {
  review: number;
  content: string;
}

export interface IAddAnswerValues {
  inquiryId: string;
  answer: string;
}

export interface IAddInquiryValues {
  productId: string;
  content: string;
}

export interface IImage {
  id: number;
  thumbnail: string;
  large: string;
  medium: string;
  small: string;
}

export interface IReview {
  id: number;
  rating: number;
  content: string;
  updatedAt: string;
  author: {
    id: number;
    username: string;
  };
  images: IImage[];
}
export interface IReviewResponse {
  productId: number;
  reviews: IReview[];
}

export interface IComment {
  id: number;
  content: string;
  updatedAt: string;
  author: {
    id: number;
    username: string;
  };
}

export interface ICommentResponse {
  reviewId: number;
  comments: IComment[];
}
