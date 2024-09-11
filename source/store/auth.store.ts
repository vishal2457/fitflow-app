import { create } from "zustand";
import { Storage } from "../utils/storage/storage";
import { createSelectors } from "../utils/create-selector";
import { User } from "../types/user";

interface AuthState {
  token: string | null;
  status: "idle" | "signOut" | "signIn";
  user: User | null;
  signIn: (data: string, user: User) => void;
  setUser: (user: User) => void;
  signOut: () => void;
  hydrate: () => void;
}

const _useAuth = create<AuthState>((set, get) => ({
  status: "idle",
  token: null,
  user: null,
  signIn: (token, user) => {
    Storage.set("token", token);
    Storage.set("user", user);
    set({ status: "signIn", token, user });
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

  hydrate: async () => {
    try {
      const userToken = await Storage.get("token");
      const user = await Storage.get("user");
      if (userToken !== null && user !== null) {
        get().signIn(userToken, user);
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
export const signIn = (token: string, user: User) =>
  _useAuth.getState().signIn(token, user);
export const hydrateAuth = () => _useAuth.getState().hydrate();
