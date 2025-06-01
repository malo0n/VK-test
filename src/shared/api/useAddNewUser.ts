import { client } from "@shared/api/config";
import { ICreateUser, IUser } from "@shared/model";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

const AddNewUser = async (data: ICreateUser): Promise<IUser> => {
  try {
    const response = await client.post<IUser>("/employees", data);
    if (response.status === 201) {
      return response.data;
    } else {
      throw new Error(`Failed to add new user: ${response.status} - ${response.statusText}`);
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Error occurred while adding a new user:", error); 
      throw new Error(`Error: ${error.message}`);
    } else {
      console.error("Unexpected error occurred:", error);
      throw new Error("An unexpected error occurred while adding a new user.");
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
      toast.success("Новый пользователь успешно добавлен!");
      console.log("Пользователь успешно добавлен");
    },
    onError: (error: Error) => {
      toast.error(`Не удалось добавить пользователя: ${error.message}`);
      console.error("Ошибка при добавлении пользователя:", error);
    }
  });
};