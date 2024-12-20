import React from "react";
import ReactDOM from "react-dom/client";

import "./styles/normalize.css";
import "@shoelace-style/shoelace/dist/themes/light.css";
import "./styles/theme.css";

import { RouterProvider, createRouter } from "@tanstack/react-router";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

import { setBasePath } from "@shoelace-style/shoelace/dist/utilities/base-path.js";

setBasePath(
	"https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.19.1/cdn/",
);

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

ReactDOM.createRoot(document.getElementById("main") as HTMLElement).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
);
