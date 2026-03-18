import React from "react";

interface StepperProps {
  steps: string[];
  currentStep: number;
  onStepClick?: (step: number) => void;
}

export const Stepper: React.FC<StepperProps> = ({
  steps,
  currentStep,
  onStepClick,
}) => {
  return (
    <div className="flex items-center w-full">
      {steps.map((step, index) => (
        <React.Fragment key={step}>
          <div className="flex flex-col items-center">
            <button
              type="button"
              onClick={() => onStepClick?.(index)}
              disabled={!onStepClick}
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                index < currentStep
                  ? "bg-green-500 text-white"
                  : index === currentStep
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-500"
              } ${onStepClick ? "cursor-pointer hover:opacity-80" : "cursor-default"}`}
            >
              {index < currentStep ? (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                index + 1
              )}
            </button>
            <span
              className={`mt-2 text-xs font-medium text-center max-w-[80px] ${
                index <= currentStep ? "text-blue-600" : "text-gray-400"
              }`}
            >
              {step}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`flex-1 h-0.5 mx-2 ${
                index < currentStep ? "bg-blue-600" : "bg-gray-200"
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
