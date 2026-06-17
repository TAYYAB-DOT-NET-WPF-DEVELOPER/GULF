import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "../components/Header";
import { http, getImageUrl } from "../api/http";
import { useSEO } from "../hooks/useSEO";

export default function About() {
  const { t, i18n } = useTranslation();
  useSEO("PAGE", "about");
  // ====== KEY FACTS (blue section slider) ======
  const keyFactsSlides = useMemo(
    () => [
      {
        id: 1,
        title: t("High Project Quality Index"),
        desc: t("key_fact_1"),
      },
      {
        id: 2,
        title: t("Strong Safety Compliance"),
        desc: t("key_fact_2"),
      },
      {
        id: 3,
        title: t("On-time Delivery Track"),
        desc: t("key_fact_3"),
      },
    ],
    [t]
  );

  const [kfIdx, setKfIdx] = useState(0);

  // ====== COUNTRY TABS (Saudi/India/UK/Egypt/Spain) ======
  const countries = useMemo(
    () => [
      {
        key: t("SAUDI ARABIA"),
        title: t("Contributing to saudi vision 2030"),
        image: "/images/saudi.png",
        paras: [
          t("saudi_para_1"),
          t("saudi_para_2"),
          t("saudi_para_3"),
        ],
      },
      {
        key: t("INDIA"),
        title: t("Delivering quality projects in India"),
        image: "/images/countries/india.png",
        paras: [
          t("saudi_para_1"),
          t("saudi_para_2"),
          t("saudi_para_3"),
        ],
      },
      {
        key: t("UNITED KINDOM"),
        title: t("Engineering excellence in the United Kingdom"),
        image: "/images/countries/uk.png",
        paras: [
          t("saudi_para_1"),
          t("saudi_para_2"),
        ],
      },
      {
        key: t("EGYPT"),
        title: t("Expanding delivery capacity in Egypt"),
        image: "/images/countries/egypt.png",
        paras: [
          t("saudi_para_1"),
          t("saudi_para_2"),
        ],
      },
      {
        key: t("SPAIN"),
        title: t("Multi-sector work across Spain"),
        image: "/images/countries/spain.png",
        paras: [
          t("saudi_para_1"),
          t("saudi_para_2"),
        ],
      },
    ],
    [t]
  );

  const [activeCountry, setActiveCountry] = useState(countries[0].key);
  const activeData = countries.find((c) => c.key === activeCountry) || countries[0];

  const [heroBanner, setHeroBanner] = useState(null);
  const [purposeBanner, setPurposeBanner] = useState(null);
  const [visionBanner, setVisionBanner] = useState(null);
  const [keyFactsDynamic, setKeyFactsDynamic] = useState(null);
  const [bottomBanner, setBottomBanner] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [hero, purpose, vision, keyfacts, bottom] = await Promise.all([
          http.get("/api/banners/about-hero").catch(() => ({ data: null })),
          http.get("/api/banners/about-purpose").catch(() => ({ data: null })),
          http.get("/api/banners/about-vision").catch(() => ({ data: null })),
          http.get("/api/banners/about-key-facts").catch(() => ({ data: null })),
          http.get("/api/banners/about-bottom").catch(() => ({ data: null })),
        ]);
        setHeroBanner(hero.data);
        setPurposeBanner(purpose.data);
        setVisionBanner(vision.data);
        setKeyFactsDynamic(keyfacts.data);
        setBottomBanner(bottom.data);
      } catch (err) { }
    }
    loadData();
  }, [t, i18n.language]);

  return (
    <div className="bg-white">
      {/* =========================================================
          HERO (Our Story) - PDF style
         ========================================================= */}
      <section className="relative w-full min-h-[620px] md:min-h-screen overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroBanner?.imageUrls?.[0] ? getImageUrl(heroBanner.imageUrls[0]) : "/images/abouthero.png"} // replace with your hero
            alt="About Hero"
            className="h-full w-full object-cover"
            draggable={false}
          />
        </div>

        {/* overlay */}
        <div className="absolute inset-0 bg-black/45" />

        {/* header over hero */}
        <Header overlay />

        {/* content */}
        <div className="relative z-10">
          <div className="mx-auto max-w-6xl px-4">
            <div className="flex min-h-[620px] items-center md:min-h-screen pt-24 md:pt-32 pb-20">
              <div className="max-w-4xl">
                <p className="text-sm font-semibold text-orange-500">{t("about_hero_label", "About Gulf Al Olaya")}</p>

                <h1 className="mt-4 text-4xl font-extrabold leading-tight text-white md:text-6xl">
                  {t(heroBanner?.headline) || t("about_hero_title", "A Saudi company. A global standard.")}
                </h1>

                <div className="mt-6 max-w-3xl space-y-4">
                  <p className="text-sm leading-7 text-white/85 md:text-base whitespace-pre-line">
                    {t(heroBanner?.subHeadline) || t("about_hero_desc1")}
                  </p>
                  <p className="text-sm leading-7 text-white/85 md:text-base">
                    {t("about_hero_desc2")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          Our Purpose. Our 'Why'. (center section)
         ========================================================= */}
      <section className="relative w-full bg-white overflow-hidden py-16 md:py-24">
        {/* Decorative Wireframe Triangles */}
        <svg className="absolute left-[-2%] top-[10%] pointer-events-none opacity-80" width="300" height="180" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polygon points="0,50 100,0 80,100" fill="none" stroke="#f26522" strokeWidth="0.5" />
        </svg>
        <svg className="absolute right-[-5%] top-[0%] pointer-events-none opacity-80" width="350" height="350" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polygon points="30,100 100,10 100,100" fill="none" stroke="#f26522" strokeWidth="0.5" />
        </svg>

        <div className="relative z-10 mx-auto max-w-5xl px-4 text-center">
          <h2 className="text-[36px] font-bold text-[#18324e] md:text-[48px]">
            {t(purposeBanner?.headline) || t("about_story_title", "Our Story")}
          </h2>

          <div className="mx-auto mt-6 flex flex-col items-center gap-4 text-center">
            <p className="text-[14px] font-bold text-[#18324e]">
              {t("about_story_subtitle", "Who we are?")}
            </p>
            <p className="max-w-3xl text-[15.5px] leading-relaxed text-[#555]">
              {t(purposeBanner?.subHeadline) || t("about_story_desc")}
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          Vision & Values (left image + right text)
         ========================================================= */}
      <section className="relative w-full bg-white pb-16 md:pb-24 overflow-hidden">
        {/* Decorative Bottom Right Triangle */}
        <svg className="absolute right-[5%] bottom-[0%] pointer-events-none opacity-80" width="150" height="200" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polygon points="50,0 100,100 0,100" fill="none" stroke="#f26522" strokeWidth="0.5" />
        </svg>

        <div className="relative z-10 mx-auto max-w-6xl px-4">
          <div className="grid gap-12 md:grid-cols-12 md:items-center">
            {/* left image */}
            <div className="md:col-span-6 flex justify-center">
              <div className="relative w-full max-w-lg aspect-[4/3] overflow-hidden shadow-2xl" style={{ clipPath: "polygon(0% 15%, 100% 0%, 90% 100%, 10% 85%)" }}>
                <img
                  src={visionBanner?.imageUrls?.[0] ? getImageUrl(visionBanner.imageUrls[0]) : "/images/hero2.png"}
                  alt="Vision"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>

            {/* right content */}
            <div className="md:col-span-6 pl-0 md:pl-8">
              <p className="text-[14px] font-bold tracking-widest text-[#18324e] uppercase">
                {t("about_vision_subtitle", "VISION & VALUES")}
              </p>

              <h3 className="mt-4 text-[32px] font-bold leading-tight text-[#f26522] md:text-[45px] whitespace-pre-line">
                {t("about_vision_title", "Vision")}
              </h3>

              <h4 className="mt-6 text-[18px] font-bold text-[#18324e]">
                {t("about_direction_label", "The direction we are going:")}
              </h4>

              <p className="mt-4 text-[15.5px] leading-relaxed text-[#555]">
                {t("vision_desc", "To be the global leader in sustainable engineering and infrastructure, recognized for our innovation, quality, and commitment to building a better world.")}
              </p>

              <p className="mt-8 text-[15px] font-bold text-[#f26522]">
                {t("values_intro", "Our values are the foundation of everything we do. They guide our decisions and define our culture.")}
              </p>

              <ul className="mt-4 space-y-2 text-[15px] text-[#555] list-disc pl-5 marker:text-gray-400">
                <li>{t("value_ethics", "Uphold ethics .")}</li>
                <li>{t("value_excellence", "Pursue excellence.")}</li>
                <li>{t("value_collab", "Prioritize collaboration.")}</li>
                <li>{t("value_innovation", "Embrace innovation.")}</li>
                <li>{t("value_promises", "Fulfill promises.")}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          KEY FACTS (Blue section + slider)
         ========================================================= */}
      <section className="w-full bg-[#f26522]">
        <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
          <p className="text-xs font-semibold tracking-[0.25em] text-white/70">{t("KEY FACTS")}</p>

          <h3 className="mt-6 max-w-2xl text-xl font-extrabold leading-snug text-white md:text-2xl">
            {t("key_facts_intro")}
          </h3>

          {/* separator line (thin) */}
          <div className="mt-10 h-px w-full bg-white/20" />

          {/* slider row */}
          <div className="mt-10 grid gap-8 md:grid-cols-12 md:items-center">
            {/* left arrow */}
            <div className="md:col-span-2">
              <button
                onClick={() => setKfIdx((p) => (p - 1 + keyFactsSlides.length) % keyFactsSlides.length)}
                className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-white/35 text-white hover:border-white/70"
                aria-label="Previous key fact"
              >
                ←
              </button>
            </div>

            {/* center content */}
            <div className="md:col-span-8">
              <p className="text-center text-xs font-semibold tracking-[0.25em] text-white/70 md:text-left">
                {String(kfIdx + 1).padStart(2, "0")}
              </p>

              <h4 className="mt-4 text-center text-lg font-extrabold text-white md:text-left md:text-xl">
                {keyFactsSlides[kfIdx].title}
              </h4>

              <p className="mt-4 text-center text-sm leading-7 text-white/75 md:text-left">
                {keyFactsSlides[kfIdx].desc}
              </p>
            </div>

            {/* right arrow */}
            <div className="flex justify-end md:col-span-2">
              <button
                onClick={() => setKfIdx((p) => (p + 1) % keyFactsSlides.length)}
                className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-white/35 text-white hover:border-white/70"
                aria-label="Next key fact"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          Countries tabs + content (white section)
         ========================================================= */}
      <section className="w-full bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
          {/* tabs row */}
          <div className="flex flex-wrap items-center gap-3">
            {countries.map((c) => {
              const active = c.key === activeCountry;
              return (
                <button
                  key={c.key}
                  onClick={() => setActiveCountry(c.key)}
                  className={[
                    "rounded-full px-4 py-2 text-xs font-semibold",
                    active
                      ? "bg-[#0f2d45] text-white"
                      : "bg-white text-slate-600 hover:text-[#0f2d45]",
                    "border border-slate-200",
                  ].join(" ")}
                >
                  {c.key}
                </button>
              );
            })}
          </div>

          {/* content */}
          <div className="mt-10 grid gap-10 md:grid-cols-12 md:items-start">
            {/* left image */}
            <div className="md:col-span-4">
              <div className="overflow-hidden rounded-md">
                <img
                  src={activeData.image || "/images/vision.png"}
                  alt={activeData.key}
                  className="h-[320px] w-full object-cover"
                />
              </div>
            </div>

            {/* right text */}
            <div className="md:col-span-8">
              <h3 className="text-base font-extrabold text-[#0f2d45] md:text-lg">
                {activeData.title}
              </h3>

              <div className="mt-5 space-y-4 text-sm leading-7 text-slate-500">
                {(activeData.paras || []).map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          CAREERS (blue strip)
         ========================================================= */}
      <section className="relative w-full bg-[#142940] overflow-hidden">
        {/* Decorative Polygons */}
        <div className="absolute right-[20%] top-[10%] w-[100px] h-[100px] bg-[#f26522] z-0" style={{ clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)", transform: "rotate(45deg)" }}></div>
        <div className="absolute left-[5%] bottom-[0%] w-[120px] h-[100px] bg-[#f26522] z-0" style={{ clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)", transform: "rotate(-30deg) translate(-20px, 40px)" }}></div>
        <div className="absolute right-[15%] bottom-[5%] w-[80px] h-[80px] bg-[#f26522] z-0" style={{ clipPath: "polygon(0 0, 100% 50%, 0 100%)", transform: "rotate(-20deg)" }}></div>

        <div className="mx-auto max-w-6xl px-4 py-20 md:py-28 text-center text-white relative z-10">
          <p className="text-[13px] font-bold tracking-widest text-[#f26522] uppercase">
            {t("home_careers_label", "CAREERS")}
          </p>

          <h3 className="mt-4 text-[32px] font-bold md:text-[40px] text-white">
            {t("home_careers_title", "Join Our Team")}
          </h3>

          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-[1.8] text-white/90">
            {t("home_careers_desc", "We are always looking for talented, driven people who take pride in building something that lasts.")}
          </p>

          <Link
            to="/careers"
            className="mt-8 inline-flex items-center justify-center rounded-sm bg-[#f26522] px-8 py-3 text-[15px] font-bold text-white hover:bg-orange-600 transition-all"
          >
            {t("home_about_btn", "Submit Your CV")}
          </Link>
        </div>
      </section>

      {/* =========================================================
          CONTACT (left image + right content)
         ========================================================= */}
      <section className="w-full bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="grid gap-12 md:grid-cols-2 md:items-center md:gap-16">
            {/* LEFT: Polygon image + orange shard */}
            <div className="relative w-full aspect-[4/3] flex items-center justify-center">
              {/* Orange Decorative Shards behind the image */}
              <div className="absolute left-[-5%] top-[35%] w-[40%] h-[30%] bg-[#f26522] z-0" style={{ clipPath: "polygon(0 50%, 100% 0, 100% 100%)" }}></div>
              <div className="absolute right-[-5%] top-[15%] w-[60%] h-[70%] bg-[#f26522] z-0" style={{ clipPath: "polygon(0 0, 100% 30%, 50% 100%, 20% 80%)" }}></div>
              <div className="absolute left-[20%] bottom-[0%] w-[30%] h-[30%] bg-[#f26522] z-0" style={{ clipPath: "polygon(50% 0, 100% 100%, 0 100%)" }}></div>
              
              {/* Main Polygon Image */}
              <div className="absolute inset-0 z-10 overflow-hidden shadow-2xl" style={{ clipPath: "polygon(0% 25%, 100% 0%, 85% 100%, 15% 75%)" }}>
                <img
                  src="/images/vision.png"
                  alt="Contact"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>

            {/* RIGHT: Text content */}
            <div className="pl-0 md:pl-8">
              <p className="text-[14px] font-bold tracking-widest text-[#18324e] uppercase">
                {t("home_contact_label", "CONTACT US")}
              </p>

              <h3 className="mt-4 text-[32px] font-bold text-[#18324e] md:text-[40px]">
                {t("home_contact_title", "How can we help?")}
              </h3>

              <p className="mt-5 max-w-lg text-[15.5px] leading-relaxed text-[#555]">
                {t("home_contact_desc", "Every great project starts with a conversation. Whether you have a fully scoped tender or just an early-stage idea, our team is ready to listen, advise, and find the right solution for you.")}
              </p>

              <Link
                to="/contact"
                className="mt-8 inline-flex rounded-sm bg-[#f26522] px-8 py-3 text-[15px] font-bold text-white hover:bg-orange-600 transition-all"
              >
                {t("home_contact_btn", "Send Message")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          Newsletter subscribe (light gray section)
         ========================================================= */}
      <section className="w-full bg-[#f8f9fa] py-20">
        <div className="mx-auto max-w-4xl px-4">
          <h3 className="text-center text-[28px] leading-tight font-bold text-[#18324e] md:text-[34px]">
            {t("Subscribe to our newsletter...")}
          </h3>

          <div className="mx-auto mt-10 flex max-w-2xl flex-col gap-4 md:flex-row md:items-center">
            <input
              type="email"
              placeholder={t("newsletter_placeholder")}
              className="h-[52px] w-full flex-1 rounded-sm border border-slate-300 bg-transparent px-5 text-[15px] text-[#555] outline-none focus:border-[#f26522] focus:ring-1 focus:ring-[#f26522] placeholder:text-[#999]"
            />
            <button className="h-[52px] rounded-sm bg-[#f26522] px-10 text-[15px] font-bold tracking-wide text-white hover:bg-orange-600 transition-all">
              {t("SUBSCRIBE")}
            </button>
          </div>

          <div className="mx-auto mt-6 flex max-w-2xl items-center justify-center gap-3 text-[13px] text-[#555]">
            <input type="checkbox" className="h-4 w-4 rounded-sm border-slate-300 text-[#f26522] focus:ring-[#f26522]" />
            <p>
              {t("newsletter_agreement", "By subscribing, you agree to our terms & conditions and privacy policy. You may unsubscribe anytime.")}
            </p>
          </div>
        </div>
      </section>

      {/* Quick Links Row (White Background) */}
      <section className="w-full bg-white py-12 border-b border-slate-100">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
            {[
              { label: t("Executive Management"), to: "/management" },
              { label: t("Group Structure"), to: "/group-structure" },
              { label: t("Homepage"), to: "/" },
            ].map((x) => (
              <Link key={x.label} to={x.to} className="group inline-flex items-center gap-3">
                <span className="inline-flex h-[42px] w-[42px] items-center justify-center rounded-full border border-[#f26522] text-[#f26522] group-hover:bg-[#f26522] group-hover:text-white transition-all">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </span>
                <span className="text-[15.5px] font-bold text-[#18324e]">{x.label}</span>
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
          src={bottomBanner?.imageUrls?.[0] ? getImageUrl(bottomBanner.imageUrls[0]) : "/images/panel.png"}
          alt="For the world"
          className="h-[360px] w-full object-cover md:h-[440px]"
          onError={(e) => { e.target.src = "/images/hero.png" }}
        />
        <div className="absolute inset-0 bg-[#0f2d45]/55" />

        <div className="absolute inset-0">
          <div className="mx-auto flex h-full max-w-6xl items-center px-4">
            <div className="max-w-3xl">
              <h3 className="text-3xl font-extrabold text-white md:text-5xl uppercase tracking-tighter">
                {t(bottomBanner?.headline) || t("home_bottom_title")}
              </h3>

              <p className="mt-5 text-sm leading-7 text-white/80 md:text-base font-medium whitespace-pre-line">
                {t(bottomBanner?.subHeadline) || t("home_bottom_desc")}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
