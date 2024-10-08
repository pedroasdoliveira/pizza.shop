import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.tsx";
import { enableMsw } from "./api/mocks/index.ts";

enableMsw().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
});
