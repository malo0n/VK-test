import { createUserSchema, ICreateUser } from "@/shared/model";
import { getTableLabel } from "@/widgets/form/lib/getTableLabel";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

const fields = createUserSchema.shape;

const columnHelper = createColumnHelper<ICreateUser>();
export const columns: ColumnDef<ICreateUser>[] = Object.entries(fields).map(([key]) =>
  columnHelper.accessor(key as keyof ICreateUser, {
    header: getTableLabel(key as keyof ICreateUser),
    cell: (info) => info.getValue(),
  })
) as ColumnDef<ICreateUser>[];
