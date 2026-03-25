import { create, type StoreApi, type UseBoundStore } from "zustand";

export interface Notification {
  id: string;
  message: string;
  read: boolean;
  timestamp: number;
}

interface NotificationStore {
  notifications: Notification[];
  addNotification: (message: string) => void;
  markAllRead: () => void;
  clearAll: () => void;
  unreadCount: () => number;
}

type NotificationBoundStore = UseBoundStore<StoreApi<NotificationStore>>;

const STORE_KEY = "__BRAC_NOTIFICATION_STORE__";

function createNotificationStore(): NotificationBoundStore {
  const globalStore = globalThis as unknown as Record<string, NotificationBoundStore>;
  if (globalStore[STORE_KEY]) return globalStore[STORE_KEY];

  const store = create<NotificationStore>((set, get) => ({
    notifications: [],
    addNotification: (message) =>
      set((state) => ({
        notifications: [
          {
            id: Date.now().toString(),
            message,
            read: false,
            timestamp: Date.now(),
          },
          ...state.notifications,
        ],
      })),
    markAllRead: () =>
      set((state) => ({
        notifications: state.notifications.map((n) => ({ ...n, read: true })),
      })),
    clearAll: () => set({ notifications: [] }),
    unreadCount: () => get().notifications.filter((n) => !n.read).length,
  }));

  globalStore[STORE_KEY] = store;
  return store;
}

export const useNotificationStore = createNotificationStore();
