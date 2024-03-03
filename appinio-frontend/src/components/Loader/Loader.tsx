import React from "react";
import { useLoading } from "../../hooks/useLoading";

import "./Loader.css";

export default function Loader() {
  const { loading } = useLoading();
  return (
    <>
      {loading && (
        <div className="loading-overlay">
          <div className="loader"></div>
        </div>
      )}
    </>
  );
}
