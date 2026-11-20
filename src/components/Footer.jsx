import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const divisions = [
  ["footer_div_mech", "/services/mechanical"],
  ["footer_div_trans", "/services/transmission"],
  ["footer_div_elec", "/services/electrical"],
  ["footer_div_civil", "/services/civil"],
  ["Industrial Piping", "/services/piping"],
];

const companyLinks = [
  ["footer_comp_story", "/about"],
  ["footer_comp_leadership", "/management"],
  ["footer_comp_port", "/projects"],
  ["footer_comp_press", "/news"],
  ["nav_careers", "/careers"],
];

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-[#16355d] text-white">
      <div className="mx-auto grid max-w-[1200px] gap-8 px-5 py-8 lg:min-h-[380px] lg:w-[calc(100%-3rem)] lg:grid-cols-2 lg:gap-0 lg:px-0 lg:py-[30px]">
        <div className="grid min-w-0 items-start gap-5 sm:grid-cols-[145px_minmax(0,1fr)] lg:grid-cols-[174px_minmax(0,1fr)] lg:pt-8">
          <Link to="/" className="w-fit" aria-label={t("brand_name")}>
            <img src="/images/logo.png" alt={t("brand_name")} className="h-auto w-[126px]" />
          </Link>
          <div className="min-w-0 lg:pr-10">
            <Link to="/news" className="text-sm font-bold hover:underline">{t("footer_latest_update")}</Link>
            <Link to="/contact" className="mt-4 block text-[23px] leading-tight hover:underline">{t("footer_ready")}</Link>
            <p className="mt-3 max-w-[375px] text-sm leading-5 text-white/90">{t("footer_desc")}</p>
          </div>
        </div>
        <div className="min-w-0 border-t border-white/45 pt-6 lg:flex lg:flex-col lg:border-s lg:border-t-0 lg:ps-[54px] lg:pt-9">
          <div className="grid grid-cols-2 gap-x-5 lg:grid-cols-[142px_1fr]">
            {[[ "footer_divisions", divisions ], [ "footer_company", companyLinks ]].map(([heading, links]) => (
              <div key={heading} className="min-w-0">
                <p className="text-sm font-bold">{t(heading)}</p>
                <ul className="mt-5 space-y-2 text-sm leading-5 text-white/90">
                  {links.map(([label, to]) => (
                    <li key={to}><Link to={to} className="break-words hover:underline">{t(label)}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-x-4 gap-y-2 text-sm text-white/90 lg:mt-auto lg:pb-6 lg:pt-8">
            <span>{t("footer_copyright", { year: new Date().getFullYear() })}</span>
            <span><Link to="/privacy" className="hover:underline">{t("footer_privacy")}</Link> – <Link to="/terms" className="hover:underline">{t("footer_terms")}</Link></span>
          </div>
        </div>
      </div>
    </footer>
  );
}
