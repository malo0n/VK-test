import { Input } from "@/shared/components/ui/input";
import { ICreateUser } from "@/shared/model";
import { MutateFunction } from "@tanstack/react-query";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";

export interface AddUserFormProps {
  setIsAddUserDialogOpen: (isOpen: boolean) => void;
  methods: UseFormReturn<ICreateUser>;
}

export interface onAddUserSubmitProps extends AddUserFormProps {
  mutateAsync: MutateFunction<ICreateUser, Error, ICreateUser>;
}

export interface SelectWrapperProps {
  name: keyof ICreateUser;
  label: string;
  field: ControllerRenderProps<ICreateUser, keyof ICreateUser>;
  enumValues?: string[];
}

export interface InputWrapperProps {
  name: keyof ICreateUser;
  label: string;
  field: React.ComponentProps<typeof Input>;
  isOptional?: boolean;
}
