import React from "react";
import { Card, Button } from "@brac/ui-library";
import { useOnboardingStore } from "@brac/store";

interface ReviewStepProps {
  onBack: () => void;
}

export const ReviewStep: React.FC<ReviewStepProps> = ({ onBack }) => {
  const {
    personalInfo,
    nidInfo,
    addressInfo,
    incomeInfo,
    isSubmitted,
    submitOnboarding,
    resetOnboarding,
  } = useOnboardingStore();

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
          Onboarding Complete!
        </h2>
        <p className="text-gray-500 max-w-md mx-auto">
          Your account onboarding has been submitted successfully. We will verify
          your information and activate your account shortly.
        </p>
        <Button variant="outline" onClick={resetOnboarding}>
          Start New Onboarding
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Review & Submit
        </h2>
        <p className="text-gray-500">
          Please review all your information before submitting.
        </p>
      </div>

      <Card title="Personal Information">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-gray-500">Full Name</p>
            <p className="font-medium text-gray-800">
              {personalInfo.fullName}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Date of Birth</p>
            <p className="font-medium text-gray-800">
              {personalInfo.dateOfBirth}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Phone</p>
            <p className="font-medium text-gray-800">{personalInfo.phone}</p>
          </div>
          <div>
            <p className="text-gray-500">Email</p>
            <p className="font-medium text-gray-800">{personalInfo.email}</p>
          </div>
        </div>
      </Card>

      <Card title="NID & Liveness Verification">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-2">NID Front</p>
            {nidInfo.nidFrontImage ? (
              <img
                src={nidInfo.nidFrontImage}
                alt="NID Front"
                className="w-full h-24 object-cover rounded-lg border"
              />
            ) : (
              <div className="w-full h-24 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-sm">
                Not uploaded
              </div>
            )}
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-2">NID Back</p>
            {nidInfo.nidBackImage ? (
              <img
                src={nidInfo.nidBackImage}
                alt="NID Back"
                className="w-full h-24 object-cover rounded-lg border"
              />
            ) : (
              <div className="w-full h-24 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-sm">
                Not uploaded
              </div>
            )}
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-2">Liveness</p>
            {nidInfo.faceLivenessImage ? (
              <div className="relative">
                <img
                  src={nidInfo.faceLivenessImage}
                  alt="Face"
                  className="w-full h-24 object-cover rounded-lg border"
                />
                {nidInfo.livenessVerified && (
                  <span className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full p-0.5">
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </span>
                )}
              </div>
            ) : (
              <div className="w-full h-24 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-sm">
                Not verified
              </div>
            )}
          </div>
        </div>
        <div className="mt-3 flex gap-4 text-sm">
          <span
            className={`flex items-center gap-1 ${nidInfo.nidFrontImage && nidInfo.nidBackImage ? "text-green-500" : "text-gray-400"}`}
          >
            {nidInfo.nidFrontImage && nidInfo.nidBackImage ? "NID Uploaded" : "NID Pending"}
          </span>
          <span
            className={`flex items-center gap-1 ${nidInfo.livenessVerified ? "text-green-500" : "text-gray-400"}`}
          >
            {nidInfo.livenessVerified
              ? "Liveness Verified"
              : "Liveness Pending"}
          </span>
        </div>
      </Card>

      <Card title="Address Information">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="col-span-2">
            <p className="text-gray-500">Present Address</p>
            <p className="font-medium text-gray-800">{addressInfo.address}</p>
          </div>
          <div>
            <p className="text-gray-500">City</p>
            <p className="font-medium text-gray-800">{addressInfo.city}</p>
          </div>
          <div>
            <p className="text-gray-500">District</p>
            <p className="font-medium text-gray-800">{addressInfo.district}</p>
          </div>
          <div>
            <p className="text-gray-500">Postal Code</p>
            <p className="font-medium text-gray-800">
              {addressInfo.postalCode}
            </p>
          </div>
        </div>
      </Card>

      <Card title="Income Information">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-gray-500">Occupation</p>
            <p className="font-medium text-gray-800">
              {incomeInfo.occupation}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Monthly Income</p>
            <p className="font-medium text-gray-800">
              {Number(incomeInfo.monthlyIncome).toLocaleString()} BDT
            </p>
          </div>
          <div>
            <p className="text-gray-500">Company Name</p>
            <p className="font-medium text-gray-800">
              {incomeInfo.companyName}
            </p>
          </div>
        </div>
      </Card>

      <div className="flex justify-between">
        <Button variant="secondary" onClick={onBack}>
          Back
        </Button>
        <Button onClick={submitOnboarding}>Submit Onboarding</Button>
      </div>
    </div>
  );
};
