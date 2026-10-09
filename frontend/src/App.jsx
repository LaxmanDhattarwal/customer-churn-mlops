import { BrowserRouter, Routes, Route } from "react-router-dom"

import Navbar from "./components/Navbar"

import Home from "./pages/Home"
import Predict from "./pages/Predict"
import Analytics from "./pages/Analytics"


function App() {
  return (
    <BrowserRouter>

      <div className="min-h-screen bg-slate-100">

        <Navbar />

        <Routes>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/predict"
            element={<Predict />}
          />

          <Route
            path="/analytics"
            element={<Analytics />}
          />

        </Routes>

      </div>

    </BrowserRouter>
  )
}

export default App