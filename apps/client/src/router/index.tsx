import { BrowserRouter, Route, Routes } from "react-router-dom";

import DashboardLayout from "@/app/layouts/DashboardLayout";

import ProtectedRoute from "./ProtectedRoute";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<>Login</>} />

        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<>Dashboard</>} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
