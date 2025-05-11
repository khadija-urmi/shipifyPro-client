import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/LogIn";
import Register from "./pages/Register/Register";
import AuthProvider from "./AuthProvider/AuthProvider";
import router from "./route/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    < AuthProvider >
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <RouterProvider router={router} />
        </HelmetProvider>
        <Toaster position='top-right' reverseOrder={false} />
      </QueryClientProvider>
    </AuthProvider >
  </StrictMode>
);
