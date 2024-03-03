import { useContext } from "react";
import { LoadingContext } from "../context/loading.context";

export const useLoading = () => {
  return useContext(LoadingContext);
};
