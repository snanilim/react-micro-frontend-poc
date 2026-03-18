import React from "react";

interface CardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  onClick?: () => void;
  selected?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  title,
  className = "",
  onClick,
  selected = false,
}) => {
  return (
    <div
      className={`bg-white rounded-xl shadow p-6 ${selected ? "ring-2 ring-blue-600" : ""} ${onClick ? "cursor-pointer hover:shadow-lg transition-shadow" : ""} ${className}`}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") onClick();
            }
          : undefined
      }
    >
      {title && (
        <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      )}
      {children}
    </div>
  );
};
