import { BrowserRouter, Routes, Route } from "react-router-dom";
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

function App() {

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
          <Route path="/dashboard" element={ <OverviewPage /> } />
          <Route path="/dashboard/projects"  element={ <ProjectsPage /> } />
          <Route path="/dashboard/clients"   element={ <ClientsPage /> } />
          <Route path="/dashboard/invoices"  element={ <InvoicesPage /> } />
          <Route path="/dashboard/time"      element={ <TimeTrackerPage /> } />
          <Route path="/dashboard/analytics" element={ <AnalyticsPage /> } />
          <Route path="/signin" element={<SignInPage/>}/>
          <Route path="/signup" element={<SignUpPage/>}/>
        </Routes>
        
        </BrowserRouter>
      </div>
  )
}

export default App
