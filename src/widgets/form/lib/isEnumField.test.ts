import { describe, it, expect } from "vitest";
import { isEnumField } from "../lib/isEnumField";


describe("isEnumField", () => {
  it("возвращает true, если поле действительно enum", () => {
    expect(isEnumField("occupation")).toBe(true);
    expect(isEnumField("department")).toBe(true);
  });

  it("возвращает false, если поле не enum", () => {
    expect(isEnumField("firstName")).toBe(false);
    expect(isEnumField("email")).toBe(false);
  });

  it("вызывает ошибку при несуществующем поле (типизация)", () => {
    // @ts-expect-error: тестируем невалидное имя поля
    expect(() => isEnumField("notAField")).toThrow();
  });
});
