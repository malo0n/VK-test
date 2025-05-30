import { FormItem, FormLabel, FormControl } from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { ICreateUser } from "@/shared/model";
import { getAutoCompleteValue } from "@/widgets/form/lib/getAutoCompleteValue";
import { getTableLabel } from "@/widgets/form/lib/getTableLabel";
import { InputWrapperProps } from "@/widgets/form/model";

const InputWrapper = (props: InputWrapperProps) => {
  const { name, label, field, isOptional } = props;
  return (
    <FormItem>
      <FormLabel>
        {getTableLabel(name as keyof ICreateUser)}
        {!isOptional && (
          <span className="text-red-500 text-lg leading-0">*</span>
        )}
      </FormLabel>
      <FormControl>
        <Input
          placeholder={label}
          {...field}
          autoComplete={getAutoCompleteValue(name as keyof ICreateUser)}
        />
      </FormControl>
    </FormItem>
  );
};

export default InputWrapper;
