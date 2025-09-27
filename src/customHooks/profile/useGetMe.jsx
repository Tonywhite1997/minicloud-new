import React from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../main";

function useGetMe() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["ME"],
    queryFn: () => api.get("/auth/check-if-login"),
    retry: 1,
  });
  return { data, isLoading, error };
}

export default useGetMe;
