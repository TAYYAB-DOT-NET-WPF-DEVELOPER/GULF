import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "../components/Header";
import { useSEO } from "../hooks/useSEO";

const serviceData = {
  mechanical: {
    title: "Mechanical Division",
    subtitle: "Gulf Al Olaya Mechanical Division",
    heroDesc: "Our Mechanical Division operates with precision, commitment, and deep technical expertise ensuring every project requirement is met to the highest standards of quality, efficiency, and client satisfaction. From large-scale HVAC installations to complex fire protection systems and precision sheet metal fabrication, our mechanical teams bring decades of hands-on experience to every site.",
    contentTitle: "Built Around Your Project Requirements",
    contentDesc1: "We carry out all diversified works including central air conditioning, plumbing, drainage, and fire protection with top quality, efficiency, and productivity and to the complete satisfaction of our clients.",
    contentDesc2: "Delivering projects on time and within budget is our promise. Our multidisciplinary site teams are trained, certified, and equipped to handle the most demanding mechanical scopes across commercial, industrial, and infrastructure sectors.",
    gridItems: [
      { title: "In-House Design & Engineering", icon: "design" },
      { title: "Integrated Project Management", icon: "pm" },
      { title: "Total Quality & Safety Management", icon: "qa" },
      { title: "Certified & Classified Works", icon: "cert" },
    ],
    sectorLabel: "MAJOR SECTORS",
    sectorTitle: "Services we're experts at, and always expanding.",
    sectorDesc: "Currently, we deliver major mechanical and MEP projects across multiple service lines and we are always keen to further broaden our capabilities to meet client needs.",
    sectors: [
      { title: "HVAC", desc: "Complete HVAC design, supply, and installation for all building types, delivering energy-efficient climate control solutions." },
      { title: "Plumbing & Drainage", desc: "End-to-end plumbing and drainage systems, from water supply to external utility networks across major projects." },
      { title: "Fire Fighting & Protection", desc: "Full fire protection systems designed, installed, and tested to meet NFPA and Saudi Civil Defence standards." },
      { title: "Kitchen Hood & Exhaust Systems", desc: "Commercial kitchen ventilation systems ensuring safety, airflow balance, and compliance with health regulations." },
      { title: "Sheet Metal Fabrication", desc: "In-house fabrication of ductwork and metal components, ensuring quality control and efficient installation." },
      { title: "Fire Detection & Alarm", desc: "Advanced fire detection and alarm systems integrated with building management for reliable safety coverage." },
      { title: "FM200 & Deluge Systems", desc: "Clean agent and deluge suppression systems designed for high-risk and sensitive environments." },
    ],
    pillars: [
      { id: "01", title: "STRATEGIC PROJECT MANAGEMENT", desc: "We handle mechanical projects strategically from planning to execution using the best tools and processes to meet project schedules, avoid budget overruns, and successfully maintain industry benchmarks." }
    ],
    capLabel: "Mechanical Capabilities & Strengths",
    capDesc: "Clean agent and deluge suppression systems designed for high-risk and sensitive environments.",
    capabilities: [
      { title: "Equipment Assembly & Erection", desc: "Full scope equipment assembly, alignment, and erection services backed by our own fleet of cranes, boom lifts, and specialist rigging equipment." },
      { title: "Pre-Commissioning", desc: "Startup & commissioning services encompassing switchgears, transformers, generators, UPS systems, and calibration of instruments." }
    ]
  },
  electrical: {
    title: "Electrical Division",
    subtitle: "Gulf Al Olaya Electrical Division",
    heroDesc: "Our Electrical Division designs, installs, tests, and maintains the full range of electrical systems from building distribution boards and low-voltage cabling through to high-voltage substation electrification and transmission infrastructure. We work across commercial, residential, industrial, and institutional sectors, bringing in-house engineering, skilled technicians, and rigorous QA/QC to every project.",
    contentTitle: "In-House Design, Installation & Maintenance",
    contentDesc1: "Gulf Al Olaya's Electrical Division is capable of in-house design, installation, and maintenance across the full spectrum of electrical engineering works. Headed by professionals and supported by skilled technicians, the division has deep expertise in substations, transmission lines, pumping stations, and industrial and commercial electrification.",
    contentDesc2: "We install and provide services to package substations main, sub-main, and final distribution panel boards, MCC and capacitors, generators and automatic changeover panels, cable, wirings, trunking, conduit, earthing, lightning protection systems, lighting luminaires, fire alarm, MATV, SATV, and intercom systems.",
    gridItems: [
      { title: "Substation Expertise", icon: "design" },
      { title: "Industrial & Commercial", icon: "pm" },
      { title: "Building Systems", icon: "qa" },
      { title: "Testing & Commissioning", icon: "cert" },
    ],
    sectorLabel: "MAJOR SECTORS",
    sectorTitle: "Services we're experts at, and always expanding.",
    sectorDesc: "Currently, we deliver major mechanical and MEP projects across multiple service lines and we are always keen to further broaden our capabilities to meet client needs.",
    sectors: [
      { title: "Building Management Systems", desc: "We design, supply, and install complete BMS solutions integrating HVAC, lighting, power, fire, and security into a single intelligent platform. Our BMS teams work across commercial towers, hospitals, hotels, and industrial facilities, delivering energy efficiency and full operational control to building owners and operators." },
      { title: "Medium & Low Voltage Switchgear & Cabling", desc: "We install MV and LV switchgear, switchboards, and complete cabling systems including cable pulling (HV, MV & LV), cable terminations, trunking, conduit, earthing, and lightning protection. All works comply with IEC standards and Saudi Electricity Company specifications on every project." },
      { title: "Electrical Distribution & Lighting Systems", desc: "We design and install complete electrical distribution systems from main distribution boards through to final circuit wiring, socket outlets, and lighting installations for commercial, residential, and institutional projects across Saudi Arabia." },
      { title: "Voice / Data & Structured Cabling", desc: "We install structured cabling infrastructure — Cat6, Cat6A, and fibre optic networks — for voice, data, and communications. Our scope includes rack and patch panel installation, testing and certification to TIA/EIA standards, and full integration with BMS and IT infrastructure systems." },
      { title: "Audio, Visual & PA Systems", desc: "We install background music systems, public address and voice evacuation systems, MATV, SATV, and audio-visual distribution networks for mosques, malls, hospitals, hotels, schools, and institutional buildings across the Kingdom." },
      { title: "CCTV, Security & Access Control", desc: "We design and install comprehensive CCTV, anti-intrusion, and access control systems integrated with BMS platforms and deployed across commercial, industrial, residential, and government facilities throughout Saudi Arabia." },
    ],
    pillars: [
      { id: "01", title: "IN-HOUSE DESIGN", desc: "Our engineering team produces complete electrical design drawings single-line diagrams, load schedules, cable schedules, and protection coordination studies entirely in-house." },
      { id: "03", title: "TESTING & COMMISSIONING", desc: "We carry out full testing and commissioning from individual circuits through to complete substation energization and formal client handover." }
    ],
    capLabel: "Electrical Capabilities & Strengths",
    capDesc: "Full Electrical Technical Scope complies with IEC, BS, and Saudi Electricity Company standards on all projects.",
    capabilities: [
      { title: "HV/MV/LV Transformers", desc: "Installation & pre-commissioning all ratings, excitation, isolation, neutral grounding, generator step-up up to 500MVA." },
      { title: "Bus Duct Systems", desc: "Iso Phase Bus Duct (IPB), Non-Segregated Bus Duct (NSB), GIB 132kV to 380kV installed and commissioned." },
      { title: "Generator Installation", desc: "Generator installation & pre-commissioning for all ratings diesel, emergency, and standby generator sets." },
      { title: "Switchgears & Switchboards", desc: "MV & LV switchgears, switchboards, MCC, capacitors installation, relay setting, and commissioning." },
      { title: "Panel Installation", desc: "Electrical, control, and instrumentation panels main distribution, sub-main, and final distribution boards." },
      { title: "UPS / DC Battery Systems", desc: "UPS and DC battery system installation, load testing, and commissioning for critical power applications." }
    ]
  },
  transmission: {
    title: "Transmission Lines",
    subtitle: "Gulf Al Olaya Transmission Division",
    heroDesc: "As a full EPC contractor for overhead transmission lines, Gulf Al Olaya manages every project phase from route survey and engineering design to procurement, civil works, tower erection, conductor stringing, and commissioning. We deliver 132kV to 380kV transmission systems with in-house engineering, QA/QC teams, specialist equipment, and extensive electrical construction experience across the Kingdom of Saudi Arabia, ensuring safe, timely, and SEC compliant project delivery.",
    contentTitle: "In-House Design, Installation & Maintenance",
    contentDesc1: "Gulf Al Olaya has the relevant experience in managing all aspects of electrical transmission line works including full EPC delivery in accordance with international quality standards. We combine versatile equipment with skilled human resources to deliver complete turnkey transmission line projects on time and within budget.",
    contentDesc2: "Our EPC expertise covers 380kV, 230kV, and 132kV overhead transmission line systems from route survey and foundation design through to stringing, commissioning, and formal handover to the client and Saudi Electricity Company.",
    gridItems: [
      { title: "380kV / 230kV / 132kV", icon: "cert" },
      { title: "Versatile Equipment Fleet", icon: "pm" },
      { title: "Self-Performing Construction", icon: "design" },
      { title: "Materials Logistics Management", icon: "qa" },
    ],
    sectorLabel: "EPC PHASES",
    sectorTitle: "Transmission Lines EPC Full Project Delivery Scope",
    sectorDesc: "Currently, we deliver major mechanical and MEP projects across multiple service lines and we are always keen to further broaden our capabilities to meet client needs.",
    sectors: [
      { title: "Basic & Detail Engineering", desc: "We carry out full basic and detailed engineering including route selection, topographic survey, hydrological study, geotechnical investigation, tower spotting, foundation design, stringing charts, and all construction drawings in compliance with IEC and SEC standards." },
      { title: "Procurement Main Items & Bulk Materials", desc: "We manage full procurement of all main items and bulk materials, lattice steel towers, conductors (ACSR, ACCC), OPGW and OHEW, insulators, hardware fittings, and all civil and mechanical materials. Our procurement team manages international and local supply chains from factory to site." },
      { title: "Civil Works Foundations & Site Preparation", desc: "We carry out all civil works topographic survey, soil and road preparation, excavation and trenching, reinforced concrete tower foundations, field piles where required, and early pull-off testing across diverse terrain conditions throughout Saudi Arabia" },
      { title: "Tower Erection & Conductor Stringing", desc: "We carry out complete tower erection sorting, uploading, shifting, unloading, ground assembly, and erection followed by conductor and OPGW stringing using specialized tension equipment. All stringing is carried out to the approved stringing charts with sag checks before handover." },
      { title: "Testing, Commissioning & Handover", desc: "We carry out all pre-commissioning testing insulation resistance, continuity testing, phase identification, protection relay verification, and energization coordination with the Saudi Electricity Company delivering full as-built documentation, O&M manuals, and a complete handover package." },
    ],
    pillars: [
      { id: "01", title: "EPC Accountability", desc: "We take single-point EPC responsibility engineering, procurement, and construction managed under one contract, with one client interface from survey to energization." },
      { id: "02", title: "International Standards", desc: "All works executed to IEC, SEC, and applicable international quality standards with full documentation and third-party inspection available where required." },
      { id: "03", title: "Kingdom-Wide Delivery", desc: "Experienced across diverse terrain desert, mountain, coastal with self-sufficient mobilization and site camp capability for any project location in Saudi Arabia." }
    ],
    capLabel: "EPC Capabilities & Strengths",
    capDesc: "Gulf Al Olaya for Transmission EPC - Proven capability across all high-voltage transmission classes IEC and SEC standards throughout the Kingdom.",
    capabilities: [
      { title: "380kV / 230kV / 132kV", desc: "Proven capability across all high-voltage transmission classes IEC and SEC standards throughout the Kingdom." },
      { title: "Versatile Equipment Fleet", desc: "Cranes, stringing machines, tension pullers, transport vehicles all owned and deployed by our own teams." },
      { title: "Self-Performing Construction", desc: "No subcontracted execution risks our own tower crews, civil teams, and QC inspection on every tower." },
      { title: "Materials Logistics Management", desc: "End-to-end materials management factory inspection through to site delivery and full reconciliation." },
      { title: "Site Accommodation", desc: "We establish and operate self-sufficient personnel accommodation camps for remote transmission projects." },
      { title: "Full QA/QC Documentation", desc: "Complete inspection and test records, weld traceability, material certs, and as-built drawings at handover." }
    ]
  },
  piping: {
    title: "Industrial Piping",
    subtitle: "Gulf Al Olaya Industrial Piping",
    heroDesc: "Our Industrial Piping Division fabricates and installs all types of industrial pipework, ranging from small-bore instrument tubing to large-bore process lines up to 90 inches in diameter. We manufacture piping spools at our Dammam facility and carry out on-site erection for oil, gas, fuel, chemical, water, and industrial utility applications. Our scope covers the full project lifecycle from spool fabrication, welding, and NDT inspection to field installation, pressure testing, and final commissioning.",
    contentTitle: "Equipped for Every Piping Challenge",
    contentDesc1: "Gulf Al Olaya is equipped for all types of piping fabrication and installation. We manufacture piping spools and carry out installations on oil, gas, fuel, chemical, and water lines up to 90-inch diameter. Our fabricators and fitters are well trained and fully conversant with international practices.",
    contentDesc2: "Our welders are fully qualified on a wide range of welding specifications and materials including stainless steel, carbon steel, nickel alloy, and duplex using techniques such as SMAW, TIG, and MIG. We have a well-equipped fabrication facility in Dammam with our own in-house QC inspection team.",
    gridItems: [
      { title: "Pipe Racks & Supports", icon: "design" },
      { title: "Platforms & Walkways", icon: "pm" },
      { title: "Large Factories & Plants", icon: "qa" },
      { title: "Communication Towers", icon: "cert" },
    ],
    sectorLabel: "PIPING SCOPE",
    sectorTitle: "Manufactures Piping Spools & Carries Out Erection for Oil & Gas",
    sectorDesc: "We deliver comprehensive industrial piping solutions from spool fabrication to complex field installations across the Kingdom's industrial sectors.",
    sectors: [
      { title: "Spool Fabrication & Manufacturing", desc: "High-quality piping spool manufacturing at our Dammam facility, ensuring precision geometry and superior weld quality for all industrial applications." },
      { title: "Gas Lines & Fueling Systems", desc: "Design, installation, and testing of high-pressure gas lines and fueling infrastructure for industrial and commercial facilities." },
      { title: "Refinery & Petrochemical Piping", desc: "Specialized piping services for refineries and petrochemical plants, including process lines, utility piping, and maintenance turnarounds." },
      { title: "Water & Utility Infrastructure", desc: "Large-bore industrial water piping and utility networks for treatment plants and manufacturing facilities." },
      { title: "NDT & Pressure Testing", desc: "Rigorous non-destructive testing and hydrostatic/pneumatic pressure testing to ensure complete integrity and safety of all installed systems." },
    ],
    pillars: [
      { id: "01", title: "PRECISION FABRICATION", desc: "Our Dammam facility uses advanced machinery and techniques to ensure every piping spool meets exact design specifications and international standards." },
      { id: "02", title: "CERTIFIED WELDING", desc: "Our welders are qualified across stainless, carbon, and exotic alloys using SMAW, TIG, and MIG techniques with full traceability." },
      { id: "03", title: "TOTAL QUALITY CONTROL", desc: "In-house QC teams manage every stage from material receipt and fit-up to final welding and NDT, ensuring 100% compliance." }
    ],
    capLabel: "Piping Capabilities & Strengths",
    capDesc: "Equipped to handle process lines up to 90-inch diameter with in-house fabrication and certified field crews.",
    capabilities: [
      { title: "Small & Large Bore Piping", desc: "Expertise in everything from instrument tubing to massive 90-inch diameter process lines." },
      { title: "Specialized Alloy Welding", desc: "Certified welding for Stainless Steel, Carbon Steel, Nickel Alloys, and Duplex materials." },
      { title: "Industrial Spooling", desc: "In-house manufacturing of complex piping spools for rapid field installation and superior quality." },
      { title: "Facility Infrastructure", icon: "pm", desc: "Extensive experience in pipe racks, supports, platforms, and structural walkways for industrial plants." },
      { title: "Refinery Support", desc: "Deep knowledge of API and ASME standards for mission-critical refinery and petrochemical environments." },
      { title: "Testing & Commissioning", desc: "Full pressure testing, NDT, and commissioning services to ensure system readiness and safety." }
    ]
  }
};

const IconMap = ({ name }) => {
  if (name === "design") return <svg className="w-8 h-8 text-[#f26522] mb-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>;
  if (name === "pm") return <svg className="w-8 h-8 text-[#f26522] mb-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>;
  if (name === "qa") return <svg className="w-8 h-8 text-[#f26522] mb-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>;
  return <svg className="w-8 h-8 text-[#f26522] mb-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>;
};

export default function ServiceDetail() {
  const { id } = useParams();
  const { t } = useTranslation();
  useSEO("PAGE", "service-detail");

  const data = serviceData[id] || serviceData.mechanical;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <div className="bg-white">
      <Header theme="light" />

      {/* HERO SECTION */}
      <section className="relative w-full bg-[#f8f9fa] py-20 md:py-32 overflow-hidden">
        <div className="absolute right-[-5%] top-0 h-full w-[30%] opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#18324e 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>
        <div className="mx-auto max-w-6xl px-4 relative z-10">
          <div className="grid gap-12 md:grid-cols-2 md:items-center md:gap-16">
            <div className="relative w-full aspect-square md:aspect-[4/5] flex justify-center items-center">
              <div className="absolute w-[90%] h-[90%] bg-[#0f2d45] z-0 ml-[5%] mt-[5%]" style={{ clipPath: "polygon(10% 0, 100% 15%, 85% 100%, 0 85%)" }}></div>
              <div className="absolute w-[90%] h-[90%] z-10 overflow-hidden shadow-2xl" style={{ clipPath: "polygon(10% 0, 100% 15%, 85% 100%, 0 85%)" }}>
                <img src="/images/vision.png" alt="Service" className="h-full w-full object-cover" />
              </div>
            </div>
            <div className="pl-0 md:pl-8">
              <p className="text-[13px] font-bold tracking-widest text-[#f26522] uppercase">{t("service_what_we_do")}</p>
              <h1 className="mt-4 text-[36px] font-bold text-[#0f2d45] md:text-[48px] leading-tight">{t(data.title)}</h1>
              <p className="mt-6 text-[15.5px] leading-relaxed text-[#555]">{t(data.heroDesc)}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT SECTION & 2x2 GRID */}
      <section className="w-full bg-white py-20 md:py-32">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-16 md:grid-cols-2 md:items-start">
            <div className="pr-0 md:pr-12">
              <p className="text-[15px] font-bold text-[#f26522]">{t(data.subtitle)}</p>
              <h2 className="mt-4 text-[32px] font-bold text-[#0f2d45] md:text-[40px] leading-tight">{t(data.contentTitle)}</h2>
              <p className="mt-6 text-[15.5px] leading-relaxed text-[#555]">{t(data.contentDesc1)}</p>
              <p className="mt-6 text-[15.5px] leading-relaxed text-[#555]">{t(data.contentDesc2)}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 border border-slate-200 sm:border-0 rounded-lg overflow-hidden">
              {data.gridItems.map((item, idx) => (
                <div key={idx} className={`p-8 border-b border-slate-200 hover:bg-slate-50 transition-colors ${(idx === 0 || idx === 2) ? 'sm:border-r' : ''} ${idx >= 2 ? 'sm:border-b-0' : ''}`}>
                  <IconMap name={item.icon} />
                  <h3 className="text-[18px] font-bold text-[#0f2d45] leading-snug">{t(item.title)}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="w-full bg-white pb-16 md:pb-24 pt-4">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-col gap-8 md:gap-12">
            <div className="flex items-center gap-6 md:gap-10">
              <span className="text-[80px] md:text-[110px] font-medium text-[#f26522] leading-none tracking-tighter w-[180px] md:w-[250px]">365+</span>
              <span className="text-[18px] md:text-[22px] text-orange-400/80 font-medium tracking-wide">{t("service_skilled_personnel")}</span>
            </div>
            <div className="flex items-center gap-6 md:gap-10">
              <span className="text-[80px] md:text-[110px] font-medium text-[#f26522] leading-none tracking-tighter w-[180px] md:w-[250px]">36</span>
              <span className="text-[18px] md:text-[22px] text-orange-400/80 font-medium tracking-wide">{t("service_completed_projects")}</span>
            </div>
            <div className="flex items-center gap-6 md:gap-10">
              <span className="text-[80px] md:text-[110px] font-medium text-[#f26522] leading-none tracking-tighter w-[180px] md:w-[250px]">100%</span>
              <span className="text-[18px] md:text-[22px] text-orange-400/80 font-medium tracking-wide">{t("service_client_focused")}</span>
            </div>
          </div>
        </div>
      </section>

      {/* MAJOR SECTORS SECTION */}
      <section className="w-full bg-white py-16 md:py-24 border-t border-slate-100">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
            <p className="text-[13px] font-bold tracking-widest text-[#f26522] uppercase">{t(data.sectorLabel)}</p>
            <h2 className="mt-4 text-[26px] font-bold text-[#0f2d45] md:text-[34px] leading-tight">{t(data.sectorTitle)}</h2>
            <p className="mt-5 text-[15px] leading-relaxed text-[#555] max-w-2xl mx-auto">{t(data.sectorDesc)}</p>
          </div>
          <div className="flex flex-col gap-24 md:gap-32">
            {data.sectors.map((sector, idx) => (
              <div key={idx} className="grid gap-10 md:grid-cols-2 md:items-center">
                <div className={`order-2 ${idx % 2 === 0 ? 'md:order-1 pr-0 md:pr-10' : 'md:order-2 pl-0 md:pl-10'}`}>
                  <h3 className="text-[28px] font-bold text-[#0f2d45] md:text-[32px]">{t(sector.title)}</h3>
                  <p className="mt-5 text-[15.5px] leading-relaxed text-[#555]">{t(sector.desc)}</p>
                  <div className="mt-8">
                    <Link to="/contact" className="inline-flex rounded-sm bg-[#f26522] px-6 py-2.5 text-[14px] font-bold text-white hover:bg-orange-600 transition-all shadow-md shadow-orange-500/20">{t("service_get_quote")}</Link>
                  </div>
                </div>
                <div className={`order-1 ${idx % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
                  <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[#e2e2e2] shadow-sm">
                    <img src="/images/vision.png" alt={sector.title} className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PILLARS OF COMMITMENT */}
      <section className="w-full bg-[#f26522] py-20 md:py-32 overflow-hidden">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-16 md:grid-cols-2 md:items-center">
            <div className="text-white">
              <p className="text-[14px] font-bold tracking-widest uppercase opacity-80">{t("service_pillars_label")}</p>
              <h2 className="mt-6 text-[36px] font-bold leading-tight md:text-[48px]">{t("service_pillars_title")}</h2>
              <div className="mt-12 flex flex-col gap-4">
                <button className="inline-flex h-[54px] w-[54px] items-center justify-center rounded-full border border-white text-white"><svg width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"><path d="M4.5 15.75l7.5-7.5 7.5 7.5" /></svg></button>
                <div className="h-20 w-[1px] bg-white/30 ml-[27px]"></div>
                <button className="inline-flex h-[54px] w-[54px] items-center justify-center rounded-full border border-white text-white"><svg width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"><path d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg></button>
              </div>
            </div>
            <div className="relative group">
              {data.pillars.map((pillar, idx) => (
                <div key={idx} className={`aspect-square md:aspect-[4/5] overflow-hidden rounded-sm bg-[#12273f] ${idx === 0 ? '' : 'hidden'}`}>
                  <img src="/images/vision.png" className="h-full w-full object-cover opacity-60" alt="Pillar" />
                  <div className="absolute inset-0 p-10 flex flex-col justify-center">
                    <span className="text-[20px] font-bold text-[#f26522] mb-4">{pillar.id}</span>
                    <h3 className="text-[28px] font-bold text-white md:text-[32px] mb-4">{t(pillar.title)}</h3>
                    <p className="text-[16px] text-white/90 max-w-sm">{t(pillar.desc)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CAPABILITIES & STRENGTHS */}
      <section className="w-full bg-white py-20 md:py-32 border-t border-slate-100">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-col md:flex-row gap-16">
            <div className="md:w-1/3">
              <h2 className="text-[32px] font-bold text-[#0f2d45] md:text-[40px] leading-tight">{t(data.capLabel)}</h2>
              <p className="mt-6 text-[15.5px] text-[#555] leading-relaxed">{t(data.capDesc)}</p>
              <div className="mt-10"><Link to="/contact" className="inline-flex rounded-sm bg-[#f26522] px-8 py-3 text-[15px] font-bold text-white">{t("service_get_quote")}</Link></div>
              <div className="mt-12 flex items-center gap-4">
                <button className="h-12 w-12 rounded-full border border-orange-500 text-orange-500"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 19l-7-7 7-7" /></svg></button>
                <button className="h-12 w-12 rounded-full border border-orange-500 text-orange-500"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 5l7 7-7 7" /></svg></button>
              </div>
            </div>
            <div className="md:w-2/3">
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
                {data.capabilities.map((cap, idx) => (
                  <div key={idx} className="relative aspect-[3/4] overflow-hidden rounded-sm bg-slate-200 group">
                    <img src="/images/vision.png" className="h-full w-full object-cover transition-transform group-hover:scale-110" alt="Capability" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent p-8 flex flex-col justify-end">
                      <h4 className="text-white font-bold text-xl mb-2">{t(cap.title)}</h4>
                      <p className="text-white/80 text-sm">{t(cap.desc)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="w-full bg-white py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-12">
            <p className="text-[14px] font-bold tracking-widest text-[#f26522] uppercase">{t("service_featured_projects")}</p>
            <h3 className="mt-4 text-[32px] font-bold text-[#18324e] md:text-[38px]">{t("service_view_latest_projects")}</h3>
          </div>
          <div className="relative w-full min-h-[500px] flex items-center">
            <div className="absolute right-0 w-[80%] h-[80%] bg-[#12273f]"></div>
            <div className="absolute left-0 w-[45%] h-[90%] overflow-hidden" style={{ clipPath: "polygon(10% 10%, 100% 20%, 75% 100%, 0% 85%)" }}>
              <img src="/images/vision.png" className="w-full h-full object-cover" alt="Featured" />
            </div>
            <div className="relative z-10 w-full flex justify-end">
              <div className="w-[60%] text-white p-12">
                <p className="text-[#f26522] font-bold mb-2">Civil & Structural Works</p>
                <h4 className="text-3xl font-bold mb-6">Zulfi Mosque & House Project</h4>
                <p className="text-white/80 leading-relaxed mb-8">Delivered complete civil and structural works for the Zulfi Mosque and adjacent residential project encompassing foundations, reinforced concrete frames, masonry, and architectural finishes.</p>
                <div className="flex gap-4">
                  <button className="h-12 w-12 rounded-full border border-white flex items-center justify-center hover:bg-white/10 transition-colors"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 19l-7-7 7-7" /></svg></button>
                  <button className="h-12 w-12 rounded-full border border-white flex items-center justify-center hover:bg-white/10 transition-colors"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 5l7 7-7 7" /></svg></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CENTER OF STRENGTH BANNER */}
      <section className="relative w-full h-[400px] flex items-center justify-center overflow-hidden">
        <img src="/images/hero.png" className="absolute inset-0 w-full h-full object-cover" alt="Banner" />
        <div className="absolute inset-0 bg-[#0f2d45]/70"></div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">"{t("service_strength_banner_title")}"</h2>
          <p className="text-lg md:text-xl opacity-90">{t("service_strength_banner_desc")}</p>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="w-full bg-white py-20">
        <div className="mx-auto max-w-6xl px-4 grid md:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-[4/3]">
            <div className="absolute inset-0 bg-slate-200" style={{ clipPath: "polygon(0% 25%, 100% 0%, 85% 100%, 15% 75%)" }}>
              <img src="/images/vision.png" className="w-full h-full object-cover" alt="Contact" />
            </div>
          </div>
          <div>
            <p className="text-[#18324e] font-bold tracking-widest mb-4">CONTACT US</p>
            <h3 className="text-4xl font-bold text-[#18324e] mb-6">How can we help?</h3>
            <p className="text-gray-600 text-lg mb-10">Every great project starts with a conversation. Whether you have a fully scoped tender or just an early-stage idea, our team is ready to listen, advise, and find the right solution for you.</p>
            <Link to="/contact" className="bg-[#f26522] text-white px-10 py-4 font-bold rounded-sm hover:bg-orange-600 transition-colors inline-block">Send Message</Link>
          </div>
        </div>
      </section>

    </div>
  );
}
