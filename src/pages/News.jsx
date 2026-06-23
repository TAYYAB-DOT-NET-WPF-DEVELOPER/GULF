import React, { useState } from "react";
import Header from "../components/Header";
import { useSEO } from "../hooks/useSEO";
import { Link } from "react-router-dom";

// ─── Static news articles using NewsUpdates1–6 images ───────────────────────
const ARTICLES = [
  {
    id: 1,
    image: "/images/NewsUpdates1.png",
    category: "Event",
    date: "Nov 15, 2025",
    readTime: "3 min read",
    title: "Gulf Al Olaya Engineering Services Receives Appreciation Award from SATORP",
    excerpt:
      "Gulf Al Olaya Engineering Services was honored with an appreciation award from SATORP in recognition of outstanding performance, safety compliance, and timely delivery of mechanical and piping works at the Total refinery complex in Jubail Industrial City.",
    featured: true,
  },
  {
    id: 2,
    image: "/images/NewsUpdates2.png",
    category: "New Projects",
    date: "Dec 2, 2025",
    readTime: "4 min read",
    title: "Alliance Contracting Solutions Appoints Gulf Al Olaya as Strategic Oil & Gas Partner",
    excerpt:
      "Alliance Contracting Solutions has officially appointed Gulf Al Olaya as a preferred strategic partner for oil, gas, and industrial mechanical construction projects across the Eastern Province and across the Kingdom of Saudi Arabia.",
    featured: true,
  },
  {
    id: 3,
    image: "/images/NewsUpdates3.png",
    category: "Event",
    date: "Nov 15, 2025",
    readTime: "3 min read",
    title: "Gulf Al Olaya Signs Strategic Partnership for MEP Works Across KSA",
    excerpt:
      "Gulf Al Olaya has entered into a strategic collaboration agreement for the delivery of MEP and civil works across multiple ongoing developments in the Kingdom, reinforcing its commitment to excellence and timely project delivery.",
  },
  {
    id: 4,
    image: "/images/NewsUpdates4.png",
    category: "Event",
    date: "Nov 15, 2025",
    readTime: "3 min read",
    title: "Senior Leadership Meeting Reviews 2025 Project Milestones and Expansion Plans",
    excerpt:
      "Gulf Al Olaya's senior leadership team convened to review major project milestones achieved in 2025 and outline the strategic expansion roadmap for new divisions and project opportunities across the Kingdom.",
  },
  {
    id: 5,
    image: "/images/NewsUpdates5.png",
    category: "Event",
    date: "Nov 11, 2025",
    readTime: "3 min read",
    title: "Gulf Al Olaya Hosts Quarterly Business Review with Key Stakeholders",
    excerpt:
      "The company hosted its quarterly business review meeting with key stakeholders, presenting project status reports, financial performance highlights, and the company's ambitious growth targets for the coming fiscal year.",
  },
  {
    id: 6,
    image: "/images/NewsUpdates6.png",
    category: "Event",
    date: "Nov 11, 2025",
    readTime: "3 min read",
    title: "Gulf Al Olaya Celebrates Contract Award for Major Industrial Facility Project",
    excerpt:
      "Gulf Al Olaya celebrated the official award of a major contract for the design and construction of a large industrial facility in the Eastern Province, adding to its growing portfolio of engineering and construction projects across Saudi Arabia.",
  },
];

const CATEGORIES = ["All", "Event", "New Projects", "Announcement", "Press Release"];

export default function News() {
  useSEO("PAGE", "news");
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("All");

  const featured = ARTICLES.filter((a) => a.featured);
  const grid = ARTICLES.filter((a) => !a.featured);

  const filtered = ARTICLES.filter((a) => {
    const matchQ =
      a.title.toLowerCase().includes(q.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(q.toLowerCase());
    const matchCat = category === "All" || a.category === category;
    return matchQ && matchCat;
  });

  const filteredFeatured = filtered.filter((a) => a.featured);
  const filteredGrid = filtered.filter((a) => !a.featured);

  return (
    <div className="bg-white min-h-screen">
      {/* ─── HERO ─── */}
      <section className="relative w-full overflow-hidden" style={{ minHeight: 420 }}>
        <div className="absolute inset-0 bg-[#0c1f35]" />
        {/* subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <Header overlay />

        <div className="relative z-10 mx-auto max-w-6xl px-6 pb-20 pt-44">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
            {/* Left — text */}
            <div className="max-w-2xl">
              <p className="text-xs font-black tracking-[0.3em] text-orange-400 uppercase mb-4">
                Press Room
              </p>
              <h1 className="text-5xl md:text-7xl font-black text-white uppercase leading-none tracking-tight">
                Find all the latest<br />
                developments and<br />
                happenings at Gulf Al Olaya<br />
                right here.
              </h1>
            </div>

            {/* Right — brand block */}
            <div className="flex-shrink-0 text-right">
              <p className="text-3xl md:text-4xl font-black text-white tracking-tight leading-none">
                GULF <span className="text-orange-400">AL</span> OLAYA
              </p>
              <p className="mt-1 text-sm font-semibold tracking-[0.25em] text-white/60 uppercase">
                General Contracting
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FEATURED ARTICLES ─── */}
      {filteredFeatured.length > 0 && (
        <section className="py-14 bg-white border-b border-slate-100">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid gap-8 md:grid-cols-2">
              {filteredFeatured.map((art) => (
                <article
                  key={art.id}
                  className="group flex flex-col md:flex-row gap-5 items-start"
                >
                  <div className="w-full md:w-52 flex-shrink-0 overflow-hidden rounded-xl aspect-video md:aspect-auto md:h-36 bg-slate-100">
                    <img
                      src={art.image}
                      alt={art.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-black tracking-[0.25em] text-slate-400 uppercase">
                        {art.date}
                      </span>
                      <span className="h-1 w-1 rounded-full bg-orange-500" />
                      <span className="text-[10px] font-black tracking-[0.2em] text-orange-500 uppercase border border-orange-500/30 rounded-full px-2 py-0.5">
                        {art.category}
                      </span>
                    </div>
                    <h2 className="mt-3 text-base font-black text-[#0f2d45] uppercase leading-snug tracking-tight group-hover:text-orange-600 transition-colors line-clamp-3">
                      {art.title}
                    </h2>
                    <p className="mt-2 text-xs text-slate-500 leading-6 line-clamp-2">
                      {art.excerpt}
                    </p>
                    <div className="mt-3 flex items-center gap-4">
                      <span className="text-[10px] text-slate-400 font-semibold">{art.readTime}</span>
                      <a
                        href="#"
                        className="text-[10px] font-black tracking-widest text-[#0f2d45] uppercase border-b border-orange-500 pb-0.5 hover:text-orange-600 transition-colors"
                      >
                        Read More
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── FILTER BAR ─── */}
      <section className="sticky top-0 z-20 bg-white border-b border-slate-100 shadow-sm py-4">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Search */}
            <div className="relative flex-1 min-w-[200px]">
              <input
                type="text"
                placeholder="Search articles..."
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="w-full h-10 rounded-lg border border-slate-200 bg-slate-50 px-4 pr-10 text-sm text-slate-700 outline-none focus:border-orange-500 transition-colors"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">🔍</span>
            </div>

            {/* Category pills */}
            <div className="flex items-center gap-2 flex-wrap">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`text-[10px] font-black tracking-widest uppercase px-4 py-2 rounded-lg transition-all ${
                    category === cat
                      ? "bg-orange-500 text-white shadow-md shadow-orange-500/30"
                      : "bg-slate-100 text-slate-600 hover:bg-orange-50 hover:text-orange-600"
                  }`}
                >
                  {cat}
                </button>
              ))}
              {(q || category !== "All") && (
                <button
                  onClick={() => { setQ(""); setCategory("All"); }}
                  className="text-[10px] font-black tracking-widest uppercase px-4 py-2 rounded-lg bg-slate-200 text-slate-500 hover:bg-red-50 hover:text-red-500 transition-all"
                >
                  Reset
                </button>
              )}
            </div>

            {/* Count */}
            <p className="text-xs font-bold text-slate-400 flex-shrink-0">
              <span className="text-orange-500 font-black text-base">{filtered.length}</span> Results
            </p>
          </div>
        </div>
      </section>

      {/* ─── ARTICLES GRID ─── */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-5xl mb-4">📰</p>
              <p className="text-xl font-black text-slate-300 uppercase tracking-tight">No articles found</p>
              <button
                onClick={() => { setQ(""); setCategory("All"); }}
                className="mt-6 text-orange-500 font-black text-sm uppercase tracking-widest border-b border-orange-500 pb-0.5 hover:text-orange-600 transition-colors"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 md:grid-cols-3">
              {filtered.map((art) => (
                <article key={art.id} className="group flex flex-col">
                  {/* Image */}
                  <div className="overflow-hidden rounded-xl bg-slate-100 aspect-[4/3]">
                    <img
                      src={art.image}
                      alt={art.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>

                  {/* Meta */}
                  <div className="mt-5 flex items-center gap-2">
                    <span className="text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase">
                      {art.date}
                    </span>
                    <span className="h-1 w-1 rounded-full bg-orange-500" />
                    <span className="text-[10px] font-black tracking-[0.2em] text-orange-500 uppercase">
                      {art.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="mt-3 text-base font-black text-[#0f2d45] uppercase leading-snug tracking-tight group-hover:text-orange-600 transition-colors line-clamp-3 min-h-[4rem]">
                    {art.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="mt-3 text-sm leading-7 text-slate-500 line-clamp-3 flex-1">
                    {art.excerpt}
                  </p>

                  {/* Footer */}
                  <div className="mt-5 flex items-center justify-between">
                    <a
                      href="#"
                      className="text-[10px] font-black tracking-widest text-[#0f2d45] uppercase border-b-2 border-orange-500 pb-0.5 hover:text-orange-600 transition-colors"
                    >
                      Read More
                    </a>
                    <span className="text-[10px] font-semibold text-slate-400">{art.readTime}</span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ─── NEWSLETTER ─── */}
      <section className="bg-[#0c1f35] py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="text-xs font-black tracking-[0.3em] text-orange-400 uppercase mb-4">
            Stay Informed
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight leading-tight">
            Subscribe to our newsletter to receive all the latest news
          </h2>
          <div className="mt-10 flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 h-14 rounded-lg border border-white/10 bg-white/10 px-5 text-sm text-white outline-none focus:border-orange-500 transition-colors placeholder:text-white/40"
            />
            <button className="h-14 rounded-lg bg-orange-500 px-8 text-sm font-black text-white uppercase tracking-widest hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/30 whitespace-nowrap">
              Subscribe
            </button>
          </div>
          <p className="mt-4 text-xs text-white/30">
            By subscribing, you agree to receive email updates and privacy policy. Unsubscribe anytime.
          </p>
        </div>
      </section>

      {/* ─── BREADCRUMB / CTA FOOTER ─── */}
      <section className="bg-white py-12 border-t border-slate-100">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            {[
              { label: "Homepage", href: "/" },
              { label: "Project Portfolio", href: "/portfolio" },
              { label: "About Us Homepage", href: "/about" },
            ].map((link, i) => (
              <React.Fragment key={link.href}>
                <Link
                  to={link.href}
                  className="flex items-center gap-2 text-sm font-black text-[#0f2d45] uppercase tracking-widest hover:text-orange-600 transition-colors"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-orange-500 text-orange-500 text-xs font-black">
                    {i + 1}
                  </span>
                  {link.label}
                </Link>
                {i < 2 && (
                  <span className="hidden sm:block text-orange-400 font-black text-lg">›</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
