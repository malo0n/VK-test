import { createUserSchema } from "@shared/model";
import { ZodTypeAny, ZodEnum, ZodUnion } from "zod";

export function isEnumField(fieldName: keyof typeof createUserSchema._type): boolean {
  const shape = createUserSchema.shape;
  const field: ZodTypeAny = shape[fieldName];

  function checkForEnum(zodType: ZodTypeAny): boolean {
    if (zodType instanceof ZodEnum) return true;

    if (zodType instanceof ZodUnion) {
      const options = zodType._def.options as ZodTypeAny[];
      return options.some(opt => checkForEnum(opt));
    }

    // Check for other nested types that might contain enums
    if (zodType._def?.innerType) {
      return checkForEnum(zodType._def.innerType);
    }

    if (zodType._def?.type) {
      return checkForEnum(zodType._def.type);
    }

    return false;
  }

  return checkForEnum(field);
}
