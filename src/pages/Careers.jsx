import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { http, getImageUrl } from "../api/http";
import { useTranslation } from "react-i18next";
import { useSEO } from "../hooks/useSEO";

export default function Careers() {
    const { t, i18n } = useTranslation();
    useSEO("PAGE", "careers");
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedJob, setSelectedJob] = useState(null);
    const [showApply, setShowApply] = useState(false);
    const [heroBanner, setHeroBanner] = useState(null);

    async function loadJobs() {
        try {
            const [{ data: jobsData }, { data: heroData }] = await Promise.all([
                http.get("/api/careers/jobs"),
                http.get("/api/banners/careers-hero").catch(() => ({ data: null }))
            ]);
            setJobs(Array.isArray(jobsData) ? jobsData : []);
            setHeroBanner(heroData);
        } catch (e) {
            console.error("Jobs load error:", e);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadJobs();
    }, [t, i18n.language]);

    return (
        <div className="bg-white">
            {/* HERO */}
            <section className="relative min-h-[550px] md:min-h-[80vh] w-full overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src={heroBanner?.imageUrls?.[0] ? getImageUrl(heroBanner.imageUrls[0]) : "/images/careers-hero.jpg"}
                        alt="Careers Hero"
                        className="h-full w-full object-cover"
                        onError={(e) => { e.target.src = "/images/panel.png" }}
                    />
                </div>
                <div className="absolute inset-0 bg-[#0f2d45]/65" />
                <Header overlay logoType="color" />

                <div className="relative z-10 flex min-h-[550px] items-center md:min-h-[80vh] pt-24 md:pt-32 pb-20">
                    <div className="mx-auto max-w-6xl px-4 w-full">
                        <div className="max-w-4xl">
                        <p className="text-xs font-black tracking-[0.3em] text-orange-400 uppercase">
                            {t(heroBanner?.subHeadline) || t("home_careers_label")}
                        </p>
                        <h1 className="mt-4 text-4xl font-black text-white md:text-7xl uppercase tracking-tighter leading-[0.9] whitespace-pre-line">
                            {t(heroBanner?.headline) || t("home_careers_title")}
                        </h1>
                        <p className="mt-8 max-w-xl text-lg text-white/80 font-medium leading-relaxed whitespace-pre-line">
                            {t(heroBanner?.ctaLink) || t("home_careers_desc")}
                        </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* JOBS SECTION */}
            <section className="py-24 md:py-32">
                <div className="mx-auto max-w-6xl px-4">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                        <div className="max-w-2xl">
                            <h2 className="text-4xl font-black text-[#0f2d45] uppercase tracking-tight">{t("Open Opportunities")}</h2>
                            <p className="mt-4 text-slate-500 font-medium text-lg">
                                {t("careers_intro")}
                            </p>
                        </div>
                        <div className="flex gap-4">
                            {/* Filters can go here */}
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex h-64 items-center justify-center">
                            <div className="h-10 w-10 animate-spin rounded-full border-4 border-orange-500 border-t-transparent" />
                        </div>
                    ) : jobs.length === 0 ? (
                        <div className="rounded-3xl bg-slate-50 p-20 text-center border border-slate-100">
                            <p className="text-xl font-bold text-slate-400 uppercase tracking-widest">{t("careers_no_openings")}</p>
                            <p className="mt-4 text-sm text-slate-500">{t("careers_linked_in_msg")}</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {jobs.map((job) => (
                                <div
                                    key={job.id}
                                    className="group relative rounded-2xl border border-slate-100 bg-white p-8 shadow-sm transition-all hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1"
                                >
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                        <div>
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                <span className="rounded-full bg-orange-50 px-3 py-1 text-[10px] font-black text-orange-600 uppercase tracking-widest">
                                                    {job.department || "General"}
                                                </span>
                                                <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                                    {job.location || "Riyadh"}
                                                </span>
                                            </div>
                                            <h3 className="text-2xl font-black text-[#0f2d45] uppercase tracking-tight group-hover:text-orange-600 transition-colors">
                                                {job.title}
                                            </h3>
                                        </div>
                                        <button
                                            onClick={() => { setSelectedJob(job); setShowApply(true); }}
                                            className="inline-flex h-12 items-center justify-center rounded-lg bg-[#0f2d45] px-8 text-xs font-black text-white uppercase tracking-widest hover:bg-orange-500 transition-all shadow-md active:scale-95"
                                        >
                                            {t("Apply Now")}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* FOOTER STRIP */}
            <section className="bg-[#0f2d45] py-20">
                <div className="mx-auto max-w-4xl px-4 text-center">
                    <h2 className="text-3xl font-black text-white uppercase tracking-tight">{t("Don't see a fit?")}</h2>
                    <p className="mt-4 text-white/70 font-medium">{t("careers_footer_desc")}</p>
                    <button
                        onClick={() => { setSelectedJob(null); setShowApply(true); }}
                        className="mt-10 inline-flex h-14 items-center justify-center rounded-lg border-2 border-white px-10 text-sm font-black text-white uppercase tracking-widest hover:bg-white hover:text-[#0f2d45] transition-all"
                    >
                        {t("General Application")}
                    </button>
                </div>
            </section>

            {/* APPLICATION MODAL */}
            {showApply && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="w-full max-w-2xl rounded-3xl bg-white p-8 md:p-12 shadow-2xl animate-in fade-in zoom-in duration-300">
                        <div className="flex justify-between items-start mb-10">
                            <div>
                                <h2 className="text-3xl font-black text-[#0f2d45] uppercase tracking-tight">
                                    {selectedJob ? t("apply_for_job", { title: t(selectedJob.title) }) : t("General Application")}
                                </h2>
                                <p className="mt-2 text-sm text-slate-500 font-medium">{t("please_fill_details")}</p>
                            </div>
                            <button
                                onClick={() => setShowApply(false)}
                                className="text-slate-400 hover:text-slate-600 transition-colors text-2xl"
                            >
                                ✕
                            </button>
                        </div>

                        <ApplyForm jobId={selectedJob?.id} onSuccess={() => setShowApply(false)} />
                    </div>
                </div>
            )}
        </div>
    );
}

function ApplyForm({ jobId, onSuccess }) {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        cv: null,
    });

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);

        const body = new FormData();
        body.append("name", formData.name);
        body.append("email", formData.email);
        body.append("phone", formData.phone);
        if (jobId) body.append("jobId", jobId);
        if (formData.cv) body.append("cv", formData.cv);

        try {
            await http.post("/api/careers/apply", body, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            setDone(true);
            setTimeout(onSuccess, 3000);
        } catch (err) {
            console.error("Apply error:", err);
            alert("Failed to submit application. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    if (done) {
        return (
            <div className="py-10 text-center">
                <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-orange-500 text-white text-4xl mb-6">
                    ✓
                </div>
                <h3 className="text-2xl font-black text-[#0f2d45] uppercase tracking-tight">{t("application_sent")}</h3>
                <p className="mt-4 text-slate-600 font-medium">{t("application_success_msg")}</p>
            </div>
        );
    }

    return (
         <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
                <div>
                    <label className="text-[10px] font-black text-[#0f2d45] uppercase tracking-widest mb-2 block">{t("full_name")}</label>
                    <input
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full h-12 rounded-lg border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-orange-500 transition-colors"
                    />
                </div>
                <div>
                    <label className="text-[10px] font-black text-[#0f2d45] uppercase tracking-widest mb-2 block">{t("email_address")}</label>
                    <input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full h-12 rounded-lg border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-orange-500 transition-colors"
                    />
                </div>
            </div>
            <div>
                 <label className="text-[10px] font-black text-[#0f2d45] uppercase tracking-widest mb-2 block">{t("phone_number")}</label>
                <input
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full h-12 rounded-lg border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-orange-500 transition-colors"
                />
            </div>
            <div>
                 <label className="text-[10px] font-black text-[#0f2d45] uppercase tracking-widest mb-2 block">{t("upload_cv")}</label>
                <input
                    required
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => setFormData({ ...formData, cv: e.target.files[0] })}
                    className="w-full h-12 rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 py-2 text-xs text-slate-500 outline-none focus:border-orange-500 transition-colors"
                />
            </div>
             <button
                 disabled={loading}
                 className="w-full h-14 items-center justify-center rounded-lg bg-[#0f2d45] text-sm font-black text-white uppercase tracking-widest hover:bg-orange-500 transition-all active:scale-95 disabled:opacity-50 shadow-lg shadow-[#0f2d45]/20"
             >
                 {loading ? t("submitting") : t("submit_application")}
             </button>
        </form>
    );
}
