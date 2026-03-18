import React from "react";
import { Card, Button } from "@brac/ui-library";
import { useLoanStore } from "@brac/store";

interface LoanSummaryStepProps {
  onBack: () => void;
}

export const LoanSummaryStep: React.FC<LoanSummaryStepProps> = ({ onBack }) => {
  const { selectedProduct, personalInfo, isSubmitted, submitLoan, resetLoan } =
    useLoanStore();

  if (isSubmitted) {
    return (
      <div className="text-center py-12 space-y-4">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <svg
            className="w-10 h-10 text-green-500"
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
        </div>
        <h2 className="text-2xl font-bold text-gray-800">
          Application Submitted!
        </h2>
        <p className="text-gray-500 max-w-md mx-auto">
          Your loan application has been submitted successfully. We will review
          your application and get back to you shortly.
        </p>
        <Button variant="outline" onClick={resetLoan}>
          Apply for Another Loan
        </Button>
      </div>
    );
  }

  const loanAmount = Number(personalInfo.loanAmount) || 0;
  const interestRate = selectedProduct?.interestRate || 0;
  const tenure = personalInfo.tenure || 12;
  const totalPayable = loanAmount * (1 + (interestRate / 100) * (tenure / 12));
  const monthlyPayment = totalPayable / tenure;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Application Summary
        </h2>
        <p className="text-gray-500">
          Review your loan application before submitting.
        </p>
      </div>

      {selectedProduct && (
        <Card title="Loan Product">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-gray-500">Product</p>
              <p className="font-medium text-gray-800">
                {selectedProduct.name}
              </p>
            </div>
            <div>
              <p className="text-gray-500">Interest Rate</p>
              <p className="font-medium text-gray-800">
                {selectedProduct.interestRate}%
              </p>
            </div>
            <div>
              <p className="text-gray-500">Amount Range</p>
              <p className="font-medium text-gray-800">
                {selectedProduct.minAmount.toLocaleString()} -{" "}
                {selectedProduct.maxAmount.toLocaleString()} BDT
              </p>
            </div>
          </div>
        </Card>
      )}

      <Card title="Applicant Information">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-gray-500">Full Name</p>
            <p className="font-medium text-gray-800">{personalInfo.name}</p>
          </div>
          <div>
            <p className="text-gray-500">Phone</p>
            <p className="font-medium text-gray-800">{personalInfo.phone}</p>
          </div>
          <div>
            <p className="text-gray-500">Email</p>
            <p className="font-medium text-gray-800">{personalInfo.email}</p>
          </div>
          <div>
            <p className="text-gray-500">Monthly Income</p>
            <p className="font-medium text-gray-800">
              {Number(personalInfo.monthlyIncome).toLocaleString()} BDT
            </p>
          </div>
        </div>
      </Card>

      <Card title="Loan Calculation">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-gray-500">Loan Amount</p>
            <p className="font-medium text-gray-800">
              {loanAmount.toLocaleString()} BDT
            </p>
          </div>
          <div>
            <p className="text-gray-500">Tenure</p>
            <p className="font-medium text-gray-800">{tenure} months</p>
          </div>
          <div>
            <p className="text-gray-500">Total Payable</p>
            <p className="font-medium text-gray-800">
              {totalPayable.toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })}{" "}
              BDT
            </p>
          </div>
          <div>
            <p className="text-gray-500">Est. Monthly Payment</p>
            <p className="font-semibold text-blue-600">
              {monthlyPayment.toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })}{" "}
              BDT
            </p>
          </div>
        </div>
      </Card>

      <div className="flex justify-between">
        <Button variant="secondary" onClick={onBack}>
          Back
        </Button>
        <Button onClick={submitLoan}>Submit Application</Button>
      </div>
    </div>
  );
};
