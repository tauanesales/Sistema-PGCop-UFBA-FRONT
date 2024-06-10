import { create } from "./helpers";

interface MessagesStore {
  message: string;
}

export const useMessagesStore = create<MessagesStore>()(() => ({
  message: "",
}));

export const setMessage = (message: string) =>
  useMessagesStore.setState({ message });
