import React, { useEffect, useMemo, useState } from "react";
import { http } from "../api/http";
import { useTranslation } from "react-i18next";

export default function SustainabilityCarousel() {
  const { t, i18n } = useTranslation();
  const slides = useMemo(
    () => [
      {
        no: "01",
        title: t("sust_title_1", "Environmental Stewardship"),
        desc: t("sust_desc_1"),
      },
      {
        no: "02",
        title: t("sust_title_2", "Community Empowerment"),
        desc: t("sust_desc_2"),
      },
      {
        no: "03",
        title: t("sust_title_3", "Ethical Governance"),
        desc: t("sust_desc_3"),
      },
    ],
    [t]
  );

  const [dynamicSlides, setDynamicSlides] = useState([]);

  useEffect(() => {
    async function loadSlides() {
      try {
        const res = await Promise.all([
          http.get("/api/banners/home-sustainability-1").catch(() => ({ data: null })),
          http.get("/api/banners/home-sustainability-2").catch(() => ({ data: null })),
          http.get("/api/banners/home-sustainability-3").catch(() => ({ data: null })),
          http.get("/api/banners/home-sustainability-4").catch(() => ({ data: null })),
        ]);
        
        const mapped = res.map((r, i) => {
          if (r.data) {
            return {
              no: `0${i + 1}`,
              title: i18n.exists(r.data.headline) ? t(r.data.headline) : (slides[i] ? slides[i].title : ""),
              desc: i18n.exists(r.data.subHeadline) ? t(r.data.subHeadline) : (slides[i] ? slides[i].desc : ""),
            };
          }
          return slides[i];
        }).filter(Boolean);
        setDynamicSlides(mapped);
      } catch (e) {
        setDynamicSlides(slides);
      }
    }
    loadSlides();
  }, []);

  const currentSlides = dynamicSlides.length > 0 ? dynamicSlides : slides;

  const [active, setActive] = useState(0);

  const prev = () => setActive((p) => (p - 1 + currentSlides.length) % currentSlides.length);
  const next = () => setActive((p) => (p + 1) % currentSlides.length);

  // ✅ optional auto slide (same feel as PDF carousel)
  useEffect(() => {
    const t = setInterval(() => next(), 3500);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSlides.length]);

  return (
    <section className="w-full bg-white">
      <div className="w-full bg-[#f26522] text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          {/* TOP SECTION */}
          <div className="max-w-4xl">
            <p className="text-[13px] font-bold tracking-widest text-white uppercase">
              {t("SUSTAINABILITY SECTION", "SUSTAINABILITY POLICY")}
            </p>

            <h3 className="mt-4 text-[28px] font-bold leading-snug md:text-[34px] text-white">
              {t("SUSTAINABILITY POLICY", "Building responsibly for today and tomorrow")}
            </h3>
            
            <p className="mt-5 text-[15.5px] leading-[1.8] text-white/95 md:max-w-3xl">
              {t("sust_subtitle", "At Gulf Al Olaya, sustainability is not an afterthought it is built into how we work. We are committed to delivering projects that are efficient, responsible, and aligned with Saudi Arabia's Vision 2030 goals for a greener and more sustainable future.")}
            </p>
          </div>

          {/* PROGRESS LINE (3 segments) */}
          <div className="mt-16 hidden md:block">
            <div className="grid grid-cols-3 gap-2">
              {currentSlides.map((_, idx) => (
                <div
                  key={idx}
                  className={[
                    "h-[2px] w-full transition-colors duration-500",
                    idx === active ? "bg-white" : "bg-white/30",
                  ].join(" ")}
                />
              ))}
            </div>
          </div>

          {/* CONTENT ROW */}
          <div className="mt-12 md:mt-16 flex items-center justify-between">
            {/* LEFT ARROW */}
            <div className="hidden md:block">
              <button
                type="button"
                onClick={prev}
                className="inline-flex h-[64px] w-[64px] items-center justify-center rounded-full border border-white hover:bg-white/10 transition-colors"
                aria-label="Previous"
              >
                <svg width="28" height="28" viewBox="0 0 24 24" strokeWidth="1.2" stroke="white" fill="none">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                </svg>
              </button>
            </div>

            {/* CENTER TEXT */}
            <div className="flex-1 flex justify-center">
              <div className="w-full max-w-2xl text-left px-4 md:px-8 min-h-[160px]">
                <p className="text-[16px] font-bold text-white opacity-95">
                    {currentSlides[active]?.no}
                </p>

                <h4 className="mt-2 text-[22px] font-bold text-white md:text-[24px]">
                  {currentSlides[active]?.title}
                </h4>

                <p className="mt-4 text-[15.5px] leading-[1.8] text-white/95 whitespace-pre-line">
                  {currentSlides[active]?.desc}
                </p>
              </div>
            </div>

            {/* RIGHT ARROW */}
            <div className="hidden md:block">
              <button
                type="button"
                onClick={next}
                className="inline-flex h-[64px] w-[64px] items-center justify-center rounded-full border border-white hover:bg-white/10 transition-colors"
                aria-label="Next"
              >
                <svg width="28" height="28" viewBox="0 0 24 24" strokeWidth="1.2" stroke="white" fill="none">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
              </button>
            </div>
          </div>

          {/* MOBILE CONTROLS */}
          <div className="mt-10 flex items-center justify-between md:hidden px-4">
            <button
              type="button"
              onClick={prev}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white"
              aria-label="Previous"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" fill="none">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
              </svg>
            </button>

            <div className="flex gap-2">
              {currentSlides.map((_, idx) => (
                <span
                  key={idx}
                  className={[
                    "h-[2px] w-8",
                    idx === active ? "bg-white" : "bg-white/30",
                  ].join(" ")}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={next}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white"
              aria-label="Next"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" fill="none">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
