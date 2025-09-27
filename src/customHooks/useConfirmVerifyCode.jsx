import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { api } from "../main";

function useConfirmVerifyCode() {
  const navigate = useNavigate();
  const {
    isPending,
    error,
    mutate: confirmCode,
  } = useMutation({
    mutationKey: ["CONFIRMVERIFYEMAILCODE"],
    mutationFn: (verificationCode) =>
      api.patch("/auth/confirm-verification-code", { verificationCode }),
    onSuccess: () => {
      navigate("/dashboard/database");
    },
  });
  return { confirmCode, isPending, error };
}

export default useConfirmVerifyCode;
