import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { api } from "../../main";
function useForgotPass() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    mutate: forgotPassword,
    error,
    isPending,
  } = useMutation({
    mutationKey: ["FORGOTPASSWORD"],
    mutationFn: (registeredEmail) => {
      return api.patch("/auth/forgot-password", {
        email: registeredEmail,
      });
    },
    onSuccess: () => {
      navigate("/auth/reset-password");
    },
  });
  return { forgotPassword, error, isPending };
}

export default useForgotPass;
