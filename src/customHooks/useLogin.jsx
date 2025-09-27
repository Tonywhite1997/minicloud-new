import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
useNavigate;
import { api } from "../main";

function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    mutate: login,
    isPending,
    error,
  } = useMutation({
    mutationKey: ["Login"],
    mutationFn: ({ email, password }) => {
      return api.post("/auth/login", { email, password });
    },
    retry: 1,
    onSuccess: () => {
      queryClient.invalidateQueries({ refetchType: "active" });
      queryClient.clear();
      navigate("/dashboard/database");
    },
  });
  return { login, isPending, error };
}

export default useLogin;
