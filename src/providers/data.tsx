import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

const queryClient = new QueryClient();

queryClient.setQueryDefaults(["user"], {
  gcTime: Infinity,
});

type Props = {
  children: ReactNode;
};

export const DataProvider = ({ children }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
