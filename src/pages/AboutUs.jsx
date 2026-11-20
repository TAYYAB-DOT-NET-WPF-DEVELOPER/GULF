import CompanyCallsToAction from "../components/CompanyCallsToAction";
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
    () => [1, 2, 3, 4].map((id) => ({
      id,
      title: t(`about_fact_title_${id}`, { defaultValue: t(`key_fact_${id}`) }),
      desc: t(`key_fact_${id}`),
    })),
    [t]
  );

  const [kfIdx, setKfIdx] = useState(0);

  // ====== COUNTRY TABS (Saudi/India/UK/Egypt/Spain) ======
  const countries = useMemo(
    () => [
      {
        id: "saudi",
        label: t("SAUDI ARABIA", "SAUDI ARABIA"),
        title: t("Contributing to saudi vision 2030"),
        image: "/images/countries/figma-saudi.webp",
        paras: [
          t("saudi_para_1"),
          t("saudi_para_2"),
        ],
      },
      {
        id: "india",
        label: t("INDIA"),
        title: t("Delivering quality projects in India"),
        image: "/images/countries/figma-india.webp",
        paras: [
          t("saudi_para_1"),
          t("saudi_para_2"),
          t("saudi_para_3"),
        ],
      },
      {
        id: "uk",
        label: t("UNITED KINGDOM", "UNITED KINGDOM"),
        title: t("Engineering excellence in the United Kingdom"),
        image: "/images/countries/figma-uk.webp",
        paras: [
          t("saudi_para_1"),
          t("saudi_para_2"),
        ],
      },
      {
        id: "egypt",
        label: t("EGYPT"),
        title: t("Expanding delivery capacity in Egypt"),
        image: "/images/countries/figma-egypt.webp",
        paras: [
          t("saudi_para_1"),
          t("saudi_para_2"),
        ],
      },
      {
        id: "spain",
        label: t("SPAIN"),
        title: t("Multi-sector work across Spain"),
        image: "/images/countries/figma-spain.webp",
        paras: [
          t("saudi_para_1"),
          t("saudi_para_2"),
        ],
      },
    ],
    [t]
  );

  const [activeCountry, setActiveCountry] = useState(countries[0].id);
  const activeData = countries.find((c) => c.id === activeCountry) || countries[0];

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
      <section className="relative w-full min-h-[650px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroBanner?.imageUrls?.[0] ? getImageUrl(heroBanner.imageUrls[0]) : "/images/figma-home-tower.jpg"}
            alt="About Hero"
            className="h-full w-full object-cover"
            draggable={false}
          />
        </div>

        {/* overlay */}
        <div className="absolute inset-0 bg-black/50 lg:bg-transparent lg:bg-[linear-gradient(90deg,rgba(0,0,0,.65),transparent)] rtl:lg:bg-[linear-gradient(270deg,rgba(0,0,0,.65),transparent)]" />

        {/* header over hero */}
        <Header overlay home />

        {/* content */}
        <div className="relative z-10">
          <div className="mx-auto max-w-[1232px] px-4">
            <div className="flex min-h-[650px] items-center pb-14 pt-24 lg:min-h-[min(66.667vw,960px)] lg:pb-0 lg:pt-5">
              <div className="max-w-4xl">
                <p className="text-base font-medium text-[#f17124]">{t("about_hero_label", "About Gulf Al Olaya")}</p>

                <h1 className="mt-5 max-w-[465px] text-[32px] font-bold leading-[1.2] text-white sm:text-4xl lg:mt-9 lg:text-[50px]">
                  {t(heroBanner?.headline) || t("about_hero_title", "A Saudi company. A global standard.")}
                </h1>

                <div className="mt-4 max-w-[765px] space-y-2">
                  <p className="text-base leading-7 text-white lg:text-[20px] whitespace-pre-line">
                    {t(heroBanner?.subHeadline) || t("about_hero_desc1")}
                  </p>
                  <p className="text-base leading-7 text-white lg:text-[20px]">
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
      <section className="relative w-full bg-white overflow-hidden py-12 lg:min-h-[390px] lg:py-9">
        {/* Decorative Wireframe Triangles */}
        <svg className="absolute left-[-2%] top-[10%] pointer-events-none opacity-80" width="300" height="180" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polygon points="0,50 100,0 80,100" fill="none" stroke="#f26522" strokeWidth="0.5" />
        </svg>
        <svg className="absolute right-[-5%] top-[0%] pointer-events-none opacity-80" width="350" height="350" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polygon points="30,100 100,10 100,100" fill="none" stroke="#f26522" strokeWidth="0.5" />
        </svg>

        <div className="relative z-10 mx-auto max-w-[1150px] px-4 text-center">
          <h2 className="text-[36px] font-bold text-[#18324e] lg:text-[54px] tracking-tight">
            {t(purposeBanner?.headline) || t("about_story_title", "Our Purpose. Our 'Why'.")}
          </h2>

          <div className="mx-auto mt-6 flex flex-col items-center gap-4 text-center">
            <p className="text-[15.5px] font-semibold text-[#18324e]">
              {t("about_story_subtitle", "We exist to build infrastructure that Saudi Arabia is proud of.")}
            </p>
            <p className="max-w-[1100px] text-base leading-snug text-[#3f3f3f] lg:text-[20px]">
              {t(purposeBanner?.subHeadline) || t("about_story_desc", "Gulf Al Olaya was built on a simple but powerful idea that quality construction should not be reserved for the largest corporations. From our earliest projects to our most complex multi-discipline deliveries, we have consistently proven that a focused, skilled, and client-first team will outperform size every time.")}
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          Vision & Values (left image + right text)
         ========================================================= */}
      <section className="relative w-full overflow-hidden bg-white pb-12 lg:min-h-[609px] lg:pb-6">
        {/* Decorative Bottom Right Triangle */}
        <svg className="absolute right-[5%] bottom-[0%] pointer-events-none opacity-80" width="150" height="200" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polygon points="50,0 100,100 0,100" fill="none" stroke="#f26522" strokeWidth="0.5" />
        </svg>

        <div className="relative z-10 mx-auto max-w-6xl px-4">
          <div className="grid gap-12 md:grid-cols-12 md:items-center">
            <img src={visionBanner?.imageUrls?.[0] ? getImageUrl(visionBanner.imageUrls[0]) : "/images/figma-about-vision.webp"}
              alt="Industrial site at sunset" className="mx-auto h-auto w-full max-w-[600px] md:col-span-6" />

            {/* right content */}
            <div className="md:col-span-6 min-w-0 lg:pl-8">
              <p className="text-lg font-bold text-[#16355d] uppercase">
                {t("about_vision_subtitle", "VISION & VALUES")}
              </p>

              <h3 className="mt-5 max-w-[430px] text-[26px] font-bold leading-tight text-[#f17124] lg:text-[40px]">
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
      <section aria-labelledby="about-key-facts-title" className="bg-[#f17124] text-white">
        <div className="mx-auto max-w-[1232px] px-4 py-12 lg:min-h-[743px] lg:py-[68px]">
          <p className="text-base font-bold uppercase lg:text-[20px]">{t("KEY FACTS")}</p>
          <h2 id="about-key-facts-title" className="mt-6 max-w-[730px] text-[32px] font-bold leading-[1.15] lg:mt-10 lg:text-[54px]">
            {t(keyFactsDynamic?.headline) || t("key_facts_intro")}
          </h2>
          <div className="mx-auto mt-10 grid max-w-[1130px] gap-3 lg:mt-14">
            <div aria-hidden="true" className="flex gap-2">
              {keyFactsSlides.map((fact, index) => (
                <span key={fact.id} className={`h-px flex-1 ${index === kfIdx ? "bg-white" : "bg-white/40"}`} />
              ))}
            </div>
            <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 sm:gap-5 lg:gap-[118px]">
              <button type="button" onClick={() => setKfIdx((kfIdx - 1 + keyFactsSlides.length) % keyFactsSlides.length)} aria-label="Previous key fact"
                className="grid size-10 place-items-center rounded-full border border-current text-2xl hover:bg-white/10 sm:size-14 lg:size-[102px] lg:text-5xl">←</button>
              <div aria-live="polite" className="min-w-0 py-5 lg:py-7">
                <p className="text-base font-medium lg:text-[20px]">{String(kfIdx + 1).padStart(2, "0")}</p>
                <h3 className="mt-3 text-xl font-bold leading-tight lg:text-[28px]">{keyFactsSlides[kfIdx].title}</h3>
                <p className="mt-4 text-base leading-snug lg:text-[24px]">{keyFactsSlides[kfIdx].desc}</p>
              </div>
              <button type="button" onClick={() => setKfIdx((kfIdx + 1) % keyFactsSlides.length)} aria-label="Next key fact"
                className="grid size-10 place-items-center rounded-full border border-current text-2xl hover:bg-white/10 sm:size-14 lg:size-[102px] lg:text-5xl">→</button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          Countries tabs + content (white section)
         ========================================================= */}
      <section className="w-full bg-white">
        <div className="mx-auto max-w-[1420px] px-4 py-10 xl:min-h-[853px] xl:pb-[60px] xl:pt-6">
          {/* Country tabs - flat text links like Figma */}
          <div className="flex flex-wrap items-center gap-2 xl:ms-11 xl:grid xl:max-w-[1040px] xl:grid-cols-[1.35fr_.9fr_1.5fr_.9fr_auto] xl:justify-items-start">
            {countries.map((c) => {
              const active = c.id === activeCountry;
              return (
                <button
                  key={c.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setActiveCountry(c.id)}
                  className={[
                    "min-h-12 rounded-lg px-3 text-sm font-medium uppercase transition-colors xl:text-[22px]",
                    active
                      ? "bg-[#f17124] text-white shadow-md"
                      : "bg-transparent text-slate-500 hover:text-[#18324e] hover:bg-slate-50",
                  ].join(" ")}
                >
                  {c.label}
                </button>
              );
            })}
          </div>

          {/* content */}
          <div className="mt-8 grid gap-7 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] xl:mt-[64px] xl:grid-cols-[417px_minmax(0,1fr)] xl:gap-[86px]">
            {/* left image */}
            <div className="w-full max-w-[417px]">
              <div className="overflow-hidden aspect-[417/640]">
                <img
                  src={activeData.image}
                  alt={activeData.label}
                  width="417"
                  height="640"
                  className="block h-full w-full object-cover"
                />
              </div>
            </div>

            {/* right text */}
            <div className="min-w-0">
              <h3 className="text-[20px] font-bold text-black xl:text-[24px]">
                {activeData.title}
              </h3>

              <div className="mt-5 space-y-5 text-base leading-7 text-black xl:mt-12 xl:space-y-14 xl:text-[20px]">
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
      <CompanyCallsToAction id="about" showContactLabel={false} />

      {/* =========================================================
          Newsletter subscribe (light gray section)
         ========================================================= */}
      <section className="mx-auto w-[calc(100%-2rem)] max-w-[1340px] bg-[#f6f6f6] py-12 md:w-[calc(100%-100px)] md:py-16 xl:grid xl:min-h-[445px] xl:items-center">
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
      <section className="w-full bg-white py-12 border-b border-slate-100 xl:grid xl:min-h-[203px] xl:items-center">
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
      <section className="relative w-full min-h-[480px] flex items-center justify-center overflow-hidden lg:min-h-[869px]">
        <img
          src={bottomBanner?.imageUrls?.[0] ? getImageUrl(bottomBanner.imageUrls[0]) : "/images/footer image.png"}
          alt="Gulf Al Olaya industrial operations"
          className="absolute inset-0 h-full w-full object-cover"
          onError={(e) => { e.target.src = "/images/hero.png" }}
        />


        <div className="relative z-10 mx-auto w-full max-w-[1320px] px-4 py-20 text-center">
          <div className="mx-auto max-w-[1280px]">
            <h3 className="text-[34px] font-bold leading-tight text-white md:text-[48px] tracking-wide">
              "{t(bottomBanner?.headline) || t("home_bottom_title")}"
            </h3>

            <p className="mx-auto mt-8 max-w-[1280px] text-[16px] leading-tight text-white lg:mt-24 lg:text-[30px]">
              {t(bottomBanner?.subHeadline) || t("home_bottom_desc")}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
