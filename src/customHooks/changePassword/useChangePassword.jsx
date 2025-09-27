import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../main";
function useChangePassword() {
  const queryClient = useQueryClient();
  const {
    mutate: changePassword,
    error,
    isPending,
    isSuccess,
  } = useMutation({
    mutationKey: ["CHANGEPASSWORD"],
    mutationFn: ({ oldPassword, newPassword }) => {
      return api.patch("/user/change-password", {
        currentPassword: oldPassword,
        newPassword,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["LOGOUT"]);
    },
  });
  return { changePassword, error, isPending, isSuccess };
}

export default useChangePassword;
