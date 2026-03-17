import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<>Hello world</>} path="/"></Route>
      </Routes>
    </BrowserRouter>
  );
}
