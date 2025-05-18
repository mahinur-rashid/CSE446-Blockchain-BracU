import { EthProvider } from "./contexts/EthContext";
import { Routes, Route } from "react-router-dom";
import UserManager from "./pages/UserManager";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Nav from "./pages/Nav";
import UserProfile from "./pages/userProfile";
import Logout from "./pages/Logout";
import DefautHandler from "./pages/DefaultHandler";
import ReportUser from "./pages/ReportUser";
import ReportManager from "./pages/ReportManager";
import InvestigationManager from "./pages/InvestigationManager";
import AllocateInvestigator from "./pages/AllocateInvestigator";
import TransferFunds from "./pages/TransferFunds";

function App() {
  return (
    <EthProvider>
      <Nav />
      <Routes>
        <Route path="signup" element={<SignUp />} />
        <Route path="login" element={<Login />} />
        <Route path="userManager" element={<UserManager />} />
        <Route path="userProfile" element={<UserProfile />} />
        <Route path="logout" element={<Logout />} />
        <Route path="" element={<DefautHandler />} />
        <Route path="reportUser" element={<ReportUser />} />
        <Route path="reportManager" element={<ReportManager />} />
        <Route path="investigaionManager" element={<InvestigationManager />} />
        <Route path="allocate/:id" element={<AllocateInvestigator />} />
        <Route path="TransferFunds" element={<TransferFunds />} />
      </Routes>
    </EthProvider>
  );
}

export default App;
