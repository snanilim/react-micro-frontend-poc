import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button } from "@brac/ui-library";
import { useOnboardingStore, useLoanStore } from "@brac/store";

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { isSubmitted: onboardingSubmitted, currentStep: onboardingStep } =
    useOnboardingStore();
  const { isSubmitted: loanSubmitted, currentStep: loanStep } = useLoanStore();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500 mt-1">
          Overview of your banking activities
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">Onboarding Status</p>
              <p className="text-lg font-semibold text-gray-800">
                {onboardingSubmitted
                  ? "Completed"
                  : onboardingStep > 0
                    ? `Step ${onboardingStep + 1} of 4`
                    : "Not Started"}
              </p>
            </div>
          </div>
          {onboardingSubmitted && (
            <div className="mt-3 flex items-center gap-1 text-sm text-green-500">
              <svg
                className="w-4 h-4"
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
              Account verified
            </div>
          )}
        </Card>

        <Card>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">Loan Applications</p>
              <p className="text-lg font-semibold text-gray-800">
                {loanSubmitted
                  ? "1 Active"
                  : loanStep > 0
                    ? `Step ${loanStep + 1} of 3`
                    : "Not Started"}
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">Account Status</p>
              <p className="text-lg font-semibold text-gray-800">
                {onboardingSubmitted ? "Active" : "Pending"}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card title="Quick Actions">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-800">Start Onboarding</p>
              <p className="text-sm text-gray-500">
                Complete your account setup
              </p>
            </div>
            <Button
              size="sm"
              onClick={() => navigate("/onboarding")}
              variant={onboardingSubmitted ? "secondary" : "primary"}
            >
              {onboardingSubmitted ? "View" : "Start"}
            </Button>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-800">Apply for Loan</p>
              <p className="text-sm text-gray-500">
                Browse loan products
              </p>
            </div>
            <Button size="sm" onClick={() => navigate("/loan")}>
              Apply
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
