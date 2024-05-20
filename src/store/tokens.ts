import { persist } from "zustand/middleware";

import { create } from "./helpers";

export interface Tokens {
  accessToken?: string;
  tokenType?: string;
}

const initialState: Tokens = {
  accessToken: '',
  tokenType: ''
}

export const useTokensStore = create<Tokens>()(
  persist(() => initialState, {
    name: "tokens",
  }),
);

export const saveTokens = (tokens: Tokens) => useTokensStore.setState(tokens);