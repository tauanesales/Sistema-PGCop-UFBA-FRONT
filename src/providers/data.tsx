import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { isAxiosError } from "axios";
import { ReactNode } from "react";

import { resetAllStores } from "@/store/helpers";
import { setMessage } from "@/store/messages";

const handleError = (error: Error) => {
  let message = "Ocoreu um erro inesperado";

  if (isAxiosError(error) && error.response?.data) {
    if (error.response?.status === 401) {
      resetAllStores();
      queryClient.clear();
      message = "Sua sessão expirou";
    }

    const { detail } = error.response.data;

    if (Array.isArray(detail)) {
      message = detail[0].msg;
    } else if (typeof detail === "string") {
      message = detail;
    }
  }
  setMessage(message);
};

const queryCache = new QueryCache({
  onError: (error) => handleError(error),
});

const mutationCache = new MutationCache({
  onError: (error, _variables, _context, mutation) => {
    if (!mutation.options.onError) {
      handleError(error);
    }
  },
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) =>
        isAxiosError(error) && error.response?.status
          ? error.response?.status >= 500 && failureCount <= 3
          : false,
    },
  },
  mutationCache,
  queryCache,
});

queryClient.setQueryDefaults(["user"], {
  gcTime: Infinity,
});

type Props = {
  children: ReactNode;
};

export const DataProvider = ({ children }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
