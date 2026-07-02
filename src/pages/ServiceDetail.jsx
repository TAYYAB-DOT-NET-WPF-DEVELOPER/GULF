import React, { useEffect, useState } from "react";
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
      { title: "HVAC", desc: "Complete HVAC design, supply, and installation for all building types, delivering energy-efficient climate control solutions.", image: "/images/Mechnical1.jpg" },
      { title: "Plumbing & Drainage", desc: "End-to-end plumbing and drainage systems, from water supply to external utility networks across major projects.", image: "/images/Mechnical2.jpg" },
      { title: "Fire Fighting & Protection", desc: "Full fire protection systems designed, installed, and tested to meet NFPA and Saudi Civil Defence standards.", image: "/images/Mechnical3.jpg" },
      { title: "Kitchen Hood & Exhaust Systems", desc: "Commercial kitchen ventilation systems ensuring safety, airflow balance, and compliance with health regulations.", image: "/images/Mechnical4.jpg" },
      { title: "Sheet Metal Fabrication", desc: "In-house fabrication of ductwork and metal components, ensuring quality control and efficient installation.", image: "/images/Mechnical5.jpg" },
      { title: "Fire Detection & Alarm", desc: "Advanced fire detection and alarm systems integrated with building management for reliable safety coverage.", image: "/images/Mechnical6.jpg" },
      { title: "FM200 & Deluge Systems", desc: "Clean agent and deluge suppression systems designed for high-risk and sensitive environments.", image: "/images/Mechnical7.jpg" },
    ],
    pillars: [
      { id: "01", title: "STRATEGIC PROJECT MANAGEMENT", desc: "We handle mechanical projects strategically from planning to execution using the best tools and processes to meet project schedules, avoid budget overruns, and successfully maintain industry benchmarks.", image: "/images/WhatWeDoImages1.jpg" },
      { id: "02", title: "INTEGRATED DESIGN & ENGINEERING", desc: "Our in-house design and engineering capability allows us to optimize mechanical systems for efficiency, safety, and seamless integration with other building services.", image: "/images/WhatWeDoImages2.jpg" },
      { id: "03", title: "TOTAL QUALITY & SAFETY MANAGEMENT", desc: "We maintain a rigorous QA/QC program and zero-incident target, executing all HVAC, plumbing, and fire protection systems strictly to NFPA and Saudi Civil Defence standards.", image: "/images/WhahweDoimages3.jpg" }
    ],
    capLabel: "Mechanical Capabilities & Strengths",
    capDesc: "Clean agent and deluge suppression systems designed for high-risk and sensitive environments.",
    capabilities: [
      { title: "Equipment Assembly & Erection", desc: "Full scope equipment assembly, alignment, and erection services backed by our own fleet of cranes, boom lifts, and specialist rigging equipment.", image: "/images/Mechnical1.jpg" },
      { title: "Pre-Commissioning", desc: "Startup & commissioning services encompassing switchgears, transformers, generators, UPS systems, and calibration of instruments.", image: "/images/Mechnical3.jpg" },
      { title: "Testing & Quality Control", desc: "Complete testing, balancing, and commissioning of HVAC ductwork, hydronic systems, and plumbing lines to certify operational design compliance.", image: "/images/Mechnical5.jpg" },
      { title: "Support & Maintenance", desc: "Long-term operation and maintenance support, emergency repairs, and preventative maintenance for all installed mechanical plant assets.", image: "/images/Mechnical7.jpg" }
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
      { title: "Building Management Systems", desc: "We design, supply, and install complete BMS solutions integrating HVAC, lighting, power, fire, and security into a single intelligent platform. Our BMS teams work across commercial towers, hospitals, hotels, and industrial facilities, delivering energy efficiency and full operational control to building owners and operators.", image: "/images/Eleceterical1.jpg" },
      { title: "Medium & Low Voltage Switchgear & Cabling", desc: "We install MV and LV switchgear, switchboards, and complete cabling systems including cable pulling (HV, MV & LV), cable terminations, trunking, conduit, earthing, and lightning protection. All works comply with IEC standards and Saudi Electricity Company specifications on every project.", image: "/images/Eleceterical2.jpg" },
      { title: "Electrical Distribution & Lighting Systems", desc: "We design and install complete electrical distribution systems from main distribution boards through to final circuit wiring, socket outlets, and lighting installations for commercial, residential, and institutional projects across Saudi Arabia.", image: "/images/Eleceterical3.jpg" },
      { title: "Voice / Data & Structured Cabling", desc: "We install structured cabling infrastructure — Cat6, Cat6A, and fibre optic networks — for voice, data, and communications. Our scope includes rack and patch panel installation, testing and certification to TIA/EIA standards, and full integration with BMS and IT infrastructure systems.", image: "/images/Eleceterical4.jpg" },
      { title: "Audio, Visual & PA Systems", desc: "We install background music systems, public address and voice evacuation systems, MATV, SATV, and audio-visual distribution networks for mosques, malls, hospitals, hotels, schools, and institutional buildings across the Kingdom.", image: "/images/Eleceterical5.jpg" },
      { title: "CCTV, Security & Access Control", desc: "We design and install comprehensive CCTV, anti-intrusion, and access control systems integrated with BMS platforms and deployed across commercial, industrial, residential, and government facilities throughout Saudi Arabia.", image: "/images/Eleceterical6.jpg" },
    ],
    pillars: [
      { id: "01", title: "IN-HOUSE DESIGN", desc: "Our engineering team produces complete electrical design drawings single-line diagrams, load schedules, cable schedules, and protection coordination studies entirely in-house.", image: "/images/WhatWeDoImages1.jpg" },
      { id: "02", title: "TESTING & COMMISSIONING", desc: "We carry out full testing and commissioning from individual circuits through to complete substation energization and formal client handover.", image: "/images/WhatWeDoImages2.jpg" },
      { id: "03", title: "SAFETY & COMPLIANCE", desc: "All electrical works strictly comply with IEC, BS, and Saudi Electricity Company (SEC) standards, maintaining a zero-incident safety record on every site.", image: "/images/WhahweDoimages3.jpg" }
    ],
    capLabel: "Electrical Capabilities & Strengths",
    capDesc: "Full Electrical Technical Scope complies with IEC, BS, and Saudi Electricity Company standards on all projects.",
    capabilities: [
      { title: "HV/MV/LV Transformers", desc: "Installation & pre-commissioning all ratings, excitation, isolation, neutral grounding, generator step-up up to 500MVA.", image: "/images/Eleceterical1.jpg" },
      { title: "Bus Duct Systems", desc: "Iso Phase Bus Duct (IPB), Non-Segregated Bus Duct (NSB), GIB 132kV to 380kV installed and commissioned.", image: "/images/Eleceterical2.jpg" },
      { title: "Generator Installation", desc: "Generator installation & pre-commissioning for all ratings diesel, emergency, and standby generator sets.", image: "/images/Eleceterical3.jpg" },
      { title: "Switchgears & Switchboards", desc: "MV & LV switchgears, switchboards, MCC, capacitors installation, relay setting, and commissioning.", image: "/images/Eleceterical4.jpg" },
      { title: "Panel Installation", desc: "Electrical, control, and instrumentation panels main distribution, sub-main, and final distribution boards.", image: "/images/Eleceterical5.jpg" },
      { title: "UPS / DC Battery Systems", desc: "UPS and DC battery system installation, load testing, and commissioning for critical power applications.", image: "/images/Eleceterical6.jpg" }
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
    sectorDesc: "We manage every phase of overhead transmission line delivery — from survey and engineering through civil works, tower erection, stringing, and formal SEC-compliant commissioning and handover.",
    sectors: [
      { title: "Basic & Detail Engineering", desc: "We carry out full basic and detailed engineering including route selection, topographic survey, hydrological study, geotechnical investigation, tower spotting, foundation design, stringing charts, and all construction drawings in compliance with IEC and SEC standards.", image: "/images/Transmission1.jpg" },
      { title: "Procurement Main Items & Bulk Materials", desc: "We manage full procurement of all main items and bulk materials — lattice steel towers, conductors (ACSR, ACCC), OPGW and OHEW, insulators, hardware fittings, and all civil and mechanical materials. Our procurement team manages international and local supply chains from factory to site.", image: "/images/Transmission2.jpg" },
      { title: "Civil Works Foundations & Site Preparation", desc: "We carry out all civil works including topographic survey, soil and road preparation, excavation and trenching, reinforced concrete tower foundations, field piles where required, and early pull-off testing across diverse terrain conditions throughout Saudi Arabia.", image: "/images/Transmission3.jpg" },
      { title: "Tower Erection & Conductor Stringing", desc: "We carry out complete tower erection — sorting, uploading, shifting, unloading, ground assembly, and erection — followed by conductor and OPGW stringing using specialized tension equipment. All stringing is carried out to the approved stringing charts with sag checks before handover.", image: "/images/Transmission4.jpg" },
      { title: "Testing, Commissioning & Handover", desc: "We carry out all pre-commissioning testing — insulation resistance, continuity testing, phase identification, protection relay verification, and energization coordination with the Saudi Electricity Company — delivering full as-built documentation, O&M manuals, and a complete handover package.", image: "/images/Transmission5.jpg" },
    ],
    pillars: [
      { id: "01", title: "EPC Accountability", desc: "We take single-point EPC responsibility — engineering, procurement, and construction — managed under one contract, with one client interface from survey to energization.", image: "/images/Transmission1.jpg" },
      { id: "02", title: "International Standards", desc: "All works executed to IEC, SEC, and applicable international quality standards with full documentation and third-party inspection available where required.", image: "/images/Transmission4.jpg" },
      { id: "03", title: "Kingdom-Wide Delivery", desc: "Experienced across diverse terrain — desert, mountain, coastal — with self-sufficient mobilization and site camp capability for any project location in Saudi Arabia.", image: "/images/Transmission3.jpg" }
    ],
    capLabel: "EPC Capabilities & Strengths",
    capDesc: "Gulf Al Olaya for Transmission EPC — Proven capability across all high-voltage transmission classes to IEC and SEC standards throughout the Kingdom.",
    capabilities: [
      { title: "380kV / 230kV / 132kV Lines", desc: "Proven EPC delivery across all high-voltage transmission classes to IEC and SEC standards throughout Saudi Arabia.", image: "/images/Transmission4.jpg" },
      { title: "Versatile Equipment Fleet", desc: "Cranes, stringing machines, tension pullers, transport vehicles — all owned and deployed by our own site teams.", image: "/images/Transmission3.jpg" },
      { title: "Self-Performing Construction", desc: "No subcontracted execution risks — our own tower crews, civil teams, and QC inspection on every tower location.", image: "/images/Transmission1.jpg" },
      { title: "Materials Logistics Management", desc: "End-to-end materials management from factory inspection through to site delivery and full material reconciliation.", image: "/images/Transmission2.jpg" },
      { title: "Site Accommodation & Camp", desc: "We establish and operate self-sufficient personnel accommodation camps for remote transmission line projects.", image: "/images/Transmission3.jpg" },
      { title: "Full QA/QC Documentation", desc: "Complete inspection and test records, weld traceability, material certs, and as-built drawings delivered at handover.", image: "/images/Transmission5.jpg" }
    ]
  },
  piping: {
    title: "Industrial Piping",
    subtitle: "Gulf Al Olaya Industrial Piping",
    heroDesc: "Our Industrial Piping Division fabricates and installs all types of industrial pipework ranging from small-bore instrument tubing to large-bore process lines up to 90 inches in diameter. We manufacture piping spools at our Dammam facility and carry out on-site erection for oil, gas, fuel, chemical, water, and industrial utility applications. Our scope covers the full project lifecycle from spool fabrication, welding, and NDT inspection to field installation, pressure testing, and final commissioning.",
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
    sectorTitle: "Gulf Al Olaya Manufactures Piping Spools & Carries Out Erection for Oil & Gas",
    sectorDesc: "All Piping Systems We Fabricate & Install — delivering comprehensive industrial piping solutions from spool fabrication to complex field installations across the Kingdom's industrial sectors.",
    sectors: [
      { title: "Gas Lines & Fueling Systems", desc: "We carry out full design, installation, and testing of high-pressure gas transmission and distribution lines, fueling station piping systems, and industrial fuel supply networks. Our teams handle all line sizes and materials, with full pressure testing and regulatory compliance on every project.", image: "/images/Piping1.jpg" },
      { title: "Corrosive Fluids & Chemical Lines", desc: "We fabricate and install pipework for corrosive fluid and chemical process applications — using corrosion-resistant alloys including stainless steel, duplex stainless, and Inconel. Our fabricators are qualified and fully experienced in high-specification chemical and petrochemical pipework.", image: "/images/Piping2.jpg" },
      { title: "Water & Wastewater Treatment Plants", desc: "We fabricate and install complete piping systems for water and wastewater treatment plants — including feed water, process water, chemical dosing, and sludge handling systems. Scope covers large-bore pipework using carbon steel, stainless steel, HDPE, and GRP materials.", image: "/images/Piping3.jpg" },
      { title: "Hydraulic, Pneumatic & Coolant Systems", desc: "We fabricate and install high-pressure hydraulic power unit lines, pneumatic instrument piping, and industrial coolant and refrigerant distribution systems for oil and gas, power generation, and manufacturing facilities. Scope includes double-containment piping and industrial process piping for precision environments.", image: "/images/Piping4.jpg" },
    ],
    pillars: [
      { id: "01", title: "STRATEGIC PROJECT MANAGEMENT", desc: "We handle piping projects strategically from planning to execution, using the best tools and processes to meet project schedules, avoid budget overruns, and maintain industry benchmarks.", image: "/images/Piping1.jpg" },
      { id: "02", title: "PRECISION FABRICATION", desc: "Our Dammam facility uses advanced machinery and techniques to ensure every piping spool meets exact design specifications and international standards with full dimensional traceability.", image: "/images/Piping2.jpg" },
      { id: "03", title: "CERTIFIED WELDING & QC", desc: "Our welders are qualified across stainless, carbon, and exotic alloys using SMAW, TIG, and MIG techniques. In-house QC teams manage every stage from material receipt to final NDT.", image: "/images/Piping3.jpg" }
    ],
    capLabel: "Full Piping Erection List",
    capDesc: "All Piping Systems We Fabricate & Install — equipped to handle process lines up to 90-inch diameter with in-house fabrication, certified field crews, and full NDT capabilities.",
    capabilities: [
      { title: "Gas Lines", desc: "High-pressure gas transmission and distribution lines, all sizes and materials, fully tested and compliant.", image: "/images/Piping1.jpg" },
      { title: "Fueling Systems", desc: "Complete fueling station pipework, industrial fuel supply lines, and storage tank connections.", image: "/images/Piping4.jpg" },
      { title: "Chemical & Corrosive Lines", desc: "Corrosion-resistant alloy piping for aggressive chemical and petrochemical process applications.", image: "/images/Piping2.jpg" },
      { title: "Water & Wastewater", desc: "Large-bore process water, feed water, and wastewater treatment plant piping systems.", image: "/images/Piping3.jpg" },
      { title: "Hydraulic & Pneumatic", desc: "High-pressure hydraulic and pneumatic instrument tubing for oil, gas, and manufacturing facilities.", image: "/images/Piping4.jpg" },
      { title: "Testing & Commissioning", desc: "Full NDT, hydrostatic and pneumatic pressure testing, and commissioning services for all pipe systems.", image: "/images/Piping2.jpg" }
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
  const { t, i18n } = useTranslation();
  useSEO("PAGE", "service-detail");

  const data = serviceData[id] || serviceData.mechanical;

  // Active indices for carousels
  const [activePillarIdx, setActivePillarIdx] = useState(0);
  const [capIndex, setCapIndex] = useState(0);
  const [projectIndex, setProjectIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    setActivePillarIdx(0);
    setCapIndex(0);
    setProjectIndex(0);
  }, [id]);

  const isRTL = i18n.language === "ar" || i18n.language === "ur";

  // Navigation handlers
  const handlePrevPillar = () => {
    setActivePillarIdx((prev) => (prev === 0 ? data.pillars.length - 1 : prev - 1));
  };
  const handleNextPillar = () => {
    setActivePillarIdx((prev) => (prev === data.pillars.length - 1 ? 0 : prev + 1));
  };

  const handlePrevCap = () => {
    setCapIndex((prev) => (prev === 0 ? Math.max(0, data.capabilities.length - 2) : prev - 1));
  };
  const handleNextCap = () => {
    setCapIndex((prev) => (prev >= data.capabilities.length - 2 ? 0 : prev + 1));
  };

  // Featured Projects list
  const featuredProjects = [
    {
      title: "Zulfi Mosque & House Project",
      category: "Civil & Structural Works",
      desc: "Delivered complete civil and structural works for the Zulfi Mosque and adjacent residential project encompassing foundations, reinforced concrete frames, masonry, and architectural finishes.",
      image: "/images/project1.png"
    },
    {
      title: "Sultan Bin Abdul Aziz Humanitarian City",
      category: "External Utility & Infrastructure Works",
      desc: "Executed comprehensive infrastructure works for Sultan Bin Abdul Aziz Humanitarian City, requiring strict site management, safety compliance, and zero disruption to live facilities.",
      image: "/images/project2.png"
    },
    {
      title: "Al Af-MacDonald’s Fast Food Outlet",
      category: "Civil, Structural & Finishing Works",
      desc: "Completed a full turnkey civil, structural, and interior finishing package for this commercial fast food outlet, delivered on schedule to meet the client's operational launch timeline.",
      image: "/images/project3.png"
    }
  ];

  const handlePrevProject = () => {
    setProjectIndex((prev) => (prev === 0 ? featuredProjects.length - 1 : prev - 1));
  };
  const handleNextProject = () => {
    setProjectIndex((prev) => (prev === featuredProjects.length - 1 ? 0 : prev + 1));
  };

  // Determine page cover image
  const coverImage = id === "mechanical" 
    ? "/images/MECHANICAL DIVISION.png" 
    : (id === "electrical" 
      ? "/images/Electrical division.png" 
      : (id === "transmission" 
        ? "/images/Transmission lines.png" 
        : "/images/Industrial Piping.jpg"));

  return (
    <div className="bg-white">
      <Header theme="light" />

      {/* HERO SECTION */}
      <section className="relative w-full bg-[#f8f9fa] py-20 md:py-32 overflow-hidden">
        <div className="absolute right-[-5%] top-0 h-full w-[30%] opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#18324e 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>
        <div className="mx-auto max-w-6xl px-4 relative z-10">
          <div className="grid gap-12 md:grid-cols-2 md:items-center md:gap-16">
            <div className="relative w-full aspect-square md:aspect-[4/5] flex justify-center items-center">
              {/* Shard Backdrops */}
              <div className="absolute w-[90%] h-[90%] bg-[#f26522]/10 z-0 ml-[10%] mt-[10%]" style={{ clipPath: "polygon(10% 0, 100% 15%, 85% 100%, 0 85%)" }}></div>
              <div className="absolute w-[90%] h-[90%] bg-[#0f2d45] z-0 ml-[5%] mt-[5%]" style={{ clipPath: "polygon(10% 0, 100% 15%, 85% 100%, 0 85%)" }}></div>
              <div className="absolute w-[90%] h-[90%] z-10 overflow-hidden shadow-2xl" style={{ clipPath: "polygon(10% 0, 100% 15%, 85% 100%, 0 85%)" }}>
                <img src={coverImage} alt="Service Cover" className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
              </div>
            </div>
            <div className={`${isRTL ? "pr-0 md:pr-8" : "pl-0 md:pl-8"}`}>
              <p className="text-[13px] font-bold tracking-widest text-[#f26522] uppercase">{t("service_what_we_do")}</p>
              <h1 className="mt-4 text-[36px] font-bold text-[#0f2d45] md:text-[48px] leading-tight tracking-tight">{t(data.title)}</h1>
              <p className="mt-6 text-[15.5px] leading-relaxed text-[#555] font-medium">{t(data.heroDesc)}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT SECTION & 2x2 GRID */}
      <section className="w-full bg-white py-20 md:py-32 relative">
        {/* Subtle decorative Shard */}
        <div className="absolute right-0 top-1/4 w-16 h-32 bg-orange-500/5 pointer-events-none" style={{ clipPath: "polygon(100% 0, 0 50%, 100% 100%)" }} />
        
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-16 md:grid-cols-2 md:items-start">
            <div className={`${isRTL ? "pl-0 md:pl-12" : "pr-0 md:pr-12"}`}>
              <p className="text-[15px] font-bold text-[#f26522] tracking-wider uppercase">{t(data.subtitle)}</p>
              <h2 className="mt-4 text-[32px] font-bold text-[#0f2d45] md:text-[40px] leading-tight tracking-tight">{t(data.contentTitle)}</h2>
              <p className="mt-6 text-[15.5px] leading-relaxed text-[#555] font-medium">{t(data.contentDesc1)}</p>
              <p className="mt-6 text-[15.5px] leading-relaxed text-[#555]">{t(data.contentDesc2)}</p>
            </div>
            
            {/* Grid display with border-lines generated by gap-px */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-slate-200 border border-slate-200 rounded-lg overflow-hidden shadow-sm">
              {data.gridItems.map((item, idx) => (
                <div key={idx} className="p-8 bg-white hover:bg-slate-50 transition-colors duration-300">
                  <IconMap name={item.icon} />
                  <h3 className="text-[18px] font-bold text-[#0f2d45] leading-snug tracking-tight">{t(item.title)}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="w-full bg-white pb-16 md:pb-24 pt-4 relative">
        <div className="absolute left-0 bottom-1/4 w-12 h-24 bg-[#0f2d45]/5 pointer-events-none" style={{ clipPath: "polygon(0 0, 100% 50%, 0 100%)" }} />
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-col gap-10 md:gap-14 max-w-2xl">
            <div className="flex items-center gap-8 md:gap-12">
              <span className="text-[72px] md:text-[96px] font-bold text-[#f26522] leading-none tracking-tight min-w-[160px] md:min-w-[220px]">365+</span>
              <span className="text-[18px] md:text-[22px] text-gray-500 font-semibold tracking-wide uppercase">{t("service_skilled_personnel", "Skilled Personnel")}</span>
            </div>
            <div className="flex items-center gap-8 md:gap-12">
              <span className="text-[72px] md:text-[96px] font-bold text-[#f26522] leading-none tracking-tight min-w-[160px] md:min-w-[220px]">36</span>
              <span className="text-[18px] md:text-[22px] text-gray-500 font-semibold tracking-wide uppercase">{t("service_completed_projects", "Completed Projects")}</span>
            </div>
            <div className="flex items-center gap-8 md:gap-12">
              <span className="text-[72px] md:text-[96px] font-bold text-[#f26522] leading-none tracking-tight min-w-[160px] md:min-w-[220px]">100%</span>
              <span className="text-[18px] md:text-[22px] text-gray-500 font-semibold tracking-wide uppercase">{t("service_client_focused", "Client-Focused")}</span>
            </div>
          </div>
        </div>
      </section>

      {/* MAJOR SECTORS SECTION */}
      <section className="w-full bg-[#f8f9fa] py-20 md:py-32 border-t border-slate-100 relative">
        {/* Shard Decoration */}
        <div className="absolute right-0 top-10 w-24 h-24 bg-orange-500/5 pointer-events-none blur-xl rounded-full" />
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
            <p className="text-[13px] font-bold tracking-widest text-[#f26522] uppercase">{t(data.sectorLabel)}</p>
            <h2 className="mt-4 text-[28px] font-bold text-[#0f2d45] md:text-[40px] leading-tight tracking-tight">{t(data.sectorTitle)}</h2>
            <p className="mt-5 text-[15.5px] leading-relaxed text-[#555] max-w-2xl mx-auto">{t(data.sectorDesc)}</p>
          </div>
          
          {/* Alternating Sectors List */}
          <div className="flex flex-col gap-24 md:gap-32">
            {data.sectors.map((sector, idx) => {
              const isEven = idx % 2 === 1;
              return (
                <div key={idx} className="grid gap-12 md:grid-cols-2 md:items-center">
                  <div className={`order-2 ${isEven ? "md:order-2 md:pl-10" : "md:order-1 md:pr-10"}`}>
                    <h3 className="text-[28px] font-bold text-[#0f2d45] md:text-[34px] leading-snug tracking-tight">{t(sector.title)}</h3>
                    <p className="mt-5 text-[15.5px] leading-relaxed text-[#555] font-medium">{t(sector.desc)}</p>
                    <div className="mt-8">
                      <Link to="/contact" className="inline-flex rounded-sm bg-[#f26522] px-7 py-3 text-[14px] font-bold text-white hover:bg-orange-600 transition-all shadow-md shadow-orange-500/20">{t("service_get_quote")}</Link>
                    </div>
                  </div>
                  <div className={`order-1 ${isEven ? "md:order-1" : "md:order-2"}`}>
                    <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden bg-white shadow-xl hover:shadow-2xl transition-shadow duration-500 relative">
                      <img src={sector.image || "/images/vision.png"} alt={sector.title} className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PILLARS OF COMMITMENT */}
      <section className="w-full bg-[#f26522] py-20 md:py-32 overflow-hidden relative">
        {/* Shard design in background */}
        <div className="absolute left-[-10%] top-[-10%] w-[40%] h-[50%] bg-white/5 pointer-events-none" style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }} />
        
        <div className="mx-auto max-w-6xl px-4 relative z-10">
          <div className="grid gap-16 md:grid-cols-2 md:items-center">
            <div className="text-white">
              <p className="text-[13px] font-bold tracking-widest uppercase opacity-90">{t("service_pillars_label")}</p>
              <h2 className="mt-6 text-[36px] font-bold leading-tight md:text-[46px] tracking-tight">{t("service_pillars_title")}</h2>
              
              {/* Dynamic Pillar control arrows */}
              <div className="mt-12 flex flex-col items-start gap-4">
                <button 
                  onClick={handlePrevPillar}
                  className="inline-flex h-[54px] w-[54px] items-center justify-center rounded-full border border-white text-white hover:bg-white hover:text-[#f26522] transition-all duration-300"
                  aria-label="Previous Pillar"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
                </button>
                <div className="h-16 w-[1px] bg-white/30 ml-[27px]"></div>
                <button 
                  onClick={handleNextPillar}
                  className="inline-flex h-[54px] w-[54px] items-center justify-center rounded-full border border-white text-white hover:bg-white hover:text-[#f26522] transition-all duration-300"
                  aria-label="Next Pillar"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </button>
              </div>
            </div>
            
            {/* The active card display */}
            <div className="relative group">
              {data.pillars.map((pillar, idx) => (
                <div 
                  key={idx} 
                  className={`relative aspect-[4/5] overflow-hidden rounded-lg bg-[#12273f] shadow-2xl transition-all duration-500 ${idx === activePillarIdx ? "opacity-100 scale-100 block" : "opacity-0 scale-95 hidden"}`}
                >
                  <img src={pillar.image || "/images/vision.png"} className="absolute inset-0 h-full w-full object-cover opacity-30 transition-transform duration-1000 group-hover:scale-105" alt={pillar.title} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12273f] via-transparent to-transparent z-10" />
                  <div className="absolute inset-0 p-10 flex flex-col justify-end z-20">
                    <span className="text-[22px] font-bold text-[#f26522] mb-3 block">{pillar.id}</span>
                    <h3 className="text-[26px] font-bold text-white md:text-[32px] tracking-tight mb-4">{t(pillar.title)}</h3>
                    <p className="text-[16px] text-white/95 leading-relaxed max-w-sm font-medium">{t(pillar.desc)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CAPABILITIES & STRENGTHS */}
      <section className="w-full bg-white py-20 md:py-32 border-t border-slate-100 relative overflow-hidden">
        {/* Shard Decoration */}
        <div className="absolute left-0 top-1/3 w-16 h-32 bg-[#0f2d45]/5 pointer-events-none" style={{ clipPath: "polygon(0 0, 100% 50%, 0 100%)" }} />
        
        <div className="mx-auto max-w-6xl px-4 relative z-10">
          <div className="flex flex-col md:flex-row gap-16">
            <div className="md:w-1/3 flex flex-col justify-between">
              <div>
                <h2 className="text-[32px] font-bold text-[#0f2d45] md:text-[40px] leading-tight tracking-tight">{t(data.capLabel)}</h2>
                <p className="mt-6 text-[15.5px] text-[#555] leading-relaxed font-medium">{t(data.capDesc)}</p>
                <div className="mt-8">
                  <Link to="/contact" className="inline-flex rounded-sm bg-[#f26522] px-8 py-3.5 text-[15px] font-bold text-white hover:bg-orange-600 transition-colors shadow-md shadow-orange-500/20">{t("service_get_quote")}</Link>
                </div>
              </div>
              
              {/* Dynamic Capability slider arrows */}
              {data.capabilities.length > 2 && (
                <div className="mt-12 flex items-center gap-4">
                  <button 
                    onClick={handlePrevCap}
                    className="h-12 w-12 rounded-full border border-[#f26522] text-[#f26522] flex items-center justify-center hover:bg-[#f26522] hover:text-white transition-colors duration-300"
                    aria-label="Previous Capability"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 19l-7-7 7-7" /></svg>
                  </button>
                  <button 
                    onClick={handleNextCap}
                    className="h-12 w-12 rounded-full border border-[#f26522] text-[#f26522] flex items-center justify-center hover:bg-[#f26522] hover:text-white transition-colors duration-300"
                    aria-label="Next Capability"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 5l7 7-7 7" /></svg>
                  </button>
                </div>
              )}
            </div>
            
            {/* Slide subset rendering */}
            <div className="md:w-2/3">
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
                {data.capabilities.slice(capIndex, capIndex + 2).map((cap, idx) => (
                  <div key={idx} className="relative aspect-[3/4] overflow-hidden rounded-lg bg-slate-200 group shadow-lg transition-all duration-500 ease-in-out">
                    <img src={cap.image || "/images/vision.png"} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" alt={cap.title} />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f2d45]/95 via-[#0f2d45]/50 to-transparent p-8 flex flex-col justify-end">
                      <h4 className="text-white font-bold text-xl mb-3 tracking-tight">{t(cap.title)}</h4>
                      <p className="text-white/80 text-[14px] leading-relaxed">{t(cap.desc)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="w-full bg-[#f8f9fa] py-20 md:py-28 relative">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-12">
            <p className="text-[14px] font-bold tracking-widest text-[#f26522] uppercase">{t("service_featured_projects")}</p>
            <h3 className="mt-4 text-[32px] font-bold text-[#18324e] md:text-[40px] tracking-tight">{t("service_view_latest_projects")}</h3>
          </div>
          
          <div className="relative w-full flex flex-col md:flex-row md:items-center shadow-2xl rounded-2xl overflow-hidden bg-[#0f2d45] md:bg-white min-h-[500px]">
            {/* Background project image on left with polygon mask */}
            <div className="relative w-full h-64 md:absolute md:left-0 md:top-0 md:bottom-0 md:w-[50%] overflow-hidden z-10">
              <div className="w-full h-full clip-polygon-service-project overflow-hidden">
                <img src={featuredProjects[projectIndex].image} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" alt="Featured Project" />
              </div>
            </div>
            
            {/* Semi-transparent mobile overlay or right-side solid text block */}
            <div className="hidden md:block absolute inset-0 bg-transparent z-0" />
            
            <div className="relative z-20 w-full flex justify-end">
              <div className="w-full md:w-[55%] text-white md:text-[#18324e] p-8 md:p-16">
                <p className="text-[#f26522] font-bold text-[14px] tracking-widest uppercase mb-3">{featuredProjects[projectIndex].category}</p>
                <h4 className="text-[28px] md:text-[38px] font-bold mb-6 leading-tight tracking-tight text-white md:text-[#0f2d45]">{featuredProjects[projectIndex].title}</h4>
                <p className="text-white/80 md:text-gray-600 text-[15.5px] leading-relaxed mb-10 font-medium">{featuredProjects[projectIndex].desc}</p>
                
                {/* Sliders */}
                <div className="flex gap-4">
                  <button 
                    onClick={handlePrevProject}
                    className="h-12 w-12 rounded-full border border-white md:border-[#f26522] text-white md:text-[#f26522] flex items-center justify-center hover:bg-white/10 md:hover:bg-[#f26522] md:hover:text-white transition-all duration-300"
                    aria-label="Previous Project"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 19l-7-7 7-7" /></svg>
                  </button>
                  <button 
                    onClick={handleNextProject}
                    className="h-12 w-12 rounded-full border border-white md:border-[#f26522] text-white md:text-[#f26522] flex items-center justify-center hover:bg-white/10 md:hover:bg-[#f26522] md:hover:text-white transition-all duration-300"
                    aria-label="Next Project"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 5l7 7-7 7" /></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION ("How can we help?") */}
      <section className="w-full bg-white py-20 md:py-32 relative">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative w-full aspect-[4/3] flex items-center justify-center">
              {/* Decorative Shards */}
              <div className="absolute left-[-5%] top-[35%] w-[40%] h-[30%] bg-[#f26522] z-0" style={{ clipPath: "polygon(0 50%, 100% 0, 100% 100%)" }} />
              <div className="absolute right-[-5%] top-[15%] w-[60%] h-[70%] bg-[#f26522] z-0" style={{ clipPath: "polygon(0 0, 100% 30%, 50% 100%, 20% 80%)" }} />
              <div className="absolute left-[20%] bottom-[0%] w-[30%] h-[30%] bg-[#f26522] z-0" style={{ clipPath: "polygon(50% 0, 100% 100%, 0 100%)" }} />
              
              {/* Skewed main image container */}
              <div className="absolute inset-0 z-10 overflow-hidden shadow-2xl" style={{ clipPath: "polygon(0% 25%, 100% 0%, 85% 100%, 15% 75%)" }}>
                <img src="/images/How can i help.png" className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" alt="Contact Us" />
              </div>
            </div>
            <div className={`${isRTL ? "pr-0 md:pr-8" : "pl-0 md:pl-8"}`}>
              <p className="text-[13px] font-bold tracking-widest text-[#f26522] uppercase">{t("home_contact_label", "CONTACT US")}</p>
              <h3 className="mt-4 text-[26px] font-bold text-[#18324e] md:text-[36px] tracking-tight">{t("home_contact_title", "How can we help?")}</h3>
              <p className="mt-5 text-gray-600 text-[15.5px] leading-relaxed font-medium">{t("home_contact_desc", "Every great project starts with a conversation. Whether you have a fully scoped tender or just an early-stage idea, our team is ready to listen, advise, and find the right solution for you.")}</p>
              <div className="mt-8">
                <Link to="/contact" className="bg-[#f26522] text-white px-8 py-3.5 font-bold rounded-sm hover:bg-orange-600 transition-colors inline-block shadow-md shadow-orange-500/20">{t("home_contact_btn", "Send Message")}</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CENTER OF STRENGTH BANNER (Bottom Quote Banner) */}
      <section className="relative w-full min-h-[450px] flex items-center justify-center overflow-hidden">
        <img src="/images/panel.png" className="absolute inset-0 w-full h-full object-cover" alt="Solar Panels Banner" onError={(e) => { e.target.src = "/images/hero.png" }} />
        <div className="absolute inset-0 bg-[#0f2d45]/70"></div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl py-20">
          <h2 className="text-[34px] md:text-[48px] font-bold mb-6 tracking-wide">"{t("service_strength_banner_title", "The center of strength & excellence.")}"</h2>
          <p className="text-[18px] md:text-[20px] leading-relaxed opacity-95 max-w-3xl mx-auto font-medium">{t("service_strength_banner_desc", "From industrial piping to transmission lines, from civil works to MEP systems Gulf Al Olaya brings strength, skill, and commitment to every project we build.")}</p>
        </div>
      </section>
    </div>
  );
}

