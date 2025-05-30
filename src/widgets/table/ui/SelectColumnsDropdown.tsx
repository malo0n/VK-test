import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { ICreateUser } from "@/shared/model";
import { Table } from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface SelectColumnsDropdownProps<TData> {
  table: Table<TData>;
}

export const SelectColumnsDropdown = <TData extends ICreateUser>(
  props: SelectColumnsDropdownProps<TData>
) => {
  const { table } = props;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu modal={false} onOpenChange={setIsOpen} open={isOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="ml-auto">
          Показать/скрыть столбцы
          <ChevronDown
            className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {table
          .getAllColumns()
          .filter((column) => column.getCanHide())
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onSelect={(e) => e.preventDefault()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {column.columnDef.header as string}
              </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
