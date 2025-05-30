import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { createUserSchema, ICreateUser } from "@/shared/model";
import { AddUserForm } from "@/widgets/form/AddUserForm";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export function AddUserDialog() {
  const methods = useForm<ICreateUser>({
    resolver: zodResolver(createUserSchema),
  });
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);

  return (
    <Dialog open={isAddUserDialogOpen} onOpenChange={setIsAddUserDialogOpen}>
      {/* Кнопка для открытия диалога добавления нового пользователя */}
      <DialogTrigger asChild>
        <Button variant="default">
          Добавить нового пользователя
          <Plus strokeWidth={2} />
        </Button>
      </DialogTrigger>

      <DialogContent>
        {/* Заголовок и описание модального окна */}
        <DialogHeader>
          <DialogTitle>Добавить нового пользователя</DialogTitle>
          <DialogDescription>
            Введите данные нового пользователя, чтобы добавить его в систему.
          </DialogDescription>
        </DialogHeader>

        {/* Форма добавления нового пользователя в таблицу */}
        <AddUserForm
          setIsAddUserDialogOpen={setIsAddUserDialogOpen}
          methods={methods}
        />

        {/* Кнопка для отправки формы и добавления пользователя */}
        <DialogFooter>
          <Button form="addUser" disabled={!methods.formState.isValid}>
            Добавить пользователя
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
