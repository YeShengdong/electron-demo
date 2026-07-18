import React from "react";
import { createRoot } from "react-dom/client";
import AppRoot from "./AppRoot";

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <AppRoot />
  </React.StrictMode>,
);
