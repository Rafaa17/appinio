import React, { useState } from "react";
import { LoadingContext } from "../context/loading.context";

export const LoadingProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <LoadingContext.Provider
      value={{
        loading,
        showLoading: (show: boolean) => {
          setLoading(show);
        },
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};
