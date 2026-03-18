import { create, type StoreApi, type UseBoundStore } from "zustand";

export interface UserProfile {
  id: string | null;
  name: string;
  email: string;
  phone: string;
  isOnboarded: boolean;
  isAuthenticated: boolean;
}

interface UserProfileStore extends UserProfile {
  setProfile: (profile: Partial<UserProfile>) => void;
  login: (profile: Partial<UserProfile>) => void;
  logout: () => void;
}

type UserProfileBoundStore = UseBoundStore<StoreApi<UserProfileStore>>;

const initialState: UserProfile = {
  id: null,
  name: "",
  email: "",
  phone: "",
  isOnboarded: false,
  isAuthenticated: false,
};

const STORE_KEY = "__BRAC_USER_PROFILE_STORE__";

function createUserProfileStore(): UserProfileBoundStore {
  const existing = (globalThis as Record<string, unknown>)[STORE_KEY] as
    | UserProfileBoundStore
    | undefined;

  console.log("existing", existing);

  if (existing) return existing;

  const store = create<UserProfileStore>((set) => ({
    ...initialState,
    setProfile: (profile) => set((state) => ({ ...state, ...profile })),
    login: (profile) =>
      set((state) => ({ ...state, ...profile, isAuthenticated: true })),
    logout: () => set(initialState),
  }));

  // console.log("store", store);

  (globalThis as Record<string, unknown>)[STORE_KEY] = store;
  return store;
}

export const useUserProfileStore = createUserProfileStore();
