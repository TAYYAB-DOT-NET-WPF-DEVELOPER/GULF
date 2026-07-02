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
                { id: 1, title: "Zulfi Mosque & House Project", imageUrl: "/images/project1.png", updatedAt: "2025-12-03T00:00:00Z" },
                { id: 2, title: "Sultan Bin Abdul Aziz Humanitarian City", imageUrl: "/images/project2.png", updatedAt: "2025-11-18T00:00:00Z" },
                { id: 3, title: "Al Af-MacDonald's Fast Food Outlet", imageUrl: "/images/project3.png", updatedAt: "2025-11-17T00:00:00Z" },
                { id: 4, title: "Baha University Staff Housing Project", imageUrl: "/images/project4.png", updatedAt: "2025-11-16T00:00:00Z" },
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
            : ["/images/Slider_1.jpg", "/images/Slider_2.jpg"],
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
            <section className="relative w-full min-h-[650px] md:min-h-screen overflow-hidden">
                <div className="absolute inset-0">
                    {slides.map((src, idx) => (
                        <img
                            key={`${src}-${idx}`}
                            src={getImageUrl(src)}
                            alt={`Hero ${idx + 1}`}
                            className={[
                                "absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out",
                                idx === active ? "opacity-100" : "opacity-0",
                            ].join(" ")}
                            draggable={false}
                        />
                    ))}
                </div>
                <div className="absolute inset-0 bg-black/50" />

                <Header overlay />

                <div className="relative z-10 mx-auto max-w-6xl px-4">
                    <div className="flex min-h-[650px] items-center md:min-h-screen">
                        <div className="max-w-3xl pt-24 md:pt-32 pb-20">
                            <h1 className="text-[30px] font-bold leading-[1.2] text-white sm:text-4xl md:text-5xl lg:text-[56px] tracking-tight">
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

                            <p className="mt-6 max-w-2xl text-[16px] font-light leading-relaxed text-white/90">
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

                            <div className="mt-8 flex flex-wrap items-center gap-4">
                                <Link to="/contact"
                                    className="inline-flex rounded-sm bg-[#f26522] px-7 py-3 text-[15px] font-bold text-white hover:bg-orange-600 transition-colors">
                                    {t("home_hero_btn", "Get A Quote")}
                                </Link>
                                <Link to="/about"
                                    className="inline-flex rounded-sm border border-white px-7 py-3 text-[15px] font-bold text-white hover:bg-white/10 transition-colors">
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
            <section className="w-full bg-white border-b border-slate-100">
                <div className="mx-auto max-w-6xl px-4">
                    <div className="flex flex-wrap items-center justify-center md:justify-between gap-6 py-10 md:py-14">
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
            <section className="relative w-full bg-[#18324e] z-20 overflow-visible">

                {/* Faint diamond watermark – bottom-right, bleeds into §4 */}
                <div className="absolute right-0 bottom-[-160px] pointer-events-none opacity-[0.08] z-[22] select-none">
                    <svg width="700" height="700" viewBox="0 0 100 100" fill="currentColor" className="text-white">
                        <path d="M50 0 L100 50 L50 100 L0 50 Z" />
                    </svg>
                </div>

                <div className="mx-auto max-w-6xl px-4 pt-16 pb-0 md:pt-24 md:pb-0">
                    <div className="grid gap-10 md:grid-cols-12 md:items-center">

                        {/* LEFT – polygon "About Us" image.
                            translate-y-[110px] on md+ pushes the image 110px into §4,
                            creating the Figma overlap. On mobile it shows normally. */}
                        <div className="md:col-span-5 flex justify-center items-center">
                            <img
                                src={getImageUrl(aboutBanner?.imageUrls?.[0] || "/images/About_Us_Image.svg")}
                                alt="About Us"
                                className="w-full h-auto max-h-[480px] object-contain
                                           relative z-30
                                           md:translate-y-[110px]"
                            />
                        </div>

                        {/* RIGHT – text content.
                            pb-16 md:pb-28 gives the row enough height so the
                            right column isn't cramped when pb-0 is on the wrapper. */}
                        <div className="md:col-span-7 md:pl-10 relative z-10 pb-10 md:pb-28">
                            <p className="text-[13px] font-bold tracking-widest text-[#f26522] uppercase">
                                {t("nav_about_us", "About Us")}
                            </p>

                            <h2 className="mt-4 text-[24px] font-bold leading-[1.25] text-white md:text-[32px] tracking-tight">
                                {t("home_about_label",
                                    "A trusted contracting partner rooted in\nRiyadh, built on reliability.")}
                            </h2>

                            {/* ── Figma uses ONE paragraph, not bullets ── */}
                            <p className="mt-5 max-w-lg text-[15px] leading-[1.8] text-slate-300">
                                {t("home_about_desc",
                                    "Gulf Al Olaya is a progressive electro-mechanical contracting and general contracting company based in Riyadh, Saudi Arabia. We deliver end-to-end mechanical, electrical, civil, and industrial solutions with a personal commitment to quality that large firms simply cannot match.")}
                            </p>

                            <Link
                                to={aboutBanner?.ctaLink || "/about"}
                                className="mt-8 inline-flex items-center gap-3 text-[14px] font-semibold text-[#f26522] hover:text-orange-400 transition-colors"
                            >
                                {t("explore_more", "Explore more")}
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

            {/* ═══════════════════════════════════════════════════════
                4. EXPERIENCE BANNER  (industrial image)
                – bg-[#18324e] spacer at top = exactly the translate
                  amount (110px) so the dark-navy colour is seamless
                  underneath the about-section image that overlaps it.
                – z-10 keeps it below the about image (z-30).
                ═══════════════════════════════════════════════════════ */}
            <section className="relative w-full z-10">
                {/* Dark-navy colour fill that hides the "gap" left by the overlap */}
                <div className="w-full bg-[#18324e] hidden md:block" style={{ height: 110 }} />

                <div className="relative overflow-hidden">
                    <img
                        src={statsExpBanner?.imageUrls?.[0]
                            ? getImageUrl(statsExpBanner.imageUrls[0])
                            : "/images/industry-bg.png"}
                        alt="Industry experience"
                        className="h-[300px] w-full object-cover md:h-[400px]"
                    />
                    <div className="absolute inset-0 bg-black/50" />

                    {/* 19+ text anchored bottom-left */}
                    <div className="absolute inset-0 flex items-end">
                        <div className="mx-auto w-full max-w-6xl px-4 pb-10 flex items-end gap-4">
                            <p className="text-[72px] font-extrabold leading-none text-white md:text-[88px]">
                                {t(statsExpBanner?.headline) || t("home_stats_exp_worldwide_val", "19+")}
                            </p>
                            <div className="pb-2">
                                <p className="text-[13px] font-semibold uppercase tracking-wide text-white/90">
                                    {t("home_stats_exp_worldwide", "Years")}
                                </p>
                                <p className="text-[13px] font-semibold uppercase tracking-wide text-white/90">
                                    {t("home_stats_exp_experience", "Experience")}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════
                5. CREDIBILITY + STATS  (white section)
                ═══════════════════════════════════════════════════════ */}
            <section className="relative w-full bg-white overflow-hidden">

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
                            <h2 className="text-[30px] font-semibold leading-[1.15] text-[#f26522] md:text-[42px]">
                                {t("home_cred_title", "Trusted by clients. Proven on every project.")}
                            </h2>
                            <p className="mt-5 max-w-3xl text-[15px] leading-[1.85] text-[#555]">
                                {t("home_cred_desc",
                                    "Built on decades of hands-on experience across Saudi Arabia, Gulf Al Olaya has grown from a dedicated contracting company into a multi-discipline construction and electro-mechanical powerhouse. Our commitment to quality, safety, and client satisfaction has driven us to deliver some of the most demanding projects in the Kingdom — on time, within budget, and to the highest standards.")}
                            </p>
                        </div>
                    </div>

                    {/* Stats row — 50+ / 6+ / 100% */}
                    <div className="mt-16 md:mt-20">
                        <div className="grid gap-10 sm:grid-cols-3 md:gap-0 md:pl-[25%]">
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
                                        <p className="text-[64px] font-medium tracking-tight text-[#18324e] md:text-[80px] leading-none">
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
            <section className="w-full bg-white">
                <SustainabilityCarousel />
            </section>

            {/* ═══════════════════════════════════════════════════════
                8. FEATURED PROJECTS
                ═══════════════════════════════════════════════════════ */}
            <section className="w-full bg-white">
                <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">

                    <div className="mb-10">
                        <p className="text-[12px] font-bold tracking-[0.2em] text-[#f26522] uppercase">
                            {t("home_featured_label", "FEATURED PROJECTS")}
                        </p>
                        <h3 className="mt-3 text-[24px] font-bold text-[#18324e] md:text-[30px]">
                            {t("home_featured_title", "View Our Latest Projects")}
                        </h3>
                        <p className="mt-3 max-w-xl text-[14.5px] leading-relaxed text-[#777]">
                            {t("home_featured_desc", "We are proud of our strong portfolio of 60+ projects across 3 continents and 8 countries.")}
                        </p>
                    </div>

                    <div className="relative w-full flex flex-col md:flex-row md:items-center rounded-2xl overflow-hidden bg-[#12273f] md:bg-transparent min-h-[440px] md:min-h-[480px]">
                        {/* Dark blue backdrop */}
                        <div className="hidden md:block absolute right-0 top-[8%] bottom-[8%] w-[88%] md:w-[74%] bg-[#12273f] z-0" />
                        {/* Orange shards */}
                        <div className="hidden md:block absolute left-[12%] top-[-2%] w-[11%] h-[11%] bg-[#f26522] z-0"
                            style={{ clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)" }} />
                        <div className="hidden md:block absolute left-[4%] bottom-[-2%] w-[7%] h-[9%] bg-[#f26522] z-0"
                            style={{ clipPath: "polygon(0% 0%, 100% 100%, 15% 100%)" }} />

                        {/* Polygon project image */}
                        <div
                            className="relative w-full h-64 md:absolute md:left-0 md:top-[5%] md:bottom-[5%] md:w-[44%] bg-cover bg-center z-10 shadow-xl clip-polygon-home-project"
                            style={{
                                backgroundImage: `url(${getImageUrl(projects[featuredIdx]?.featuredImageUrl) || "/images/hero.png"})`,
                            }}
                        />

                        {/* Content panel */}
                        <div className="relative z-20 w-full flex items-center justify-end h-full">
                            <div className="w-full md:w-[64%] px-5 py-6 md:py-10 flex items-center justify-between">

                                {/* ← arrow */}
                                <button
                                    onClick={() => setFeaturedIdx(p => (p - 1 + (projects.length || 1)) % (projects.length || 1))}
                                    className="hidden md:inline-flex flex-none h-12 w-12 items-center justify-center rounded-full border border-white/50 hover:bg-white/10 transition-colors"
                                    aria-label="Previous project">
                                    <svg width="22" height="22" viewBox="0 0 24 24" strokeWidth="1.3" stroke="white" fill="none">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                                    </svg>
                                </button>

                                <div className="flex-1 px-4 md:px-10 text-left">
                                    {/* Progress bars */}
                                    <div className="flex gap-1.5 mb-7 w-full max-w-md">
                                        {projects.slice(0, 5).map((_, i) => (
                                            <div key={i} className={`h-[2px] flex-1 transition-colors duration-500 ${i === featuredIdx % 5 ? "bg-white" : "bg-white/20"}`} />
                                        ))}
                                    </div>

                                    <p className="text-[13px] font-bold text-[#f26522]">
                                        {t(projects[featuredIdx]?.client) || t("Civil & Structural Works")}
                                    </p>
                                    <h4 className="mt-2 text-[22px] font-bold text-white md:text-[26px]">
                                        {t(projects[featuredIdx]?.title) || t("Zulfi Mosque & House Project")}
                                    </h4>
                                    <p className="mt-3 text-[14.5px] leading-relaxed text-white/75 line-clamp-4">
                                        {projects[featuredIdx]?.status
                                            ? t(projects[featuredIdx].status)
                                            : t("zulfi_mosque_fallback_desc")}
                                    </p>

                                    {/* Mobile controls */}
                                    <div className="mt-7 flex gap-3 md:hidden">
                                        <button onClick={() => setFeaturedIdx(p => (p - 1 + (projects.length || 1)) % (projects.length || 1))}
                                            className="h-10 w-10 flex items-center justify-center rounded-full border border-white/50">
                                            <svg width="18" height="18" viewBox="0 0 24 24" strokeWidth="1.3" stroke="white" fill="none"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" /></svg>
                                        </button>
                                        <button onClick={() => setFeaturedIdx(p => (p + 1) % (projects.length || 1))}
                                            className="h-10 w-10 flex items-center justify-center rounded-full border border-white/50">
                                            <svg width="18" height="18" viewBox="0 0 24 24" strokeWidth="1.3" stroke="white" fill="none"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" /></svg>
                                        </button>
                                    </div>
                                </div>

                                {/* → arrow */}
                                <button
                                    onClick={() => setFeaturedIdx(p => (p + 1) % (projects.length || 1))}
                                    className="hidden md:inline-flex flex-none h-12 w-12 items-center justify-center rounded-full border border-white/50 hover:bg-white/10 transition-colors"
                                    aria-label="Next project">
                                    <svg width="22" height="22" viewBox="0 0 24 24" strokeWidth="1.3" stroke="white" fill="none">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
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
            <section className="relative w-full bg-white overflow-hidden py-14 md:py-20">
                {/* Subtle bg pattern */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="tri-pat" width="60" height="60" patternUnits="userSpaceOnUse" patternTransform="rotate(15)">
                            <path d="M10 40 L30 10 L50 40 Z" fill="none" stroke="#18324e" strokeWidth="1.5" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#tri-pat)" />
                </svg>

                {/* Origami birds */}
                <svg className="absolute right-[44%] top-[4%] pointer-events-none opacity-[0.07] text-[#18324e]" width="70" height="70" viewBox="0 0 100 100">
                    <path d="M10 40 L40 30 L60 50 L30 60 Z M40 30 L60 50 L90 10 Z" fill="currentColor" />
                </svg>
                <svg className="absolute right-[2%] top-[30%] pointer-events-none opacity-[0.07] text-[#18324e]" width="54" height="54" viewBox="0 0 100 100" style={{ transform: "rotate(-20deg)" }}>
                    <path d="M10 40 L40 30 L60 50 L30 60 Z M40 30 L60 50 L90 10 Z" fill="currentColor" />
                </svg>

                <div className="relative z-10 mx-auto max-w-6xl px-4">

                    {/* Top row: left column heading, right column featured image */}
                    <div className="grid gap-10 md:grid-cols-12 md:gap-14">
                        <div className="md:col-span-4">
                            <p className="text-[12px] font-bold tracking-[0.2em] text-[#f26522] uppercase">
                                {t("home_news_label", "NEWS ROOM")}
                            </p>
                            <h3 className="mt-4 text-[24px] font-bold leading-tight text-[#18324e] md:text-[30px]">
                                {t("home_news_title", "View Our Latest News")}
                            </h3>
                            <p className="mt-4 max-w-xs text-[14.5px] leading-relaxed text-[#777]">
                                {t("home_news_desc", "Check out our latest news, press releases, events, and conferences.")}
                            </p>
                            <div className="mt-7">
                                <Link to="/blog"
                                    className="inline-flex rounded-sm bg-[#f26522] px-6 py-2.5 text-[13px] font-bold text-white hover:bg-orange-600 transition-all">
                                    {t("home_news_all_btn", "Read All News")}
                                </Link>
                            </div>
                        </div>

                        <div className="md:col-span-8">
                            <div className="overflow-hidden bg-slate-100 aspect-[16/9] shadow-md">
                                <img
                                    src={getImageUrl(blogs[0]?.imageUrl) || "/images/Frame51.png"}
                                    alt="Featured news"
                                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                                />
                            </div>
                            <p className="mt-4 text-[12px] font-semibold text-[#777]">
                                {blogs[0]?.updatedAt
                                    ? new Date(blogs[0].updatedAt).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })
                                    : "Dec 03, 2025"}
                                <span className="mx-2">•</span>
                                <span className="font-bold text-[#18324e]">{t("event", "Event")}</span>
                            </p>
                            <p className="mt-1.5 text-[18px] font-bold text-[#18324e]">
                                {blogs[0]?.title || t("Zulfi Mosque & House Project")}
                            </p>
                        </div>
                    </div>

                    {/* Bottom 3 news cards */}
                    <div className="mt-12 grid gap-7 md:grid-cols-3">
                        {[...blogs.slice(1, 4), ...Array(Math.max(0, 3 - (blogs.length - 1))).fill(null)].map((n, idx) => {
                            const fallbackTitles = [
                                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor.",
                                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor.",
                                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor.",
                            ];
                            const fallbackDates = ["Nov 18, 2025", "Nov 17, 2025", "Nov 16, 2025"];
                            return (
                                <div key={idx} className="group cursor-pointer">
                                    <div className="overflow-hidden bg-slate-100 aspect-[16/10] shadow-sm">
                                        <img
                                            src={getImageUrl(n?.imageUrl) || "/images/Frame51.png"}
                                            alt="News"
                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>
                                    <p className="mt-3 text-[11.5px] font-semibold text-[#777]">
                                        {n?.updatedAt
                                            ? new Date(n.updatedAt).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })
                                            : fallbackDates[idx]}
                                        <span className="mx-2">•</span>
                                        <span className="font-bold text-[#18324e]">{t("event", "Event")}</span>
                                    </p>
                                    <p className="mt-1.5 text-[13.5px] leading-relaxed text-[#555] group-hover:text-[#f26522] transition-colors line-clamp-3">
                                        {n?.title || fallbackTitles[idx]}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════
                10. CAREERS
                ═══════════════════════════════════════════════════════ */}
            <section className="relative w-full bg-[#142940] overflow-hidden">
                {/* Orange triangle decorations */}
                <div className="absolute right-[20%] top-[10%] w-[90px] h-[90px] bg-[#f26522] opacity-90"
                    style={{ clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)", transform: "rotate(45deg)" }} />
                <div className="absolute left-[4%] bottom-[0%] w-[110px] h-[90px] bg-[#f26522] opacity-90"
                    style={{ clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)", transform: "rotate(-30deg) translate(-20px, 40px)" }} />
                <div className="absolute right-[14%] bottom-[4%] w-[70px] h-[70px] bg-[#f26522] opacity-90"
                    style={{ clipPath: "polygon(0 0, 100% 50%, 0 100%)", transform: "rotate(-20deg)" }} />

                <div className="mx-auto max-w-6xl px-4 py-20 md:py-28 text-center text-white relative z-10">
                    <p className="text-[12px] font-bold tracking-[0.2em] text-[#f26522] uppercase">
                        {t("home_careers_label", "CAREERS")}
                    </p>
                    <h3 className="mt-4 text-[26px] font-bold md:text-[34px]">
                        {t("home_careers_title", "Join Our Team")}
                    </h3>
                    <p className="mx-auto mt-5 max-w-2xl text-[17px] font-medium leading-[1.65]">
                        {t("home_careers_title2",
                            "We are always looking for talented, driven people who take pride in building something that lasts.")}
                    </p>
                    <p className="mx-auto mt-5 max-w-4xl text-[15px] leading-[1.85] text-white/80">
                        {t("home_careers_desc",
                            "At Gulf Al Olaya, our people are our greatest strength. Whether you are an experienced engineer, a skilled technician, or a construction professional looking for your next challenge — we offer a workplace where your work matters, your growth is supported, and your contribution is valued.")}
                    </p>
                    <Link to="/careers"
                        className="mt-8 inline-flex items-center justify-center rounded-sm bg-[#f26522] px-8 py-3 text-[14px] font-bold text-white hover:bg-orange-600 transition-all">
                        {t("home_careers_btn", "Submit Your CV")}
                    </Link>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════
                11. CONTACT US
                ═══════════════════════════════════════════════════════ */}
            <section className="w-full bg-white">
                <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
                    <div className="grid gap-12 md:grid-cols-2 md:items-center md:gap-16">

                        {/* Left — polygon-clipped image with orange shards */}
                        <div className="relative w-full aspect-[4/3]">
                            <div className="absolute left-[-5%] top-[35%] w-[40%] h-[30%] bg-[#f26522] z-0"
                                style={{ clipPath: "polygon(0 50%, 100% 0, 100% 100%)" }} />
                            <div className="absolute right-[-5%] top-[15%] w-[60%] h-[70%] bg-[#f26522] z-0"
                                style={{ clipPath: "polygon(0 0, 100% 30%, 50% 100%, 20% 80%)" }} />
                            <div className="absolute left-[20%] bottom-[0%] w-[30%] h-[30%] bg-[#f26522] z-0"
                                style={{ clipPath: "polygon(50% 0, 100% 100%, 0 100%)" }} />
                            <div className="absolute inset-0 z-10 overflow-hidden shadow-2xl"
                                style={{ clipPath: "polygon(0% 25%, 100% 0%, 85% 100%, 15% 75%)" }}>
                                <img src="/images/How can i help.png" alt="Contact"
                                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
                            </div>
                        </div>

                        {/* Right — text */}
                        <div className="md:pl-8">
                            <p className="text-[12px] font-bold tracking-[0.2em] text-[#18324e] uppercase">
                                {t("home_contact_label", "CONTACT US")}
                            </p>
                            <h3 className="mt-4 text-[30px] font-bold text-[#18324e] md:text-[38px]">
                                {t("home_contact_title", "How can we help?")}
                            </h3>
                            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-[#555]">
                                {t("home_contact_desc",
                                    "Every great project starts with a conversation. Whether you have a fully scoped tender or just an early-stage idea, our team is ready to listen, advise, and find the right solution for you.")}
                            </p>
                            <Link to="/contact"
                                className="mt-8 inline-flex rounded-sm bg-[#f26522] px-7 py-3 text-[14px] font-bold text-white hover:bg-orange-600 transition-all">
                                {t("home_contact_btn", "Send Message")}
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════
                12. BOTTOM BANNER  (full-width photo + quote)
                ═══════════════════════════════════════════════════════ */}
            <section className="relative w-full min-h-[480px] flex items-center justify-center overflow-hidden">
                <img
                    src={bottomBanner?.imageUrls?.[0] ? getImageUrl(bottomBanner.imageUrls[0]) : "/images/panel.png"}
                    alt="Closing banner"
                    className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-[#0f2d45]/65" />

                <div className="relative z-10 mx-auto w-full max-w-5xl px-4 py-20 text-center">
                    <h3 className="text-[32px] font-bold leading-tight text-white md:text-[46px] tracking-wide">
                        "{t(bottomBanner?.headline) || t("home_bottom_title", "The center of strength & excellence.")}"
                    </h3>
                    <p className="mx-auto mt-6 max-w-3xl text-[16px] leading-[1.85] text-white/85 font-medium whitespace-pre-line">
                        {t(bottomBanner?.subHeadline) || t("home_bottom_desc",
                            "From industrial piping to transmission lines, from civil works to MEP systems — Gulf Al Olaya brings strength, skill, and commitment to every project we build.")}
                    </p>
                </div>
            </section>

        </div>
    );
}
