import React, { useState, useRef, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { useUserProfileStore, useNotificationStore } from "@brac/store";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { name, email, phone, isOnboarded, logout } = useUserProfileStore();
  const { notifications, markAllRead, clearAll } = useNotificationStore();
  const unreadCount = notifications.filter((n) => !n.read).length;
  const [showNotif, setShowNotif] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node))
        setShowNotif(false);
      if (userRef.current && !userRef.current.contains(e.target as Node))
        setShowUser(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />

      {/* Header */}
      <header className="fixed top-0 left-64 right-0 h-16 bg-white shadow-sm z-10 flex items-center justify-between px-6">
        <div>
          <h2 className="text-sm text-gray-500">Welcome back,</h2>
          <p className="text-sm font-semibold text-gray-800">
            {name || "Guest User"}
          </p>
        </div>
        <div className="flex items-center gap-4">
          {/* Notification dropdown */}
          <div ref={notifRef} className="relative">
            <button
              type="button"
              onClick={() => {
                setShowNotif(!showNotif);
                setShowUser(false);
              }}
              className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full text-white text-[10px] flex items-center justify-center font-bold">
                  {unreadCount}
                </span>
              )}
            </button>
            {showNotif && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-20">
                <div className="flex items-center justify-between px-4 py-1">
                  <p className="text-xs font-semibold text-gray-400 uppercase">
                    Notifications
                  </p>
                  {notifications.length > 0 && (
                    <div className="flex gap-2">
                      {unreadCount > 0 && (
                        <button
                          type="button"
                          onClick={markAllRead}
                          className="text-[10px] text-blue-600 hover:underline"
                        >
                          Mark all read
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={clearAll}
                        className="text-[10px] text-red-500 hover:underline"
                      >
                        Clear
                      </button>
                    </div>
                  )}
                </div>
                {notifications.length === 0 ? (
                  <p className="px-4 py-4 text-sm text-gray-400 text-center">
                    No notifications yet
                  </p>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`px-4 py-2 text-sm hover:bg-gray-50 ${n.read ? "text-gray-400" : "text-gray-700 font-medium"}`}
                    >
                      {n.message}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* User dropdown */}
          <div ref={userRef} className="relative">
            <button
              type="button"
              onClick={() => {
                setShowUser(!showUser);
                setShowNotif(false);
              }}
              className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium"
            >
              {name ? name.charAt(0).toUpperCase() : "G"}
            </button>
            {showUser && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-100 py-3 z-20">
                <div className="px-4 pb-3 border-b border-gray-100">
                  <p className="text-sm font-semibold text-gray-800">
                    {name || "Guest User"}
                  </p>
                  {email && (
                    <p className="text-xs text-gray-500 mt-0.5">{email}</p>
                  )}
                  {phone && (
                    <p className="text-xs text-gray-500 mt-0.5">{phone}</p>
                  )}
                  <span
                    className={`inline-block mt-1.5 text-[10px] font-medium px-2 py-0.5 rounded-full ${isOnboarded ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}
                  >
                    {isOnboarded ? "Onboarded" : "Not Onboarded"}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={logout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 mt-1"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="ml-64 pt-16 p-6 min-h-screen">{children}</main>
    </div>
  );
};
