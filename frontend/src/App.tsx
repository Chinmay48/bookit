import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Details from "./pages/Details"; 
import "./App.css";
import React from "react";

import Checkout from "./pages/Checkout";
import Confirmation from "./pages/Result";
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div>
    
    {children}
    
    </div>;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>

        <Home />
      </Layout>
    ),
  },
  {
    path: "/details/:id", // ✅ Add route for details page
    element: (
      <Layout>
       
        <Details />
      </Layout>
    ),
  },
  {
    path: "/checkout",
    element: (
      <Layout>
        <Checkout />
      </Layout>
    ),
  },
  {
  path: "/confirmation",
  element: (
    <Layout>
      <Confirmation />
    </Layout>
  ),
}

]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
