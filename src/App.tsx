import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import DetailPage from "./pages/DetailPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<ProtectedRoute><ListPage/></ProtectedRoute>} />
        <Route path="/mentors/:id" element={<ProtectedRoute><DetailPage/></ProtectedRoute>} />
        <Route path = "*" element= {<p className="p-8 text-center text-slate-500">Página no encontrada</p>} />
      </Routes>
    </BrowserRouter>
  )
}