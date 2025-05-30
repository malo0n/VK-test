
import { Button } from "@/shared/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/components/ui/dialog";
import { AddUserForm } from "@/widgets/form/AddUserForm";
import { Plus } from 'lucide-react';


export function AddUserDialog() {
  return (
    <Dialog>
      {/* Кнопка для открытия диалога добавления нового пользователя */}
      <DialogTrigger asChild>
        <Button variant="default">Добавить нового пользователя<Plus strokeWidth={2} /></Button>
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
        <AddUserForm/>
        
        {/* Кнопка для отправки формы и добавления пользователя */}
        <DialogFooter>
          <Button type="submit" form="addUser">Добавить пользователя</Button>
        </DialogFooter>
        
      </DialogContent>
    </Dialog>
  )
}
