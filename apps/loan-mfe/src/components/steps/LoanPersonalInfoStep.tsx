import React from "react";
import { Input, Button, Card } from "@brac/ui-library";
import { useLoanStore } from "@brac/store";

interface LoanPersonalInfoStepProps {
  onNext: () => void;
  onBack: () => void;
}

export const LoanPersonalInfoStep: React.FC<LoanPersonalInfoStepProps> = ({
  onNext,
  onBack,
}) => {
  const { personalInfo, setPersonalInfo, selectedProduct } = useLoanStore();

  const isValid =
    personalInfo.name.trim() !== "" &&
    personalInfo.phone.trim() !== "" &&
    personalInfo.email.trim() !== "" &&
    personalInfo.monthlyIncome.trim() !== "" &&
    personalInfo.loanAmount.trim() !== "" &&
    personalInfo.tenure > 0;

  return (
    <div className="space-y-6">
      {selectedProduct && (
        <Card className="bg-blue-50 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 font-medium">
                Selected Product
              </p>
              <p className="font-semibold text-gray-800">
                {selectedProduct.name}
              </p>
            </div>
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              {selectedProduct.interestRate}% Interest
            </span>
          </div>
        </Card>
      )}

      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Personal Information
        </h2>
        <p className="text-gray-500">Fill in your details for the loan application.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Full Name"
          placeholder="Enter your full name"
          value={personalInfo.name}
          onChange={(e) => setPersonalInfo({ name: e.target.value })}
        />
        <Input
          label="Phone"
          type="tel"
          placeholder="01XXXXXXXXX"
          value={personalInfo.phone}
          onChange={(e) => setPersonalInfo({ phone: e.target.value })}
        />
        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={personalInfo.email}
          onChange={(e) => setPersonalInfo({ email: e.target.value })}
        />
        <Input
          label="Monthly Income (BDT)"
          type="number"
          placeholder="Enter monthly income"
          value={personalInfo.monthlyIncome}
          onChange={(e) => setPersonalInfo({ monthlyIncome: e.target.value })}
        />
      </div>

      <div className="border-t pt-4">
        <h3 className="text-lg font-medium text-gray-800 mb-4">
          Loan Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Loan Amount (BDT)"
            type="number"
            placeholder={
              selectedProduct
                ? `${selectedProduct.minAmount.toLocaleString()} - ${selectedProduct.maxAmount.toLocaleString()}`
                : "Enter loan amount"
            }
            value={personalInfo.loanAmount}
            onChange={(e) => setPersonalInfo({ loanAmount: e.target.value })}
            helperText={
              selectedProduct
                ? `Min: ${selectedProduct.minAmount.toLocaleString()} | Max: ${selectedProduct.maxAmount.toLocaleString()} BDT`
                : undefined
            }
          />
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Loan Tenure (Months)
            </label>
            <select
              className="border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={personalInfo.tenure}
              onChange={(e) =>
                setPersonalInfo({ tenure: Number(e.target.value) })
              }
            >
              {selectedProduct &&
                Array.from(
                  {
                    length:
                      Math.floor(
                        (selectedProduct.maxTenure -
                          selectedProduct.minTenure) /
                          6,
                      ) + 1,
                  },
                  (_, i) => selectedProduct.minTenure + i * 6,
                ).map((months) => (
                  <option key={months} value={months}>
                    {months} months
                  </option>
                ))}
            </select>
            {selectedProduct && (
              <p className="text-sm text-gray-500">
                {selectedProduct.minTenure} - {selectedProduct.maxTenure} months
              </p>
            )}
          </div>
        </div>
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
