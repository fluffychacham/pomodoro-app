import React from "react";
import "antd/dist/antd.less";
import { AppRoutes } from "@/routes";
import { BrowserRouter } from "react-router-dom";
import { AppLoader } from "@/components";

function App() {
  return (
    <AppLoader>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AppLoader>
  );
}

export default App;
