import { ICreateUser, IUser } from "@/shared/model";



export const submitAddUserForm = (addUserData: ICreateUser, mutateAsync: (data: ICreateUser) => Promise<IUser>) => {
  console.log("Submitting Add User Form with data:", addUserData);
  // const result = mutateAsync(addUserData);
  console.log("Mutation result:", mutateAsync);
  
}