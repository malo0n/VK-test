
import { client } from "@/shared/api/config";
import { ICreateUser, IUser } from "@/shared/model";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const AddNewUser = async (data: ICreateUser): Promise<IUser> => {
  try {
    const response = await client.post<IUser>("/employees", data);
    if (response.status === 201) {
      return response.data;
    } else {
      throw new Error("Failed to add new user:" + response.statusText);
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const useAddNewUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: AddNewUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"]
      });
    }
  });
};