import Header from "../components/Header";
import { Link } from "react-router-dom";
import { useSEO } from "../hooks/useSEO";
import { getImageUrl } from "../api/http";

export default function GroupStructure() {
  useSEO("PAGE", "group-structure");
  return (
    <div className="bg-white">
      {/* HERO SECTION */}
      <section className="relative w-full h-[650px] md:h-[80vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/group.png"
            alt="Group Structure"
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => { e.target.src = "/images/panel.png" }}
          />
        </div>
        <div className="absolute inset-0 bg-black/50" />
        <Header overlay />
        <div className="relative z-10 flex h-full items-center">
          <div className="mx-auto max-w-6xl px-4">
            <div className="max-w-xl">
              <p className="text-xs font-black tracking-[0.3em] text-orange-400 uppercase mb-4">Our Ecosystem</p>
              <h1 className="text-4xl font-black text-white md:text-7xl uppercase tracking-tighter leading-[0.9]">
                Structured for <br /> global impact.
              </h1>
              <p className="mt-8 max-w-md text-lg text-white/85 font-medium leading-relaxed">
                Our diversified group structure allows us to lead in multiple sectors while maintaining the agility of a focused engineering firm.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CORE DIVISIONS */}
      <section className="bg-white py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-20">
            {[
              {
                title: "Energy & Infrastructure",
                desc: "The backbone of our group, focusing on large-scale power plants, transmission lines, and grid solutions.",
                divisions: ["Transmission Lines", "Substations", "Renewables"]
              },
              {
                title: "Engineering & Civil",
                desc: "Delivering complex architectural and structural engineering projects across the Middle East.",
                divisions: ["Complex Structures", "Urban Development", "Mechanical Systems"]
              },
              {
                title: "Strategic Investments",
                desc: "Managing our long-term equity in technology and sustainability startups globally.",
                divisions: ["Tech Ventures", "Sustainable Fund", "Real Estate"]
              }
            ].map((sector, idx) => (
              <div key={idx} className="group border-l-4 border-slate-100 hover:border-orange-500 pl-8 transition-all">
                <h3 className="text-3xl font-black text-[#0f2d45] uppercase tracking-tight mb-4">{sector.title}</h3>
                <p className="text-lg text-slate-500 font-medium max-w-2xl mb-8">{sector.desc}</p>
                <div className="flex flex-wrap gap-3">
                  {sector.divisions.map((d) => (
                    <span key={d} className="rounded-full bg-slate-50 border border-slate-100 px-4 py-2 text-xs font-black text-[#0f2d45] uppercase tracking-widest">{d}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          CONTACT (left image + right content)
         ========================================================= */}
      <section className="w-full bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
          <div className="grid gap-10 md:grid-cols-12 md:items-center">
            {/* left image */}
            <div className="md:col-span-4">
              <div className="overflow-hidden rounded-md">
                <img
                  src="/images/vision.png"
                  alt="Contact"
                  className="h-[260px] w-full object-cover"
                />
              </div>
            </div>

            {/* right */}
            <div className="md:col-span-8">
              <p className="text-xs font-semibold tracking-[0.25em] text-[#0f2d45]">
                CONTACT US
              </p>

              <h3 className="mt-4 text-2xl font-extrabold text-[#0f2d45] md:text-4xl">
                How can we help?
              </h3>

              <p className="mt-4 text-sm leading-7 text-slate-500 md:text-base">
                We're here to answer any questions you might have.
              </p>

              <Link
                to="/contact"
                className="mt-6 inline-flex rounded-md bg-orange-500 px-6 py-3 text-sm font-semibold text-white hover:bg-orange-600"
              >
                I HAVE A QUESTION
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          Newsletter subscribe (light gray section)
         ========================================================= */}
      <section className="w-full bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-12 md:py-14">


          {/* quick links row */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
            {[
              { label: "Executive Management", to: "/executive-management" },
              { label: "Group Structure", to: "/group-structure" },
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
          onError={(e) => { e.target.src = "/images/hero.png" }}
        />
        <div className="absolute inset-0 bg-[#0f2d45]/55" />

        <div className="absolute inset-0">
          <div className="mx-auto flex h-full max-w-6xl items-center px-4">
            <div className="max-w-3xl">
              <h3 className="text-3xl font-extrabold text-white md:text-5xl uppercase tracking-tighter leading-tight">
                For the world. <br /> With the world.
              </h3>

              <p className="mt-5 text-sm leading-7 text-white/80 md:text-base font-medium">
                Our organizational structure is designed to foster agility and excellence across all our global divisions.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
