import React from "react";
import { LoanWizard } from "./components/LoanWizard";

const App: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Loan Application
      </h1>
      <LoanWizard />
    </div>
  );
};

export default App;
