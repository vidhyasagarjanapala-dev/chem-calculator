import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Molarity from "./pages/Molarity";
import MolarMass from "./pages/MolarMass";
import Dilution from "./pages/Dilution";
import Ph from "./pages/Ph";
import History from "./pages/History";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/molarity"
          element={
            <ProtectedRoute>
              <Molarity />
            </ProtectedRoute>
          }
        />

        <Route
          path="/molarmass"
          element={
            <ProtectedRoute>
              <MolarMass />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dilution"
          element={
            <ProtectedRoute>
              <Dilution />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ph"
          element={
            <ProtectedRoute>
              <Ph />
            </ProtectedRoute>
          }
        />

        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}