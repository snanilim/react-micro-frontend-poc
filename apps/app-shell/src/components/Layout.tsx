import React from "react";
import { Sidebar } from "./Sidebar";
import { useUserProfileStore } from "@brac/store";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { name } = useUserProfileStore();

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
          <button
            type="button"
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
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
            {name ? name.charAt(0).toUpperCase() : "G"}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="ml-64 pt-16 p-6 min-h-screen">{children}</main>
    </div>
  );
};
