import { describe, expect, it, vi } from "vitest";
import { screen, waitFor, within } from "@testing-library/react";
import { AddUserDialog } from "@app/ui/AddUserDialog";
import "@testing-library/jest-dom/vitest";
import { renderWithProviders } from "@shared/lib/test-utils";
import userEvent from "@testing-library/user-event";

const postMock = vi.hoisted(vi.fn);
vi.mock("@/shared/api/config", () => ({
  client: {
    post: postMock,
  },
}));

describe("AddUserDialogComponent", () => {
  it("отображает заголовок", () => {
    renderWithProviders(<AddUserDialog />);
    expect(
      screen.getByText("Добавить нового пользователя")
    ).toBeInTheDocument();
  });

  it("отображает кнопку для открытия диалога", () => {
    renderWithProviders(<AddUserDialog />);
    expect(
      screen.getByRole("button", { name: "Добавить нового пользователя" })
    ).toBeInTheDocument();
  });

  it("открывает модальное окно", async () => {
    renderWithProviders(<AddUserDialog />);
    const openButton = screen.getByRole("button", {
      name: "Добавить нового пользователя",
    });
    await userEvent.click(openButton);
    expect(screen.getByText("Добавить пользователя")).toBeVisible();
    expect(
      screen.getByText(
        "Введите данные нового пользователя, чтобы добавить его в систему."
      )
    ).toBeVisible();
  });

  it("кнопка отправки формы неактивна при пустых данных", async () => {
    renderWithProviders(<AddUserDialog />);
    const openButton = screen.getByRole("button", {
      name: "Добавить нового пользователя",
    });
    await userEvent.click(openButton);
    expect(
      screen.getByRole("button", { name: "Добавить пользователя" })
    ).toBeDisabled();
  });

  it("кнопка отправки формы активна при валидных обязательных полях", async () => {
    renderWithProviders(<AddUserDialog />);
    const openButton = screen.getByRole("button", {
      name: "Добавить нового пользователя",
    });
    await userEvent.click(openButton);
    const modal = screen.getByRole("dialog");

    await userEvent.type(within(modal).getByLabelText(/Имя/i), "Василий");
    await userEvent.type(within(modal).getByLabelText(/Фамилия/i), "Васильев");
    await userEvent.type(
      within(modal).getByLabelText(/Компания/i),
      "ВКонтакте"
    );
    await userEvent.type(
      within(modal).getByLabelText(/Электронная почта/i),
      "vasiliy@example.com"
    );
    await userEvent.type(
      within(modal).getByLabelText(/Телефон/i),
      "88005553535"
    );

    const submitButton = within(modal).getByRole("button", {
      name: "Добавить пользователя",
    });
    expect(submitButton).toBeEnabled();
  });

  it("отправка данных", async () => {
    postMock.mockClear();
    postMock.mockResolvedValue({ status: 201, data: {} });

    renderWithProviders(<AddUserDialog />);
    const openButton = screen.getByRole("button", {
      name: "Добавить нового пользователя",
    });
    await userEvent.click(openButton);
    const modal = screen.getByRole("dialog");

    await userEvent.type(within(modal).getByLabelText(/Имя/i), "Василий");
    await userEvent.type(within(modal).getByLabelText(/Фамилия/i), "Васильев");
    await userEvent.type(
      within(modal).getByLabelText(/Компания/i),
      "ВКонтакте"
    );
    await userEvent.type(
      within(modal).getByLabelText(/Электронная почта/i),
      "vasiliy@example.com"
    );
    await userEvent.type(
      within(modal).getByLabelText(/Телефон/i),
      "88005553534"
    );

    const submitButton = within(modal).getByRole("button", {
      name: "Добавить пользователя",
    });
    expect(submitButton).toBeEnabled();
    await userEvent.click(submitButton);

    postMock.mockResolvedValue({ status: 201, data: {} });

    await waitFor(() => {
      expect(postMock).toHaveBeenCalledWith("/employees", {
        firstName: "Василий",
        lastName: "Васильев",
        company: "ВКонтакте",
        email: "vasiliy@example.com",
        phone: "88005553534",
      });
    });
  });
});
