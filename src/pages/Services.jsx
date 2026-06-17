import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSEO } from "../hooks/useSEO";
import { http, getImageUrl } from "../api/http";

export default function Services() {
    const { t, i18n } = useTranslation();
    useSEO("PAGE", "services");
    const [heroBanner, setHeroBanner] = useState(null);
    const [servicesList, setServicesList] = useState([]);
    useEffect(() => {
        async function loadData() {
            try {
                const [bannerRes, servicesRes] = await Promise.all([
                    http.get("/api/banners/services").catch(() => ({ data: null })),
                    http.get("/api/services").catch(() => ({ data: [] }))
                ]);
                setHeroBanner(bannerRes.data);
                setServicesList(Array.isArray(servicesRes.data) ? servicesRes.data : []);
            } catch (err) { }
        }
        loadData();
    }, [t, i18n.language]);

  return (
    <div className="bg-white">
      {/* HERO SECTION */}
      <section className="relative w-full min-h-[650px] md:min-h-screen overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroBanner?.imageUrls?.[0] ? getImageUrl(heroBanner.imageUrls[0]) : "/images/group.png"}
            alt="Services Hub"
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => { e.target.src = "/images/panel.png" }}
          />
        </div>
        <div className="absolute inset-0 bg-black/50" />
        <Header overlay />
        <div className="relative z-10 flex min-h-[650px] items-center md:min-h-screen pt-24 md:pt-32 pb-20">
          <div className="mx-auto max-w-6xl px-4 w-full">
            <div className="max-w-4xl">
              <p className="text-xs font-black tracking-[0.3em] text-orange-400 uppercase mb-4">
                {t("services_offerings_label", "Our Offerings")}
              </p>
              <h1 className="text-4xl font-black text-white md:text-7xl uppercase tracking-tighter leading-[0.9] whitespace-pre-line">
                {t("services_offerings_title", "A Saudi company. A global standard.")}
              </h1>
              <p className="mt-4 text-[15px] md:text-lg font-bold text-white/90">
                {t("services_offerings_sub", "Engineering · Fabrication · Electrification · Construction")}
              </p>
              <p className="mt-8 max-w-2xl text-[14px] md:text-lg text-white/85 font-medium leading-relaxed whitespace-pre-line">
                {t("services_offerings_desc", "Built on trust, driven by commitment we show up, solve problems, and deliver every project on time, in scope, and in budget.")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO SECTION */}
      <section className="bg-white pt-16 md:pt-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="max-w-3xl">
            <h2 className="text-[32px] font-bold text-[#18324e] md:text-[45px] leading-tight">
              {t("services_hero_title", "Structured for global impact.")}
            </h2>
            <p className="mt-6 text-[16px] md:text-[18px] leading-relaxed text-[#555]">
              {t("services_hero_desc", "Our diversified group structure allows us to lead in multiple sectors while maintaining the agility of a focused engineering firm.")}
            </p>
          </div>
        </div>
      </section>

      {/* CORE DIVISIONS */}
      <section className="bg-white pb-16 md:pb-24 overflow-hidden">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-col gap-24 md:gap-32">
            {(servicesList.length > 0 ? servicesList : [
                {
                  id: "mechanical",
                  title: t("Mechanical Division"),
                  image: "https://images.unsplash.com/photo-1504328332780-bc4bfcd4409c?auto=format&fit=crop&q=80&w=800",
                  desc: t("services_mech_desc")
                },
                {
                  id: "electrical",
                  title: t("Electrical Division"),
                  image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&q=80&w=800",
                  desc: t("services_elec_desc")
                },
                {
                  id: "transmission",
                  title: t("Transmission Lines"),
                  image: "https://images.unsplash.com/photo-1548676613-97b567793d4b?auto=format&fit=crop&q=80&w=800",
                  desc: t("services_trans_desc")
                },
                {
                  id: "piping",
                  title: t("Industrial Piping"),
                  image: "https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&q=80&w=800",
                  desc: t("services_piping_desc")
                }
              ]).map((sector, idx) => {
                const isEven = idx % 2 === 0;
                
                // Get decorations cyclically if there are more items than decorations
                const decIdx = idx % 5;

                return (
                    <div key={idx} className="relative grid gap-10 md:grid-cols-2 md:items-center md:gap-16">
                        {/* Decorations */}
                        {decIdx === 0 && (
                          <div className="absolute right-[-3%] top-[5%] w-[8%] h-[25%] bg-[#f26522] z-0" style={{ clipPath: "polygon(0 50%, 100% 0, 100% 100%)" }}></div>
                        )}
                        {decIdx === 1 && (
                          <>
                            <svg className="absolute left-[55%] top-[-10%] pointer-events-none opacity-80" width="120" height="120" viewBox="0 0 100 100" preserveAspectRatio="none">
                                <polygon points="50,0 100,100 0,100" fill="none" stroke="#18324e" strokeWidth="0.5" />
                            </svg>
                            <svg className="absolute left-[-4%] bottom-[10%] pointer-events-none opacity-100 z-10" width="60" height="60" viewBox="0 0 100 100" preserveAspectRatio="none">
                                <polygon points="100,0 100,100 0,50" fill="#18324e" />
                            </svg>
                            <svg className="absolute right-[0%] bottom-[10%] pointer-events-none opacity-80" width="80" height="80" viewBox="0 0 100 100" preserveAspectRatio="none">
                                <polygon points="0,50 100,0 80,100" fill="none" stroke="#f26522" strokeWidth="0.5" />
                            </svg>
                          </>
                        )}
                        {decIdx === 2 && (
                          <>
                            <div className="absolute right-[5%] bottom-[-5%] w-[8%] h-[20%] bg-[#f26522] z-0" style={{ clipPath: "polygon(0 0, 100% 50%, 50% 100%)" }}></div>
                            <svg className="absolute left-[30%] bottom-[-15%] pointer-events-none opacity-80" width="130" height="130" viewBox="0 0 100 100" preserveAspectRatio="none">
                                <polygon points="50,0 100,100 0,100" fill="none" stroke="#18324e" strokeWidth="0.5" />
                            </svg>
                          </>
                        )}
                        {decIdx === 3 && (
                          <>
                            <svg className="absolute left-[30%] top-[-5%] pointer-events-none opacity-80" width="90" height="90" viewBox="0 0 100 100" preserveAspectRatio="none">
                                <polygon points="50,0 100,100 0,100" fill="none" stroke="#f26522" strokeWidth="0.5" />
                            </svg>
                            <div className="absolute right-[0%] top-[0%] w-[6%] h-[20%] bg-[#f26522] z-0" style={{ clipPath: "polygon(0 50%, 100% 0, 100% 100%)" }}></div>
                          </>
                        )}
                        {decIdx === 4 && (
                          <>
                            <svg className="absolute left-[-2%] bottom-[10%] pointer-events-none opacity-100 z-10" width="55" height="55" viewBox="0 0 100 100" preserveAspectRatio="none">
                                <polygon points="0,50 100,0 100,100" fill="#18324e" />
                            </svg>
                            <svg className="absolute right-[20%] bottom-[-15%] pointer-events-none opacity-80" width="110" height="110" viewBox="0 0 100 100" preserveAspectRatio="none">
                                <polygon points="50,0 100,100 0,100" fill="none" stroke="#18324e" strokeWidth="0.5" />
                            </svg>
                          </>
                        )}

                        {/* Text Block */}
                        <div className={`relative z-10 flex flex-col justify-center ${isEven ? 'order-1' : 'order-2 md:pl-10'}`}>
                            <h3 className="text-[28px] font-bold text-[#18324e] md:text-[34px] leading-tight">
                                {t(sector.name || sector.title)}
                            </h3>
                            <p className="mt-5 text-[15.5px] leading-relaxed text-[#555] max-w-lg">
                                {t(sector.description || sector.desc)}
                            </p>
                            <div className="mt-8">
                                <Link
                                    to={`/services/${sector.id || idx}`}
                                    className="inline-flex rounded-sm bg-[#f26522] px-6 py-2.5 text-[14px] font-bold text-white hover:bg-orange-600 transition-all"
                                >
                                    {t("Explore More")}
                                </Link>
                            </div>
                        </div>

                        {/* Image Placeholder */}
                        <div className={`relative z-10 flex items-center justify-center ${isEven ? 'order-2' : 'order-1'}`}>
                            <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[#e2e2e2] relative">
                                <img
                                    src={getImageUrl(sector.imageUrl || sector.image) || "/images/placeholder-blank.png"}
                                    alt={t(sector.name || sector.title)}
                                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                                    onError={(e) => { e.target.style.opacity = 0; }} 
                                />
                            </div>
                        </div>
                    </div>
                );
            })}
          </div>
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
            {t("blog_newsletter_title")}
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
              { label: t("nav_services"), to: "/services" },
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
