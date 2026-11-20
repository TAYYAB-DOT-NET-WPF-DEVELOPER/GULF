import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "../components/Header";
import { useSEO } from "../hooks/useSEO";

import serviceData from "../content/servicePages.json";


const IconMap = ({ name }) => {
  if (name === "design") return <svg className="w-8 h-8 text-[#f26522] mb-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>;
  if (name === "pm") return <svg className="w-8 h-8 text-[#f26522] mb-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>;
  if (name === "qa") return <svg className="w-8 h-8 text-[#f26522] mb-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>;
  return <svg className="w-8 h-8 text-[#f26522] mb-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>;
};

const serviceAliases = { "transmission-lines-2": "ohtl", "engineering-construction": "civil" };

export default function ServiceDetail() {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  useSEO("PAGE", "service-detail");

  const canonicalId = Object.hasOwn(serviceAliases, id) ? serviceAliases[id] : id;
  const serviceId = Object.hasOwn(serviceData, canonicalId) ? canonicalId : "mechanical";
  const data = serviceData[serviceId];

  // Active indices for carousels
  const [activePillarIdx, setActivePillarIdx] = useState(0);
  const [capIndex, setCapIndex] = useState(0);
  const [projectIndex, setProjectIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    setActivePillarIdx(0);
    setCapIndex(0);
    setProjectIndex(0);
  }, [id]);

  const isRTL = i18n.language === "ar" || i18n.language === "ur";

  // Navigation handlers
  const handlePrevPillar = () => {
    setActivePillarIdx((prev) => (prev === 0 ? data.pillars.length - 1 : prev - 1));
  };
  const handleNextPillar = () => {
    setActivePillarIdx((prev) => (prev === data.pillars.length - 1 ? 0 : prev + 1));
  };

  const handlePrevCap = () => {
    setCapIndex((prev) => (prev === 0 ? Math.max(0, data.capabilities.length - 2) : prev - 1));
  };
  const handleNextCap = () => {
    setCapIndex((prev) => (prev >= data.capabilities.length - 2 ? 0 : prev + 1));
  };

  // Featured Projects list
  const featuredProjects = [
    {
      title: "Zulfi Mosque & House Project",
      category: "Civil & Structural Works",
      desc: "Delivered complete civil and structural works for the Zulfi Mosque and adjacent residential project encompassing foundations, reinforced concrete frames, masonry, and architectural finishes.",
      image: "/images/project1.png"
    },
    {
      title: "Sultan Bin Abdul Aziz Humanitarian City",
      category: "External Utility & Infrastructure Works",
      desc: "Executed comprehensive infrastructure works for Sultan Bin Abdul Aziz Humanitarian City, requiring strict site management, safety compliance, and zero disruption to live facilities.",
      image: "/images/project2.png"
    },
    {
      title: "Al Af-MacDonald’s Fast Food Outlet",
      category: "Civil, Structural & Finishing Works",
      desc: "Completed a full turnkey civil, structural, and interior finishing package for this commercial fast food outlet, delivered on schedule to meet the client's operational launch timeline.",
      image: "/images/project3.png"
    }
  ];

  const handlePrevProject = () => {
    setProjectIndex((prev) => (prev === 0 ? featuredProjects.length - 1 : prev - 1));
  };
  const handleNextProject = () => {
    setProjectIndex((prev) => (prev === featuredProjects.length - 1 ? 0 : prev + 1));
  };

  // Determine page cover image
  const coverImage = data.coverImage;

  return (
    <div className="bg-white">
      <Header theme="light" />

      {/* HERO SECTION */}
      <section className="relative w-full bg-[#f8f9fa] py-20 md:py-32 overflow-hidden">
        <div className="absolute right-[-5%] top-0 h-full w-[30%] opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#18324e 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>
        <div className="mx-auto max-w-6xl px-4 relative z-10">
          <div className="grid gap-12 md:grid-cols-2 md:items-center md:gap-16">
            <div className="relative w-full aspect-square md:aspect-[4/5] flex justify-center items-center">
              {/* Shard Backdrops */}
              <div className="absolute w-[90%] h-[90%] bg-[#f26522]/10 z-0 ml-[10%] mt-[10%]" style={{ clipPath: "polygon(10% 0, 100% 15%, 85% 100%, 0 85%)" }}></div>
              <div className="absolute w-[90%] h-[90%] bg-[#0f2d45] z-0 ml-[5%] mt-[5%]" style={{ clipPath: "polygon(10% 0, 100% 15%, 85% 100%, 0 85%)" }}></div>
              <div className="absolute w-[90%] h-[90%] z-10 overflow-hidden shadow-2xl" style={{ clipPath: "polygon(10% 0, 100% 15%, 85% 100%, 0 85%)" }}>
                <img src={coverImage} alt="Service Cover" className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
              </div>
            </div>
            <div className={`${isRTL ? "pr-0 md:pr-8" : "pl-0 md:pl-8"}`}>
              <p className="text-[13px] font-bold tracking-widest text-[#f26522] uppercase">{t("service_what_we_do")}</p>
              <h1 className="mt-4 text-[36px] font-bold text-[#0f2d45] md:text-[48px] leading-tight tracking-tight">{t(data.title)}</h1>
              <p className="mt-6 text-[15.5px] leading-relaxed text-[#555] font-medium">{t(data.heroDesc)}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT SECTION & 2x2 GRID */}
      <section className="w-full bg-white py-20 md:py-32 relative">
        {/* Subtle decorative Shard */}
        <div className="absolute right-0 top-1/4 w-16 h-32 bg-orange-500/5 pointer-events-none" style={{ clipPath: "polygon(100% 0, 0 50%, 100% 100%)" }} />
        
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-16 md:grid-cols-2 md:items-start">
            <div className={`${isRTL ? "pl-0 md:pl-12" : "pr-0 md:pr-12"}`}>
              <p className="text-[15px] font-bold text-[#f26522] tracking-wider uppercase">{t(data.subtitle)}</p>
              <h2 className="mt-4 text-[32px] font-bold text-[#0f2d45] md:text-[40px] leading-tight tracking-tight">{t(data.contentTitle)}</h2>
              <div className="mt-6 space-y-5 text-[15.5px] leading-relaxed text-[#555]">
                {data.intro.map((paragraph) => <p key={paragraph}>{t(paragraph)}</p>)}
              </div>
            </div>
            
            {/* Grid display with border-lines generated by gap-px */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-slate-200 border border-slate-200 rounded-lg overflow-hidden shadow-sm">
              {data.gridItems.map((item, idx) => (
                <div key={idx} className="p-8 bg-white hover:bg-slate-50 transition-colors duration-300">
                  <IconMap name={item.icon} />
                  <h3 className="text-[18px] font-bold text-[#0f2d45] leading-snug tracking-tight">{t(item.title)}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="w-full bg-white pb-16 md:pb-24 pt-4 relative">
        <div className="absolute left-0 bottom-1/4 w-12 h-24 bg-[#0f2d45]/5 pointer-events-none" style={{ clipPath: "polygon(0 0, 100% 50%, 0 100%)" }} />
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-col gap-10 md:gap-14 max-w-2xl">
            <div className="grid grid-cols-[minmax(0,7rem)_minmax(0,1fr)] items-center gap-4 sm:grid-cols-[10rem_minmax(0,1fr)] md:grid-cols-[13.75rem_minmax(0,1fr)] md:gap-12">
              <span className="text-5xl font-bold leading-none tracking-tight text-[#f26522] sm:text-[72px] md:text-[96px]">365+</span>
              <span className="break-words text-sm font-semibold uppercase tracking-wide text-gray-500 sm:text-[18px] md:text-[22px]">{t("service_skilled_personnel", "Skilled Personnel")}</span>
            </div>
            <div className="grid grid-cols-[minmax(0,7rem)_minmax(0,1fr)] items-center gap-4 sm:grid-cols-[10rem_minmax(0,1fr)] md:grid-cols-[13.75rem_minmax(0,1fr)] md:gap-12">
              <span className="text-5xl font-bold leading-none tracking-tight text-[#f26522] sm:text-[72px] md:text-[96px]">36</span>
              <span className="break-words text-sm font-semibold uppercase tracking-wide text-gray-500 sm:text-[18px] md:text-[22px]">{t("service_completed_projects", "Completed Projects")}</span>
            </div>
            <div className="grid grid-cols-[minmax(0,7rem)_minmax(0,1fr)] items-center gap-4 sm:grid-cols-[10rem_minmax(0,1fr)] md:grid-cols-[13.75rem_minmax(0,1fr)] md:gap-12">
              <span className="text-5xl font-bold leading-none tracking-tight text-[#f26522] sm:text-[72px] md:text-[96px]">100%</span>
              <span className="break-words text-sm font-semibold uppercase tracking-wide text-gray-500 sm:text-[18px] md:text-[22px]">{t("service_client_focused", "Client-Focused")}</span>
            </div>
          </div>
        </div>
      </section>

      {/* MAJOR SECTORS SECTION */}
      <section className="w-full bg-[#f8f9fa] py-20 md:py-32 border-t border-slate-100 relative">
        {/* Shard Decoration */}
        <div className="absolute right-0 top-10 w-24 h-24 bg-orange-500/5 pointer-events-none blur-xl rounded-full" />
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
            <p className="text-[13px] font-bold tracking-widest text-[#f26522] uppercase">{t(data.sectorLabel)}</p>
            <h2 className="mt-4 text-[28px] font-bold text-[#0f2d45] md:text-[40px] leading-tight tracking-tight">{t(data.sectorTitle)}</h2>
            <p className="mt-5 text-[15.5px] leading-relaxed text-[#555] max-w-2xl mx-auto">{t(data.sectorDesc)}</p>
          </div>
          
          {/* Alternating Sectors List */}
          <div className="flex flex-col gap-24 md:gap-32">
            {data.sectors.map((sector, idx) => {
              const isEven = idx % 2 === 1;
              return (
                <div key={idx} className="grid gap-12 md:grid-cols-2 md:items-center">
                  <div className={`order-2 ${isEven ? "md:order-2 md:pl-10" : "md:order-1 md:pr-10"}`}>
                    <h3 className="text-[28px] font-bold text-[#0f2d45] md:text-[34px] leading-snug tracking-tight">{t(sector.title)}</h3>
                  {sector.subtitle && <p className="mt-2 font-semibold">{t(sector.subtitle)}</p>}
                    <p className="mt-5 text-[15.5px] leading-relaxed text-[#555] font-medium">{t(sector.desc)}</p>
                    <div className="mt-8">
                      <Link to="/contact" className="inline-flex rounded-sm bg-[#f26522] px-7 py-3 text-[14px] font-bold text-white hover:bg-orange-600 transition-all shadow-md shadow-orange-500/20">{t("service_get_quote")}</Link>
                    </div>
                  </div>
                  <div className={`order-1 ${isEven ? "md:order-1" : "md:order-2"}`}>
                    <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden bg-white shadow-xl hover:shadow-2xl transition-shadow duration-500 relative">
                      <img src={sector.image || "/images/vision.png"} alt={sector.title} className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PILLARS OF COMMITMENT */}
      <section className="w-full bg-[#f26522] py-20 md:py-32 overflow-hidden relative">
        {/* Shard design in background */}
        <div className="absolute left-[-10%] top-[-10%] w-[40%] h-[50%] bg-white/5 pointer-events-none" style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }} />
        
        <div className="mx-auto max-w-6xl px-4 relative z-10">
          <div className="grid gap-16 md:grid-cols-2 md:items-center">
            <div className="text-white">
              <p className="text-[13px] font-bold tracking-widest uppercase opacity-90">{t(data.pillarLabel || "service_pillars_label")}</p>
              <h2 className="mt-6 text-[36px] font-bold leading-tight md:text-[46px] tracking-tight">{t(data.pillarTitle || "service_pillars_title")}</h2>
              
              {/* Dynamic Pillar control arrows */}
              <div className="mt-12 flex flex-col items-start gap-4">
                <button 
                  onClick={handlePrevPillar}
                  className="inline-flex h-[54px] w-[54px] items-center justify-center rounded-full border border-white text-white hover:bg-white hover:text-[#f26522] transition-all duration-300"
                  aria-label="Previous Pillar"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
                </button>
                <div className="h-16 w-[1px] bg-white/30 ml-[27px]"></div>
                <button 
                  onClick={handleNextPillar}
                  className="inline-flex h-[54px] w-[54px] items-center justify-center rounded-full border border-white text-white hover:bg-white hover:text-[#f26522] transition-all duration-300"
                  aria-label="Next Pillar"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </button>
              </div>
            </div>
            
            {/* The active card display */}
            <div className="relative group">
              {data.pillars.map((pillar, idx) => (
                <div 
                  key={idx} 
                  className={`relative flex min-h-[20rem] flex-col justify-end overflow-hidden md:min-h-[26rem] rounded-lg bg-[#12273f] shadow-2xl transition-all duration-500 ${idx === activePillarIdx ? "opacity-100 scale-100" : "opacity-0 scale-95 hidden"}`}
                >
                  <img src={pillar.image || "/images/vision.png"} className="absolute inset-0 h-full w-full object-cover opacity-30 transition-transform duration-1000 group-hover:scale-105" alt={pillar.title} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12273f] via-transparent to-transparent z-10" />
                  <div className="relative z-20 p-5 sm:p-10">
                    <span className="text-[22px] font-bold text-[#f26522] mb-3 block">{pillar.id}</span>
                    <h3 className="text-[26px] font-bold text-white md:text-[32px] tracking-tight mb-4">{t(pillar.title)}</h3>
                    <p className="text-[16px] text-white/95 leading-relaxed max-w-sm font-medium">{t(pillar.desc)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CAPABILITIES & STRENGTHS */}
      <section className="w-full bg-white py-20 md:py-32 border-t border-slate-100 relative overflow-hidden">
        {/* Shard Decoration */}
        <div className="absolute left-0 top-1/3 w-16 h-32 bg-[#0f2d45]/5 pointer-events-none" style={{ clipPath: "polygon(0 0, 100% 50%, 0 100%)" }} />
        
        <div className="mx-auto max-w-6xl px-4 relative z-10">
          <div className="flex flex-col md:flex-row gap-16">
            <div className="md:w-1/3 flex flex-col justify-between">
              <div>
                <h2 className="text-[32px] font-bold text-[#0f2d45] md:text-[40px] leading-tight tracking-tight">{t(data.capLabel)}</h2>
                <p className="mt-6 text-[15.5px] text-[#555] leading-relaxed font-medium">{t(data.capDesc)}</p>
                <div className="mt-8">
                  <Link to="/contact" className="inline-flex rounded-sm bg-[#f26522] px-8 py-3.5 text-[15px] font-bold text-white hover:bg-orange-600 transition-colors shadow-md shadow-orange-500/20">{t("service_get_quote")}</Link>
                </div>
              </div>
              
              {/* Dynamic Capability slider arrows */}
              {data.capabilities.length > 2 && (
                <div className="mt-12 flex items-center gap-4">
                  <button 
                    onClick={handlePrevCap}
                    className="h-12 w-12 rounded-full border border-[#f26522] text-[#f26522] flex items-center justify-center hover:bg-[#f26522] hover:text-white transition-colors duration-300"
                    aria-label="Previous Capability"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 19l-7-7 7-7" /></svg>
                  </button>
                  <button 
                    onClick={handleNextCap}
                    className="h-12 w-12 rounded-full border border-[#f26522] text-[#f26522] flex items-center justify-center hover:bg-[#f26522] hover:text-white transition-colors duration-300"
                    aria-label="Next Capability"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 5l7 7-7 7" /></svg>
                  </button>
                </div>
              )}
            </div>
            
            {/* Slide subset rendering */}
            <div className="md:w-2/3">
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
                {data.capabilities.slice(capIndex, capIndex + 2).map((cap, idx) => (
                  <div key={idx} className="group relative isolate flex min-h-[17rem] items-end overflow-hidden rounded-lg bg-slate-200 shadow-lg sm:min-h-[22rem] transition-all duration-500 ease-in-out">
                    <img src={cap.image || "/images/vision.png"} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" alt={cap.title} />
                    <div className="relative w-full bg-gradient-to-t from-[#0f2d45]/95 via-[#0f2d45]/80 to-transparent p-5 pt-16 sm:p-8 sm:pt-20">
                      <h4 className="text-white font-bold text-xl mb-3 tracking-tight">{t(cap.title)}</h4>
                      <p className="text-white/80 text-[14px] leading-relaxed">{t(cap.desc)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="w-full bg-[#f8f9fa] py-20 md:py-28 relative">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-12">
            <p className="text-[14px] font-bold tracking-widest text-[#f26522] uppercase">{t("service_featured_projects")}</p>
            <h3 className="mt-4 text-[32px] font-bold text-[#18324e] md:text-[40px] tracking-tight">{t("service_view_latest_projects")}</h3>
            <p className="mt-4 max-w-2xl text-slate-600">{t(data.projectsDesc)}</p>
            <Link to="/projects" className="mt-4 inline-block font-semibold text-[#a54413]">{t("Discover All Projects")}</Link>
          </div>
          
          <div className="relative w-full flex flex-col md:flex-row md:items-center shadow-2xl rounded-2xl overflow-hidden bg-[#0f2d45] md:bg-white min-h-[500px]">
            {/* Background project image on left with polygon mask */}
            <div className="relative w-full h-64 md:absolute md:left-0 md:top-0 md:bottom-0 md:w-[50%] overflow-hidden z-10">
              <div className="w-full h-full clip-polygon-service-project overflow-hidden">
                <img src={featuredProjects[projectIndex].image} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" alt="Featured Project" />
              </div>
            </div>
            
            {/* Semi-transparent mobile overlay or right-side solid text block */}
            <div className="hidden md:block absolute inset-0 bg-transparent z-0" />
            
            <div className="relative z-20 w-full flex justify-end">
              <div className="w-full md:w-[55%] text-white md:text-[#18324e] p-8 md:p-16">
                <p className="text-[#f26522] font-bold text-[14px] tracking-widest uppercase mb-3">{featuredProjects[projectIndex].category}</p>
                <h4 className="text-[28px] md:text-[38px] font-bold mb-6 leading-tight tracking-tight text-white md:text-[#0f2d45]">{featuredProjects[projectIndex].title}</h4>
                <p className="text-white/80 md:text-gray-600 text-[15.5px] leading-relaxed mb-10 font-medium">{featuredProjects[projectIndex].desc}</p>
                
                {/* Sliders */}
                <div className="flex gap-4">
                  <button 
                    onClick={handlePrevProject}
                    className="h-12 w-12 rounded-full border border-white md:border-[#f26522] text-white md:text-[#f26522] flex items-center justify-center hover:bg-white/10 md:hover:bg-[#f26522] md:hover:text-white transition-all duration-300"
                    aria-label="Previous Project"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 19l-7-7 7-7" /></svg>
                  </button>
                  <button 
                    onClick={handleNextProject}
                    className="h-12 w-12 rounded-full border border-white md:border-[#f26522] text-white md:text-[#f26522] flex items-center justify-center hover:bg-white/10 md:hover:bg-[#f26522] md:hover:text-white transition-all duration-300"
                    aria-label="Next Project"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 5l7 7-7 7" /></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION ("How can we help?") */}
      <section className="w-full bg-white py-20 md:py-32 relative">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative w-full aspect-[4/3] flex items-center justify-center">
              {/* Decorative Shards */}
              <div className="absolute left-[-5%] top-[35%] w-[40%] h-[30%] bg-[#f26522] z-0" style={{ clipPath: "polygon(0 50%, 100% 0, 100% 100%)" }} />
              <div className="absolute right-[-5%] top-[15%] w-[60%] h-[70%] bg-[#f26522] z-0" style={{ clipPath: "polygon(0 0, 100% 30%, 50% 100%, 20% 80%)" }} />
              <div className="absolute left-[20%] bottom-[0%] w-[30%] h-[30%] bg-[#f26522] z-0" style={{ clipPath: "polygon(50% 0, 100% 100%, 0 100%)" }} />
              
              {/* Skewed main image container */}
              <div className="absolute inset-0 z-10 overflow-hidden shadow-2xl" style={{ clipPath: "polygon(0% 25%, 100% 0%, 85% 100%, 15% 75%)" }}>
                <img src="/images/How can i help.png" className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" alt="Contact Us" />
              </div>
            </div>
            <div className={`${isRTL ? "pr-0 md:pr-8" : "pl-0 md:pl-8"}`}>
              <p className="text-[13px] font-bold tracking-widest text-[#f26522] uppercase">{t("home_contact_label", "CONTACT US")}</p>
              <h3 className="mt-4 text-[26px] font-bold text-[#18324e] md:text-[36px] tracking-tight">{t("home_contact_title", "How can we help?")}</h3>
              <p className="mt-5 text-gray-600 text-[15.5px] leading-relaxed font-medium">{t("home_contact_desc", "Every great project starts with a conversation. Whether you have a fully scoped tender or just an early-stage idea, our team is ready to listen, advise, and find the right solution for you.")}</p>
              <div className="mt-8">
                <Link to="/contact" className="bg-[#f26522] text-white px-8 py-3.5 font-bold rounded-sm hover:bg-orange-600 transition-colors inline-block shadow-md shadow-orange-500/20">{t("home_contact_btn", "Send Message")}</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CENTER OF STRENGTH BANNER (Bottom Quote Banner) */}
      <section className="relative w-full min-h-[450px] flex items-center justify-center overflow-hidden">
        <img src="/images/panel.png" className="absolute inset-0 w-full h-full object-cover" alt="Solar Panels Banner" onError={(e) => { e.target.src = "/images/hero.png" }} />
        <div className="absolute inset-0 bg-[#0f2d45]/70"></div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl py-20">
          <h2 className="text-[34px] md:text-[48px] font-bold mb-6 tracking-wide">"{t("service_strength_banner_title", "The center of strength & excellence.")}"</h2>
          <p className="text-[18px] md:text-[20px] leading-relaxed opacity-95 max-w-3xl mx-auto font-medium">{t("service_strength_banner_desc", "From industrial piping to transmission lines, from civil works to MEP systems Gulf Al Olaya brings strength, skill, and commitment to every project we build.")}</p>
        </div>
      </section>
    </div>
  );
}

