import { create, type StoreApi, type UseBoundStore } from "zustand";
import { useUserProfileStore } from "./userProfileStore";
import { useNotificationStore } from "./notificationStore";

export interface PersonalInfo {
  fullName: string;
  dateOfBirth: string;
  phone: string;
  email: string;
}

export interface NIDInfo {
  nidFrontImage: string | null;
  nidBackImage: string | null;
  faceLivenessImage: string | null;
  livenessVerified: boolean;
}

export interface AddressInfo {
  address: string;
  city: string;
  district: string;
  postalCode: string;
}

export interface IncomeInfo {
  occupation: string;
  monthlyIncome: string;
  companyName: string;
}

export interface OnboardingState {
  currentStep: number;
  personalInfo: PersonalInfo;
  nidInfo: NIDInfo;
  addressInfo: AddressInfo;
  incomeInfo: IncomeInfo;
  isSubmitted: boolean;
}

interface UpdatableFields {
  personalInfo: PersonalInfo;
  nidInfo: NIDInfo;
  addressInfo: AddressInfo;
  incomeInfo: IncomeInfo;
}

interface OnboardingStore extends OnboardingState {
  setCurrentStep: (step: number) => void;
  // setPersonalInfo: (info: Partial<PersonalInfo>) => void;
  // setNIDInfo: (info: Partial<NIDInfo>) => void;
  // setAddressInfo: (info: Partial<AddressInfo>) => void;
  // setIncomeInfo: (info: Partial<IncomeInfo>) => void;
  updateField: <K extends keyof UpdatableFields>(
    field: K,
    info: Partial<UpdatableFields[K]>,
  ) => void;
  submitOnboarding: () => void;
  resetOnboarding: () => void;
}

const initialState: OnboardingState = {
  currentStep: 0,
  // previousStep: 0,
  personalInfo: {
    fullName: "",
    dateOfBirth: "",
    phone: "",
    email: "",
  },
  nidInfo: {
    nidFrontImage: null,
    nidBackImage: null,
    faceLivenessImage: null,
    livenessVerified: false,
  },
  addressInfo: {
    address: "",
    city: "",
    district: "",
    postalCode: "",
  },
  incomeInfo: {
    occupation: "",
    monthlyIncome: "",
    companyName: "",
  },
  isSubmitted: false,
};

const STORE_KEY = "__BRAC_ONBOARDING_STORE__";

type OnboardingBoundStore = UseBoundStore<StoreApi<OnboardingStore>>;

function createOnboardingStore(): OnboardingBoundStore {
  const globalStore = globalThis as unknown as Record<string, OnboardingBoundStore>;
  if (globalStore[STORE_KEY]) return globalStore[STORE_KEY];

  const store = create<OnboardingStore>((set) => ({
    ...initialState,
    setCurrentStep: (step) => set({ currentStep: step }),
    // setPersonalInfo: (info) =>
    //   set((state) => ({
    //     personalInfo: { ...state.personalInfo, ...info },
    //   })),
    // setNIDInfo: (info) =>
    //   set((state) => ({
    //     nidInfo: { ...state.nidInfo, ...info },
    //   })),
    // setAddressInfo: (info) =>
    //   set((state) => ({
    //     addressInfo: { ...state.addressInfo, ...info },
    //   })),
    // setIncomeInfo: (info) =>
    //   set((state) => ({
    //     incomeInfo: { ...state.incomeInfo, ...info },
    //   })),
    updateField: (field, info) =>
      set((state) => ({
        [field]: { ...state[field], ...info },
      })),
    submitOnboarding: () => {
      const state = store.getState();
      useUserProfileStore.getState().login({
        name: state.personalInfo.fullName,
        email: state.personalInfo.email,
        phone: state.personalInfo.phone,
        isOnboarded: true,
      });
      set({ isSubmitted: true });
      useNotificationStore.getState().addNotification(
        `Onboarding completed for ${state.personalInfo.fullName}`,
      );
    },
    resetOnboarding: () => set(initialState),
  }));

  globalStore[STORE_KEY] = store;
  return store;
}

export const useOnboardingStore = createOnboardingStore();
