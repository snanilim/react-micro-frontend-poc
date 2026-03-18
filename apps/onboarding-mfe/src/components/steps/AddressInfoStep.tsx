import React from "react";
import { Input, Button } from "@brac/ui-library";
import { useOnboardingStore } from "@brac/store";

interface AddressInfoStepProps {
  onNext: () => void;
  onBack: () => void;
}

export const AddressInfoStep: React.FC<AddressInfoStepProps> = ({
  onNext,
  onBack,
}) => {
  const { addressInfo, updateField } = useOnboardingStore();

  const isValid =
    addressInfo.address.trim() !== "" &&
    addressInfo.city.trim() !== "" &&
    addressInfo.district.trim() !== "" &&
    addressInfo.postalCode.trim() !== "";

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Address Information
        </h2>
        <p className="text-gray-500">Provide your current residential address.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <Input
            label="Present Address"
            placeholder="House, Road, Area"
            value={addressInfo.address}
            onChange={(e) => updateField("addressInfo",{ address: e.target.value })}
          />
        </div>
        <Input
          label="City"
          placeholder="Enter city"
          value={addressInfo.city}
          onChange={(e) => updateField("addressInfo",{ city: e.target.value })}
        />
        <Input
          label="District"
          placeholder="Enter district"
          value={addressInfo.district}
          onChange={(e) => updateField("addressInfo",{ district: e.target.value })}
        />
        <Input
          label="Postal Code"
          placeholder="Enter postal code"
          value={addressInfo.postalCode}
          onChange={(e) => updateField("addressInfo",{ postalCode: e.target.value })}
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
