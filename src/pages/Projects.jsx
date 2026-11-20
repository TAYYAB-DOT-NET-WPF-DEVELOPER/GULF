import React, { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { useTranslation } from "react-i18next";
import { http, getImageUrl } from "../api/http";
import { useSEO } from "../hooks/useSEO";

const fallbackProjects = [
  {
    id: 1,
    title: "proj_1_title",
    client: "Al Arab Co.",
    status: "COMPLETED",
    categories: ["proj_1_cat"],
    featuredImageUrl: "/images/project1.png",
    businessLine: "Civil Engineering",
    projectType: "Civil & Structural Works",
    country: "SAUDI ARABIA"
  },
  {
    id: 2,
    title: "proj_2_title",
    client: "Sultan Foundation",
    status: "COMPLETED",
    categories: ["proj_2_cat"],
    featuredImageUrl: "/images/project2.png",
    businessLine: "Civil Engineering",
    projectType: "External Utility & Infrastructure",
    country: "SAUDI ARABIA"
  },
  {
    id: 3,
    title: "proj_3_title",
    client: "MacDonald's KSA",
    status: "COMPLETED",
    categories: ["proj_3_cat"],
    featuredImageUrl: "/images/project3.png",
    businessLine: "Civil Engineering",
    projectType: "Turnkey Commercial",
    country: "SAUDI ARABIA"
  },
  {
    id: 4,
    title: "proj_4_title",
    client: "Al Arab Co.",
    status: "COMPLETED",
    categories: ["proj_4_cat"],
    featuredImageUrl: "/images/project4.png",
    businessLine: "Mechanical Division",
    projectType: "Electro-Mechanical (MEP)",
    country: "SAUDI ARABIA"
  },
  {
    id: 5,
    title: "proj_5_title",
    client: "Ministry of Housing",
    status: "COMPLETED",
    categories: ["proj_5_cat"],
    featuredImageUrl: "/images/project5.png",
    businessLine: "Civil Engineering",
    projectType: "Facade & GRC Installation",
    country: "SAUDI ARABIA"
  },
  {
    id: 6,
    title: "proj_6_title",
    client: "Saudi Electricity Company",
    status: "COMPLETED",
    categories: ["proj_6_cat"],
    featuredImageUrl: "/images/industry-bg.png",
    businessLine: "Electrical Division",
    projectType: "Substation Civil Works",
    country: "SAUDI ARABIA"
  },
  {
    id: 7,
    title: "proj_7_title",
    client: "SEC",
    status: "ONGOING",
    categories: ["proj_7_cat"],
    featuredImageUrl: "/images/Transmission1.jpg",
    businessLine: "Transmission Lines",
    projectType: "Substation Civil Works",
    country: "SAUDI ARABIA"
  },
  {
    id: 8,
    title: "proj_8_title",
    client: "L&T",
    status: "COMPLETED",
    categories: ["proj_8_cat"],
    featuredImageUrl: "/images/Mechnical1.jpg",
    businessLine: "Mechanical Division",
    projectType: "Electro-Mechanical (MEP)",
    country: "INDIA"
  },
  {
    id: 9,
    title: "proj_9_title",
    client: "National Grid",
    status: "COMPLETED",
    categories: ["proj_9_cat"],
    featuredImageUrl: "/images/Transmission2.jpg",
    businessLine: "Transmission Lines",
    projectType: "Substation Civil Works",
    country: "UNITED KINGDOM"
  },
  {
    id: 10,
    title: "proj_10_title",
    client: "Egypt Govt",
    status: "ONGOING",
    categories: ["proj_10_cat"],
    featuredImageUrl: "/images/Industrial Piping.jpg",
    businessLine: "Industrial Piping",
    projectType: "External Utility & Infrastructure",
    country: "EGYPT"
  },
  {
    id: 11,
    title: "proj_11_title",
    client: "Iberdrola",
    status: "COMPLETED",
    categories: ["proj_11_cat"],
    featuredImageUrl: "/images/panel.png",
    businessLine: "Electrical Division",
    projectType: "Electro-Mechanical (MEP)",
    country: "SPAIN"
  },
  {
    id: 12,
    title: "proj_12_title",
    client: "Aramco",
    status: "COMPLETED",
    categories: ["proj_12_cat"],
    featuredImageUrl: "/images/Piping2.jpg",
    businessLine: "Industrial Piping",
    projectType: "Civil & Structural Works",
    country: "SAUDI ARABIA"
  },
  {
    id: 13,
    title: "proj_13_title",
    client: "SEC",
    status: "COMPLETED",
    categories: ["proj_13_cat"],
    featuredImageUrl: "/images/Transmission3.jpg",
    businessLine: "Transmission Lines",
    projectType: "Substation Civil Works",
    country: "SAUDI ARABIA"
  },
  {
    id: 14,
    title: "proj_14_title",
    client: "ADA",
    status: "ONGOING",
    categories: ["proj_14_cat"],
    featuredImageUrl: "/images/Mechnical2.jpg",
    businessLine: "Mechanical Division",
    projectType: "Electro-Mechanical (MEP)",
    country: "SAUDI ARABIA"
  },
  {
    id: 15,
    title: "proj_15_title",
    client: "Sabic",
    status: "COMPLETED",
    categories: ["proj_15_cat"],
    featuredImageUrl: "/images/Industrial Piping.jpg",
    businessLine: "Industrial Piping",
    projectType: "Facade & GRC Installation",
    country: "SAUDI ARABIA"
  }
];

export default function Projects() {
  const { t, i18n } = useTranslation();
  useSEO("PAGE", "projects");
  const [q, setQ] = useState("");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState({
    business: false,
    type: false,
    country: false,
    status: false,
  });
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const [page, setPage] = useState(1);
  const [heroBanner, setHeroBanner] = useState(null);
  const [bottomBanner, setBottomBanner] = useState(null);

  // Filter States
  const [activeBusinessLines, setActiveBusinessLines] = useState([]);
  const [activeProjectTypes, setActiveProjectTypes] = useState([]);
  const [activeCountries, setActiveCountries] = useState([]);
  const [activeStatuses, setActiveStatuses] = useState([]);

  const projectsPerPage = 5;

  async function loadProjects() {
    try {
      const [{ data: projectsData }, { data: heroData }, { data: bottomData }] = await Promise.all([
        http.get("/api/projects").catch(() => ({ data: null })),
        http.get("/api/banners/projects-hero").catch(() => ({ data: null })),
        http.get("/api/banners/projects-bottom").catch(() => ({ data: null }))
      ]);
      
      if (Array.isArray(projectsData) && projectsData.length > 0) {
        setProjects(projectsData);
      } else {
        setProjects(fallbackProjects);
      }
      setHeroBanner(heroData);
      setBottomBanner(bottomData);
    } catch (e) {
      console.error("Portfolio data load error:", e);
      setProjects(fallbackProjects);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProjects();
  }, [t, i18n.language]);

  // Handle toggling of filter items
  const handleFilterToggle = (value, activeList, setActiveList) => {
    setPage(1); // Reset page to 1 when changing filters
    if (activeList.includes(value)) {
      setActiveList(activeList.filter((item) => item !== value));
    } else {
      setActiveList([...activeList, value]);
    }
  };

  // Filter Projects dynamically
  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    return projects.filter((p) => {
      // 1. Text Search
      if (s) {
        // Translate title & category first to search in current active language
        const translatedTitle = t(p.title).toLowerCase();
        const translatedClient = p.client ? t(p.client).toLowerCase() : "";
        const categoryList = p.categories ? p.categories.map(c => t(c).toLowerCase()).join(" ") : "";
        const hay = `${translatedTitle} ${translatedClient} ${categoryList} ${p.status}`.toLowerCase();
        if (!hay.includes(s)) return false;
      }

      // 2. Business Line Filter
      if (activeBusinessLines.length > 0 && !activeBusinessLines.includes(p.businessLine)) {
        return false;
      }

      // 3. Project Type Filter
      if (activeProjectTypes.length > 0 && !activeProjectTypes.includes(p.projectType)) {
        return false;
      }

      // 4. Country Filter
      if (activeCountries.length > 0 && !activeCountries.includes(p.country)) {
        return false;
      }

      // 5. Status Filter
      if (activeStatuses.length > 0 && !activeStatuses.includes(p.status)) {
        return false;
      }

      return true;
    });
  }, [q, projects, activeBusinessLines, activeProjectTypes, activeCountries, activeStatuses, t]);

  // Calculate paginated slice
  const totalPages = Math.ceil(filtered.length / projectsPerPage);
  const activePage = Math.max(1, Math.min(page, totalPages));

  const paginatedProjects = useMemo(() => {
    const start = (activePage - 1) * projectsPerPage;
    return filtered.slice(start, start + projectsPerPage);
  }, [filtered, activePage]);

  // Dynamic pagination page list
  const pages = useMemo(() => {
    const list = [];
    for (let i = 1; i <= Math.max(1, totalPages); i++) {
      list.push(i);
    }
    return list;
  }, [totalPages]);

  return (
    <div className="bg-white">
      {/* =========================
          HERO (Map + Title + Button)
         ========================= */}
      <section className="relative isolate overflow-hidden bg-white xl:min-h-[746px]">
        <Header theme="light" home flat />
        <div className="relative mx-auto max-w-[1440px] px-5 pb-12 pt-12 sm:px-8 xl:static xl:ps-[121px] xl:pt-[64px]">
          <img src="/images/map.png" alt="World map highlighting the United Kingdom, Saudi Arabia, Pakistan, and South Africa"
            width="908" height="605" className="pointer-events-none absolute inset-x-0 top-14 -z-10 mx-auto h-auto w-full opacity-25 xl:inset-x-auto xl:end-[max(2.5%,calc((100%-1370px)/2))] xl:top-[170px] xl:w-[min(63vw,908px)] xl:opacity-100" />
          <div className="max-w-[470px]">
            <p className="font-bold text-[#16355d]">{t("Projects/Portfolio", "Projects/Portfolio")}</p>
            <h1 className="mt-6 text-[34px] font-bold leading-[1.18] text-black sm:text-[42px] xl:mt-[48px] xl:text-[50px]">
              {t("Our Major Projects Around The World")}
            </h1>
            <p className="mt-8 max-w-[310px] text-sm leading-5 text-black xl:mt-[104px]">
              {t(heroBanner?.ctaLink) || t("home_featured_desc")}
            </p>
            <a href="#project-results" className="mt-9 inline-flex min-h-[52px] items-center rounded-lg bg-[#f17124] px-4 text-lg font-bold text-white hover:bg-[#d55b15] xl:absolute xl:bottom-[50px] xl:mt-0 xl:text-[20px]">
              {t("Discover All Projects")}
            </a>
          </div>
        </div>
      </section>

      {/* =========================
          Title strip (center) - "For the world. With the world."
         ========================= */}
      <section className="w-full bg-white pb-10">
        <div className="mx-auto max-w-[1232px] px-4 text-center">
          <h2 className="text-[34px] font-bold leading-tight text-black xl:text-[48px]">
            {t(bottomBanner?.headline) || t("For the world. With the world.™")}
          </h2>

          <p className="mx-auto mt-6 max-w-[1200px] text-lg font-light leading-[1.25] text-black xl:text-[28px]">
            {t(bottomBanner?.subHeadline) || t("Our projects around the world are powered by smart and green technologies, and led by teams of extraordinary engineers.")}
          </p>

          {/* stats + search row */}
          <div className="mt-9 flex flex-col items-center gap-5 md:flex-row xl:ms-[22%]">
            <p className="shrink-0 text-xl text-black xl:text-[28px]">
              <span className="text-[32px] font-bold text-[#f26522]">{filtered.length}</span> {t("Projects", "Projects")}
            </p>

            <div className="w-full flex-1">
              <div className="flex h-14 items-center rounded-xl bg-[#f5f5f5] px-6 xl:h-[90px]">
                <span className="mr-3 text-slate-400">🔍</span>
                <input
                  aria-label={t("Search By Keywords")}
                  value={q}
                  onChange={(e) => { setQ(e.target.value); setPage(1); }}
                  placeholder={t("Search By Keywords")}
                  className="h-full w-full bg-transparent text-sm font-medium outline-none placeholder:text-slate-400"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="md:hidden flex items-center gap-2 justify-center w-full max-w-md h-14 rounded-xl border border-slate-200 bg-white text-sm font-bold text-[#0f2d45] hover:bg-slate-50 transition-colors shadow-sm cursor-pointer"
            >
              <span>⚙️</span> {showMobileFilters ? t("Hide Filters") : t("Show Filters")}
            </button>
          </div>
        </div>
      </section>

      {/* =========================
          Filters + Projects list
         ========================= */}
      <section id="project-results" className="w-full scroll-mt-5 bg-white">
        <div className="mx-auto max-w-[1440px] px-4 pb-10 xl:pe-14 xl:ps-0">
          <div className="grid gap-8 md:grid-cols-[minmax(195px,1fr)_minmax(0,3fr)] xl:grid-cols-[320px_minmax(0,1fr)] xl:gap-[64px]">
            {/* LEFT: Filters Sidebar */}
            <aside className={`min-w-0 ${showMobileFilters ? "block" : "hidden md:block"}`}>
              <div className="overflow-hidden bg-[#f5f5f5] text-start">
                {/* Header for Filters */}
                <div className="flex items-center justify-between border-b border-slate-200 p-4 md:has-[button]:flex md:hidden">
                  <span className="text-xs font-bold text-[#0f2d45] uppercase tracking-wider">{t("Filters")}</span>
                  {(activeBusinessLines.length > 0 || activeProjectTypes.length > 0 || activeCountries.length > 0 || activeStatuses.length > 0) && (
                    <button
                      onClick={() => {
                        setActiveBusinessLines([]);
                        setActiveProjectTypes([]);
                        setActiveCountries([]);
                        setActiveStatuses([]);
                        setPage(1);
                      }}
                      className="text-xs font-bold text-[#f26522] hover:text-orange-600 transition-colors cursor-pointer"
                    >
                      {t("Clear All")}
                    </button>
                  )}
                </div>

                {/* Business Lines Accordion */}
                <FilterRow
                  label={t("Business Lines")}
                  open={open.business}
                  onToggle={() => setOpen((p) => ({ ...p, business: !p.business }))}
                >
                  {['Mechanical Division', 'Electrical Division', 'Transmission Lines', 'Civil Engineering', 'Industrial Piping'].map((opt) => (
                    <label key={opt} className="flex items-center gap-2.5 text-xs font-semibold text-slate-600 cursor-pointer hover:text-orange-500 select-none py-1">
                      <input
                        type="checkbox"
                        checked={activeBusinessLines.includes(opt)}
                        onChange={() => handleFilterToggle(opt, activeBusinessLines, setActiveBusinessLines)}
                        className="rounded text-orange-500 focus:ring-orange-500 h-4 w-4 accent-[#f26522]"
                      />
                      <span>{t(opt)}</span>
                    </label>
                  ))}
                </FilterRow>

                {/* Project Type Accordion */}
                <FilterRow
                  label={t("Project Type")}
                  open={open.type}
                  onToggle={() => setOpen((p) => ({ ...p, type: !p.type }))}
                >
                  {['Civil & Structural Works', 'External Utility & Infrastructure', 'Turnkey Commercial', 'Electro-Mechanical (MEP)', 'Facade & GRC Installation', 'Substation Civil Works'].map((opt) => (
                    <label key={opt} className="flex items-center gap-2.5 text-xs font-semibold text-slate-600 cursor-pointer hover:text-orange-500 select-none py-1">
                      <input
                        type="checkbox"
                        checked={activeProjectTypes.includes(opt)}
                        onChange={() => handleFilterToggle(opt, activeProjectTypes, setActiveProjectTypes)}
                        className="rounded text-orange-500 focus:ring-orange-500 h-4 w-4 accent-[#f26522]"
                      />
                      <span>{t(opt)}</span>
                    </label>
                  ))}
                </FilterRow>

                {/* Country Accordion */}
                <FilterRow
                  label={t("Country")}
                  open={open.country}
                  onToggle={() => setOpen((p) => ({ ...p, country: !p.country }))}
                >
                  {['SAUDI ARABIA', 'INDIA', 'UNITED KINGDOM', 'EGYPT', 'SPAIN'].map((opt) => (
                    <label key={opt} className="flex items-center gap-2.5 text-xs font-semibold text-slate-600 cursor-pointer hover:text-orange-500 select-none py-1">
                      <input
                        type="checkbox"
                        checked={activeCountries.includes(opt)}
                        onChange={() => handleFilterToggle(opt, activeCountries, setActiveCountries)}
                        className="rounded text-orange-500 focus:ring-orange-500 h-4 w-4 accent-[#f26522]"
                      />
                      <span>{t(opt)}</span>
                    </label>
                  ))}
                </FilterRow>

                {/* Status Accordion */}
                <FilterRow
                  label={t("Status")}
                  open={open.status}
                  onToggle={() => setOpen((p) => ({ ...p, status: !p.status }))}
                >
                  {['COMPLETED', 'ONGOING'].map((opt) => (
                    <label key={opt} className="flex items-center gap-2.5 text-xs font-semibold text-slate-600 cursor-pointer hover:text-orange-500 select-none py-1">
                      <input
                        type="checkbox"
                        checked={activeStatuses.includes(opt)}
                        onChange={() => handleFilterToggle(opt, activeStatuses, setActiveStatuses)}
                        className="rounded text-orange-500 focus:ring-orange-500 h-4 w-4 accent-[#f26522]"
                      />
                      <span>{t(opt)}</span>
                    </label>
                  ))}
                </FilterRow>
              </div>
            </aside>

            {/* RIGHT: Project cards grid */}
            <div className="min-w-0">
              <div className="space-y-8 xl:space-y-[38px]">
                {loading ? (
                  <div className="flex justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
                  </div>
                ) : paginatedProjects.length === 0 ? (
                  <div className="text-center py-20 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                    <p className="text-slate-400 font-bold uppercase tracking-widest">{t("No matching projects found")}</p>
                  </div>
                ) : (
                  paginatedProjects.map((p) => (
                    <ProjectCard key={p.id} p={p} />
                  ))
                )}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-10 flex items-center justify-center gap-3">
                  {pages.map((n) => {
                    const active = n === activePage;
                    return (
                      <button
                        key={n}
                        onClick={() => setPage(n)}
                        className={[
                          "h-10 w-14 rounded-md border border-[#f17124] font-semibold transition-colors xl:h-[74px] xl:w-[110px]",
                          active
                            ? "bg-white text-[#16355d]"
                            : "bg-[#f17124] text-[#16355d] hover:bg-orange-50",
                        ].join(" ")}
                      >
                        {n}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Quick links pills row */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
            {[
              { label: t("About Us Mainpage"), to: "/about" },
              { label: t("What We Do"), to: "/services" },
              { label: t("Homepage"), to: "/" },
            ].map((x) => (
              <Link key={x.label} to={x.to} className="group inline-flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-orange-400 text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all">
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
          className="h-[480px] w-full object-cover xl:h-[810px]"
        />
        <div className="absolute inset-0 bg-[#0f2d45]/55" />

        <div className="absolute inset-0 text-center">
          <div className="mx-auto flex h-full max-w-[1350px] items-center justify-center px-4">
            <div className="max-w-[1280px]">
              <h3 className="text-3xl font-bold leading-tight text-white xl:text-[48px]">
                {t("For the world. With the world.™")}
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

function FilterRow({ label, open, onToggle, children }) {
  return (
    <div className="border-b border-slate-200 last:border-0">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between px-4 py-3 text-left hover:bg-slate-100 transition-colors cursor-pointer"
        type="button"
        aria-expanded={open}
      >
        <span className="text-sm font-bold text-[#0f2d45] xl:text-[20px]">{label}</span>
        <span className="text-lg font-semibold text-slate-500">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div className="px-4 pb-4 pt-1 flex flex-col gap-2 bg-white border-t border-slate-100 max-h-60 overflow-y-auto">
          {children}
        </div>
      )}
    </div>
  );
}

function ProjectCard({ p }) {
  const { t } = useTranslation();
  const tags = p.categories && Array.isArray(p.categories) ? p.categories : [];

  return (
    <div className="group overflow-hidden bg-slate-100 text-start">
      <div className="relative aspect-[5/3] overflow-hidden">
        <img
          src={getImageUrl(p.featuredImageUrl) || "/images/project1.png"}
          alt={t(p.title)}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          draggable={false}
        />
        {/* small caption block bottom-left */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex min-h-[48%] flex-col justify-end p-4 sm:p-6 xl:px-16 xl:py-9">
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map((tag) => (
              <span key={tag} className="text-[9px] font-black uppercase tracking-widest text-white/70 bg-white/10 px-2 py-0.5 rounded-sm backdrop-blur-sm border border-white/10">
                {t(tag)}
              </span>
            ))}
            <span className="text-[9px] font-black uppercase tracking-widest text-orange-400 bg-orange-400/10 px-2 py-0.5 rounded-sm backdrop-blur-sm border border-orange-400/20">
              {t(p.status) || t("COMPLETED")}
            </span>
          </div>
          <h4 className="text-base font-bold leading-snug text-white xl:text-xl">
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

