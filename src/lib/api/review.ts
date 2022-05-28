import { IAddReviewValues, IIdArg } from "@types";
import axios from "axios";

export const getReviews = async (id: IIdArg = "") => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/reviews/${id}`
  );
  return data;
};

export const addReview = async (author: string, values: IAddReviewValues) => {
  console.log("addReview가 받은 values", { author, ...values });
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
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjUzNjk1NjEyLCJleHAiOjE2NTYyODc2MTJ9.tbpu8lnRLMuh49x9wkSfG_i9LtYMYdPFaVbrR7N8WUc`,
      },
    }
  );

  return data;
};
