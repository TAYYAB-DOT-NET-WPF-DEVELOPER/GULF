import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import BusinessLinesShowcase from "../components/BusinessLinesShowcase";
import SustainabilityCarousel from "../components/SustainabilityCarousel";
import Footer from "../components/Footer";
import { http, getImageUrl } from "../api/http";
import { useSEO } from "../hooks/useSEO";
import { useTranslation } from "react-i18next";

export default function Home() {
    const { t, i18n } = useTranslation();
    useSEO("PAGE", "home");

    // ✅ Featured slider data (Right blue card)
    const featuredSlides = useMemo(
        () => [
            {
                id: 1,
                title: t("Environmental Practices"),
                desc: t("home_hero_desc"),
            },
            {
                id: 2,
                title: t("Quality & Safety"),
                desc: t("home_hero_desc"),
            },
            {
                id: 3,
                title: t("Delivery Excellence"),
                desc: t("home_hero_desc"),
            },
        ],
        [t]
    );

    const [featuredIdx, setFeaturedIdx] = useState(0);

    // ✅ News cards (2x2)
    const newsItems = useMemo(
        () => [
            { date: "Dec 03, 2025 • Event", title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
            { date: "Nov 18, 2025 • Event", title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
            { date: "Nov 17, 2025 • Event", title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
            { date: "Nov 16, 2025 • Event", title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
        ],
        []
    );


    const [banner, setBanner] = useState(null);
    const [aboutBanner, setAboutBanner] = useState(null);
    const [statsExpBanner, setStatsExpBanner] = useState(null);
    const [statsMetricsBanner, setStatsMetricsBanner] = useState(null);
    const [logosBanner, setLogosBanner] = useState(null);
    const [bottomBanner, setBottomBanner] = useState(null);
    const [active, setActive] = useState(0);
    const [blogs, setBlogs] = useState([]);
    const [projects, setProjects] = useState([]);

    async function loadData() {
        try {
            const [
                bannerRes, blogsRes, projectsRes,
                aboutRes, statsExpRes, statsMetricsRes, logosRes, bottomRes
            ] = await Promise.all([
                http.get("/api/banners/home"),
                http.get("/api/blog"),
                http.get("/api/projects"),
                http.get("/api/banners/home-about").catch(() => ({ data: null })),
                http.get("/api/banners/home-stats-exp").catch(() => ({ data: null })),
                http.get("/api/banners/home-stats-metrics").catch(() => ({ data: null })),
                http.get("/api/banners/home-logos").catch(() => ({ data: null })),
                http.get("/api/banners/home-bottom").catch(() => ({ data: null })),
            ]);
            const fallbackProjects = [
                { id: 1, title: "proj_1_title", client: "proj_1_cat", status: "proj_1_desc", featuredImageUrl: "/images/hero.png" },
                { id: 2, title: "proj_2_title", client: "proj_2_cat", status: "proj_2_desc", featuredImageUrl: "/images/leadership.png" },
                { id: 3, title: "proj_3_title", client: "proj_3_cat", status: "proj_3_desc", featuredImageUrl: "/images/group.png" },
                { id: 4, title: "proj_4_title", client: "proj_4_cat", status: "proj_4_desc", featuredImageUrl: "/images/careers-hero.jpg" },
                { id: 5, title: "proj_5_title", client: "proj_5_cat", status: "proj_5_desc", featuredImageUrl: "/images/panel.png" },
                { id: 6, title: "proj_6_title", client: "proj_6_cat", status: "proj_6_desc", featuredImageUrl: "/images/industry-bg.png" },
            ];
            setBanner(bannerRes.data);
            setAboutBanner(aboutRes.data);
            setStatsExpBanner(statsExpRes.data);
            setStatsMetricsBanner(statsMetricsRes.data);
            setLogosBanner(logosRes.data);
            setBottomBanner(bottomRes.data);
            setBlogs(Array.isArray(blogsRes.data) ? blogsRes.data.slice(0, 4) : []);
            setProjects(Array.isArray(projectsRes.data) && projectsRes.data.length > 0 ? projectsRes.data : fallbackProjects);
        } catch (e) {
            console.error("Home data load error:", e);
        }
    }

    useEffect(() => {
        loadData();
    }, [t, i18n.language]);

    const slides = useMemo(() => {
        return banner?.imageUrls && banner.imageUrls.length > 0
            ? banner.imageUrls
            : ["/images/hero.png"];
    }, [banner]);

    useEffect(() => {
        if (!slides || slides.length <= 1) return;
        const t = setInterval(() => {
            setActive((prev) => (prev + 1) % slides.length);
        }, 4000);
        return () => clearInterval(t);
    }, [slides]);


    return (
        <div className="bg-white">
            {/* HERO CAROUSEL */}
            <section className="relative w-full min-h-[650px] md:min-h-screen overflow-hidden">
                {/* slides layer */}
                <div className="absolute inset-0">
                    {slides.map((src, idx) => (
                        <img
                            key={`${src}-${idx}`}
                            src={getImageUrl(src)}
                            alt={`Hero ${idx + 1}`}
                            className={[
                                "absolute inset-0 h-full w-full object-cover",
                                "transition-opacity duration-1000 ease-in-out",
                                idx === active ? "opacity-100" : "opacity-0",
                            ].join(" ")}
                            draggable={false}
                        />
                    ))}
                </div>

                {/* overlay */}
                <div className="absolute inset-0 bg-black/45" />

                {/* Header inside hero */}
                <Header overlay />

                {/* HERO CONTENT */}
                <div className="relative z-10">
                    <div className="mx-auto max-w-6xl px-4">
                        {/* Content adjusted for hero section */}
                        <div className="flex min-h-[650px] items-center md:min-h-screen">
                            <div className="max-w-5xl pt-24 md:pt-32 pb-20">
                                <h1 className="text-[28px] font-bold leading-[1.2] text-white sm:text-3xl md:text-4xl lg:text-5xl tracking-tight max-w-4xl">
                                    {t(banner?.headline) || t("home_hero_title1")}
                                    {(!banner?.headline && t("home_hero_title2")) && (
                                        <>
                                            <br className="hidden md:block" />
                                            <span className="text-white">
                                                {" "}{t("home_hero_title2")}
                                            </span>
                                        </>
                                    )}
                                    {banner?.subHeadline && (
                                        <>
                                            <br className="hidden md:block" />
                                            <span className="text-white">
                                                {" "}{t(banner.subHeadline)}
                                            </span>
                                        </>
                                    )}
                                </h1>

                                <p className="mt-6 max-w-2xl text-[17px] font-light leading-relaxed text-white/90">
                                    {banner?.ctaLink ? (
                                        banner.ctaLink.startsWith("http") ? (
                                            <a href={banner.ctaLink} target="_blank" rel="noopener noreferrer" className="text-white hover:text-orange-400 transition-colors underline underline-offset-4">
                                                {t("Learn More")}
                                            </a>
                                        ) : (
                                            <Link
                                                to={banner.ctaLink.includes(" ") ? "/services" : banner.ctaLink}
                                                className="text-white hover:text-orange-400 transition-colors underline underline-offset-4"
                                            >
                                                {banner.ctaLink.includes(" ") ? t("Explore More") : banner.ctaLink}
                                            </Link>
                                        )
                                    ) : (
                                        t("home_hero_desc")
                                    )}
                                </p>

                                <div className="mt-8">
                                    <Link
                                        to="/about"
                                        className="inline-flex rounded-md bg-orange-500 px-6 py-3 text-sm font-semibold text-white hover:bg-orange-600"
                                    >
                                        {t("home_hero_btn")}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="w-full bg-white">
                <div className="mx-auto max-w-6xl px-4">
                    <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 py-10 opacity-70">
                        {logosBanner?.imageUrls?.length > 0 ? (
                            logosBanner.imageUrls.map((src, idx) => (
                                <img
                                    key={idx}
                                    src={getImageUrl(src)}
                                    alt={`Client Logo ${idx}`}
                                    className="h-8 w-auto object-contain md:h-9"
                                />
                            ))
                        ) : (
                            <>
                                {/* placeholders - replace src with your real images */}
                                <img
                                    src="/images/ramada.png"
                                    alt="Ramada"
                                    className="h-8 w-auto object-contain md:h-9"
                                />
                                <img
                                    src="/images/tanfeeth.png"
                                    alt="Tanfeeth"
                                    className="h-8 w-auto object-contain md:h-9"
                                />
                                <img
                                    src="/images/client-3.png"
                                    alt="Client"
                                    className="h-8 w-auto object-contain md:h-9"
                                />
                                <img
                                    src="/images/client-4.png"
                                    alt="Client"
                                    className="h-8 w-auto object-contain md:h-9"
                                />
                                <img
                                    src="/images/uae-academy.png"
                                    alt="UAE Academy"
                                    className="h-8 w-auto object-contain md:h-9"
                                />
                            </>
                        )}
                    </div>
                </div>
            </section>

            <section className="relative w-full bg-[#18324e] z-20">
                {/* Optional watermark faint logo on the right */}
                <div className="absolute right-0 bottom-0 pointer-events-none opacity-5">
                    <svg width="400" height="400" viewBox="0 0 100 100" fill="currentColor" className="text-white">
                        <path d="M50 0 L100 50 L50 100 L0 50 Z" />
                    </svg>
                </div>

                <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
                    <div className="grid gap-12 md:grid-cols-12 md:items-center">
                        {/* Left Custom Collage */}
                        <div className="md:col-span-5 relative h-[350px] md:h-[450px] w-full">
                            {/* Poly 1: Small left triangle */}
                            <div
                                className="absolute top-[25%] left-[0%] w-[35%] h-[25%] bg-cover bg-center"
                                style={{
                                    backgroundImage: `url(${getImageUrl(aboutBanner?.imageUrls?.[1] || '/images/hero.png')})`,
                                    clipPath: "polygon(100% 0, 100% 100%, 0 50%)"
                                }}
                            />
                            {/* Poly 2: Large top-right angled shape */}
                            <div
                                className="absolute top-[0%] left-[25%] w-[75%] h-[65%] bg-cover bg-center"
                                style={{
                                    backgroundImage: `url(${getImageUrl(aboutBanner?.imageUrls?.[0] || '/images/panel.png')})`,
                                    clipPath: "polygon(15% 15%, 100% 0, 75% 100%, 0 85%)"
                                }}
                            />
                            {/* Poly 3: Bottom triangle extending downwards */}
                            <div
                                className="absolute top-[65%] left-[20%] w-[50%] h-[55%] bg-cover bg-center z-20"
                                style={{
                                    backgroundImage: `url(${getImageUrl(aboutBanner?.imageUrls?.[2] || '/images/industry-bg.png')})`,
                                    clipPath: "polygon(5% 0, 95% 15%, 50% 100%)"
                                }}
                            />
                        </div>

                        {/* Right Content */}
                        <div className="md:col-span-7 md:pl-8 relative z-10">
                            <p className="text-[15px] font-bold text-[#f26522]">
                                {t("nav_about_us", "About Us")}
                            </p>

                            <h2 className="mt-4 text-[26px] font-bold text-white md:text-[34px] md:leading-[1.2] tracking-tight">
                                {t("home_about_label", "A trusted contracting partner rooted in Riyadh, built on reliability.")}
                            </h2>

                            <p className="mt-6 max-w-xl text-[15.5px] leading-relaxed text-slate-300">
                                {t("home_hero_desc", "Gulf Al Olaya is a progressive electro-mechanical contracting and general contracting company based in Riyadh, Saudi Arabia. We deliver end-to-end mechanical, electrical, civil, and industrial solutions with a personal commitment to quality that large firms simply cannot match.")}
                            </p>

                            <Link
                                to={aboutBanner?.ctaLink || "/about"}
                                className="mt-8 inline-flex items-center gap-3 text-[15px] font-medium text-[#f26522] hover:text-orange-400 transition-colors"
                            >
                                {t('explore_more')}
                                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#f26522]">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                    </svg>
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="relative w-full overflow-hidden">
                <img
                    src={statsExpBanner?.imageUrls?.[0] ? getImageUrl(statsExpBanner.imageUrls[0]) : "/images/industry-bg.png"}
                    alt="Industry"
                    className="h-[260px] w-full object-cover md:h-[340px]"
                />
                {/* dark overlay */}
                <div className="absolute inset-0 bg-black/45" />

                {/* 19+ overlay content */}
                <div className="absolute inset-0">
                    <div className="mx-auto flex h-full max-w-6xl items-end px-4 pb-10">
                        <div className="flex items-end gap-4">
                            <p className="text-6xl font-extrabold leading-none text-white md:text-7xl">
                                {t(statsExpBanner?.headline) || t("home_stats_exp_worldwide_val")}
                            </p>
                            <div className="pb-1">
                                <p className="text-sm font-semibold text-white/90">
                                    {t("home_stats_exp_worldwide")}
                                </p>
                                <p className="text-sm font-semibold text-white/90">
                                    {t("home_stats_exp_experience")}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="relative w-full overflow-hidden bg-white">
                {/* SVG Watermarks mimicking Figma geometric lines */}
                <svg className="absolute left-[-20px] top-[-20px] pointer-events-none text-black opacity-20" width="600" height="600" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0 L400 120 L0 350 Z" stroke="currentColor" strokeWidth="0.5" fill="none" />
                </svg>
                <svg className="absolute left-[5%] bottom-[15%] pointer-events-none text-black opacity-20" width="250" height="250" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 50 L180 30 L100 120 Z" stroke="currentColor" strokeWidth="0.5" fill="none" />
                </svg>
                <svg className="absolute right-[-20px] bottom-[5%] pointer-events-none text-black opacity-20" width="400" height="400" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M120 0 L300 40 L300 300 L0 250 Z" stroke="currentColor" strokeWidth="0.5" fill="none" />
                </svg>

                <div className="mx-auto max-w-6xl px-4 py-16 md:py-24 relative z-10">
                    {/* top content row */}
                    <div className="grid gap-6 md:grid-cols-12 md:items-start">
                        {/* small label (top-left) */}
                        <div className="md:col-span-3">
                            <p className="text-[14px] font-medium text-[#18324e]">{t("home_cred_label", "Our Credibility")}</p>
                        </div>

                        {/* big heading (top-right) */}
                        <div className="md:col-span-9">
                            <h2 className="max-w-4xl text-[32px] font-medium leading-[1.1] text-[#f26522] md:text-[44px]">
                                {t("home_cred_title", "Trusted by clients. Proven on every project.")}
                            </h2>

                            <p className="mt-5 max-w-4xl text-[15.5px] leading-[1.8] text-[#555]">
                                {t("home_cred_desc", "Built on decades of hands-on experience across Saudi Arabia, Gulf Al Olaya has grown from a dedicated contracting company into a multi-discipline construction and electro-mechanical powerhouse. Our commitment to quality, safety, and client satisfaction has driven us to deliver some of the most demanding projects in the Kingdom — on time, within budget, and to the highest standards.")}
                            </p>
                        </div>
                    </div>

                    {/* stats row */}
                    <div className="mt-16 md:mt-24">
                        <div className="grid gap-10 md:grid-cols-3 md:gap-14 pl-0 md:pl-[25%]">
                            {(() => {
                                const defaultStats = [
                                    { value: "50+", label: "Projects successfully delivered" },
                                    { value: "6+", label: "Service divisions" },
                                    { value: "100%", label: "Client-first commitment" }
                                ];
                                let statsToUse = defaultStats;
                                if (statsMetricsBanner?.ctaLink && statsMetricsBanner.ctaLink.includes("||")) {
                                    statsToUse = statsMetricsBanner.ctaLink.split("||").map(s => {
                                        const parts = s.split("|");
                                        return { value: parts[0] || "", label: parts[1] || "" };
                                    });
                                }

                                return statsToUse.map((stat, i) => (
                                    <div key={i} className="text-left">
                                        <p className="text-[60px] font-medium tracking-tight text-[#18324e] md:text-[76px] leading-none">
                                            {stat.value}
                                        </p>
                                        <div className="mt-5 h-[1px] w-full bg-slate-300" />
                                        <p className="mt-4 text-[14px] font-normal text-[#999]">
                                            {t(stat.label, stat.label)}
                                        </p>
                                    </div>
                                ));
                            })()}
                        </div>
                    </div>

                    {/* Business lines heading */}
                    <div className="mt-28 md:mt-36 text-center">
                        <p className="text-[14px] font-bold tracking-widest text-[#f26522] uppercase">
                            {t("home_biz_label", "SERVICE SECTION")}
                        </p>

                        <h2 className="mt-5 text-[26px] font-bold tracking-tight text-[#18324e] md:text-[38px]">
                            {t("home_biz_title", "Multi-discipline Expertise")}
                        </h2>

                        <p className="mx-auto mt-6 max-w-4xl text-[17px] leading-relaxed text-[#666]">
                            {t("home_biz_desc", "We work across multiple sectors providing comprehensive mechanical, electrical, and civil engineering solutions. Our strength lies in fulfilling our commitments and delivering high-quality projects on time.")}
                        </p>
                    </div>
                </div>
            </section>

            <BusinessLinesShowcase />
            <section className="w-full bg-white">
                <SustainabilityCarousel />

            </section>

            <section className="w-full bg-white">
                <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
                    {/* =======================
        FEATURED PROJECTS ROW
        ======================= */}
                    {/* =======================
                        FEATURED PROJECTS ROW
                        ======================= */}
                    <div className="mb-12">
                        <p className="text-[14px] font-bold tracking-widest text-[#f26522] uppercase">
                            {t("home_featured_label", "FEATURED PROJECTS")}
                        </p>

                        <h3 className="mt-4 text-[26px] font-bold text-[#18324e] md:text-[32px]">
                            {t("home_featured_title", "View Our Latest Projects")}
                        </h3>

                        <p className="mt-4 max-w-2xl text-[15.5px] leading-relaxed text-[#777]">
                            {t("home_featured_desc", "We are proud of our strong portfolio of 60+ projects across 3 continents and 8 countries.")}
                        </p>
                    </div>

                    <div className="relative w-full min-h-[450px] md:min-h-[500px] flex items-center mb-10">
                        {/* The dark blue background block on the right */}
                        <div className="absolute right-0 top-[10%] bottom-[10%] w-[90%] md:w-[75%] bg-[#12273f] z-0"></div>

                        {/* Two orange decorative shards */}
                        <div className="absolute left-[12%] top-[0%] w-[12%] h-[12%] bg-[#f26522] z-0" style={{ clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)" }}></div>
                        <div className="absolute left-[5%] bottom-[0%] w-[8%] h-[10%] bg-[#f26522] z-0" style={{ clipPath: "polygon(0% 0%, 100% 100%, 15% 100%)" }}></div>

                        {/* The overlapping left polygon image */}
                        <div
                            className="absolute left-0 top-[5%] bottom-[5%] w-[50%] md:w-[45%] bg-cover bg-center z-10 shadow-2xl"
                            style={{
                                backgroundImage: `url(${getImageUrl(projects[featuredIdx]?.featuredImageUrl) || '/images/hero.png'})`,
                                clipPath: "polygon(10% 10%, 100% 20%, 75% 100%, 0% 85%)"
                            }}
                        />

                        {/* Content overlay on the right */}
                        <div className="relative z-20 w-full flex items-center justify-end h-full">
                            <div className="w-[100%] md:w-[65%] px-6 py-12 flex items-center justify-between">
                                {/* Left Arrow */}
                                <button
                                    onClick={() => setFeaturedIdx((p) => (p - 1 + (projects.length || 1)) % (projects.length || 1))}
                                    className="hidden md:inline-flex flex-none h-[54px] w-[54px] items-center justify-center rounded-full border border-white hover:bg-white/10 transition-colors"
                                    aria-label="Previous Project"
                                >
                                    <svg width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.2" stroke="white" fill="none"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" /></svg>
                                </button>

                                {/* Center Content */}
                                <div className="flex-1 px-4 md:px-12 text-left">
                                    {/* Progress Lines */}
                                    <div className="flex gap-1.5 mb-8 w-full max-w-lg">
                                        {projects.slice(0, 5).map((_, i) => (
                                            <div key={i} className={`h-[2px] w-full transition-colors duration-500 ${i === (featuredIdx % 5) ? 'bg-white' : 'bg-white/20'}`} />
                                        ))}
                                    </div>

                                    <p className="text-[14px] font-bold text-[#f26522]">{t(projects[featuredIdx]?.client) || t("Civil & Structural Works")}</p>
                                    <h4 className="mt-2 text-[24px] font-bold text-white md:text-[28px]">{t(projects[featuredIdx]?.title) || t("Zulfi Mosque & House Project")}</h4>
                                    <p className="mt-4 text-[15.5px] leading-relaxed text-white/80 line-clamp-4">
                                        {projects[featuredIdx]?.status ? t(projects[featuredIdx].status) : t("zulfi_mosque_fallback_desc")}
                                    </p>

                                    {/* Mobile Controls */}
                                    <div className="mt-8 flex items-center gap-4 md:hidden">
                                        <button onClick={() => setFeaturedIdx((p) => (p - 1 + (projects.length || 1)) % (projects.length || 1))} className="inline-flex h-[44px] w-[44px] items-center justify-center rounded-full border border-white hover:bg-white/10 transition-colors">
                                            <svg width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.2" stroke="white" fill="none"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" /></svg>
                                        </button>
                                        <button onClick={() => setFeaturedIdx((p) => (p + 1) % (projects.length || 1))} className="inline-flex h-[44px] w-[44px] items-center justify-center rounded-full border border-white hover:bg-white/10 transition-colors">
                                            <svg width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.2" stroke="white" fill="none"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" /></svg>
                                        </button>
                                    </div>
                                </div>

                                {/* Right Arrow */}
                                <button
                                    onClick={() => setFeaturedIdx((p) => (p + 1) % (projects.length || 1))}
                                    className="hidden md:inline-flex flex-none h-[54px] w-[54px] items-center justify-center rounded-full border border-white hover:bg-white/10 transition-colors"
                                    aria-label="Next Project"
                                >
                                    <svg width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.2" stroke="white" fill="none"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" /></svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* =======================
                        NEWS ROOM ROW
                        ======================= */}
                </div>
            </section>

            <section className="relative w-full bg-white overflow-hidden py-16 md:py-24">
                {/* Background Pattern */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.03] text-black" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="triangle-pattern" width="60" height="60" patternUnits="userSpaceOnUse" patternTransform="rotate(15)">
                            <path d="M10 40 L30 10 L50 40 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
                            <path d="M40 20 L50 5 L60 20 Z" fill="none" stroke="currentColor" strokeWidth="1" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#triangle-pattern)" />
                </svg>

                {/* Decorative Origami Birds */}
                <svg className="absolute right-[45%] top-[5%] pointer-events-none text-[#18324e]" width="80" height="80" viewBox="0 0 100 100">
                    <path d="M10 40 L40 30 L60 50 L30 60 Z M40 30 L60 50 L90 10 Z" fill="currentColor" />
                </svg>
                <svg className="absolute right-[2%] top-[35%] pointer-events-none text-[#18324e]" width="60" height="60" viewBox="0 0 100 100" style={{ transform: 'rotate(-20deg)' }}>
                    <path d="M10 40 L40 30 L60 50 L30 60 Z M40 30 L60 50 L90 10 Z" fill="currentColor" />
                </svg>
                <svg className="absolute left-[15%] top-[40%] pointer-events-none text-[#18324e]" width="70" height="70" viewBox="0 0 100 100" style={{ transform: 'rotate(15deg)' }}>
                    <path d="M10 40 L40 30 L60 50 L30 60 Z M40 30 L60 50 L90 10 Z" fill="currentColor" />
                </svg>
                <svg className="absolute right-[30%] bottom-[30%] pointer-events-none text-[#18324e]" width="50" height="50" viewBox="0 0 100 100" style={{ transform: 'rotate(45deg)' }}>
                    <path d="M10 40 L40 30 L60 50 L30 60 Z M40 30 L60 50 L90 10 Z" fill="currentColor" />
                </svg>

                <div className="relative z-10 mx-auto max-w-6xl px-4">
                    <div className="grid gap-10 md:grid-cols-12 md:gap-14">
                        {/* LEFT: heading + desc + orange button */}
                        <div className="md:col-span-4 pt-2">
                            <p className="text-[13px] font-bold tracking-widest text-[#f26522] uppercase">
                                {t("home_news_label", "NEWS ROOM")}
                            </p>

                            <h3 className="mt-4 text-[26px] font-bold leading-tight text-[#18324e] md:text-[34px]">
                                {t('View Our Latest News')}
                            </h3>

                            <p className="mt-5 max-w-sm text-[15.5px] leading-relaxed text-[#777]">
                                {t('Check out our latest news, press releases, events, and conferences.')}
                            </p>

                            <div className="mt-8">
                                <Link
                                    to="/blog"
                                    className="inline-flex rounded-sm bg-[#f26522] px-6 py-3 text-[14px] font-bold text-white hover:bg-orange-600 transition-all"
                                >
                                    {t("home_news_all_btn", "Read All News")}
                                </Link>
                            </div>
                        </div>

                        {/* RIGHT: Featured big card (image + date + title) */}
                        <div className="md:col-span-8">
                            <div className="relative">
                                <div className="overflow-hidden bg-slate-100 aspect-[16/9] shadow-md">
                                    <img
                                        src={getImageUrl(blogs[0]?.imageUrl) || "/images/Frame51.png"}
                                        alt="Featured News"
                                        className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                                    />
                                </div>
                            </div>

                            <p className="mt-5 text-[13px] font-semibold text-[#555]">
                                {blogs[0]?.updatedAt
                                    ? new Date(blogs[0].updatedAt).toLocaleDateString("en-US", { month: 'short', day: '2-digit', year: 'numeric' })
                                    : "Dec 03, 2025"}
                                <span className="mx-2">•</span>
                                <span className="font-bold text-[#18324e]">{t('event')}</span>
                            </p>

                            <p className="mt-2 text-[20px] font-bold text-[#18324e]">
                                {blogs[0]?.title || t("Zulfi Mosque & House Project")}
                            </p>
                        </div>
                    </div>

                    {/* BOTTOM ROW: 3 small news cards (images + text) */}
                    <div className="mt-16 grid gap-8 md:grid-cols-3">
                        {blogs.slice(1, 4).map((n, idx) => (
                            <div key={idx} className="group cursor-pointer">
                                <div className="overflow-hidden bg-slate-100 aspect-[16/10] shadow-sm">
                                    <img
                                        src={getImageUrl(n.imageUrl) || "/images/Frame51.png"}
                                        alt="News"
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>

                                <p className="mt-4 text-[12px] font-semibold text-[#777]">
                                    {n.updatedAt ? new Date(n.updatedAt).toLocaleDateString("en-US", { month: 'short', day: '2-digit', year: 'numeric' }) : `Nov ${18 - idx}, 2025`}
                                    <span className="mx-2">•</span>
                                    <span className="font-bold text-[#18324e]">{t('event')}</span>
                                </p>

                                <p className="mt-2 text-[14.5px] leading-relaxed text-[#555] group-hover:text-[#f26522] transition-colors line-clamp-3">
                                    {n.title || t("Zulfi Mosque & House Project")}
                                </p>
                            </div>
                        ))}
                        {/* Fallback items if blogs length is less than 4 */}
                        {blogs.length < 4 && Array.from({ length: Math.max(0, 4 - Math.max(1, blogs.length)) }).map((_, idx) => (
                            <div key={`fallback-${idx}`} className="group cursor-pointer">
                                <div className="overflow-hidden bg-slate-100 aspect-[16/10] shadow-sm">
                                    <img
                                        src="/images/Frame51.png"
                                        alt="News"
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>

                                <p className="mt-4 text-[12px] font-semibold text-[#777]">
                                    {`Nov ${18 - idx}, 2025`}
                                    <span className="mx-2">•</span>
                                    <span className="font-bold text-[#18324e]">{t('event')}</span>
                                </p>

                                <p className="mt-2 text-[14.5px] leading-relaxed text-[#555] group-hover:text-[#f26522] transition-colors line-clamp-3">
                                    {t("Zulfi Mosque & House Project")}
                                </p>
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            <section className="relative w-full bg-[#142940] overflow-hidden">
                {/* Decorative Polygons */}
                <div className="absolute right-[20%] top-[10%] w-[100px] h-[100px] bg-[#f26522] z-0" style={{ clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)", transform: "rotate(45deg)" }}></div>
                <div className="absolute left-[5%] bottom-[0%] w-[120px] h-[100px] bg-[#f26522] z-0" style={{ clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)", transform: "rotate(-30deg) translate(-20px, 40px)" }}></div>
                <div className="absolute right-[15%] bottom-[5%] w-[80px] h-[80px] bg-[#f26522] z-0" style={{ clipPath: "polygon(0 0, 100% 50%, 0 100%)", transform: "rotate(-20deg)" }}></div>

                <div className="mx-auto max-w-6xl px-4 py-20 md:py-28 text-center text-white relative z-10">
                    <p className="text-[13px] font-bold tracking-widest text-[#f26522] uppercase">
                        {t("home_careers_label", "CAREERS")}
                    </p>

                    <h3 className="mt-4 text-[26px] font-bold md:text-[34px] text-white">
                        {t("home_careers_title", "Join Our Team")}
                    </h3>

                    <p className="mx-auto mt-6 max-w-3xl text-[18px] font-medium leading-[1.6] text-white">
                        {t("home_careers_title2", "We are always looking for talented, driven people who take pride in building something that lasts.")}
                    </p>

                    <p className="mx-auto mt-6 max-w-4xl text-[16px] leading-[1.8] text-white/85">
                        {t("home_careers_desc", "At Gulf Al Olaya, our people are our greatest strength. Whether you are an experienced engineer, a skilled technician, or a construction professional looking for your next challenge we offer a workplace where your work matters, your growth is supported, and your contribution is valued. Join a team that builds more than structures we build careers.")}
                    </p>

                    <Link
                        to="/careers"
                        className="mt-8 inline-flex items-center justify-center rounded-sm bg-[#f26522] px-8 py-3 text-[15px] font-bold text-white hover:bg-orange-600 transition-all"
                    >
                        {t("home_careers_btn", "Submit Your CV")}
                    </Link>
                </div>
            </section>

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
                                    src="/images/hero.png" // Keeps the old content image path
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

            <section className="relative w-full min-h-[500px] flex items-center justify-center overflow-hidden">
                <img
                    src={bottomBanner?.imageUrls?.[0] ? getImageUrl(bottomBanner.imageUrls[0]) : "/images/panel.png"}
                    alt="For the world"
                    className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-[#0f2d45]/60" />

                <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-20 text-center">
                    <div className="mx-auto max-w-4xl">
                        {/* Added quotes to match Figma, removed uppercase tracking from text */}
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
