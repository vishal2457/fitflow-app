import { create } from "zustand";
import { Storage } from "../utils/storage/storage";
import { createSelectors } from "../utils/create-selector";
import { User } from "../types/user";
import { client } from "../api";

interface AuthState {
  token: string | null;
  status: "idle" | "signOut" | "signIn";
  user: User | null;
  signIn: (data: string) => void;
  setUser: (user: User) => void;
  signOut: () => void;
  hydrate: (fresh?: boolean) => void;
}

const _useAuth = create<AuthState>((set, get) => ({
  status: "idle",
  token: null,
  user: null,
  signIn: (token) => {
    Storage.set("token", token);
    set({ status: "signIn", token });
  },
  signOut: () => {
    Storage.remove("token");
    Storage.remove("user");
    set({ status: "signOut", token: null });
  },
  setUser: (user) => {
    Storage.set("user", user);
    set({ ...get(), user });
  },

  hydrate: async (fresh = false) => {
    try {
      const userToken = await Storage.get("token");

      if (userToken !== null) {
        if (fresh) {
          const { data } = await client.get("/member/me");
          get().setUser(data.data);
        } else {
          const user = await Storage.get("user");
          get().setUser(user);
        }

        get().signIn(userToken);
      } else {
        get().signOut();
      }
    } catch (e) {
      // catch error here
      // Maybe sign_out user!
    }
  },
}));

export const useAuth = createSelectors(_useAuth);

export const signOut = () => _useAuth.getState().signOut();
export const signIn = (token: string) => _useAuth.getState().signIn(token);
export const hydrateAuth = () => _useAuth.getState().hydrate();
