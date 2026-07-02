import React, { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useTranslation } from "react-i18next";
import { http } from "../api/http";
import { useSEO } from "../hooks/useSEO";

export default function Contact() {
  const { t } = useTranslation();
  useSEO("PAGE", "contact");

  const tabs = useMemo(() => [t("Our Offices"), t("Other Contacts")], [t]);
  const [tab, setTab] = useState(tabs[0]);
  const [heroBanner, setHeroBanner] = useState(null);

  useEffect(() => {
    setTab(tabs[0]);
  }, [tabs]);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await http.get("/api/banners/contact-hero");
        if (res.data) setHeroBanner(res.data);
      } catch (err) {
        console.error("Failed to load contact hero banner", err);
      }
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
      { id: "x", label: "Gulf Al Olaya", icon: "𝕏", href: "#" },
      { id: "in", label: "Gulf Al Olaya", icon: "in", href: "#" },
      { id: "yt", label: "Gulf Al Olaya", icon: "▶", href: "#" },
      { id: "ig", label: "Gulf Al Olaya", icon: "◎", href: "#" },
    ],
    []
  );

  const heroText =
    heroBanner?.subHeadline ||
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

  const heroPhone = heroBanner?.ctaLink || "+123 456 7890";

  return (
    <div className="bg-white min-h-screen">
      <Header theme="light" />

      {/* HERO SECTION */}
      <section className="bg-[#f4f4f4] pt-12 pb-20 md:pt-16 md:pb-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-12 md:grid-cols-12 md:items-center">
            <div className="md:col-span-6">
              <p className="text-[13px] font-bold tracking-wide text-[#0f2d45] mb-4">
                {t("Contact Us")}
              </p>

              <h1 className="text-3xl sm:text-[36px] md:text-[52px] font-extrabold text-[#0f2d45] leading-[1.05] tracking-tight mb-8">
                {t("Gulf Al Olaya Head")}
                <br />
                {t("Office")}
              </h1>

              <div className="space-y-4 text-[15px] leading-relaxed text-slate-600 mb-8 max-w-md">
                <p>{t(heroText)}</p>
                <p>{t(heroText)}</p>
              </div>

              <div className="flex items-center gap-3 text-[17px] font-bold text-[#0f2d45] mb-6">
                <span className="text-[#0f2d45]">📞</span>
                <a
                  href={`tel:${heroPhone.replace(/\s/g, "")}`}
                  className="hover:text-[#f26522] transition-colors"
                >
                  {heroPhone}
                </a>
              </div>

              <a
                href="#"
                className="inline-flex rounded-[5px] bg-[#f26522] px-7 py-3.5 text-[12px] font-bold uppercase tracking-wider text-white hover:bg-orange-600 transition-all"
              >
                {t("VIEW ON GOOGLE MAPS")}
              </a>
            </div>

            <div className="md:col-span-6 flex justify-end">
              <img
                src="/images/Union.png"
                alt="Gulf Al Olaya"
                className="w-full max-w-[520px] opacity-95"
                draggable={false}
              />
            </div>
          </div>
        </div>
      </section>

      {/* OFFICES SECTION */}
      <section className="py-8 md:py-12 bg-white">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex items-center gap-10 border-b border-slate-200 mb-12">
            {tabs.map((item) => {
              const active = item === tab;

              return (
                <button
                  key={item}
                  onClick={() => setTab(item)}
                  className={`relative pb-3 text-[22px] font-bold transition-all ${active
                    ? "text-[#0f2d45]"
                    : "text-slate-400 hover:text-slate-500"
                    }`}
                >
                  {item}

                  {active && (
                    <span className="absolute bottom-[-1px] left-0 h-[3px] w-full bg-[#0f2d45]" />
                  )}
                </button>
              );
            })}
          </div>

          {tab === t("Our Offices") ? (
            <div className="grid gap-x-10 gap-y-14 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {offices.map((office) => (
                <div key={office.city} className="flex flex-col">
                  <h3 className="text-[21px] font-extrabold text-[#0f2d45] mb-7">
                    {office.city}
                  </h3>

                  <p className="text-[13px] leading-relaxed text-slate-600 mb-7 min-h-[85px]">
                    {office.desc}
                  </p>

                  <div className="flex items-center gap-3 text-[15px] font-bold text-[#0f2d45] mb-7">
                    <span>📞</span>
                    <span>{office.phone}</span>
                  </div>

                  <a
                    href={office.map}
                    className="inline-flex justify-center rounded-[5px] bg-[#f26522] px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-white hover:bg-orange-600 transition-all"
                  >
                    {t("VIEW ON GOOGLE MAPS")}
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center bg-slate-50 rounded-2xl">
              <p className="text-slate-500 font-medium">
                {t("contact_other_details")}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* SOCIAL MEDIA SECTION */}
      <section className="bg-[#f26522] py-14 text-white">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-10">
            <p className="text-[11px] font-extrabold uppercase tracking-widest text-[#0f2d45] mb-4">
              {t("SOCIAL MEDIA CHANNELS")}
            </p>

            <h2 className="text-[30px] md:text-[38px] font-extrabold">
              {t("Follow us on social media.")}
            </h2>

            <p className="mt-3 text-[15px] max-w-4xl mx-auto opacity-90 leading-relaxed">
              {t(
                "Join our social communities for latest news, updates, and a sneak peek at our offices, project sites, and our teams."
              )}
            </p>
          </div>

          <div className="grid gap-x-16 gap-y-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-w-6xl mx-auto">
            {socials.map((social) => (
              <a
                key={social.id}
                href={social.href}
                className="flex items-center gap-5 text-white font-extrabold text-[20px]"
              >
                <span className="flex h-14 w-20 items-center justify-center rounded-full border border-white/70 text-white text-[18px]">
                  {social.icon}
                </span>
                <span>{social.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* QUICK LINK */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-6xl px-4 flex justify-start">
          <Link to="/" className="group inline-flex items-center gap-4">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-orange-300 text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all">
              ↗
            </span>

            <span className="text-[15px] font-bold text-[#0f2d45]">
              {t("Homepage")}
            </span>
          </Link>
        </div>
      </section>

      {/* <Footer /> */}
    </div>
  );
}