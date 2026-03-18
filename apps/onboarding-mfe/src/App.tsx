import React from "react";
import { OnboardingWizard } from "./components/OnboardingWizard";

const App: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Account Onboarding
      </h1>
      <OnboardingWizard />
    </div>
  );
};

export default App;
