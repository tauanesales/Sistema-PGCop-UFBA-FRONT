import { createContext, useContext } from "react";

interface LoadingAPIContextData {
  showSpinner: () => void;
  hideSpinner: () => void;
}

export const LoadingAPIContext = createContext({} as LoadingAPIContextData);

export const LoadingContext = createContext(false);

export const useLoading = () => useContext(LoadingContext);

export const useLoadingAPI = () => useContext(LoadingAPIContext);
