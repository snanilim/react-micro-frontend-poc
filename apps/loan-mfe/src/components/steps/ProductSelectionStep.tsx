import React from "react";
import { Card, Button } from "@brac/ui-library";
import { useLoanStore } from "@brac/store";
import type { LoanProduct } from "@brac/store";
import loanProducts from "../../data/loanProducts.json";

interface ProductSelectionStepProps {
  onNext: () => void;
}

const iconMap: Record<string, React.ReactNode> = {
  user: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  home: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  car: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 17h.01M16 17h.01M5.2 17H3v-4.8l1.3-3.9A2 2 0 016.2 7h11.6a2 2 0 011.9 1.3L21 12.2V17h-2.2M8 17H16M8 17a1 1 0 11-2 0 1 1 0 012 0zm8 0a1 1 0 102 0 1 1 0 00-2 0z" />
    </svg>
  ),
  book: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
};

export const ProductSelectionStep: React.FC<ProductSelectionStepProps> = ({
  onNext,
}) => {
  const { selectedProduct, selectProduct } = useLoanStore();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Select a Loan Product
        </h2>
        <p className="text-gray-500">
          Choose the loan product that best fits your needs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {(loanProducts as LoanProduct[]).map((product) => (
          <Card
            key={product.id}
            selected={selectedProduct?.id === product.id}
            onClick={() => selectProduct(product)}
          >
            <div className="flex items-start gap-4">
              <div className="text-blue-600">
                {iconMap[product.icon] || iconMap.user}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">{product.name}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  {product.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {product.interestRate}% Interest
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Up to {(product.maxAmount / 100000).toFixed(0)}L BDT
                  </span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex justify-end">
        <Button onClick={onNext} disabled={!selectedProduct}>
          Next
        </Button>
      </div>
    </div>
  );
};
