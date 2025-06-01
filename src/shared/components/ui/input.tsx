import * as React from "react";

import { cn } from "@shared/lib/utils";
import { useFormContext } from "react-hook-form";
import { ICreateUser } from "@shared/model";

function Input({
  className,
  type,
  name,
  ...props
}: React.ComponentProps<"input"> & { name: keyof ICreateUser }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="flex flex-col relative w-full">
      <input
        type={type}
        data-slot="input"
        {...register(name)}
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground/70 selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          className
        )}
        {...props}
      />
      {errors[name] && (
        <p className="text-red-500 text-sm absolute top-full left-0 ">
          {errors[name].message as string}
        </p>
      )}
    </div>
  );
}

export { Input };
