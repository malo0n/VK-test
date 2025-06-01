import { useAddNewUser } from "@shared/api";
import { ICreateUser } from "@shared/model";
import { Form, FormField } from "@shared/components/ui/form";
import { fieldsConfig } from "@shared/model/fieldsConfig";
import { AddUserFormProps } from "@widgets/form/model";
import { onAddUserSubmit } from "@widgets/form/lib/onAddUserSubmit";
import { SelectWrapper } from "@widgets/form/ui/SelectWrapper";
import InputWrapper from "@widgets/form/ui/InputWrapper";

export const AddUserForm = (props: AddUserFormProps) => {
  const { setIsAddUserDialogOpen, methods } = props;
  const { mutateAsync } = useAddNewUser();

  return (
    <Form {...methods}>
      <form
        onSubmit={methods.handleSubmit(() =>
          onAddUserSubmit({ setIsAddUserDialogOpen, mutateAsync, methods })
        )}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-7 py-4"
        id="addUser"
      >
        {fieldsConfig.map(({ key, label, isEnum, enumValues, isOptional }) => {
          return (
            <FormField
              control={methods.control}
              name={key as keyof ICreateUser}
              key={key}
              render={({ field }) =>
                isEnum ? (
                  <SelectWrapper
                    name={key}
                    label={label}
                    field={field}
                    enumValues={enumValues}
                  />
                ) : (
                  <InputWrapper
                    name={key}
                    label={label}
                    field={field}
                    isOptional={isOptional}
                  />
                )
              }
            />
          );
        })}
      </form>
    </Form>
  );
};
