import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import HelpPage from "./pages/HelpPage";
import ContactUsPage from "./pages/ContactUsPage";
import AboutUsPage from "./pages/AboutUsPage";
import TermsAndConditionsPage from "./pages/TermsAndConditionsPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import ProfilePage from "./pages/ProfilePage";
import VenuePage from "./pages/VenuePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="aboutus" element={<AboutUsPage />} />
          <Route path="contactus" element={<ContactUsPage />} />
          <Route path="help" element={<HelpPage />} />
          <Route
            path="termsandconditions"
            element={<TermsAndConditionsPage />}
          />
          <Route path="privacypolicy" element={<PrivacyPolicyPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="venues/:id" element={<VenuePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
