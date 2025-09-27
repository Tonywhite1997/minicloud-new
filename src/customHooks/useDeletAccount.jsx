import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { api } from "../main";

function useDeletAccount() {
  const navigate = useNavigate();
  const {
    mutate: deleteAccount,
    isPending,
    error,
  } = useMutation({
    mutationKey: ["DELETEACC"],
    mutationFn: (password) => {
      return api.delete("/user/delete-account", { data: { password } });
    },
    onSuccess: () => {
      navigate("/");
    },
  });
  return { deleteAccount, isPending, error };
}

export default useDeletAccount;
