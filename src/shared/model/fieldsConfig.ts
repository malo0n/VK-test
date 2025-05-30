import { ZodTypeAny, ZodObject, ZodEnum, ZodUnion, ZodRawShape, ZodOptional } from "zod";
import { createUserSchema } from "@/shared/model/types";

type FieldConfig = {
  key: keyof typeof createUserSchema._type;
  label: string;
  isEnum: boolean;
  enumValues?: string[];
  isOptional?: boolean;
};

const generateFieldConfigs = (
  schema: ZodObject<ZodRawShape>
): FieldConfig[] => {
  const shape = schema.shape;

  return Object.entries(shape).map(([key, field]) => {
    const zodField = field as ZodTypeAny;

    const label = zodField.description || key;
    let isEnum = false;
    let enumValues: string[] | undefined = undefined;
    const isOptional = zodField.isOptional()
    if (zodField instanceof ZodEnum) {
      isEnum = true;
      enumValues = zodField.options;
    }

    if (zodField instanceof ZodOptional) {
      const innerType = zodField._def.innerType;
      if (innerType instanceof ZodEnum) {
        isEnum = true;
        enumValues = innerType.options;
      } else if (innerType instanceof ZodUnion) {
        const found = innerType._def.options.find(
          (opt: ZodTypeAny) => opt instanceof ZodEnum
        );
        if (found instanceof ZodEnum) {
          isEnum = true;
          enumValues = found.options;
        }
      }
    }

    if (zodField instanceof ZodUnion) {
      const found = zodField._def.options.find(
        (opt: ZodTypeAny) => opt instanceof ZodEnum
      );
      if (found instanceof ZodEnum) {
        isEnum = true;
        enumValues = found.options;
      }
    }

    return {
      key: key as keyof typeof createUserSchema._type,
      label,
      isEnum,
      enumValues,
      isOptional,
    };
  });
};

export const fieldsConfig = generateFieldConfigs(createUserSchema);
