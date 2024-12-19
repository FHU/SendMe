import { useMemo } from "react";

import { QraftContext, requestFn } from "@openapi-qraft/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./styles/normalize.css";
import "@shoelace-style/shoelace/dist/themes/light.css";
import "./styles/theme.css";

import { setBasePath } from "@shoelace-style/shoelace/dist/utilities/base-path.js";

setBasePath(
  "https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.19.1/cdn/"
);

export default function App() {
  const queryClient = useMemo(() => new QueryClient(), []);
  return (
    <QueryClientProvider client={queryClient}>
      <QraftContext.Provider
        value={{
          baseUrl: "/api", // base URL for all requests
          requestFn, // `requestFn(...)` will be invoked for every request
        }}
      >
        Hello
      </QraftContext.Provider>
    </QueryClientProvider>
  );
}
