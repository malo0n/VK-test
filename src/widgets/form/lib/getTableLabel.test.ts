import { describe, it, expect } from "vitest";
import { getTableLabel } from "../lib/getTableLabel";

describe("getTableLabel", () => {
  it("возвращает label для известных ключей", () => {
    expect(getTableLabel("firstName")).toBe("Имя");
    expect(getTableLabel("lastName")).toBe("Фамилия");
    expect(getTableLabel("email")).toBe("Электронная почта");
    expect(getTableLabel("department")).toBe("Отдел");
  });

  it("возвращает undefined для несуществующего ключа", () => {
    // @ts-expect-error: тестируем поведение с невалидным ключом
    expect(getTableLabel("unknownKey")).toBeUndefined();
  });
});
