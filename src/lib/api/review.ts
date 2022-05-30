import { IAddReviewValues, IIdArg } from "@types";
import axios from "axios";

export const getReviews = async (id: IIdArg = "") => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/reviews/${id}`
  );
  return data;
};

export const addReview = async (
  jwt: string,
  author: number,
  values: IAddReviewValues
) => {
  const formData = new FormData();
  const { images, ...rest } = values;
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
    }
  );

  return data;
};
