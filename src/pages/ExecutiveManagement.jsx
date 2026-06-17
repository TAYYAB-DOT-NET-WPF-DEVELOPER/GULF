import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSEO } from "../hooks/useSEO";
import { http, getImageUrl } from "../api/http";

export default function ExecutiveManagement() {
  const { t, i18n } = useTranslation();
  useSEO("PAGE", "executive-management");
  const [heroBanner, setHeroBanner] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    async function loadData() {
      try {
        const [hero, tm1, tm2, tm3] = await Promise.all([
          http.get("/api/banners/mgmt-hero").catch(() => ({ data: null })),
          http.get("/api/banners/mgmt-team-1").catch(() => ({ data: null })),
          http.get("/api/banners/mgmt-team-2").catch(() => ({ data: null })),
          http.get("/api/banners/mgmt-team-3").catch(() => ({ data: null })),
        ]);
        setHeroBanner(hero.data);
        
        const dynamicMembers = [];
        if (tm1.data) dynamicMembers.push({
          name: tm1.data.headline,
          role: tm1.data.ctaLink,
          img: tm1.data.imageUrls?.[0] || "/images/leader1.png",
          bio: tm1.data.subHeadline
        });
        if (tm2.data) dynamicMembers.push({
          name: tm2.data.headline,
          role: tm2.data.ctaLink,
          img: tm2.data.imageUrls?.[0] || "/images/leader2.png",
          bio: tm2.data.subHeadline
        });
        if (tm3.data) dynamicMembers.push({
          name: tm3.data.headline,
          role: tm3.data.ctaLink,
          img: tm3.data.imageUrls?.[0] || "/images/leader3.png",
          bio: tm3.data.subHeadline
        });
        if (dynamicMembers.length > 0) setTeamMembers(dynamicMembers);
      } catch (err) {}
    }
    loadData();
  }, [t, i18n.language]);

  const defaultMembers = [
    {
      name: t("Engr. Khalid Al-Otaibi"),
      role: t("Chairman & CEO"),
      img: "/images/leader1.png",
      bio: t("khalid_bio")
    },
    {
      name: t("Ahmed Mansour"),
      role: t("Chief Operating Officer"),
      img: "/images/leader2.png",
      bio: t("ahmed_bio")
    },
    {
      name: t("Sarah Williams"),
      role: t("Director of International Business"),
      img: "/images/leader3.png",
      bio: t("sarah_bio")
    }
  ];

  const currentTeam = teamMembers.length > 0 ? teamMembers : defaultMembers;

  return (
    <div className="bg-white">
      {/* HERO SECTION */}
      <section className="relative w-full min-h-[650px] md:min-h-screen overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroBanner?.imageUrls?.[0] ? getImageUrl(heroBanner.imageUrls[0]) : "/images/leadership.png"} // Replace with actual image path
            alt="Executive Leadership"
            className="absolute inset-0 w-full h-full object-cover"
            draggable={false}
          />
        </div>
        <div className="absolute inset-0 bg-black/50" />
        <Header overlay logoType="color" />
        <div className="relative z-10 pt-24 md:pt-32 pb-20">
          <div className="mx-auto max-w-6xl px-4">
            <div className="flex min-h-[650px] items-center md:min-h-screen">
              <div className="max-w-4xl">
                <h1 className="text-4xl font-extrabold text-white md:text-5xl whitespace-pre-line">
                  {t(heroBanner?.headline) || t("Meet the leaders inspiring our global teams")}
                </h1>
                <p className="mt-5 max-w-md text-sm text-white/85 md:text-base whitespace-pre-line">
                  {t(heroBanner?.subHeadline) || t("mgmt_hero_desc")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXECUTIVE TEAM SECTION */}
      <section className="w-full bg-white py-20 md:py-32">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-20 max-w-3xl">
            <p className="text-xs font-black tracking-[0.3em] text-orange-600 uppercase">{t("Board of Directors")}</p>
            <h2 className="mt-6 text-4xl font-black text-[#0f2d45] uppercase tracking-tighter md:text-5xl">
              {t("Visionary leadership driving excellence.")}
            </h2>
            <p className="mt-6 text-lg text-slate-500 font-medium">
              {t("mgmt_intro")}
            </p>
          </div>

          <div className="grid gap-16">
            {currentTeam.map((leader, idx) => (
              <div key={idx} className="group relative grid gap-8 md:grid-cols-12 items-center">
                <div className="md:col-span-4 overflow-hidden rounded-2xl bg-slate-100 aspect-[3/4]">
                  <img
                    src={getImageUrl(leader.img)}
                    alt={leader.name}
                    className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                    onError={(e) => { e.target.src = "/images/vision.png" }}
                  />
                </div>
                <div className="md:col-span-8">
                  <p className="text-[10px] font-black tracking-[0.2em] text-orange-600 uppercase mb-2">{t(leader.role)}</p>
                  <h3 className="text-3xl font-black text-[#0f2d45] uppercase tracking-tight mb-6">{t(leader.name)}</h3>
                  <div className="h-px w-20 bg-orange-500 mb-6" />
                  <p className="text-lg leading-relaxed text-slate-500 font-medium max-w-2xl">
                    {t(leader.bio)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          CONTACT (left image + right content)
         ========================================================= */}
      <section className="w-full bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
          <div className="grid gap-10 md:grid-cols-12 md:items-center">
            {/* left image */}
            <div className="md:col-span-4">
              <div className="overflow-hidden rounded-md">
                <img
                  src="/images/vision.png"
                  alt="Contact"
                  className="h-[260px] w-full object-cover"
                />
              </div>
            </div>

            {/* right */}
            <div className="md:col-span-8">
              <p className="text-xs font-semibold tracking-[0.25em] text-[#0f2d45]">
                {t("home_contact_label")}
              </p>

              <h3 className="mt-4 text-2xl font-extrabold text-[#0f2d45] md:text-4xl">
                {t("home_contact_title")}
              </h3>

              <p className="mt-4 text-sm leading-7 text-slate-500 md:text-base">
                {t("home_contact_desc")}
              </p>

              <Link
                to="/contact"
                className="mt-6 inline-flex rounded-md bg-orange-500 px-6 py-3 text-sm font-semibold text-white hover:bg-orange-600"
              >
                {t("home_contact_btn")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          Newsletter subscribe (light gray section)
         ========================================================= */}
      <section className="w-full bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-12 md:py-14">
          <h3 className="text-center text-2xl font-extrabold text-[#0f2d45] md:text-3xl">
            {t("Subscribe to our newsletter...")}
          </h3>

          <div className="mx-auto mt-8 flex max-w-3xl flex-col gap-4 md:flex-row md:items-center">
            <input
              type="email"
              placeholder="example@email.com"
              className="h-12 w-full rounded-md border border-slate-200 bg-white px-4 text-sm outline-none focus:border-orange-300"
            />
            <button className="h-12 rounded-md bg-orange-500 px-8 text-sm font-semibold text-white hover:bg-orange-600">
              {t("SUBSCRIBE")}
            </button>
          </div>

          <div className="mx-auto mt-4 flex max-w-3xl items-start gap-3 text-xs text-slate-500">
            <input type="checkbox" className="mt-1" />
            <p>
              {t("newsletter_agreement")}
            </p>
          </div>

          {/* quick links row */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
            {[
              { label: t("Executive Management"), to: "/management" },
              { label: t("Group Structure"), to: "/group-structure" },
              { label: t("Homepage"), to: "/" },
            ].map((x) => (
              <Link key={x.label} to={x.to} className="group inline-flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-orange-400 text-orange-500 group-hover:bg-orange-500 group-hover:text-white">
                  ↗
                </span>
                <span className="text-sm font-semibold text-[#0f2d45]">{x.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          Bottom Banner (solar / "For the world. With the world.")
         ========================================================= */}
      <section className="relative w-full overflow-hidden">
        <img
          src="/images/panel.png"
          alt="For the world"
          className="h-[360px] w-full object-cover md:h-[440px]"
          onError={(e) => { e.target.src = "/images/hero.png" }}
        />
        <div className="absolute inset-0 bg-[#0f2d45]/55" />

        <div className="absolute inset-0">
          <div className="mx-auto flex h-full max-w-6xl items-center px-4">
             <div className="max-w-3xl">
              <h3 className="text-3xl font-extrabold text-white md:text-5xl uppercase tracking-tighter leading-tight">
                {t("home_bottom_title")}
              </h3>

              <p className="mt-5 text-sm leading-7 text-white/80 md:text-base font-medium">
                {t("home_bottom_desc")}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
