import serviceData from "../content/servicePages.json";
import homePage from "../content/homePage.json";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { http, getImageUrl } from "../api/http";
import { useTranslation } from "react-i18next";

const businessItems = [
  { key: "mech", label: "MECHANICAL DIVISION", icon: "gear" },
  { key: "trans", label: "TRANSMISSION LINES", icon: "tower" },
  { key: "elec", label: "ELECTRICAL DIVISION", icon: "bolt" },
  { key: "trans2", label: "TRANSMISSION LINES", icon: "truck" },
];

const BizIcon = ({ name }) => {
  const cls = "h-5 w-5 text-slate-700";
  if (name === "gear") {
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="none">
        <path
          d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path
          d="M19.4 13.2c.04-.4.06-.8.06-1.2s-.02-.8-.06-1.2l2-1.55a.6.6 0 0 0 .14-.76l-1.9-3.29a.6.6 0 0 0-.73-.26l-2.35.95a9.3 9.3 0 0 0-2.08-1.2l-.36-2.5A.6.6 0 0 0 11.57 1h-3.8a.6.6 0 0 0-.59.5l-.36 2.5c-.74.3-1.43.7-2.08 1.2l-2.35-.95a.6.6 0 0 0-.73.26L-.24 7.8a.6.6 0 0 0 .14.76l2 1.55c-.04.4-.06.8-.06 1.2s.02.8.06 1.2l-2 1.55a.6.6 0 0 0-.14.76l1.9 3.29c.16.27.48.37.73.26l2.35-.95c.65.5 1.34.9 2.08 1.2l.36 2.5c.05.29.3.5.59.5h3.8c.3 0 .55-.21.59-.5l.36-2.5c.74-.3 1.43-.7 2.08-1.2l2.35.95c.25.1.57 0 .73-.26l1.9-3.29a.6.6 0 0 0-.14-.76l-2-1.55Z"
          stroke="currentColor"
          strokeWidth="1.2"
          opacity="0.9"
        />
      </svg>
    );
  }
  if (name === "tower") {
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="none">
        <path d="M12 2 6 22h2l1.2-4h5.6l1.2 4h2L12 2Z" stroke="currentColor" strokeWidth="1.6" />
        <path d="M10.2 14h3.6M9.2 10h5.6M8.2 6h7.6" stroke="currentColor" strokeWidth="1.6" opacity="0.9" />
      </svg>
    );
  }
  if (name === "bolt") {
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="none">
        <path
          d="M13 2 3 14h7l-1 8 12-14h-7l-1-6Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return (
    <svg className={cls} viewBox="0 0 24 24" fill="none">
      <path d="M3 6h11v10H3V6Z" stroke="currentColor" strokeWidth="1.6" />
      <path d="M14 10h4l3 3v3h-7v-6Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path
        d="M7 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM18 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );
};

export default function BusinessLinesShowcase() {
  const { t } = useTranslation();
  const [services, setServices] = useState([]);
  const [activeBiz, setActiveBiz] = useState(null);
  const [loading, setLoading] = useState(true);

  const fallbackServices = homePage.services.map((service, index) => ({
    id: service.id,
    name: service.title,
    headline: service.headline,
    shortDesc: service.desc,
    icon: ["gear", "bolt", "tower", "tower", "gear", "gear"][index],
    bannerImageUrl: serviceData[service.id].coverImage,
  }));

  async function loadServices() {
    try {
      const { data } = await http.get("/api/services");
      const list = Array.isArray(data) && data.length > 0 ? data : fallbackServices;
      setServices(list);
      if (list.length > 0) setActiveBiz(list[0]);
    } catch (e) {
      console.error("Failed to load services:", e);
      setServices(fallbackServices);
      setActiveBiz(fallbackServices[0]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadServices();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  const listToRender = services.length > 0 ? services : fallbackServices;
  const currentBiz = activeBiz || listToRender[0];

  return (
    <section className="w-full bg-white xl:min-h-[672px]">
      <div className="mx-auto max-w-6xl px-4 pt-12 pb-16 md:pt-16 md:pb-24">
        <div className="grid gap-10 md:grid-cols-12 md:items-stretch">
          {/* LEFT MENU */}
          <div className="md:col-span-4">
            <div className="flex flex-wrap md:flex-col gap-6 md:gap-10 pt-3">
              {listToRender.map((item) => {
                const selected = item.id === currentBiz.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveBiz(item)}
                    className="flex w-full items-center gap-4 text-left group transition-all"
                  >
                    <span className={[
                      "inline-flex h-11 w-11 items-center justify-center rounded-full border transition-colors",
                      selected ? "border-orange-500 bg-orange-50" : "border-slate-200 group-hover:border-slate-300"
                    ].join(" ")}>
                      <BizIcon name={item.icon || "gear"} />
                    </span>

                    <span
                      className={[
                        "text-sm font-black uppercase tracking-widest transition-colors",
                        selected ? "text-[#0f2d45]" : "text-slate-500 group-hover:text-slate-700",
                      ].join(" ")}
                    >
                      {t(item.name)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT BIG BANNER */}
          <div className="md:col-span-8">
            <div className="relative isolate grid min-h-[410px] overflow-hidden rounded-xl bg-slate-900">
              <img
                src={getImageUrl(currentBiz.bannerImageUrl || currentBiz.imageUrl) || "/images/bagr10.png"}
                alt={t(currentBiz.name)}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0f2d45]/90 via-[#0f2d45]/40 to-transparent" />

              <div className="relative flex items-center py-8">
                <div className="px-8 md:px-12">
                  <h3 className="text-2xl font-black tracking-tight text-white md:text-3xl uppercase">
                    {t(currentBiz.name)}
                  </h3>

                  {currentBiz.headline && <p className="mt-3 max-w-lg font-semibold text-white">{t(currentBiz.headline)}</p>}
                  <p className="mt-3 max-w-lg text-sm leading-6 text-white/90 md:text-base">
                    {t(currentBiz.shortDesc) || t("home_hero_desc")}
                  </p>

                  <div className="mt-8 flex items-center gap-4">
                    <Link
                      to={Object.hasOwn(serviceData, currentBiz.id) ? `/services/${currentBiz.id}` : "/services"}
                      className="inline-flex rounded-md bg-orange-500 px-8 py-3 text-sm font-semibold text-white hover:bg-orange-600 transition-all active:scale-95 shadow-lg shadow-orange-500/30"
                    >
                      {t("explore_more")}
                    </Link>
                    <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">
                      {t("Division")} 0{services.indexOf(currentBiz) + 1}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
