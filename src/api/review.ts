import axios from "axios";
import { IAddReviewValues, IIdArg } from "src/types";

export const getReviews = async (id: IIdArg = "", limit = 5, page = 1) => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/product-reviews/${id}?limit=${limit}&page=${page}`,
  );
  return data;
};

export const addReview = async ({
  jwt,
  author,
  ...values
}: IAddReviewValues) => {
  const { image, ...rest } = values;

  const formData = new FormData();
  formData.append("files.image", image[0]);
  formData.append("data", JSON.stringify({ author, ...rest }));

  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/reviews`,
    formData,
    {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${jwt}`,
      },
    },
  );

  return data;
};

export const deleteReview = async ({
  review,
  jwt,
}: {
  review: number;
  jwt: string;
}) => {
  const { data } = await axios.delete(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/reviews/${review}`,
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    },
  );

  return data;
};
