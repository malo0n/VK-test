import { onAddUserSubmitProps } from "@/widgets/form/model";

export const onAddUserSubmit = async (props: onAddUserSubmitProps) => {
  const { setIsAddUserDialogOpen, mutateAsync, methods } = props;

  try {
    await mutateAsync(methods.getValues());
    setIsAddUserDialogOpen(false);
    methods.reset();
    console.log("User added successfully");
  } catch (error) {
    console.error("Error adding user:", error);
  }
};
