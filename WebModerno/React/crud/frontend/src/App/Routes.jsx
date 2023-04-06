import React from "react";
import { createBrowserRouter } from "react-router-dom";

import Home from "../components/Home/Home";
import User from "../components/User/User";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/users",
    element: <User />,
  },
]);

export default router;
