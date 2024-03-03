import { createContext } from "react";

interface ILoadingContext {
  loading: boolean;
  showLoading: (show: boolean) => void;
}

export const LoadingContext = createContext<ILoadingContext>({
  loading: false,
  showLoading: () => {},
});
