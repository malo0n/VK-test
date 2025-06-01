import { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

export const renderWithProviders = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => {
  const queryClient = createTestQueryClient();
  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };
  return render(ui, { wrapper: Wrapper, ...options });
};
