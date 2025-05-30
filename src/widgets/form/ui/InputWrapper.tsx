import { Label } from "@radix-ui/react-label";

export const InputWrapper = (props: {
  label: string;
  id: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex items-start justify-end gap-4">
      <Label htmlFor={props.id} className="w-[240px] text-right">
        {props.label}
      </Label>
      {props.children}
    </div>
  );
};
