import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";
import { persist } from "zustand/middleware";

const useUserStore = create(
  devtools(
    persist(
      immer((set) => ({
        user: {
            jwt: "null",
        },

        setJwtToken: (token) => {
            set((state) => {
                state.user.jwt = token;
            });
        },
      })),
      {
        name: "user",
        getStorage: () => localStorage,
      },
    ),
  ),
);

export default useUserStore;
