import React from "react";
import { Stepper } from "@brac/ui-library";
import { useLoanStore } from "@brac/store";
import { ProductSelectionStep } from "./steps/ProductSelectionStep";
import { LoanPersonalInfoStep } from "./steps/LoanPersonalInfoStep";
import { LoanSummaryStep } from "./steps/LoanSummaryStep";

const STEPS = ["Select Product", "Personal Info", "Summary & Submit"];

export const LoanWizard: React.FC = () => {
  const { currentStep, setCurrentStep } = useLoanStore();

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <ProductSelectionStep onNext={() => setCurrentStep(1)} />;
      case 1:
        return (
          <LoanPersonalInfoStep
            onNext={() => setCurrentStep(2)}
            onBack={() => setCurrentStep(0)}
          />
        );
      case 2:
        return <LoanSummaryStep onBack={() => setCurrentStep(1)} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <Stepper steps={STEPS} currentStep={currentStep} />
      <div className="bg-white rounded-xl shadow p-6">{renderStep()}</div>
    </div>
  );
};
