import React from "react";
import { Input, Button } from "@brac/ui-library";
import { useOnboardingStore } from "@brac/store";

interface IncomeInfoStepProps {
  onNext: () => void;
  onBack: () => void;
}

export const IncomeInfoStep: React.FC<IncomeInfoStepProps> = ({
  onNext,
  onBack,
}) => {
  const { incomeInfo, updateField } = useOnboardingStore();

  const isValid =
    incomeInfo.occupation.trim() !== "" &&
    incomeInfo.monthlyIncome.trim() !== "" &&
    incomeInfo.companyName.trim() !== "";

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Income Information
        </h2>
        <p className="text-gray-500">
          Provide your employment and income details.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Occupation"
          placeholder="e.g. Software Engineer"
          value={incomeInfo.occupation}
          onChange={(e) =>
            updateField("incomeInfo", { occupation: e.target.value })
          }
        />
        <Input
          label="Monthly Income (BDT)"
          type="number"
          placeholder="Enter monthly income"
          value={incomeInfo.monthlyIncome}
          onChange={(e) =>
            updateField("incomeInfo", { monthlyIncome: e.target.value })
          }
        />
        <Input
          label="Company Name"
          placeholder="Enter company name"
          value={incomeInfo.companyName}
          onChange={(e) =>
            updateField("incomeInfo", { companyName: e.target.value })
          }
        />
      </div>

      <div className="flex justify-between">
        <Button variant="secondary" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext} disabled={!isValid}>
          Next
        </Button>
      </div>
    </div>
  );
};
