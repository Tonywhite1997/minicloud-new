import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { api } from "../main";

function useSendVerifyCode() {
  const navigate = useNavigate();
  const {
    isPending,
    error,
    mutate: sendCode,
  } = useMutation({
    mutationKey: ["VERIFYEMAILCODE"],
    mutationFn: () => api.patch("/auth/send-email-verification"),
    onSuccess: () => {
      navigate("/verify-email");
    },
  });
  return { sendCode, isPending, error };
}

export default useSendVerifyCode;
