import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/AboutUs";
import ExecutiveManagement from "./pages/ExecutiveManagement";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
// Import new pages (to be created)
import Blog from "./pages/Blog";
import Careers from "./pages/Careers";
import ServiceDetail from "./pages/ServiceDetail";
import News from "./pages/News";

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const isRTL = i18n.language === 'ar' || i18n.language === 'ur';
    document.body.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-white text-slate-900">
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/management" element={<ExecutiveManagement />} />
            <Route path="/services" element={<Services />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/news" element={<News />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/services/:id" element={<ServiceDetail />} />
            {/* Redirect /what-we-do to home for now or specific section if needed */}
            <Route path="/what-we-do" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
