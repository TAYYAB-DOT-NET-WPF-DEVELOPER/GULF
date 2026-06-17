import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { http } from "../api/http";

export default function Footer() {
  const { t } = useTranslation();
  const [services, setServices] = useState([]);
  const [latestBlog, setLatestBlog] = useState(null);

  useEffect(() => {
    async function loadFooterData() {
      try {
        const [servRes, blogRes] = await Promise.all([
          http.get("/api/services"),
          http.get("/api/blog")
        ]);
        setServices(Array.isArray(servRes.data) ? servRes.data.slice(0, 4) : []);
        setLatestBlog(Array.isArray(blogRes.data) && blogRes.data.length > 0 ? blogRes.data[0] : null);
      } catch (e) {
        console.error("Footer data load error:", e);
      }
    }
    loadFooterData();
  }, []);

  return (
    <footer className="w-full bg-[#0f2d45] text-white">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <img
                src="/images/logo.png"
                alt="Gulf AI Olaya"
                className="h-10 w-10 object-contain"
              />
              <div>
                <p className="text-sm font-bold">{t('brand_name')}</p>
                <p className="text-xs text-white/70">
                  {t('footer_tagline')}
                </p>
              </div>
            </div>

            <p className="mt-4 text-sm text-white/70 leading-6">
              {t('footer_desc')}
            </p>
          </div>

          {/* Ready */}
          <div>
            <p className="text-sm font-bold">{t('footer_ready')}</p>
            <div className="mt-3">
              <p className="text-[10px] font-black uppercase tracking-widest text-orange-500 mb-1">{t('footer_latest_update')}</p>
              <p className="text-sm text-white/70 leading-6 line-clamp-2">
                {latestBlog ? latestBlog.title : t('footer_default_blog')}
              </p>
            </div>

            <Link
              to="/contact"
              className="mt-6 inline-flex rounded-md bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600 transition-all active:scale-95"
            >
              {t('footer_contact_btn')}
            </Link>
          </div>

          {/* Product/Services */}
          <div>
            <p className="text-sm font-black uppercase tracking-widest text-orange-500">{t('footer_divisions')}</p>
            <ul className="mt-5 space-y-3 text-sm text-white/60 font-medium font-sans">
              {services.length > 0 ? services.map(s => (
                <li key={s.id}><Link to="/" className="hover:text-white transition-colors">{s.name}</Link></li>
              )) : (
                <>
                  <li><Link to="/" className="hover:text-white transition-colors">{t('footer_div_mech')}</Link></li>
                  <li><Link to="/" className="hover:text-white transition-colors">{t('footer_div_trans')}</Link></li>
                  <li><Link to="/" className="hover:text-white transition-colors">{t('footer_div_elec')}</Link></li>
                  <li><Link to="/" className="hover:text-white transition-colors">{t('footer_div_civil')}</Link></li>
                </>
              )}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-sm font-black uppercase tracking-widest text-orange-500">{t('footer_company')}</p>
            <ul className="mt-5 space-y-3 text-sm text-white/60 font-medium">
              <li><Link to="/about" className="hover:text-white transition-colors">{t('footer_comp_story')}</Link></li>
              <li><Link to="/management" className="hover:text-white transition-colors">{t('footer_comp_leadership')}</Link></li>
              <li><Link to="/projects" className="hover:text-white transition-colors">{t('footer_comp_port')}</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">{t('footer_comp_press')}</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-8 text-[11px] font-black uppercase tracking-[0.2em] text-white/40 md:flex-row md:items-center md:justify-between">
          <p>{t('footer_copyright', { year: new Date().getFullYear() })}</p>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-white">
              {t('footer_privacy')}
            </Link>
            <span>—</span>
            <Link to="/terms" className="hover:text-white">
              {t('footer_terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
