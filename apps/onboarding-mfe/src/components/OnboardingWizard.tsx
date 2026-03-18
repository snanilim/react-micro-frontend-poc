import React from "react";
import { Stepper } from "@brac/ui-library";
import { useOnboardingStore } from "@brac/store";
import { PersonalInfoStep } from "./steps/PersonalInfoStep";
import { AddressInfoStep } from "./steps/AddressInfoStep";
import { IncomeInfoStep } from "./steps/IncomeInfoStep";
import { ReviewStep } from "./steps/ReviewStep";

const STEPS = ["Personal Info & KYC", "Address Info", "Income Info", "Review & Submit"];

export const OnboardingWizard: React.FC = () => {
  const { currentStep, setCurrentStep } = useOnboardingStore();

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <PersonalInfoStep onNext={() => setCurrentStep(1)} />;
      case 1:
        return (
          <AddressInfoStep
            onNext={() => setCurrentStep(2)}
            onBack={() => setCurrentStep(0)}
          />
        );
      case 2:
        return (
          <IncomeInfoStep
            onNext={() => setCurrentStep(3)}
            onBack={() => setCurrentStep(1)}
          />
        );
      case 3:
        return <ReviewStep onBack={() => setCurrentStep(2)} />;
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
