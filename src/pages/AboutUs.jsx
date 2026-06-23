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
        key: t("GULF AL OLAYA", "GULF AL OLAYA"),
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
      <section className="relative w-full min-h-[650px] md:min-h-screen overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroBanner?.imageUrls?.[0] ? getImageUrl(heroBanner.imageUrls[0]) : "/images/abouthero.png"}
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
            <div className="flex min-h-[650px] items-center md:min-h-screen pt-24 md:pt-32 pb-20">
              <div className="max-w-4xl">
                <p className="text-sm font-semibold text-[#f26522]">{t("about_hero_label", "About Gulf Al Olaya")}</p>

                <h1 className="mt-4 text-[32px] font-bold leading-[1.2] text-white sm:text-4xl md:text-5xl lg:text-6xl tracking-tight max-w-4xl">
                  {t(heroBanner?.headline) || t("about_hero_title", "A Saudi company. A global standard.")}
                </h1>

                <div className="mt-6 max-w-3xl space-y-4">
                  <p className="text-[17px] font-light leading-relaxed text-white/90 whitespace-pre-line">
                    {t(heroBanner?.subHeadline) || t("about_hero_desc1")}
                  </p>
                  <p className="text-[17px] font-light leading-relaxed text-white/90">
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
      <section className="relative w-full bg-white overflow-hidden py-20 md:py-28">
        {/* Decorative Wireframe Triangles */}
        <svg className="absolute left-[-2%] top-[10%] pointer-events-none opacity-80" width="300" height="180" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polygon points="0,50 100,0 80,100" fill="none" stroke="#f26522" strokeWidth="0.5" />
        </svg>
        <svg className="absolute right-[-5%] top-[0%] pointer-events-none opacity-80" width="350" height="350" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polygon points="30,100 100,10 100,100" fill="none" stroke="#f26522" strokeWidth="0.5" />
        </svg>

        <div className="relative z-10 mx-auto max-w-5xl px-4 text-center">
          <h2 className="text-[36px] font-bold text-[#18324e] md:text-[48px] tracking-tight">
            {t(purposeBanner?.headline) || t("about_story_title", "Our Purpose. Our 'Why'.")}
          </h2>

          <div className="mx-auto mt-6 flex flex-col items-center gap-4 text-center">
            <p className="text-[15.5px] font-semibold text-[#18324e]">
              {t("about_story_subtitle", "We exist to build infrastructure that Saudi Arabia is proud of.")}
            </p>
            <p className="max-w-3xl text-[15.5px] leading-relaxed text-[#555]">
              {t(purposeBanner?.subHeadline) || t("about_story_desc", "Gulf Al Olaya was built on a simple but powerful idea that quality construction should not be reserved for the largest corporations. From our earliest projects to our most complex multi-discipline deliveries, we have consistently proven that a focused, skilled, and client-first team will outperform size every time.")}
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          Vision & Values (left image + right text)
         ========================================================= */}
      <section className="relative w-full bg-white pb-20 md:pb-28 overflow-hidden">
        {/* Decorative Bottom Right Triangle */}
        <svg className="absolute right-[5%] bottom-[0%] pointer-events-none opacity-80" width="150" height="200" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polygon points="50,0 100,100 0,100" fill="none" stroke="#f26522" strokeWidth="0.5" />
        </svg>

        <div className="relative z-10 mx-auto max-w-6xl px-4">
          <div className="grid gap-12 md:grid-cols-12 md:items-center">
            {/* left image with shards */}
            <div className="md:col-span-6 flex justify-center">
              <div className="relative w-full max-w-lg aspect-[4/3] flex items-center justify-center">
                {/* Orange Shards behind the image */}
                <div className="absolute left-[-5%] top-[10%] w-[35%] h-[30%] bg-[#f26522] z-0" style={{ clipPath: "polygon(0 50%, 100% 0, 100% 100%)" }}></div>
                <div className="absolute right-[-5%] bottom-[10%] w-[45%] h-[40%] bg-[#f26522] z-0" style={{ clipPath: "polygon(0 0, 100% 30%, 50% 100%, 20% 80%)" }}></div>

                {/* Main Polygon Image */}
                <div className="absolute inset-0 z-10 overflow-hidden shadow-2xl" style={{ clipPath: "polygon(0% 15%, 100% 0%, 90% 100%, 10% 85%)" }}>
                  <img
                    src={visionBanner?.imageUrls?.[0] ? getImageUrl(visionBanner.imageUrls[0]) : "/images/hero2.png"}
                    alt="Vision"
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
              </div>
            </div>

            {/* right content */}
            <div className="md:col-span-6 pl-0 md:pl-8">
              <p className="text-[14px] font-bold tracking-widest text-[#f26522] uppercase">
                {t("about_vision_subtitle", "VISION & VALUES")}
              </p>

              <h3 className="mt-4 text-[26px] font-bold text-[#18324e] md:text-[34px] md:leading-[1.2] tracking-tight">
                {t("about_vision_title", "The direction we are going:")}
              </h3>

              <p className="mt-6 text-[15.5px] leading-relaxed text-[#555]">
                {t("vision_desc", "Our vision is to be the Kingdom's most trusted name in electro-mechanical and multi-discipline contracting, recognized not just for what we build, but for how we build it. We are growing with purpose, investing in our people, our systems, and our capabilities to meet the demands of Vision 2030 and beyond.")}
              </p>

              <p className="mt-8 text-[15px] font-bold text-[#f26522]">
                {t("values_intro", "Our Values:")}
              </p>

              <ul className="mt-6 space-y-4 max-w-xl text-[15px] leading-relaxed text-[#555]">
                {[
                  t("value_integrity", "Integrity in every engagement"),
                  t("value_excellence", "Technical excellence on every site"),
                  t("value_safety", "Safety without compromise"),
                  t("value_partnership", "Client partnership, not just delivery"),
                  t("value_saudization", "Saudization and local investment")
                ].map((val, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-[#f26522] mt-1.5 flex-none text-lg leading-none">•</span>
                    <span>{val}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          KEY FACTS (Orange section + slider)
         ========================================================= */}
      <section className="w-full bg-[#f26522]">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="grid gap-12 md:grid-cols-12">
            {/* Left Column */}
            <div className="md:col-span-5 flex flex-col justify-between">
              <div>
                <p className="text-[13px] font-bold tracking-widest text-white/70 uppercase">
                  {t("KEY FACTS")}
                </p>
                <h3 className="mt-4 text-[26px] font-bold leading-tight text-white md:text-[34px]">
                  {t(keyFactsDynamic?.headline) || t("key_facts_intro", "Our clients and partners trust us to deliver beyond their expectations.")}
                </h3>
              </div>
              
              <div className="mt-8">
                <div className="h-[1px] w-full bg-white/20 mb-6" />
                <div className="flex gap-4">
                  <button
                    onClick={() => setKfIdx((p) => (p - 1 + keyFactsSlides.length) % keyFactsSlides.length)}
                    className="inline-flex h-[52px] w-[52px] items-center justify-center rounded-full border border-white/30 text-white hover:bg-white/10 hover:border-white transition-colors"
                    aria-label="Previous key fact"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" /></svg>
                  </button>
                  <button
                    onClick={() => setKfIdx((p) => (p + 1) % keyFactsSlides.length)}
                    className="inline-flex h-[52px] w-[52px] items-center justify-center rounded-full border border-white/30 text-white hover:bg-white/10 hover:border-white transition-colors"
                    aria-label="Next key fact"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" /></svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="md:col-span-7 bg-white/5 p-8 md:p-12 relative flex flex-col justify-center min-h-[300px]">
              {/* Watermark quote symbol */}
              <span className="absolute top-4 left-6 text-[120px] font-serif text-white/10 select-none pointer-events-none leading-none">“</span>
              
              <div className="relative z-10">
                <p className="text-[13px] font-bold text-white/50 tracking-widest">
                  {String(kfIdx + 1).padStart(2, "0")}
                </p>
                <h4 className="mt-4 text-[22px] font-bold text-white md:text-[28px]">
                  {keyFactsSlides[kfIdx].title}
                </h4>
                <p className="mt-4 text-[15.5px] leading-relaxed text-white/80 whitespace-pre-line">
                  {keyFactsSlides[kfIdx].desc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          Countries tabs + content (white section)
         ========================================================= */}
      <section className="w-full bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          {/* Country tabs - flat text links like Figma */}
          <div className="flex flex-wrap items-center gap-0 border-b border-slate-200">
            {countries.map((c) => {
              const active = c.key === activeCountry;
              return (
                <button
                  key={c.key}
                  onClick={() => setActiveCountry(c.key)}
                  className={[
                    "px-6 py-3 text-[13px] font-bold tracking-widest uppercase transition-all duration-300 rounded-sm mr-2 mb-2",
                    active
                      ? "bg-[#f26522] text-white shadow-sm"
                      : "bg-transparent text-slate-500 hover:text-[#18324e] hover:bg-slate-50",
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
              <div className="overflow-hidden rounded-sm shadow-md aspect-[4/3]">
                <img
                  src={activeData.image || "/images/vision.png"}
                  alt={activeData.key}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>

            {/* right text */}
            <div className="md:col-span-8 pl-0 md:pl-6">
              <h3 className="text-[20px] font-bold text-[#18324e]">
                {activeData.title}
              </h3>

              <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-[#555]">
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
      <section className="relative w-full bg-[#18324e] overflow-hidden">
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
                  src="/images/How can i help.png"
                  alt="Contact"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>

            {/* RIGHT: Text content */}
            <div className="pl-0 md:pl-8">
              <p className="text-[13px] font-bold tracking-widest text-[#f26522] uppercase">
                {t("home_contact_label", "CONTACT US")}
              </p>

              <h3 className="mt-4 text-[26px] font-bold text-[#18324e] md:text-[34px] md:leading-[1.2] tracking-tight">
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
            {t("Subscribe to our newsletter to receive all the latest news")}
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
      <section className="relative w-full min-h-[500px] flex items-center justify-center overflow-hidden">
        <img
          src={bottomBanner?.imageUrls?.[0] ? getImageUrl(bottomBanner.imageUrls[0]) : "/images/panel.png"}
          alt="For the world"
          className="absolute inset-0 h-full w-full object-cover"
          onError={(e) => { e.target.src = "/images/hero.png" }}
        />
        <div className="absolute inset-0 bg-[#0f2d45]/60" />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-20 text-center">
          <div className="mx-auto max-w-4xl">
            <h3 className="text-[34px] font-bold leading-tight text-white md:text-[48px] tracking-wide">
              "{t(bottomBanner?.headline) || t("home_bottom_title")}"
            </h3>

            <p className="mx-auto mt-6 max-w-3xl text-[18px] leading-[1.8] text-white/90 whitespace-pre-line font-medium">
              {t(bottomBanner?.subHeadline) || t("home_bottom_desc")}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
