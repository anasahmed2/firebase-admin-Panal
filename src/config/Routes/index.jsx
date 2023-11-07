import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "../../screens/SignIn";
import Dashboard from "../../screens/Dashboard";

  

const AppRouter = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRouter;