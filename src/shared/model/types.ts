import { DEPARTMENTS, POSITIONS } from "@shared/model/const";
import z from "zod";


//* zod-схема определяет сущность пользователя. Изменяя схему, вы можете легко управлять формой и таблицей
//* в приложении, так как они используют эту схему для валидации и отображения данных.
//* При добавлении новых полей в схему, добавьте соответствующее обозначение названия в функциях getTableLabel и getAutoCompleteValue

//* Метод .describe() в данном контексте используется для добавления описания к полям схемы и плейсхолдеров в инпутах.

export const createUserSchema = z.object({
  firstName: z.string({required_error: "Обязательное поле"}).min(1, "Обязательное поле").describe("Иван"),
  lastName: z.string({required_error: "Обязательное поле"}).min(1, "Обязательное поле").describe("Иванов"),
  email: z.string({required_error: "Обязательное поле"}).email("Неверный формат электронной почты").describe("example@mail.ru"),
  phone: z.string({required_error: "Обязательное поле"}).regex(/^(\+7|8)\d{10}$/, "Неверный формат телефона").describe("8(888)888-88-88"),
  company: z.string({required_error: "Обязательное поле"}).min(1, "Обязательное поле").describe("ВКонтакте"),
  age: z.number({required_error: "Обязательное поле", coerce: true},).min(0, "Возраст не может быть отрицательным").optional().describe("32"),
  city: z.string().min(1, "Неверный формат ввода").optional().or(z.literal("")).describe("Москва"),
  country: z.string().min(1, "Неверный формат ввода").optional().or(z.literal("")).describe("Россия"),
  occupation: z.enum(POSITIONS, {message: "Неверный формат ввода"}).describe("Фронтенд разработчик").optional(),
  department: z.enum(DEPARTMENTS, {message: "Неверный формат ввода"}).describe("Разработка").optional(),
  salary: z.coerce.number({invalid_type_error: "Введите число"}).positive("Зарплата должна быть положительным числом").optional().or(z.literal("")).describe("100000"),
});

export type ICreateUser = z.infer<typeof createUserSchema>;

export interface IUser extends ICreateUser {
  id: number
}

