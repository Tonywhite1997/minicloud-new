import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { api } from "../main";
function useSignUp() {
  const naviagate = useNavigate();
  const {
    mutate: signUp,
    isPending,
    error,
    isSuccess,
  } = useMutation({
    mutationKey: ["SIGNUP"],
    mutationFn: (formData) => api.post("/auth/register", { ...formData }),
  });
  return { signUp, isPending, error, isSuccess };
}

export default useSignUp;
