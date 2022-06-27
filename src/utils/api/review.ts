import { IAddReviewValues, IIdArg } from "src/types";
import axios from "axios";

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
  const { images, ...rest } = values;

  const formData = new FormData();
  formData.append("files.images", images[0]);
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
