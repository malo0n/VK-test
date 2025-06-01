import { describe, it, expect, vi } from "vitest";
import { onAddUserSubmit } from "../lib/onAddUserSubmit";
import type { UseFormReturn } from "react-hook-form";
import type { ICreateUser } from "@shared/model";

describe("onAddUserSubmit", () => {
  function getMockMethods(): Partial<UseFormReturn<ICreateUser>> {
    return {
      getValues: vi.fn().mockReturnValue({ foo: "bar" }),
      reset: vi.fn(),
    };
  }

  it("вызывает mutateAsync, закрывает диалог и сбрасывает форму при успехе", async () => {
    const setIsAddUserDialogOpen = vi.fn();
    const mutateAsync = vi.fn().mockResolvedValue({});
    const methods = getMockMethods() as UseFormReturn<ICreateUser>;
    await onAddUserSubmit({ setIsAddUserDialogOpen, mutateAsync, methods });
    expect(mutateAsync).toHaveBeenCalledWith({ foo: "bar" });
    expect(setIsAddUserDialogOpen).toHaveBeenCalledWith(false);
    expect(methods.reset).toHaveBeenCalled();
  });

  it("логирует ошибку и не закрывает диалог/не сбрасывает форму при ошибке", async () => {
    const error = new Error("fail");
    const setIsAddUserDialogOpen = vi.fn();
    const mutateAsync = vi.fn().mockRejectedValue(error);
    const methods = getMockMethods() as UseFormReturn<ICreateUser>;
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
    await onAddUserSubmit({ setIsAddUserDialogOpen, mutateAsync, methods });
    expect(setIsAddUserDialogOpen).not.toHaveBeenCalled();
    expect(methods.reset).not.toHaveBeenCalled();
    expect(consoleError).toHaveBeenCalledWith("Error adding user:", error);
    consoleError.mockRestore();
  });
});
