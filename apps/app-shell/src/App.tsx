import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { Dashboard } from "./pages/Dashboard";
import { Loader } from "@brac/ui-library";

const LoanApp = lazy(() => import("loan_mfe/App"));
const OnboardingApp = lazy(() => import("onboarding_mfe/App"));

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout>
        <ErrorBoundary>
          <Suspense fallback={<Loader text="Loading module..." />}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/loan/*" element={<LoanApp />} />
              <Route path="/onboarding/*" element={<OnboardingApp />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
