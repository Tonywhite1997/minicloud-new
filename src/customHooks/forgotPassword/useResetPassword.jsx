import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { api } from "../../main";
function useResetPassword() {
  const navigate = useNavigate();
  const {
    mutate: resetPassword,
    error,
    isPending,
  } = useMutation({
    mutationKey: ["RESETPASSWORD"],
    mutationFn: ({ resetCode, newPassword }) => {
      return api.patch("/auth/reset-password", { resetCode, newPassword });
    },
    onSuccess: () => {
      navigate("/");
    },
  });
  return { resetPassword, error, isPending };
}

export default useResetPassword;
