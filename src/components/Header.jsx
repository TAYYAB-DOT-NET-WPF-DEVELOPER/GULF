import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const navClass = ({ isActive }) =>
  `text-[14px] font-normal tracking-wide transition ${isActive ? "text-white" : "text-white/90 hover:text-white"
  }`;

const mobileNavClass = ({ isActive }) =>
  `text-lg font-normal tracking-wide py-4 border-b border-white/10 transition ${isActive ? "text-orange-500" : "text-white"
  }`;

export default function Header({ overlay = false, theme = 'dark', logoType }) {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLight = theme === 'light';
  const showColorLogo = logoType === 'color' || isLight;

  useEffect(() => {
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = 'unset';
  };

  return (
    <header
      className={[
        "w-full z-50",
        overlay ? "absolute top-0 left-0 right-0" : "relative bg-white border-b border-slate-100",
      ].join(" ")}
    >
      {/* Top thin line shown in Figma */}
      {isLight && <div className="h-2 w-full bg-[#18324e]"></div>}
      {/* PDF style subtle dark overlay for readability */}
      <div className={overlay ? "bg-black/20" : ""}>
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex py-5 md:py-7 items-center justify-between">
            {/* LOGO */}
            <Link to="/" className="flex items-center gap-3">
              <img
                src={showColorLogo ? "/images/colorlogo.png" : "/images/logo.png"}
                alt="Gulf Al Olaya"
                className="h-10 md:h-12 w-auto object-contain"
              />
            </Link>

            {/* NAV - Desktop */}
            <div className="hidden md:flex flex-col items-end gap-4">
              {/* Top Row: Region / Language */}
              <div className={`flex items-center gap-1.5 text-[12px] group cursor-pointer relative ${isLight ? 'text-slate-500 hover:text-slate-800' : 'text-white/90'}`}>
                <span>{t('nav_global_status')}</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>

                {/* Language Dropdown Menu (on hover) */}
                <div className="absolute right-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="bg-white rounded shadow-lg overflow-hidden flex flex-col min-w-[120px] border border-slate-100">
                    <button onClick={() => changeLanguage('en')} className={`px-4 py-2 text-left text-sm hover:bg-gray-100 ${i18n.language === 'en' ? 'font-bold text-black' : 'text-gray-700'}`}>English</button>
                    <button onClick={() => changeLanguage('ur')} className={`px-4 py-2 text-left text-sm hover:bg-gray-100 ${i18n.language === 'ur' ? 'font-bold text-black' : 'text-gray-700'}`}>اردو</button>
                    <button onClick={() => changeLanguage('ar')} className={`px-4 py-2 text-left text-sm hover:bg-gray-100 ${i18n.language === 'ar' ? 'font-bold text-black' : 'text-gray-700'}`}>العربية</button>
                  </div>
                </div>
              </div>

              {/* Bottom Row: Navigation Links */}
              <nav className="flex items-center gap-7">
                <NavLink to="/about" className={({ isActive }) => `text-[14.5px] font-medium tracking-wide transition ${isActive ? "text-[#f26522]" : (isLight ? "text-slate-600 hover:text-[#f26522]" : "text-white/90 hover:text-white")}`}>
                  {t('nav_about_us', 'About Us')}
                </NavLink>
                <NavLink to="/services" className={({ isActive }) => `text-[14.5px] font-medium tracking-wide transition ${isActive ? "text-[#f26522]" : (isLight ? "text-slate-600 hover:text-[#f26522]" : "text-white/90 hover:text-white")}`}>
                  {t('nav_what_we_do', 'What We Do')}
                </NavLink>
                <NavLink to="/projects" className={({ isActive }) => `text-[14.5px] font-medium tracking-wide transition ${isActive ? "text-[#f26522]" : (isLight ? "text-slate-600 hover:text-[#f26522]" : "text-white/90 hover:text-white")}`}>
                  {t('nav_project_portfolio', 'Project / Portfolio')}
                </NavLink>
                <NavLink to="/news" className={({ isActive }) => `text-[14.5px] font-medium tracking-wide transition ${isActive ? "text-[#f26522]" : (isLight ? "text-slate-600 hover:text-[#f26522]" : "text-white/90 hover:text-white")}`}>
                  {t('nav_new_updates', 'News & Updates')}
                </NavLink>
                <NavLink to="/careers" className={({ isActive }) => `text-[14.5px] font-medium tracking-wide transition ${isActive ? "text-[#f26522]" : (isLight ? "text-slate-600 hover:text-[#f26522]" : "text-white/90 hover:text-white")}`}>
                  {t('nav_careers')}
                </NavLink>

                <Link
                  to="/contact"
                  className={`ml-3 rounded-[3px] border px-6 py-2.5 text-[14px] font-bold tracking-wide transition ${
                    isLight 
                      ? 'border-[#f26522] text-[#f26522] hover:bg-[#f26522] hover:text-white' 
                      : 'border-white/70 text-white hover:bg-white hover:text-black'
                  }`}
                >
                  {t('nav_quote')}
                </Link>
              </nav>
            </div>

            {/* MOBILE TOGGLE & TOOLS */}
            <div className="md:hidden flex items-center gap-4">
              <div className={`flex items-center gap-2 text-sm ${isLight || !overlay ? 'text-slate-600' : 'text-white/80'}`}>
                <button
                  onClick={() => changeLanguage('en')}
                  className={`hover:text-[#f26522] transition-colors ${
                    i18n.language === 'en'
                      ? (isLight || !overlay ? 'font-bold text-[#0f2d45]' : 'font-bold text-white')
                      : ''
                  }`}
                >
                  EN
                </button>
                <span>|</span>
                <button
                  onClick={() => changeLanguage('ur')}
                  className={`hover:text-[#f26522] transition-colors ${
                    i18n.language === 'ur'
                      ? (isLight || !overlay ? 'font-bold text-[#0f2d45]' : 'font-bold text-white')
                      : ''
                  }`}
                >
                  UR
                </button>
                <span>|</span>
                <button
                  onClick={() => changeLanguage('ar')}
                  className={`hover:text-[#f26522] transition-colors ${
                    i18n.language === 'ar'
                      ? (isLight || !overlay ? 'font-bold text-[#0f2d45]' : 'font-bold text-white')
                      : ''
                  }`}
                >
                  AR
                </button>
              </div>
              
              <button
                onClick={toggleMenu}
                className={`p-2 focus:outline-none transition-colors ${isLight || !overlay ? 'text-[#0f2d45] hover:text-[#f26522]' : 'text-white hover:text-white/80'}`}
                aria-label="Toggle Menu"
              >
                {isMenuOpen ? (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE MENU OVERLAY */}
      <div
        className={[
          "fixed inset-0 z-50 bg-[#0f2d45] transition-transform duration-300 ease-in-out md:hidden",
          isMenuOpen ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
      >
        <div className="flex flex-col h-full p-6">
          <div className="flex items-center justify-between mb-10">
            <Link to="/" onClick={closeMenu}>
              <img
                src="/images/logo.png"
                alt="Gulf Al Olaya"
                className="h-10 w-auto object-contain"
              />
            </Link>
            <button
              onClick={closeMenu}
              className="text-white p-2"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="flex flex-col flex-1 overflow-y-auto">
            <NavLink to="/about" className={mobileNavClass} onClick={closeMenu}>
              {t('nav_about_us')}
            </NavLink>
            <NavLink to="/management" className={mobileNavClass} onClick={closeMenu}>
              {t('nav_management')}
            </NavLink>
            <NavLink to="/services" className={mobileNavClass} onClick={closeMenu}>
              {t('nav_services')}
            </NavLink>
            <NavLink to="/projects" className={mobileNavClass} onClick={closeMenu}>
              {t('nav_projects')}
            </NavLink>
            <NavLink to="/news" className={mobileNavClass} onClick={closeMenu}>
              {t('nav_new_updates', 'News & Updates')}
            </NavLink>
            <NavLink to="/careers" className={mobileNavClass} onClick={closeMenu}>
              {t('nav_careers')}
            </NavLink>
            <NavLink to="/contact" className={mobileNavClass} onClick={closeMenu}>
              {t('nav_quote')}
            </NavLink>
          </nav>

          <div className="mt-auto pt-10 border-t border-white/10 flex justify-center gap-10">
            <button onClick={() => { changeLanguage('en'); closeMenu(); }} className={`text-lg hover:text-orange-500 ${i18n.language === 'en' ? 'text-orange-500 font-bold' : 'text-white'}`}>English</button>
            <button onClick={() => { changeLanguage('ar'); closeMenu(); }} className={`text-lg hover:text-orange-500 ${i18n.language === 'ar' ? 'text-orange-500 font-bold' : 'text-white'}`}>العربية</button>
          </div>
        </div>
      </div>
    </header>
  );
}
