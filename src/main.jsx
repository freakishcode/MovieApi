import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

import { ErrorBoundary } from "react-error-boundary";

// REACT QUERY
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a client
const queryClient = new QueryClient();

// UI Components
import Preloader from "./UI/PageLoading-Animation/LoadingAnimation.jsx";

// Error Fallback Component
import { ErrorFallback } from "./UI/ErrorFallback.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // clear all queries when retrying
        queryClient.clear(); // clears all cache
        // or selectively reset:
        // queryClient.resetQueries();
      }}
    >
      <Suspense fallback={<Preloader />}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </Suspense>
    </ErrorBoundary>
  </StrictMode>
);
