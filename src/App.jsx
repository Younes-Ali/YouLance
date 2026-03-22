import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import { Toaster } from "react-hot-toast";
import OverviewPage from "./pages/OverviewPage";
import ProjectsPage from "./pages/ProjectsPage";
import ClientsPage from "./pages/ClientsPage";
import InvoicesPage from "./pages/InvoicesPage";
import TimeTrackerPage from "./pages/TimeTrackerPage";
import AnalyticsPage from "./pages/AnalyticsPage"
import Settings from "./pages/Settings";
import AssistantPage from "./pages/AssistantPage";
import CalendarPage from "./pages/CalendarPage";

function App() {


  function PrivateRoute({ children }) {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");

  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}

  return (
    <div
        className="min-h-screen"
        style={{
          background:
            "radial-gradient(ellipse at 10% 10%, #0d0d2b 0%, #050510 50%, #000000 100%)",
          fontFamily: "'Syne', sans-serif",
        }}
      >
        <Toaster
          position="top-right"
          reverseOrder={false}
        />
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout/>}>
              <Route index element={<Home/>}/>
              <Route path="about" element={<About/>}/>
              <Route path="contact" element={<Contact/>}/>
          </Route>
          <Route path="/dashboard" element={ <PrivateRoute><OverviewPage /></PrivateRoute> } />
          <Route path="/dashboard/projects"  element={ <PrivateRoute><ProjectsPage /></PrivateRoute> } />
          <Route path="/dashboard/clients"   element={ <PrivateRoute><ClientsPage /></PrivateRoute> } />
          <Route path="/dashboard/invoices"  element={ <PrivateRoute><InvoicesPage /></PrivateRoute> } />
          <Route path="/dashboard/time"      element={ <PrivateRoute><TimeTrackerPage /></PrivateRoute> } />
          <Route path="/dashboard/analytics" element={ <PrivateRoute><AnalyticsPage /></PrivateRoute> } />
          <Route path="/dashboard/assistant" element={<PrivateRoute><AssistantPage /></PrivateRoute>} />
          <Route path="/dashboard/calendar" element={<PrivateRoute><CalendarPage /></PrivateRoute>} />
          <Route path="/dashboard/settings"   element={ <Settings /> } />
          <Route path="/signin" element={<SignInPage/>}/>
          <Route path="/signup" element={<SignUpPage/>}/>
        </Routes>
        
        </BrowserRouter>
      </div>
  )
}

export default App
