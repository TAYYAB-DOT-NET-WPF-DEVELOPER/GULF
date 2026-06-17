import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { http, getImageUrl } from "../api/http";
import { useTranslation } from "react-i18next";
import { useSEO } from "../hooks/useSEO";
import { Link } from "react-router-dom";

export default function Blog() {
    const { t, i18n } = useTranslation();
    useSEO("PAGE", "blog");
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [q, setQ] = useState("");
    const [heroBanner, setHeroBanner] = useState(null);

    async function loadBlogs() {
        try {
            const [{ data: blogsData }, { data: heroData }] = await Promise.all([
                http.get("/api/blog"),
                http.get("/api/banners/blog-hero").catch(() => ({ data: null }))
            ]);
            setBlogs(Array.isArray(blogsData) ? blogsData : []);
            setHeroBanner(heroData);
        } catch (e) {
            console.error("News load error:", e);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadBlogs();
    }, [t, i18n.language]);

    const filtered = blogs.filter((b) => {
        const matchesQ = b.title.toLowerCase().includes(q.toLowerCase()) ||
            b.content?.toLowerCase().includes(q.toLowerCase());
        return matchesQ;
    });

    const featuredPost = filtered[0];
    const otherPosts = filtered.slice(1);

    return (
        <div className="bg-white min-h-screen">
            <Header theme="light" />

            {/* HERO SECTION */}
            <section className="relative pt-12 pb-20 md:pt-20 md:pb-28">
                <div className="mx-auto max-w-6xl px-4">
                    <div className="grid gap-12 md:grid-cols-12 md:items-center">
                        <div className="md:col-span-7">
                            <p className="text-[14px] font-bold tracking-[0.1em] text-[#f26522] uppercase mb-4">
                                {t("nav_new_updates")}
                            </p>
                            <h1 className="text-[36px] md:text-[54px] font-bold text-[#0f2d45] leading-[1.1] tracking-tight">
                                {t("blog_hero_title")}
                            </h1>
                        </div>
                        <div className="md:col-span-5 flex justify-end">
                            <img src="/images/Union.png" alt="Gulf Al Olaya Logo" className="w-full max-w-[400px] opacity-90" />
                        </div>
                    </div>
                </div>
            </section>

            {/* FEATURED POST */}
            <section className="pb-24">
                <div className="mx-auto max-w-6xl px-4">
                    {loading ? (
                        <div className="flex h-64 items-center justify-center">
                            <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#f26522] border-t-transparent" />
                        </div>
                    ) : featuredPost ? (
                        <div className="relative">
                            {/* Decorative Wing */}
                            <img src="/images/Union.png" className="absolute -left-12 top-1/2 -translate-y-1/2 w-20 hidden md:block opacity-80" alt="" />
                            <img src="/images/Union.png" className="absolute -right-12 top-1/2 -translate-y-1/2 w-20 hidden md:block opacity-80 rotate-180" alt="" />

                            <div className="grid gap-12 md:grid-cols-2 md:items-center">
                                <div className="relative aspect-[16/11] overflow-hidden rounded-sm bg-slate-100 shadow-xl shadow-slate-200/50">
                                    <img
                                        src={getImageUrl(featuredPost.imageUrl)}
                                        alt={featuredPost.title}
                                        className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                                        onError={(e) => { e.target.src = "/images/vision.png" }}
                                    />
                                </div>
                                <div className="flex flex-col items-start pr-0 md:pr-12">
                                    <div className="flex items-center gap-4 text-[13px] font-medium text-slate-500 mb-6">
                                        <span>{new Date(featuredPost.updatedAt).toLocaleDateString("en-US", { month: 'short', day: '2-digit', year: 'numeric' })}</span>
                                        <span className="h-1 w-1 rounded-full bg-[#f26522]"></span>
                                        <span className="text-[#0f2d45] font-bold uppercase tracking-widest">{t("event")}</span>
                                    </div>
                                    <h2 className="text-[28px] md:text-[34px] font-bold text-[#0f2d45] leading-tight mb-8 group-hover:text-[#f26522] transition-colors">
                                        {t(featuredPost.title)}
                                    </h2>
                                    <div className="flex items-center gap-6">
                                        <Link
                                            to={`/blog/${featuredPost.slug || featuredPost.id}`}
                                            className="px-6 py-2.5 border-2 border-[#f26522] text-[#f26522] text-[13px] font-bold uppercase tracking-widest hover:bg-[#f26522] hover:text-white transition-all rounded-sm"
                                        >
                                            {t("blog_read_more")}
                                        </Link>
                                        <span className="text-[13px] text-slate-400 font-medium">2 mins read</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-slate-50 rounded-xl">
                            <p className="text-xl font-bold text-slate-400">{t("blog_no_articles")}</p>
                        </div>
                    )}
                </div>
            </section>

            {/* FILTER BAR SECTION */}
            <section className="relative z-20 -mt-10 mb-16">
                <div className="mx-auto max-w-6xl px-4">
                    <div className="bg-white rounded-xl shadow-xl shadow-slate-200/60 p-4 md:p-6 flex flex-col md:flex-row items-center gap-6 md:gap-0">
                        <div className="flex-1 w-full md:pr-10 border-b md:border-b-0 md:border-r border-slate-100 pb-4 md:pb-0">
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
                                <input
                                    type="text"
                                    placeholder={t("Search By Keywords")}
                                    value={q}
                                    onChange={(e) => setQ(e.target.value)}
                                    className="w-full h-12 rounded-lg bg-slate-50 pl-12 pr-4 text-sm outline-none focus:ring-2 focus:ring-[#f26522]/20 transition-all"
                                />
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center justify-around flex-[2] w-full gap-4 md:gap-0">
                            <button className="flex items-center gap-2 text-[15px] font-bold text-[#0f2d45] px-6 py-2 hover:bg-slate-50 rounded-lg transition-colors">
                                {t("blog_filter_format")} <span className="text-[#f26522]">+</span>
                            </button>
                            <div className="hidden md:block w-px h-8 bg-slate-100"></div>
                            <button className="flex items-center gap-2 text-[15px] font-bold text-[#0f2d45] px-6 py-2 hover:bg-slate-50 rounded-lg transition-colors">
                                {t("blog_filter_category")} <span className="text-[#f26522]">+</span>
                            </button>
                            <div className="hidden md:block w-px h-8 bg-slate-100"></div>
                            <button className="flex items-center gap-2 text-[15px] font-bold text-[#0f2d45] px-6 py-2 hover:bg-slate-50 rounded-lg transition-colors">
                                {t("blog_filter_date")} <span className="text-[#f26522]">+</span>
                            </button>
                            <div className="hidden md:block w-px h-8 bg-slate-100"></div>
                            <button
                                onClick={() => setQ("")}
                                className="text-[15px] font-bold text-[#0f2d45] px-6 py-2 hover:text-[#f26522] transition-colors"
                            >
                                {t("blog_filter_reset")}
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* RESULTS COUNT & GRID SECTION */}
            <section className="pb-24">
                <div className="mx-auto max-w-6xl px-4">
                    <div className="mb-12">
                        <h2 className="text-[28px] font-bold text-[#0f2d45]">
                            <span className="text-[#f26522]">{filtered.length}</span> {t("Results")}
                        </h2>
                    </div>

                    {!loading ? (
                        <>
                            <div className="grid gap-x-8 gap-y-12 md:grid-cols-3">
                                {filtered.map((b) => (
                                    <article key={b.id} className="relative bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 group overflow-hidden">
                                        {/* Decorative Wing overlapping image */}
                                        <div className="absolute top-4 left-6 z-10">
                                            <img src="/images/Union.png" className="w-10 opacity-90 drop-shadow-md" alt="" />
                                        </div>

                                        <div className="flex flex-col h-full">
                                            {/* Image container */}
                                            <div className="relative aspect-[4/3] overflow-hidden bg-slate-50">
                                                <img
                                                    src={getImageUrl(b.imageUrl)}
                                                    alt={b.title}
                                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                    onError={(e) => { e.target.src = "/images/vision.png" }}
                                                />
                                            </div>

                                            {/* Content container */}
                                            <div className="p-8 flex flex-col flex-1">
                                                <div className="flex items-center gap-2 text-[12px] font-medium text-slate-500 mb-4">
                                                    <span>{new Date(b.updatedAt).toLocaleDateString("en-US", { month: 'short', day: '2-digit', year: 'numeric' })}</span>
                                                    <span className="h-1 w-1 rounded-full bg-[#f26522]"></span>
                                                    <span className="text-[#0f2d45] font-bold">{t("event")}</span>
                                                </div>

                                                <h3 className="text-[18px] font-bold text-[#0f2d45] leading-snug mb-6 line-clamp-3 group-hover:text-[#f26522] transition-colors">
                                                    {t(b.title)}
                                                </h3>

                                                <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                                                    <Link
                                                        to={`/blog/${b.slug || b.id}`}
                                                        className="text-[13px] font-bold text-[#f26522] uppercase tracking-wider hover:underline"
                                                    >
                                                        {t("blog_read_more")}
                                                    </Link>
                                                    <span className="text-[12px] text-slate-400 font-medium italic">2 mins read</span>
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>

                            {/* PAGINATION */}
                            {filtered.length > 0 && (
                                <div className="mt-20 flex justify-center items-center gap-3">
                                    <button className="w-14 h-14 rounded-lg border-2 border-[#f26522] bg-white text-[#f26522] font-bold text-lg hover:bg-[#f26522] hover:text-white transition-all">1</button>
                                    <button className="w-14 h-14 rounded-lg bg-[#f26522] text-white font-bold text-lg shadow-lg shadow-[#f26522]/30 transition-all">2</button>
                                    <button className="w-14 h-14 rounded-lg bg-[#f26522] text-white font-bold text-lg shadow-lg shadow-[#f26522]/30 transition-all">3</button>
                                    <button className="w-14 h-14 rounded-lg bg-[#f26522] text-white font-bold text-lg shadow-lg shadow-[#f26522]/30 transition-all">4</button>
                                    <span className="text-[#0f2d45] font-bold px-2">...</span>
                                    <button className="w-14 h-14 rounded-lg bg-[#f26522] text-white font-bold text-lg shadow-lg shadow-[#f26522]/30 transition-all">20</button>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="flex h-64 items-center justify-center">
                            <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#f26522] border-t-transparent" />
                        </div>
                    )}
                </div>
            </section>

            {/* SEARCH SECTION (Moved to bottom or side as per need) */}
            <section className="py-20 border-t border-slate-100">
                <div className="mx-auto max-w-4xl px-4 text-center">
                    <h2 className="text-2xl font-bold text-[#0f2d45] mb-8 uppercase tracking-tight">{t("blog_search_archive")}</h2>
                    <div className="relative max-w-2xl mx-auto">
                        <input
                            type="text"
                            placeholder={t("Search articles...")}
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            className="w-full h-14 rounded-full border border-slate-200 bg-white px-8 text-slate-700 text-sm outline-none focus:border-[#f26522] transition-colors shadow-sm"
                        />
                        <span className="absolute right-8 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
                    </div>
                </div>
            </section>

            {/* NEWSLETTER */}
            <section className="bg-slate-50 py-20">
                <div className="mx-auto max-w-4xl px-4 text-center">
                    <h2 className="text-3xl font-bold text-[#0f2d45] uppercase tracking-tight">{t("blog_newsletter_title")}</h2>
                    {/* <p className="mt-4 text-slate-500 font-medium">{t("blog_newsletter_desc")}</p> */}
                    <div className="mt-10 flex flex-col gap-4 md:flex-row md:items-center">
                        <input
                            type="email"
                            placeholder={t("newsletter_placeholder")}
                            className="h-14 flex-1 rounded-lg border border-slate-200 bg-white px-6 text-sm outline-none focus:border-[#f26522] transition-colors"
                        />
                        <button className="h-14 rounded-lg bg-[#0f2d45] px-10 text-sm font-bold text-white uppercase tracking-widest hover:bg-[#1a4a6e] transition-all shadow-lg shadow-[#0f2d45]/20">
                            {t("SUBSCRIBE")}
                        </button>
                    </div>
                </div>
            </section>

        </div>
    );
}
