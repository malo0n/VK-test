import { createUserSchema } from "@/shared/model";
import { ZodTypeAny, ZodEnum, ZodUnion } from "zod";

export function isEnumField(fieldName: keyof typeof createUserSchema._type): boolean {
  const shape = createUserSchema.shape;
  const field: ZodTypeAny = shape[fieldName];

  if (field instanceof ZodEnum) return true;

  if (field instanceof ZodUnion) {
    const options = field._def.options as ZodTypeAny[];
    return options.some(opt => opt instanceof ZodEnum);
  }

  return false;
}