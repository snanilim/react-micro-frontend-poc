import { create } from "zustand";
import { useNotificationStore } from "./notificationStore";

export interface LoanProduct {
  id: string;
  name: string;
  description: string;
  interestRate: number;
  minAmount: number;
  maxAmount: number;
  minTenure: number;
  maxTenure: number;
  icon: string;
}

export interface LoanPersonalInfo {
  name: string;
  phone: string;
  email: string;
  monthlyIncome: string;
  loanAmount: string;
  tenure: number;
}

export interface LoanState {
  currentStep: number;
  selectedProduct: LoanProduct | null;
  personalInfo: LoanPersonalInfo;
  isSubmitted: boolean;
}

interface LoanStore extends LoanState {
  setCurrentStep: (step: number) => void;
  selectProduct: (product: LoanProduct) => void;
  setPersonalInfo: (info: Partial<LoanPersonalInfo>) => void;
  submitLoan: () => void;
  resetLoan: () => void;
}

const initialState: LoanState = {
  currentStep: 0,
  selectedProduct: null,
  personalInfo: {
    name: "",
    phone: "",
    email: "",
    monthlyIncome: "",
    loanAmount: "",
    tenure: 12,
  },
  isSubmitted: false,
};

const STORE_KEY = "__BRAC_LOAN_STORE__";

function createLoanStore() {
  const existing = (globalThis as Record<string, unknown>)[STORE_KEY] as
    | ReturnType<typeof create<LoanStore>>
    | undefined;
  if (existing) return existing;

  const store = create<LoanStore>((set) => ({
    ...initialState,
    setCurrentStep: (step) => set({ currentStep: step }),
    selectProduct: (product) => set({ selectedProduct: product }),
    setPersonalInfo: (info) =>
      set((state) => ({
        personalInfo: { ...state.personalInfo, ...info },
      })),
    submitLoan: () => {
      const state = store.getState();
      set({ isSubmitted: true });
      useNotificationStore.getState().addNotification(
        `Loan application submitted for ${state.selectedProduct?.name || "loan"}`,
      );
    },
    resetLoan: () => set(initialState),
  }));

  (globalThis as Record<string, unknown>)[STORE_KEY] = store;
  return store;
}

export const useLoanStore = createLoanStore();
