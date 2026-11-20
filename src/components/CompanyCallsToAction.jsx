import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function CompanyCallsToAction({ id, showContactLabel = true }) {
  const { t } = useTranslation();
  return (
    <>
      <section aria-labelledby={id + "-careers-heading"} className="relative mx-auto w-[calc(100%-2rem)] max-w-[1340px] bg-[#16355d] text-white sm:w-[calc(100%-4rem)] md:w-[calc(100%-100px)]">
          <div aria-hidden="true" className="pointer-events-none absolute -top-4 right-[21%] h-12 w-11 bg-[#f17124] md:-top-[26px] md:h-[86px] md:w-[79px]"
              style={{ clipPath: "polygon(0 45%, 100% 0, 79% 100%, 25% 90%)" }} />
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-2 left-[3.5%] h-9 w-[74px] bg-[#f17124] md:-bottom-[14px] md:h-[65px] md:w-[134px]"
              style={{ clipPath: "polygon(0 76%, 75% 0, 100% 100%, 58% 83%)" }} />
          <div aria-hidden="true" className="pointer-events-none absolute bottom-4 right-[14%] h-9 w-11 bg-[#f17124] md:bottom-[29px] md:h-[61px] md:w-[76px]"
              style={{ clipPath: "polygon(0 36%, 53% 0, 100% 100%, 60% 72%)" }} />

          <div className="relative px-5 py-12 text-center md:px-10 md:pb-[83px] md:pt-[82px]">
              <p className="text-base font-medium uppercase leading-6 text-[#f17124] md:text-[20px]">
                  {t("home_careers_label", "CAREERS")}
              </p>
              <h2 id={id + "-careers-heading"} className="mt-5 text-[28px] font-bold leading-tight capitalize md:mt-8 md:text-[40px] md:leading-[48px]">
                  {t("home_careers_title", "Join Our Team")}
              </h2>
              <p className="mx-auto mt-3 max-w-[820px] text-base leading-6 md:text-[24px] md:leading-7">
                  {t("home_careers_title2")}
              </p>
              <Link to="/careers" className="mt-7 inline-flex min-h-12 items-center justify-center rounded-lg bg-[#f17124] px-4 text-base font-bold hover:bg-[#d55b15] md:mt-[35px] md:min-h-[52px] md:text-[20px]">
                  {t("home_careers_btn", "Submit Your CV")}
              </Link>
          </div>
      </section>

      {/* Contact */}
      <section aria-labelledby={id + "-contact-heading"} className={`bg-white px-4 py-12 sm:px-8 ${showContactLabel ? "lg:pb-20 lg:pt-[83px]" : "lg:pb-[83px] lg:pt-[116px]"}`}>
          <div className="mx-auto grid max-w-[1220px] items-start gap-7 lg:grid-cols-2">
              <img src="/images/How can i help.png" alt="Gulf Al Olaya team on site" width="596" height="377"
                  className="mx-auto h-auto w-full max-w-[596px]" />
              <div className="min-w-0 lg:pt-[26px]">
                  {showContactLabel && <p className="text-lg font-medium uppercase leading-7 text-[#16355d] lg:text-[24px]">
                      {t("home_contact_label", "CONTACT US")}
                  </p>}
                  <h2 id={id + "-contact-heading"} className={`text-[28px] font-bold leading-tight text-[#16355d] lg:text-[40px] lg:leading-[48px] ${showContactLabel ? "mt-4 lg:mt-[44px]" : ""}`}>
                      {t("home_contact_title", "How can we help?")}
                  </h2>
                  <p className="mt-3 max-w-[560px] text-base leading-6 text-[#3f3f3f] lg:text-[24px] lg:leading-7">
                      {t("home_contact_desc")}
                  </p>
                  <Link to="/contact" className="mt-6 inline-flex min-h-12 items-center rounded-lg bg-[#f17124] px-4 text-base font-bold text-white capitalize hover:bg-[#d55b15] lg:mt-7 lg:min-h-[52px] lg:text-[20px]">
                      {t("home_contact_btn", "Send Message")}
                  </Link>
              </div>
          </div>
      </section>
    </>
  );
}
