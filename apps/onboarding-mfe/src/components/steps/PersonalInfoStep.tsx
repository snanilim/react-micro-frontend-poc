import React, { useCallback } from "react";
import { Input, Button, FileUploader, CameraPreview } from "@brac/ui-library";
import { useOnboardingStore } from "@brac/store";

interface PersonalInfoStepProps {
  onNext: () => void;
}

export const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({
  onNext,
}) => {
  const { personalInfo, nidInfo, updateField } = useOnboardingStore();

  const handleNIDFront = useCallback(
    (file: File | null) => {
      if (!file) {
        updateField("nidInfo",{ nidFrontImage: null });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        updateField("nidInfo",{ nidFrontImage: reader.result as string });
      };
      reader.readAsDataURL(file);
    },
    [updateField],
  );

  const handleNIDBack = useCallback(
    (file: File | null) => {
      if (!file) {
        updateField("nidInfo",{ nidBackImage: null });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        updateField("nidInfo",{ nidBackImage: reader.result as string });
      };
      reader.readAsDataURL(file);
    },
    [updateField],
  );

  const handleLivenessCapture = useCallback(
    (imageSrc: string) => {
      updateField("nidInfo",{ faceLivenessImage: imageSrc, livenessVerified: true });
    },
    [updateField],
  );

  const isPersonalInfoValid =
    personalInfo.fullName.trim() !== "" &&
    personalInfo.dateOfBirth.trim() !== "" &&
    personalInfo.phone.trim() !== "" &&
    personalInfo.email.trim() !== "";

  const isNIDValid = !!nidInfo.nidFrontImage && !!nidInfo.nidBackImage;
  const isLivenessValid = nidInfo.livenessVerified;
  const isValid = isPersonalInfoValid && isNIDValid && isLivenessValid;

  return (
    <div className="space-y-8">
      {/* Personal Information */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Personal Information
        </h2>
        <p className="text-gray-500 mb-4">
          Please provide your basic personal details.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Full Name"
            placeholder="Enter your full name"
            value={personalInfo.fullName}
            onChange={(e) => updateField("personalInfo",{ fullName: e.target.value })}
          />
          <Input
            label="Date of Birth"
            type="date"
            value={personalInfo.dateOfBirth}
            onChange={(e) => updateField("personalInfo",{ dateOfBirth: e.target.value })}
          />
          <Input
            label="Phone"
            type="tel"
            placeholder="01XXXXXXXXX"
            value={personalInfo.phone}
            onChange={(e) => updateField("personalInfo",{ phone: e.target.value })}
          />
          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={personalInfo.email}
            onChange={(e) => updateField("personalInfo",{ email: e.target.value })}
          />
        </div>
      </div>

      {/* NID Upload */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          NID Verification
        </h2>
        <p className="text-gray-500 mb-4">
          Upload front and back images of your National ID card.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FileUploader
            label="NID Front"
            accept="image/*"
            onChange={handleNIDFront}
            preview={nidInfo.nidFrontImage}
          />
          <FileUploader
            label="NID Back"
            accept="image/*"
            onChange={handleNIDBack}
            preview={nidInfo.nidBackImage}
          />
        </div>
      </div>

      {/* Face Liveness */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Face Liveness Verification
        </h2>
        <p className="text-gray-500 mb-4">
          Take a photo for identity verification. The system will verify your
          liveness automatically.
        </p>
        <CameraPreview
          onCapture={handleLivenessCapture}
          capturedImage={nidInfo.faceLivenessImage}
        />
      </div>

      {/* Navigation */}
      <div className="flex justify-end">
        <Button onClick={onNext} disabled={!isValid}>
          Next
        </Button>
      </div>

      {!isValid && (
        <p className="text-sm text-gray-400 text-right">
          Please complete all fields, upload NID images, and verify liveness to
          proceed.
        </p>
      )}
    </div>
  );
};
