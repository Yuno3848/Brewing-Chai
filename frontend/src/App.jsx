import React from "react";
import { RouterProvider } from "react-router";
import Routes from "./routes";

const App = () => {
  return <RouterProvider router={Routes} />;
};

export default App;
