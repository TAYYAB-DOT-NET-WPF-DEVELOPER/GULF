import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { http, getImageUrl } from "../api/http";
import { useSEO } from "../hooks/useSEO";
import { Link } from "react-router-dom";

export default function News() {
    useSEO("PAGE", "news");
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [q, setQ] = useState("");
    const [category, setCategory] = useState("All");

    async function loadBlogs() {
        try {
            const { data } = await http.get("/api/blog");
            setBlogs(Array.isArray(data) ? data : []);
        } catch (e) {
            console.error("News load error:", e);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadBlogs();
    }, []);

    const filtered = blogs.filter((b) => {
        const matchesQ = b.title.toLowerCase().includes(q.toLowerCase()) ||
            b.content?.toLowerCase().includes(q.toLowerCase());
        return matchesQ;
    });

    return (
        <div className="bg-white">
            {/* HERO */}
            <section className="relative h-[480px] w-full overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="/images/news-hero.jpg"
                        alt="News Hero"
                        className="h-full w-full object-cover"
                        onError={(e) => { e.target.src = "/images/panel.png" }}
                    />
                </div>
                <div className="absolute inset-0 bg-[#0f2d45]/60" />
                <Header overlay />

                <div className="relative z-10 flex h-full items-center">
                    <div className="mx-auto max-w-6xl px-4 w-full">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
                            <div className="max-w-2xl">
                                <p className="text-xs font-black tracking-[0.3em] text-orange-400 uppercase">Press Room</p>
                                <h1 className="mt-4 text-4xl font-black text-white md:text-6xl uppercase tracking-tighter">
                                    Latest News & <br /> Updates
                                </h1>
                            </div>
                            <div className="flex-1 max-w-md">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search articles..."
                                        value={q}
                                        onChange={(e) => setQ(e.target.value)}
                                        className="w-full h-14 rounded-xl border border-white/20 bg-white/10 backdrop-blur-md px-6 text-white text-sm outline-none focus:border-orange-500 transition-colors placeholder:text-white/40"
                                    />
                                    <span className="absolute right-6 top-1/2 -translate-y-1/2 text-white/40 text-lg">🔍</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* BLOG GRID */}
            <section className="py-20 md:py-28">
                <div className="mx-auto max-w-6xl px-4">
                    {loading ? (
                        <div className="flex h-64 items-center justify-center">
                            <div className="h-10 w-10 animate-spin rounded-full border-4 border-orange-500 border-t-transparent" />
                        </div>
                    ) : filtered.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-xl font-bold text-slate-400">No articles match your search.</p>
                            <button
                                onClick={() => setQ("")}
                                className="mt-4 text-orange-500 font-bold hover:underline"
                            >
                                Clear search
                            </button>
                        </div>
                    ) : (
                        <div className="grid gap-x-8 gap-y-16 md:grid-cols-3">
                            {filtered.map((b) => (
                                <article key={b.id} className="group flex flex-col">
                                    <div className="overflow-hidden rounded-xl bg-slate-100 aspect-video">
                                        <img
                                            src={getImageUrl(b.imageUrl)}
                                            alt={b.title}
                                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            onError={(e) => { e.target.src = "/images/Frame51.png" }}
                                        />
                                    </div>
                                    <p className="mt-6 text-[10px] font-black tracking-widest text-orange-600 uppercase">
                                        {new Date(b.updatedAt).toLocaleDateString("en-US", { month: 'short', day: '2-digit', year: 'numeric' })}
                                    </p>
                                    <h3 className="mt-4 text-xl font-black text-[#0f2d45] uppercase tracking-tight line-clamp-2 min-h-[3.5rem] group-hover:text-orange-600 transition-colors">
                                        {b.title}
                                    </h3>
                                    <p className="mt-4 text-sm leading-7 text-slate-500 line-clamp-3">
                                        {b.content?.replace(/<[^>]*>/g, '').substring(0, 150)}...
                                    </p>
                                    <Link
                                        to={`/news/${b.slug || b.id}`}
                                        className="mt-6 text-xs font-black tracking-widest text-[#0f2d45] uppercase border-b-2 border-orange-500 self-start pb-1 hover:text-orange-600 transition-colors"
                                    >
                                        Read Story
                                    </Link>
                                </article>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* NEWSLETTER */}
            <section className="bg-slate-50 py-20">
                <div className="mx-auto max-w-4xl px-4 text-center">
                    <h2 className="text-3xl font-black text-[#0f2d45] uppercase tracking-tight">Stay Updated</h2>
                    <p className="mt-4 text-slate-500 font-medium">Subscribe to our newsletter for latest industry insights and corporate news.</p>
                    <div className="mt-10 flex flex-col gap-4 md:flex-row md:items-center">
                        <input
                            type="email"
                            placeholder="Your email address"
                            className="h-14 flex-1 rounded-lg border border-slate-200 bg-white px-6 text-sm outline-none focus:border-orange-500 transition-colors"
                        />
                        <button className="h-14 rounded-lg bg-[#0f2d45] px-10 text-sm font-black text-white uppercase tracking-widest hover:bg-[#1a4a6e] transition-all shadow-lg shadow-[#0f2d45]/20">
                            Subscribe
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
