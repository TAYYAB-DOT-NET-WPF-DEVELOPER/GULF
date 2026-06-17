import React, { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useTranslation } from "react-i18next";
import { http, getImageUrl } from "../api/http";
import { useSEO } from "../hooks/useSEO";

export default function Contact() {
  const { t } = useTranslation();
  useSEO("PAGE", "contact");
  const tabs = useMemo(() => [t("Our Offices"), t("Other Contacts")], [t]);
  const [tab, setTab] = useState(tabs[0]);
  const [heroBanner, setHeroBanner] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await http.get("/api/banners/contact-hero");
        if (res.data) setHeroBanner(res.data);
      } catch (err) { }
    }
    loadData();
  }, []);

  const offices = useMemo(
    () => [
      {
        city: "Madrid, Spain",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        phone: "+123 456 7890",
        map: "#",
      },
      {
        city: "Cairo, Egypt",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        phone: "+123 456 7890",
        map: "#",
      },
      {
        city: "Gurugram, India",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        phone: "+123 456 7890",
        map: "#",
      },
      {
        city: "London, UK",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        phone: "+123 456 7890",
        map: "#",
      },
    ],
    []
  );

  const socials = useMemo(
    () => [
      { id: "fb", label: "Gulf Al Olaya", icon: "f", href: "#" },
      { id: "x", label: "Gulf Al Olaya", icon: "x", href: "#" },
      { id: "in", label: "Gulf Al Olaya", icon: "in", href: "#" },
      { id: "yt", label: "Gulf Al Olaya", icon: "▶", href: "#" },
      { id: "ig", label: "Gulf Al Olaya", icon: "◎", href: "#" },
    ],
    []
  );

  return (


    <div className="bg-white min-h-screen">
      <Header theme="light" />

      {/* =========================
          HERO SECTION
         ========================= */}
      <section className="bg-slate-50/50 pt-12 pb-20 md:pt-16 md:pb-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-12 md:grid-cols-12 md:items-center">
            {/* Left Content */}
            <div className="md:col-span-6">
              <p className="text-[14px] font-bold tracking-[0.1em] text-[#0f2d45] uppercase mb-4">
                {t("home_contact_label")}
              </p>
              <h1 className="text-[36px] md:text-[54px] font-bold text-[#0f2d45] leading-[1.1] tracking-tight mb-8">
                {t("Gulf Al Olaya Head Office")}
              </h1>

              <div className="space-y-4 text-[15px] leading-relaxed text-slate-500 mb-8 max-w-md">
                <p>
                  {t(heroBanner?.subHeadline) || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
                </p>
                <p>
                  {t(heroBanner?.subHeadline) || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
                </p>
              </div>

              <div className="flex items-center gap-3 text-[18px] font-bold text-[#0f2d45] mb-10">
                <span className="text-[#f26522] text-xl">📞</span>
                <a href="tel:+1234567890" className="hover:text-[#f26522] transition-colors">
                  {heroBanner?.ctaLink || "+123 456 7890"}
                </a>
              </div>

              <a
                href="#"
                className="inline-flex rounded-[5px] bg-[#f26522] px-8 py-4 text-[13px] font-bold uppercase tracking-wider text-white hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20"
              >
                {t("VIEW ON GOOGLE MAPS")}
              </a>
            </div>

            {/* Right Logo */}
            <div className="md:col-span-6 flex justify-end">
              <img
                src="/images/Union.png"
                alt="Gulf Al Olaya"
                className="w-full max-w-[500px] opacity-90 drop-shadow-2xl"
                draggable={false}
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          OFFICES SECTION
         ========================= */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4">
          {/* Tabs */}
          <div className="flex items-center gap-12 border-b border-slate-100 mb-16">
            {tabs.map((t) => {
              const active = t === tab;
              return (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`relative pb-6 text-[22px] font-bold transition-all ${active ? "text-[#0f2d45]" : "text-slate-300 hover:text-slate-400"
                    }`}
                >
                  {t}
                  {active && (
                    <span className="absolute bottom-[-1px] left-0 w-full h-[3px] bg-[#0f2d45] rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Grid */}
          {tab === t("Our Offices") ? (
            <div className="grid gap-x-10 gap-y-16 md:grid-cols-4">
              {offices.map((o) => (
                <div key={o.city} className="flex flex-col">
                  <h3 className="text-[22px] font-bold text-[#0f2d45] mb-6">
                    {o.city}
                  </h3>
                  <p className="text-[14px] leading-relaxed text-slate-500 mb-8 min-h-[4rem]">
                    {o.desc}
                  </p>

                  <div className="flex items-center gap-3 text-[15px] font-bold text-[#0f2d45] mb-8">
                    <span className="text-[#f26522]">📞</span>
                    {o.phone}
                  </div>

                  <a
                    href={o.map}
                    className="inline-flex rounded-[5px] bg-[#f26522] px-6 py-3.5 text-[12px] font-bold uppercase tracking-wider text-white hover:bg-orange-600 transition-all text-center justify-center"
                  >
                    {t("VIEW ON GOOGLE MAPS")}
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center bg-slate-50 rounded-2xl">
              <p className="text-slate-500 font-medium">{t("contact_other_details")}</p>
            </div>
          )}
        </div>
      </section>

      {/* =========================
          QUICK LINK
         ========================= */}
      <section className="py-16 border-t border-slate-50">
        <div className="mx-auto max-w-6xl px-4 flex justify-center">
          <Link to="/" className="group inline-flex items-center gap-4">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border-2 border-orange-400 text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all">
              ↗
            </span>
            <span className="text-[15px] font-bold text-[#0f2d45] uppercase tracking-wider">{t("Homepage")}</span>
          </Link>
        </div>
      </section>

      {/* <Footer /> */}
    </div>
  );
}
