import { submitAddUserForm } from "@/widgets/form/lib/submitAddUserForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { getTableLabel } from "@/widgets/form/lib/getTableLabel";
import { useAddNewUser } from "@/shared/api";
import { Input } from "@/shared/components/ui/input";
import { ICreateUser } from "@/shared/model";
import { createUserSchema } from "@/shared/model/types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/shared/components/ui/form";
import { getAutoCompleteValue } from "@/widgets/form/lib/getAutoCompleteValue";
import { isEnumField } from "@/widgets/form/lib/isEnumField";

export const AddUserForm = () => {
  const methods = useForm<ICreateUser>({
    resolver: zodResolver(createUserSchema),
  });
  const fields = createUserSchema.shape;
  const { handleSubmit } = methods;

  const { mutateAsync } = useAddNewUser();
  return (
    <Form {...methods}>
      <form
        onSubmit={handleSubmit(
          (data) => submitAddUserForm(data, mutateAsync),
          (errors) => console.log(errors)
        )}
        className="grid grid-cols-2 gap-7 py-4"
        id="addUser"
      >
        {Object.entries(fields).map(([key, value]) => {
          return (
            <FormField
              control={methods.control}
              name={key as keyof ICreateUser}
              key={key}
              render={({ field }) =>
                isEnumField(key as keyof ICreateUser) ? (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a verified email to display" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="m@example.com">
                          m@example.com
                        </SelectItem>
                        <SelectItem value="m@google.com">
                          m@google.com
                        </SelectItem>
                        <SelectItem value="m@support.com">
                          m@support.com
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      You can manage email addresses in your{" "}
                      <Link href="/examples/forms">email settings</Link>.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                ) : (
                  <FormItem>
                    <FormLabel>
                      {getTableLabel(key as keyof ICreateUser)}
                      {!value.isOptional() && (
                        <span className="text-red-500 text-lg leading-0">
                          *
                        </span>
                      )}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={value.description}
                        {...field}
                        autoComplete={getAutoCompleteValue(
                          key as keyof ICreateUser
                        )}
                      />
                    </FormControl>
                  </FormItem>
                )
              }
            />
          );
        })}
      </form>
    </Form>
  );
};
