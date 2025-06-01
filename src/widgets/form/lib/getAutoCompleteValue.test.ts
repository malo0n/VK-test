import { describe, it, expect } from "vitest";
import { getAutoCompleteValue } from "../lib/getAutoCompleteValue";
import type { ICreateUser } from "@shared/model";

describe("getAutoCompleteValue", () => {
  it("возвращает корректное значение для email", () => {
    expect(getAutoCompleteValue("email")).toBe("email");
  });

  it("возвращает корректное значение для phone", () => {
    expect(getAutoCompleteValue("phone")).toBe("tel");
  });

  it("возвращает корректное значение для firstName", () => {
    expect(getAutoCompleteValue("firstName")).toBe("given-name");
  });

  it("возвращает 'off' для неизвестного ключа (принудительно кастим)", () => {
    expect(getAutoCompleteValue("unknownKey" as keyof ICreateUser)).toBe("off");
  });
});
