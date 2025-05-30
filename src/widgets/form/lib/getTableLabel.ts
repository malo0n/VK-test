import { ICreateUser } from "@/shared/model";


export const getTableLabel = (key: keyof ICreateUser): string => {
  const labels: Record<keyof ICreateUser, string> = {
    firstName: "Имя",
    lastName: "Фамилия",
    email: "Электронная почта",
    age: "Возраст",
    city: "Город",
    country: "Страна",
    occupation: "Должность",
    phone: "Телефон",
    company: "Компания",
    salary: "Зарплата, ₽",
    department: "Отдел"
  };
  return labels[key];
}
