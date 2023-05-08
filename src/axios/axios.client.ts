import axios from "axios";
import { Movies } from "../types/movies";

const get = async (url: string) => {
  try {
    const response = await axios.get<Movies>(url);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("AXIOS_[GET]_ERROR");
      console.log("error message: ", error.message);
      return error.message;
    } else {
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
};
