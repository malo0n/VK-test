import { FormControl, FormItem, FormLabel } from "@shared/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@shared/components/ui/select";
import { ICreateUser } from "@shared/model";
import { getTableLabel } from "@widgets/form/lib/getTableLabel";
import { SelectWrapperProps } from "@widgets/form/model";

export const SelectWrapper = (props: SelectWrapperProps) => {
  const { name, label, field, enumValues } = props;

  return (
    <FormItem>
      <FormLabel>{getTableLabel(name as keyof ICreateUser)}</FormLabel>
      <Select
        onValueChange={field.onChange}
        defaultValue={field.value as string}
        value={field.value as string}
      >
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder={label} />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {enumValues?.map((enumValue) => (
            <SelectItem key={enumValue} value={enumValue}>
              {enumValue}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </FormItem>
  );
};
