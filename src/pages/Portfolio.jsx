import React, { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { http, getImageUrl } from "../api/http";
import { useSEO } from "../hooks/useSEO";

export default function Portfolio() {
  useSEO("PAGE", "portfolio");
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

  async function loadProjects() {
    try {
      const { data } = await http.get("/api/projects");
      setProjects(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("Portfolio data load error:", e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProjects();
  }, []);

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
      <section className="relative w-full overflow-hidden">

        {/* map overlay on right */}
        <div className=" mt-10 mr-90 pointer-events-none absolute right-0 top-14 hidden w-[520px] opacity-95 md:block">
          <img
            src="/images/map.png" // orange map
            alt="Map"
            className="w-full object-contain"
            draggable={false}
          />
        </div>

        <Header overlay />

        <div className="relative z-10 mt-12">
          <div className="mx-auto max-w-6xl px-4">
            <div className="flex h-[520px] items-center md:h-[70vh]">
              <div className="max-w-xl">
                <p className="text-sm font-semibold text-black-400">
                  Projects/Portfolio
                </p>

                <h1 className="mt-4 text-4xl font-extrabold leading-tight text-black md:text-5xl">
                  Our Major Projects
                  <br />
                  Around The World
                </h1>

                <p className="mt-5 max-w-md text-sm leading-6 text-black/85 md:text-base">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>

                <div className="mt-7">
                  <Link
                    to="/portfolio"
                    className="inline-flex rounded-md bg-orange-500 px-6 py-3 text-sm font-semibold text-white hover:bg-orange-600"
                  >
                    Discover All Projects
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          Title strip (center)
         ========================= */}
      <section className="w-full bg-white">
        <div className="mx-auto max-w-6xl px-4 pb-6 pt-12 md:pt-14">
          <h2 className="text-center text-4xl font-extrabold text-[#0f2d45] md:text-5xl">
            For the world. With the world.™
          </h2>

          <p className="mx-auto mt-4 max-w-4xl text-center text-sm leading-7 text-slate-500 md:text-base">
            Our projects around the world are powered by smart and green
            technologies, and led by teams of extraordinary engineers.
          </p>

          {/* stats + search row */}
          <div className="mt-7 flex flex-col items-center justify-center gap-4 md:flex-row">
            <p className="text-sm font-semibold text-[#0f2d45]">
              <span className="text-xl font-extrabold text-orange-500">{filtered.length}</span> Projects
            </p>

            <div className="w-full max-w-md">
              <div className="flex h-10 items-center rounded-md border border-slate-200 bg-white px-3">
                <span className="mr-2 text-slate-400">🔍</span>
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search By Keywords"
                  className="h-full w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
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
                  label="Business Lines"
                  open={open.business}
                  onToggle={() => setOpen((p) => ({ ...p, business: !p.business }))}
                />
                <FilterRow
                  label="Project Type"
                  open={open.type}
                  onToggle={() => setOpen((p) => ({ ...p, type: !p.type }))}
                />
                <FilterRow
                  label="Country"
                  open={open.country}
                  onToggle={() => setOpen((p) => ({ ...p, country: !p.country }))}
                />
                <FilterRow
                  label="Status"
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
                    <p className="text-slate-400 font-bold uppercase tracking-widest">No matching projects found</p>
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
              { label: "About Us Mainpage", to: "/about" },
              { label: "What We Do", to: "/what-we-do" },
              { label: "Homepage", to: "/" },
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
          src="/images/panel.png"
          alt="For the world"
          className="h-[360px] w-full object-cover md:h-[440px]"
        />
        <div className="absolute inset-0 bg-[#0f2d45]/55" />

        <div className="absolute inset-0">
          <div className="mx-auto flex h-full max-w-6xl items-center px-4">
            <div className="max-w-3xl">
              <h3 className="text-3xl font-extrabold text-white md:text-5xl">
                For the world. With the world.
              </h3>

              <p className="mt-5 text-sm leading-7 text-white/80 md:text-base">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          Footer (PDF style)
         ========================================================= */}
      <footer className="w-full bg-[#0f2d45] text-white">
        <div className="mx-auto max-w-6xl px-4 py-12 md:py-14">
          <div className="grid gap-10 md:grid-cols-12">
            {/* left / trade */}
            <div className="md:col-span-4">
              <p className="text-sm font-extrabold tracking-wide">TRADE</p>

              <div className="mt-6">
                <p className="text-xs font-semibold text-white/70">Latest Blog Post</p>
                <h4 className="mt-2 text-lg font-extrabold">Ready to get started?</h4>
                <p className="mt-3 text-sm leading-7 text-white/70">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </div>

            {/* product */}
            <div className="md:col-span-4 md:pl-10">
              <p className="text-xs font-semibold tracking-[0.25em] text-white/70">Product</p>
              <ul className="mt-5 space-y-2 text-sm text-white/70">
                <li>Product</li>
                <li>Product</li>
                <li>Product</li>
                <li>Product</li>
                <li>Product</li>
              </ul>
            </div>

            {/* company */}
            <div className="md:col-span-4">
              <p className="text-xs font-semibold tracking-[0.25em] text-white/70">Company</p>
              <ul className="mt-5 space-y-2 text-sm text-white/70">
                <li>Company</li>
                <li>Company</li>
                <li>Company</li>
                <li>Company</li>
                <li>Company</li>
              </ul>
            </div>
          </div>

          <div className="mt-10 h-px w-full bg-white/15" />

          <div className="mt-6 flex flex-col gap-3 text-xs text-white/60 md:flex-row md:items-center md:justify-between">
            <p>© 2010 — 2020</p>
            <p>Privacy — Terms</p>
          </div>
        </div>
      </footer>
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
              {p.status || "COMPLETED"}
            </span>
          </div>
          <h4 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight">
            {p.title}
          </h4>
          {p.client && (
            <p className="mt-1 text-[10px] font-bold text-white/50 uppercase tracking-[0.2em]">
              Partner: {p.client}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
