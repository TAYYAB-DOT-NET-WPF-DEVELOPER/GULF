import React, { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useTranslation } from "react-i18next";
import { http, getImageUrl } from "../api/http";
import { useSEO } from "../hooks/useSEO";

export default function Projects() {
  const { t, i18n } = useTranslation();
  useSEO("PAGE", "projects");
  const [q, setQ] = useState("");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState({
    business: true,
    type: true,
    country: true,
    status: true,
  });
  const [page, setPage] = useState(1);
  const [heroBanner, setHeroBanner] = useState(null);
  const [bottomBanner, setBottomBanner] = useState(null);

  async function loadProjects() {
    try {
      const [{ data: projectsData }, { data: heroData }, { data: bottomData }] = await Promise.all([
        http.get("/api/projects"),
        http.get("/api/banners/projects-hero").catch(() => ({ data: null })),
        http.get("/api/banners/projects-bottom").catch(() => ({ data: null }))
      ]);
      setProjects(Array.isArray(projectsData) ? projectsData : []);
      setHeroBanner(heroData);
      setBottomBanner(bottomData);
    } catch (e) {
      console.error("Portfolio data load error:", e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProjects();
  }, [t, i18n.language]);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return projects;
    return projects.filter((p) => {
      const hay = `${p.title} ${p.client} ${p.status} ${p.categories ? JSON.stringify(p.categories) : ""}`.toLowerCase();
      return hay.includes(s);
    });
  }, [q, projects]);

  const pages = [1, 2, 3, 4, 5];

  return (
    <div className="bg-white">
      {/* =========================
          HERO (Map + Title + Button)
         ========================= */}
      <section className="relative w-full min-h-[600px] md:min-h-[85vh] overflow-hidden bg-white">
        {/* Large background map */}
        <div className="absolute right-[-10%] top-[10%] w-[60%] md:w-[70%] opacity-[0.8] pointer-events-none z-0">
          <img
            src="/images/map.png"
            alt="World Map"
            className="w-full h-auto object-contain scale-125"
            draggable={false}
          />
        </div>

        <Header theme="light" />

        <div className="relative z-10 pt-16 md:pt-24">
          <div className="mx-auto max-w-6xl px-4">
            <div className="flex min-h-[500px] items-center md:min-h-[70vh]">
              <div className="max-w-2xl">
                <p className="text-[14px] font-bold tracking-[0.1em] text-[#0f2d45] uppercase mb-4">
                  {t("Projects/Portfolio")}
                </p>

                <h1 className="text-[42px] md:text-[64px] font-bold text-[#0f2d45] leading-[1.1] tracking-tight mb-8">
                  {t("Our Major Projects Around The World")}
                </h1>

                <p className="max-w-md text-[15px] md:text-[16px] leading-relaxed text-slate-500 mb-10">
                  {t(heroBanner?.ctaLink) || t("home_featured_desc")}
                </p>

                <div className="mt-7">
                  <Link
                    to="/projects"
                    className="inline-flex rounded-[5px] bg-[#f26522] px-10 py-4 text-[14px] font-bold uppercase tracking-wider text-white hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20"
                  >
                    {t("Discover All Projects")}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          Title strip (center) - "For the world. With the world."
         ========================= */}
      <section className="w-full bg-white pb-16">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h2 className="text-[36px] md:text-[50px] font-bold text-[#0f2d45] tracking-tight">
            {t(bottomBanner?.headline) || t("For the world. With the world.™")}
          </h2>

          <p className="mx-auto mt-6 max-w-4xl text-[16px] md:text-[18px] leading-relaxed text-slate-500 font-medium">
            {t(bottomBanner?.subHeadline) || t("Our projects around the world are powered by smart and green technologies, and led by teams of extraordinary engineers.")}
          </p>

          {/* stats + search row */}
          <div className="mt-12 flex flex-col items-center justify-center gap-6 md:flex-row">
            <p className="text-[18px] font-bold text-[#0f2d45]">
              <span className="text-[32px] font-bold text-[#f26522]">{filtered.length}</span> {t("Results")}
            </p>

            <div className="w-full max-w-md">
              <div className="flex h-14 items-center rounded-xl border border-slate-100 bg-slate-50 px-6 shadow-sm">
                <span className="mr-3 text-slate-400">🔍</span>
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder={t("Search By Keywords")}
                  className="h-full w-full bg-transparent text-sm font-medium outline-none placeholder:text-slate-400"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          Filters + Projects list
         ========================= */}
      <section className="w-full bg-white">
        <div className="mx-auto max-w-6xl px-4 pb-14">
          <div className="grid gap-10 md:grid-cols-12">
            {/* LEFT: Filters (PDF style simple list) */}
            <aside className="md:col-span-3">
              <div className="rounded-md border border-slate-200 bg-slate-50">
                <FilterRow
                  label={t("Business Lines")}
                  open={open.business}
                  onToggle={() => setOpen((p) => ({ ...p, business: !p.business }))}
                />
                <FilterRow
                  label={t("Project Type")}
                  open={open.type}
                  onToggle={() => setOpen((p) => ({ ...p, type: !p.type }))}
                />
                <FilterRow
                  label={t("Country")}
                  open={open.country}
                  onToggle={() => setOpen((p) => ({ ...p, country: !p.country }))}
                />
                <FilterRow
                  label={t("Status")}
                  open={open.status}
                  onToggle={() => setOpen((p) => ({ ...p, status: !p.status }))}
                />
              </div>
            </aside>

            {/* RIGHT: Project cards */}
            <div className="md:col-span-9">
              <div className="space-y-8">
                {loading ? (
                  <div className="flex justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
                  </div>
                ) : filtered.length === 0 ? (
                  <div className="text-center py-20 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                    <p className="text-slate-400 font-bold uppercase tracking-widest">{t("No matching projects found")}</p>
                  </div>
                ) : (
                  filtered.map((p) => (
                    <ProjectCard key={p.id} p={p} />
                  ))
                )}
              </div>

              {/* Pagination (PDF orange boxes) */}
              <div className="mt-10 flex items-center justify-center gap-3">
                {pages.map((n) => {
                  const active = n === page;
                  return (
                    <button
                      key={n}
                      onClick={() => setPage(n)}
                      className={[
                        "h-8 w-10 rounded border text-sm font-semibold",
                        active
                          ? "border-orange-500 bg-orange-500 text-white"
                          : "border-orange-300 bg-white text-[#0f2d45] hover:bg-orange-50",
                      ].join(" ")}
                    >
                      {n}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Quick links pills row (below pagination in PDF) */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
            {[
              { label: t("About Us Mainpage"), to: "/about" },
              { label: t("What We Do"), to: "/what-we-do" },
              { label: t("Homepage"), to: "/" },
            ].map((x) => (
              <Link key={x.label} to={x.to} className="group inline-flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-orange-400 text-orange-500 group-hover:bg-orange-500 group-hover:text-white">
                  ↗
                </span>
                <span className="text-sm font-semibold text-[#0f2d45]">{x.label}</span>
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
          src={bottomBanner?.imageUrls?.[0] ? getImageUrl(bottomBanner.imageUrls[0]) : "/images/panel.png"}
          alt="For the world"
          className="h-[360px] w-full object-cover md:h-[440px]"
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

      {/* =========================================================
          Footer (PDF style)
         ========================================================= */}
      {/* <Footer /> */}
    </div>
  );
}

function FilterRow({ label, open, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className="flex w-full items-center justify-between border-b border-slate-200 px-4 py-3 text-left"
      type="button"
    >
      <span className="text-sm font-semibold text-[#0f2d45]">{label}</span>
      <span className="text-lg font-semibold text-slate-500">{open ? "−" : "+"}</span>
    </button>
  );
}

function ProjectCard({ p }) {
  const { t } = useTranslation();
  const tags = p.categories && Array.isArray(p.categories) ? p.categories : [];

  return (
    <div className="overflow-hidden bg-slate-100 rounded-xl shadow-md group border border-slate-100">
      <div className="relative aspect-[16/8] md:aspect-[16/7] overflow-hidden">
        <img
          src={getImageUrl(p.featuredImageUrl) || "/images/project1.png"}
          alt={p.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          draggable={false}
        />
        {/* small caption block bottom-left */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 flex flex-col justify-end h-1/2">
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map((t) => (
              <span key={t} className="text-[9px] font-black uppercase tracking-widest text-white/70 bg-white/10 px-2 py-0.5 rounded-sm backdrop-blur-sm border border-white/10">
                {t}
              </span>
            ))}
            <span className="text-[9px] font-black uppercase tracking-widest text-orange-400 bg-orange-400/10 px-2 py-0.5 rounded-sm backdrop-blur-sm border border-orange-400/20">
              {t(p.status) || t("COMPLETED")}
            </span>
          </div>
          <h4 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight">
            {t(p.title)}
          </h4>
          {p.client && (
            <p className="mt-1 text-[10px] font-bold text-white/50 uppercase tracking-[0.2em]">
              {t("Partner:")} {t(p.client)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
