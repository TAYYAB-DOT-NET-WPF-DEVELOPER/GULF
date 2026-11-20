import CompanyCallsToAction from "../components/CompanyCallsToAction";
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

    const featuredSlides = useMemo(
        () => [
            { id: 1, title: t("Environmental Practices"), desc: t("home_hero_desc") },
            { id: 2, title: t("Quality & Safety"), desc: t("home_hero_desc") },
            { id: 3, title: t("Delivery Excellence"), desc: t("home_hero_desc") },
        ],
        [t]
    );

    const [featuredIdx, setFeaturedIdx] = useState(0);
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
                http.get("/api/banners/home").catch(() => ({ data: null })),
                http.get("/api/blog").catch(() => ({ data: null })),
                http.get("/api/projects").catch(() => ({ data: null })),
                http.get("/api/banners/home-about").catch(() => ({ data: null })),
                http.get("/api/banners/home-stats-exp").catch(() => ({ data: null })),
                http.get("/api/banners/home-stats-metrics").catch(() => ({ data: null })),
                http.get("/api/banners/home-logos").catch(() => ({ data: null })),
                http.get("/api/banners/home-bottom").catch(() => ({ data: null })),
            ]);

            const fallbackProjects = [
                { id: 1, title: "proj_1_title", client: "proj_1_cat", status: "proj_1_desc", featuredImageUrl: "/images/project1.png" },
                { id: 2, title: "proj_2_title", client: "proj_2_cat", status: "proj_2_desc", featuredImageUrl: "/images/project2.png" },
                { id: 3, title: "proj_3_title", client: "proj_3_cat", status: "proj_3_desc", featuredImageUrl: "/images/project3.png" },
                { id: 4, title: "proj_4_title", client: "proj_4_cat", status: "proj_4_desc", featuredImageUrl: "/images/project4.png" },
                { id: 5, title: "proj_5_title", client: "proj_5_cat", status: "proj_5_desc", featuredImageUrl: "/images/project5.png" },
                { id: 6, title: "proj_6_title", client: "proj_6_cat", status: "proj_6_desc", featuredImageUrl: "/images/industry-bg.png" },
            ];
            const fallbackBlogs = [
                { id: 1, title: "Zulfi Mosque & House Project", imageUrl: "/images/Frame51.png", updatedAt: "2025-12-03T00:00:00Z" },
                { id: 2, title: "Sultan Bin Abdul Aziz Humanitarian City", imageUrl: "/images/Frame53.png", updatedAt: "2025-11-18T00:00:00Z" },
                { id: 3, title: "Al Af-MacDonald's Fast Food Outlet", imageUrl: "/images/Frame55.png", updatedAt: "2025-11-17T00:00:00Z" },
                { id: 4, title: "Baha University Staff Housing Project", imageUrl: "/images/Frame56.png", updatedAt: "2025-11-16T00:00:00Z" },
            ];

            setBanner(bannerRes?.data);
            setAboutBanner(aboutRes?.data);
            setStatsExpBanner(statsExpRes?.data);
            setStatsMetricsBanner(statsMetricsRes?.data);
            setLogosBanner(logosRes?.data);
            setBottomBanner(bottomRes?.data);
            setBlogs(Array.isArray(blogsRes?.data) && blogsRes.data.length > 0 ? blogsRes.data.slice(0, 4) : fallbackBlogs);
            setProjects(Array.isArray(projectsRes?.data) && projectsRes.data.length > 0 ? projectsRes.data : fallbackProjects);
        } catch (e) {
            console.error("Home data load error:", e);
        }
    }

    useEffect(() => { loadData(); }, [t, i18n.language]);

    const slides = useMemo(() =>
        banner?.imageUrls?.length > 0
            ? banner.imageUrls
            : ["/images/figma-home-tower.jpg", "/images/Slider_1.jpg", "/images/Slider_2.jpg"],
        [banner]
    );

    useEffect(() => {
        if (!slides || slides.length <= 1) return;
        const timer = setInterval(() => setActive(p => (p + 1) % slides.length), 4000);
        return () => clearInterval(timer);
    }, [slides]);

    return (
        <div className="bg-white">

            {/* ═══════════════════════════════════════════════════════
                1. HERO CAROUSEL
                ═══════════════════════════════════════════════════════ */}
            <section className="relative w-full min-h-[650px] overflow-hidden bg-[#16355d]">
                <div className="absolute inset-0">
                    {slides.map((src, idx) => (
                        <img
                            key={`${src}-${idx}`}
                            src={getImageUrl(src)}
                            alt={`Hero ${idx + 1}`}
                            fetchPriority={idx === 0 ? "high" : "low"}
                            className={[
                                "absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out motion-reduce:transition-none",
                                idx === active ? "opacity-100" : "opacity-0",
                            ].join(" ")}
                            draggable={false}
                        />
                    ))}
                </div>
                <div className="absolute inset-0 bg-black/50 lg:bg-transparent lg:bg-[linear-gradient(90deg,rgba(0,0,0,.65),transparent)] rtl:lg:bg-[linear-gradient(270deg,rgba(0,0,0,.65),transparent)]" />

                <Header overlay home />

                <div className="relative z-10 mx-auto max-w-[1232px] px-4">
                    <div className="flex min-h-[650px] items-center lg:min-h-[min(66.667vw,960px)]">
                        <div className="max-w-[660px] pt-24 pb-20 lg:pt-16 lg:pb-6">
                            <h1 className="text-[30px] font-bold leading-[1.2] text-white sm:text-4xl md:text-5xl lg:text-[50px]">
                                {t(banner?.headline) || t("home_hero_title1")}
                                {(!banner?.headline && t("home_hero_title2")) && (
                                    <>
                                        <br className="hidden md:block" />
                                        <span className="text-white"> {t("home_hero_title2")}</span>
                                    </>
                                )}
                                {banner?.subHeadline && (
                                    <>
                                        <br className="hidden md:block" />
                                        <span className="text-white"> {t(banner.subHeadline)}</span>
                                    </>
                                )}
                            </h1>

                            <p className="mt-4 max-w-[590px] text-[16px] leading-7 text-white lg:text-[20px]">
                                {banner?.ctaLink ? (
                                    banner.ctaLink.startsWith("http") ? (
                                        <a href={banner.ctaLink} target="_blank" rel="noopener noreferrer"
                                            className="text-white hover:text-orange-400 transition-colors underline underline-offset-4">
                                            {t("Learn More")}
                                        </a>
                                    ) : (
                                        <Link to={banner.ctaLink.includes(" ") ? "/services" : banner.ctaLink}
                                            className="text-white hover:text-orange-400 transition-colors underline underline-offset-4">
                                            {banner.ctaLink.includes(" ") ? t("Explore More") : banner.ctaLink}
                                        </Link>
                                    )
                                ) : t("home_hero_desc")}
                            </p>

                            <div className="mt-4 flex flex-wrap items-center gap-4">
                                <Link to="/services"
                                    className="inline-flex rounded-lg bg-[#ef7525] px-4 py-3 text-[16px] font-bold text-white hover:bg-orange-600 transition-colors lg:text-[20px]">
                                    {t("home_hero_btn", "Explore our services")}
                                </Link>
                                <Link to="/about"
                                    className="inline-flex rounded-lg border border-white px-4 py-3 text-[16px] font-bold text-white hover:bg-white/10 transition-colors lg:text-[20px]">
                                    {t("explore_more", "Explore More")}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Slide dots */}
                {slides.length > 1 && (
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
                        {slides.map((_, idx) => (
                            <button key={idx} onClick={() => setActive(idx)}
                                className={`h-1.5 rounded-full transition-all duration-300 ${idx === active ? "w-8 bg-[#f26522]" : "w-1.5 bg-white/50"}`}
                                aria-label={`Slide ${idx + 1}`} />
                        ))}
                    </div>
                )}
            </section>

            {/* ═══════════════════════════════════════════════════════
                2. CLIENT LOGOS
                ═══════════════════════════════════════════════════════ */}
            <section className="w-full bg-white">
                <div className="mx-auto max-w-[1232px] px-4">
                    <div className="flex flex-wrap items-center justify-center gap-6 py-10 lg:min-h-[233px] lg:justify-between lg:py-0">
                        {logosBanner?.imageUrls?.length > 0 ? (
                            logosBanner.imageUrls.map((src, idx) => (
                                <img key={idx} src={getImageUrl(src)} alt={`Client Logo ${idx}`}
                                    className="h-8 w-auto object-contain md:h-10 filter grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition duration-300" />
                            ))
                        ) : (
                            <>
                                <img src="/images/Frame_5.svg" alt="Ramada" className="h-8 w-auto md:h-10 object-contain filter grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition duration-300" />
                                <img src="/images/Frame_6.svg" alt="Tanfeeth" className="h-8 w-auto md:h-10 object-contain filter grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition duration-300" />
                                <img src="/images/Frame_7.svg" alt="Client" className="h-8 w-auto md:h-10 object-contain filter grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition duration-300" />
                                <img src="/images/Frame_8.svg" alt="Client" className="h-8 w-auto md:h-10 object-contain filter grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition duration-300" />
                                <img src="/images/Frame4.png" alt="UAE Academy" className="h-8 w-auto md:h-10 object-contain filter grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition duration-300" />
                            </>
                        )}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════
                3. ABOUT US
                – overflow-visible so the left image bleeds into §4
                – z-20 sits above the experience banner (z-10)
                ═══════════════════════════════════════════════════════ */}
            <section className="relative bg-[#16355d] text-white">
                <div className="relative mx-auto grid max-w-[1220px] items-center gap-7 px-5 py-12 lg:min-h-[362px] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] lg:gap-8 lg:px-0 lg:py-[14px]">
                    <img src={getImageUrl(aboutBanner?.imageUrls?.[0] || "/images/About_Us_Image.svg")} alt="Gulf Al Olaya construction team"
                        className="relative z-10 mx-auto h-auto w-full max-w-[480px] lg:absolute lg:left-0 lg:top-0" />
                    <div className="relative z-20 min-w-0 lg:col-start-2">
                        <p className="text-lg font-medium text-[#f17124]">{t("nav_about_us", "About Us")}</p>
                        <h2 className="mt-5 max-w-[580px] text-[28px] font-bold leading-tight lg:mt-7 lg:text-[32px]">
                            {t("home_about_title")}
                        </h2>
                        <p className="mt-4 max-w-[654px] text-base leading-[1.3] lg:text-[20px]">{t("home_about_desc")}</p>
                        <Link to={aboutBanner?.ctaLink || "/about"} className="mt-3 inline-flex items-center gap-3 text-lg font-medium text-[#f17124] hover:text-orange-300">
                            {t("explore_more")} <span aria-hidden="true" className="grid size-10 place-items-center rounded-full border border-current text-2xl">→</span>
                        </Link>
                    </div>
                </div>
            </section>

            <section className="relative">
                <img src={statsExpBanner?.imageUrls?.[0] ? getImageUrl(statsExpBanner.imageUrls[0]) : "/images/industry-bg.png"}
                    alt="Gulf Al Olaya industrial work" className="h-[240px] w-full object-cover lg:h-[409px]" />
            </section>

            {/* ═══════════════════════════════════════════════════════
                5. CREDIBILITY + STATS  (white section)
                ═══════════════════════════════════════════════════════ */}
            <section className="relative w-full overflow-hidden bg-white xl:min-h-[1087px]">

                {/* Subtle geometric lines — same as Figma */}
                <svg className="absolute left-0 top-0 pointer-events-none opacity-[0.04]" width="500" height="500" viewBox="0 0 400 400" fill="none">
                    <path d="M0 0 L400 120 L0 350 Z" stroke="#18324e" strokeWidth="1" />
                </svg>
                <svg className="absolute right-0 bottom-0 pointer-events-none opacity-[0.04]" width="400" height="400" viewBox="0 0 300 300" fill="none">
                    <path d="M120 0 L300 40 L300 300 L0 250 Z" stroke="#18324e" strokeWidth="1" />
                </svg>

                <div className="mx-auto max-w-6xl px-4 py-16 md:py-24 relative z-10">

                    {/* Top row: label left, heading + desc right */}
                    <div className="grid gap-6 md:grid-cols-12">
                        <div className="md:col-span-3">
                            <p className="text-[13px] font-semibold text-[#18324e] tracking-wide">
                                {t("home_cred_label", "Our Credibility")}
                            </p>
                        </div>
                        <div className="md:col-span-9">
                            <h2 className="text-[30px] font-semibold leading-[1.15] text-[#f17124] lg:max-w-[800px] lg:text-[54px]">
                                {t("home_cred_title", "Trusted by clients. Proven on every project.")}
                            </h2>
                            <p className="mt-5 max-w-[820px] text-base leading-snug text-[#3f3f3f] lg:text-[20px]">
                                {t("home_cred_desc",
                                    "Built on decades of hands-on experience across Saudi Arabia, Gulf Al Olaya has grown from a dedicated contracting company into a multi-discipline construction and electro-mechanical powerhouse. Our commitment to quality, safety, and client satisfaction has driven us to deliver some of the most demanding projects in the Kingdom — on time, within budget, and to the highest standards.")}
                            </p>
                        </div>
                    </div>

                    {/* Stats row — 50+ / 6+ / 100% */}
                    <div className="mt-16 md:mt-20">
                        <div className="grid gap-10 sm:grid-cols-3 md:gap-0">
                            {(() => {
                                const defaultStats = [
                                    { value: "50+", label: "home_stats_projects", fallback: "Projects successfully delivered" },
                                    { value: "6+", label: "home_stats_countries", fallback: "Service divisions" },
                                    { value: "100%", label: "home_stats_pros", fallback: "Client-first commitment" },
                                ];
                                let statsToUse = defaultStats;
                                if (statsMetricsBanner?.ctaLink?.includes("||")) {
                                    statsToUse = statsMetricsBanner.ctaLink.split("||").map(s => {
                                        const [value, label] = s.split("|");
                                        return { value: value || "", label: label || "", fallback: label || "" };
                                    });
                                }
                                return statsToUse.map((stat, i) => (
                                    <div key={i} className="text-left md:pr-14">
                                        <p className="text-[64px] font-medium tracking-tight text-[#18324e] lg:text-[112px] leading-none">
                                            {stat.value}
                                        </p>
                                        <div className="mt-4 h-px w-full bg-slate-200" />
                                        <p className="mt-3 text-[13px] text-[#999]">
                                            {t(stat.label, stat.fallback)}
                                        </p>
                                    </div>
                                ));
                            })()}
                        </div>
                    </div>

                    {/* Business Lines heading */}
                    <div className="mt-24 md:mt-32 text-center">
                        <p className="text-[12px] font-bold tracking-[0.2em] text-[#f26522] uppercase">
                            {t("home_biz_label", "BUSINESS LINES")}
                        </p>
                        <h2 className="mt-4 text-[26px] font-bold tracking-tight text-[#18324e] md:text-[36px]">
                            {t("home_biz_title", "We work across multiple sectors.")}
                        </h2>
                        <p className="mx-auto mt-5 max-w-3xl text-[15px] leading-relaxed text-[#666]">
                            {t("home_biz_desc",
                                "Our strength lies in fulfilling our commitments and in our ability to deliver high-quality projects, on time, and to the complete satisfaction of our clients and partners.")}
                        </p>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════
                6. BUSINESS LINES SHOWCASE  (component)
                ═══════════════════════════════════════════════════════ */}
            <BusinessLinesShowcase />

            {/* ═══════════════════════════════════════════════════════
                7. SUSTAINABILITY CAROUSEL  (component)
                ═══════════════════════════════════════════════════════ */}
            <SustainabilityCarousel />

            {/* ═══════════════════════════════════════════════════════
                8. FEATURED PROJECTS
                ═══════════════════════════════════════════════════════ */}
            <section aria-labelledby="home-featured-projects" className="bg-white px-4 py-12 sm:px-8 xl:min-h-[886px] xl:px-0 xl:pb-20 xl:pt-20">
                <div className="mx-auto max-w-[1440px]">
                    <div className="xl:ms-[30.2%] xl:me-8">
                        <p className="text-sm font-bold uppercase text-[#f17124] xl:text-[20px] xl:leading-6">
                            {t("home_featured_label", "FEATURED PROJECTS")}
                        </p>
                        <h2 id="home-featured-projects" className="mt-4 text-[28px] font-bold leading-tight text-[#16355d] xl:mt-[35px] xl:text-[40px] xl:leading-[48px]">
                            {t("home_featured_title", "View Our Latest Projects")}
                        </h2>
                        <p className="mt-4 text-base leading-7 text-[#707070] xl:mt-[27px] xl:text-[20px]">
                            {t("home_featured_desc")}
                        </p>
                    </div>

                    <div className="relative mt-8 xl:mt-[72px]">
                        <div aria-hidden="true" className="absolute start-[10%] top-0 hidden h-[86px] w-[148px] bg-[#f17124] xl:block"
                            style={{ clipPath: "polygon(0 100%, 62% 0, 100% 68%, 68% 74%, 32% 86%)" }} />
                        <div aria-hidden="true" className="absolute -bottom-1.5 start-[5.7%] hidden h-[73px] w-[58px] bg-[#f17124] xl:block"
                            style={{ clipPath: "polygon(0 0, 38% 42%, 100% 92%, 19% 100%)" }} />

                        <div className="bg-[#0e2d56] px-4 py-8 text-white sm:px-8 xl:ms-[27.3%] xl:min-h-[465px] xl:pb-12 xl:pe-[30px] xl:ps-[112px] xl:pt-[114px]">
                            <div aria-hidden="true" className="flex gap-1">
                                {[0, 1, 2].map((index) => (
                                    <span key={index} className={`h-0.5 flex-1 ${index === Math.min(2, Math.floor(featuredIdx * 3 / Math.max(1, projects.length))) ? "bg-white" : "bg-white/35"}`} />
                                ))}
                            </div>

                            <div className="mt-7 grid grid-cols-[auto_auto_1fr] items-center gap-3 xl:grid-cols-[82px_minmax(0,1fr)_82px] xl:gap-[95px] xl:px-[14px]">
                                <button type="button" onClick={() => setFeaturedIdx(p => (p - 1 + (projects.length || 1)) % (projects.length || 1))}
                                    className="grid size-11 shrink-0 place-items-center rounded-full border-2 border-white hover:bg-white/10 xl:size-[82px] xl:translate-y-3"
                                    aria-label="Previous project">
                                    <svg aria-hidden="true" className="size-6 xl:size-12 rtl:rotate-180" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4c-3 4-6 7-10 8 4 1 7 4 10 8M2 12h20" />
                                    </svg>
                                </button>

                                <div aria-live="polite" className="order-first col-span-3 min-w-0 pb-4 xl:order-none xl:col-span-1 xl:pb-0">
                                    <p className="text-base leading-7 text-[#f17124] xl:text-[20px]">
                                        {t(projects[featuredIdx]?.client) || t("Civil & Structural Works")}
                                    </p>
                                    <h3 className="mt-2.5 text-xl font-bold leading-tight xl:text-[23px]">
                                        {t(projects[featuredIdx]?.title) || t("Zulfi Mosque & House Project")}
                                    </h3>
                                    <p className="mt-3 text-base leading-relaxed xl:text-[20px] xl:leading-[30px]">
                                        {projects[featuredIdx]?.status ? t(projects[featuredIdx].status) : t("zulfi_mosque_fallback_desc")}
                                    </p>
                                </div>

                                <button type="button" onClick={() => setFeaturedIdx(p => (p + 1) % (projects.length || 1))}
                                    className="grid size-11 shrink-0 place-items-center rounded-full border-2 border-white hover:bg-white/10 xl:size-[82px]"
                                    aria-label="Next project">
                                    <svg aria-hidden="true" className="size-6 xl:size-12 rtl:rotate-180" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4c3 4 6 7 10 8-4 1-7 4-10 8M22 12H2" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════
                9. NEWS ROOM
                ═══════════════════════════════════════════════════════ */}
            <section aria-labelledby="home-news-heading" className="relative isolate overflow-hidden bg-white px-4 py-12 sm:px-8 xl:min-h-[1055px] xl:px-0 xl:pb-10 xl:pt-7">
                <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-[160px] -z-10 h-[696px] bg-[url('/images/blog_pattern.png')] bg-top" />
                <div className="mx-auto max-w-[1440px]">
                    <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] xl:ms-[8.4%] xl:me-[1%] xl:grid-cols-[minmax(0,1fr)_minmax(0,727px)] xl:gap-16">
                        <div className="min-w-0">
                            <p className="text-sm font-bold uppercase leading-6 text-[#f17124] xl:text-[20px]">{t("home_news_label")}</p>
                            <h2 id="home-news-heading" className="mt-4 text-[28px] font-bold leading-tight text-[#16355d] xl:mt-[46px] xl:text-[40px] xl:leading-[48px]">
                                {t("home_news_title")}
                            </h2>
                            <p className="mt-5 max-w-[460px] text-base leading-6 text-[#3f3f3f] xl:mt-[44px] xl:text-[20px]">
                                {t("home_news_desc")}
                            </p>
                            <Link to="/news" className="mt-7 inline-flex min-h-12 items-center rounded-lg bg-[#f17124] px-4 text-base font-bold text-white hover:bg-[#d55b15] xl:mt-10 xl:min-h-[52px] xl:text-[20px]">
                                {t("home_news_all_btn")}
                            </Link>
                        </div>

                        <article className="min-w-0">
                            <img src={getImageUrl(blogs[0]?.imageUrl) || "/images/Frame51.png"} alt="" width="727" height="403" className="h-auto w-full" />
                            <div className="ms-[10.9%] me-4 mt-5 text-[#3f3f3f] xl:mt-9">
                                <p className="text-base xl:text-[20px]">
                                    {blogs[0]?.updatedAt ? new Date(blogs[0].updatedAt).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }) : "Dec 03, 2025"}
                                    <span className="font-bold"> · {t("event", "Event")}</span>
                                </p>
                                <h3 className="mt-3 text-xl font-bold leading-tight xl:mt-5 xl:text-[24px]">
                                    {blogs[0]?.title || t("Zulfi Mosque & House Project")}
                                </h3>
                            </div>
                        </article>
                    </div>

                    <div className="mt-12 grid gap-10 sm:grid-cols-3 xl:mx-[8.4%] xl:mt-[128px] xl:gap-[50px]">
                        {blogs.slice(1, 4).map((news, index) => {
                            const imageClass = [
                                "w-full -top-[15.1%]",
                                "w-[107.9%] top-0",
                                "w-[111.5%] -start-[11.2%] -top-[13.1%]",
                            ][index];
                            return (
                                <article key={news.id} className="min-w-0 text-[#3f3f3f]">
                                    <div className="relative aspect-[366/245]">
                                        <img src={getImageUrl(news.imageUrl)} alt="" className={`absolute h-auto max-w-none ${imageClass}`} />
                                    </div>
                                    <p className="relative mt-4 text-sm">
                                        {new Date(news.updatedAt).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })}
                                        <span className="font-bold"> · {t("event", "Event")}</span>
                                    </p>
                                    <h3 className="relative mt-2 text-base font-medium">{news.title}</h3>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════
                10. CAREERS
                ═══════════════════════════════════════════════════════ */}
            <CompanyCallsToAction id="home" />

            {/* ═══════════════════════════════════════════════════════
                12. BOTTOM BANNER  (full-width photo + quote)
                ═══════════════════════════════════════════════════════ */}
            <section className="relative w-full min-h-[480px] flex items-center justify-center overflow-hidden lg:min-h-[869px]">
                <img
                    src={bottomBanner?.imageUrls?.[0] ? getImageUrl(bottomBanner.imageUrls[0]) : "/images/footer image.png"}
                    alt="Closing banner"
                    className="absolute inset-0 h-full w-full object-cover"
                />


                <div className="relative z-10 mx-auto w-full max-w-[1320px] px-4 py-20 text-center">
                    <h3 className="text-[32px] font-bold leading-tight text-white md:text-[46px] tracking-wide">
                        "{t(bottomBanner?.headline) || t("home_bottom_title", "The center of strength & excellence.")}"
                    </h3>
                    <p className="mx-auto mt-8 max-w-[1280px] text-[16px] leading-tight text-white lg:mt-24 lg:text-[30px]">
                        {t(bottomBanner?.subHeadline) || t("home_bottom_desc",
                            "From industrial piping to transmission lines, from civil works to MEP systems — Gulf Al Olaya brings strength, skill, and commitment to every project we build.")}
                    </p>
                </div>
            </section>

        </div>
    );
}
