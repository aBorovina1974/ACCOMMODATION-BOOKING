import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.scss";
import AccommodationsContextProvider from "./contexts/accommodations-context.tsx";
import DateContextProvider from "./contexts/filter-context.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <DateContextProvider>
      <AccommodationsContextProvider>
        <App />
      </AccommodationsContextProvider>
    </DateContextProvider>
  </React.StrictMode>
);
