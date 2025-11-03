import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CollegeDashboard from "./pages/CollegeDashboard";
import FacultyDashboard from "./pages/FacultyDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import JobPostPage from "./pages/JobPostPage";
import JobApplyPage from "./pages/JobApplyPage";
import ApplicationsPage from "./pages/ApplicationsPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";
import "./App.css";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import HelpPage from "./pages/HelpPage";
import JobListPage from "./pages/JobListPage";
import CollegeProfilePage from "./pages/CollegeProfilePage";
import FacultyProfilePage from "./pages/FacultyProfilePage";
import AdminCollege from "./pages/AdminCollege";
import AdminFaculty from "./pages/AdminFaculty";
import AdminJobs from "./pages/AdminJobs";
import AdminApplications from "./pages/AdminApplications";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/jobs" element={<JobListPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/college/dashboard" element={<CollegeDashboard />} />
        <Route path="/faculty/dashboard" element={<FacultyDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        <Route path="/admin/college" element={<AdminCollege/>}/>
        <Route path="/admin/faculty" element={<AdminFaculty/>}/>
        <Route path="/admin/jobs" element={<AdminJobs/>}/>
        <Route path="/admin/applications" element={<AdminApplications/>}/>


        <Route path="/college/profile" element={<CollegeProfilePage />} />
        <Route path="/faculty/profile" element={<FacultyProfilePage />} />
        
        <Route path="/post-job" element={<JobPostPage />} />
        <Route path="/apply/:id" element={<JobApplyPage />} />

        <Route path="/applications/:id" element={<ApplicationsPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
