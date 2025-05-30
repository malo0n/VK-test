import z from "zod";

export const createUserSchema = z.object({
  firstName: z.string({required_error: "Обязательное поле"}).min(1, "Обязательное поле"),
  lastName: z.string({required_error: "Обязательное поле"}).min(1, "Обязательное поле"),
  email: z.string({required_error: "Обязательное поле"}).email("Неверный формат электронной почты"),
  phone: z.string({required_error: "Обязательное поле"}).regex(/^(\+7|8)\d{10}$/, "Неверный формат телефона"),
  company: z.string({required_error: "Обязательное поле"}).min(1, "Обязательное поле"),
  age: z.number({required_error: "Обязательное поле"}).min(0, "Возраст не может быть отрицательным").optional(),
  city: z.string().min(1, "Неверный формат ввода").optional().or(z.literal("")),
  country: z.string().min(1, "Неверный формат ввода").optional().or(z.literal("")),
  occupation: z.enum([
    "Фронтенд разработчик",
    "Бэкенд разработчик",
    "UX-дизайнер",
    "Аналитик данных",
    "DevOps-инженер",
    "Менеджер проектов",
    "HR-менеджер",
    "Контент-менеджер",
    "Маркетолог",
    "Продуктовый аналитик"
  ], {message: "Неверный формат ввода"}).optional().or(z.literal("")),
  salary: z.coerce.number({invalid_type_error: "Введите число"}).positive("Зарплата должна быть положительным числом").optional().or(z.literal("")),
  department: z.enum([
    "Разработка",
    "Дизайн",
    "Аналитика",
    "Маркетинг",
    "Продажи",
    "Поддержка",
    "HR",
    "Менеджмент",
    "Инфраструктура"
  ], {message: "Неверный формат ввода"}).optional()
});

export type ICreateUser = z.infer<typeof createUserSchema>;

export interface IUser extends ICreateUser {
  id: number
}
