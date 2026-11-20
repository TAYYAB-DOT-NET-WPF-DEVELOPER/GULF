import { useState } from "react";
import Header from "../components/Header";
import { useSEO } from "../hooks/useSEO";
import { Link } from "react-router-dom";

// ─── Static news articles using NewsUpdates1–6 images ───────────────────────
const ARTICLES = [
  {
    id: 1,
    image: "/images/NewsUpdates1.png",
    category: "Event",
    date: "Jan 14, 2026",
    readTime: "2 mins read",
    title: "Gulf Al Olaya Engineering Services Receives Appreciation Award from SATORP",
    excerpt:
      "Gulf Al Olaya Engineering Services was honored with an appreciation award from SATORP in recognition of outstanding performance, safety compliance, and timely delivery of mechanical and piping works at the Total refinery complex in Jubail Industrial City.",
    featured: true,
  },
  {
    id: 2,
    image: "/images/NewsUpdates2.png",
    category: "New Projects",
    date: "Dec 2, 2025",
    readTime: "4 min read",
    title: "Alliance Contracting Solutions Appoints Gulf Al Olaya as Strategic Oil & Gas Partner",
    excerpt:
      "Alliance Contracting Solutions has officially appointed Gulf Al Olaya as a preferred strategic partner for oil, gas, and industrial mechanical construction projects across the Eastern Province and across the Kingdom of Saudi Arabia.",
    featured: true,
  },
  {
    id: 3,
    image: "/images/NewsUpdates3.png",
    category: "Event",
    date: "Nov 15, 2025",
    readTime: "3 min read",
    title: "Gulf Al Olaya Signs Strategic Partnership for MEP Works Across KSA",
    excerpt:
      "Gulf Al Olaya has entered into a strategic collaboration agreement for the delivery of MEP and civil works across multiple ongoing developments in the Kingdom, reinforcing its commitment to excellence and timely project delivery.",
  },
  {
    id: 4,
    image: "/images/NewsUpdates4.png",
    category: "Event",
    date: "Nov 15, 2025",
    readTime: "3 min read",
    title: "Senior Leadership Meeting Reviews 2025 Project Milestones and Expansion Plans",
    excerpt:
      "Gulf Al Olaya's senior leadership team convened to review major project milestones achieved in 2025 and outline the strategic expansion roadmap for new divisions and project opportunities across the Kingdom.",
  },
  {
    id: 5,
    image: "/images/NewsUpdates5.png",
    category: "Event",
    date: "Nov 11, 2025",
    readTime: "3 min read",
    title: "Gulf Al Olaya Hosts Quarterly Business Review with Key Stakeholders",
    excerpt:
      "The company hosted its quarterly business review meeting with key stakeholders, presenting project status reports, financial performance highlights, and the company's ambitious growth targets for the coming fiscal year.",
  },
  {
    id: 6,
    image: "/images/NewsUpdates6.png",
    category: "Event",
    date: "Nov 11, 2025",
    readTime: "3 min read",
    title: "Gulf Al Olaya Celebrates Contract Award for Major Industrial Facility Project",
    excerpt:
      "Gulf Al Olaya celebrated the official award of a major contract for the design and construction of a large industrial facility in the Eastern Province, adding to its growing portfolio of engineering and construction projects across Saudi Arabia.",
  },
];

const CATEGORIES = ["All", "Event", "New Projects", "Announcement", "Press Release"];

function ArticleMeta({ article }) {
  return (
    <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-[#3f3f3f] lg:text-base">
      <span>{article.date}</span>
      <span className="font-bold text-[#16355d]">· {article.category}</span>
    </p>
  );
}

function ArticleDisclosure({ article }) {
  return (
    <details className="mt-5 lg:mt-9">
      <summary className="flex cursor-pointer list-none flex-wrap items-center gap-5 [&::-webkit-details-marker]:hidden">
        <span className="rounded border border-[#16355d] px-4 py-2 font-medium uppercase text-[#e65e14] hover:bg-white">Read More</span>
        <span className="text-base text-[#777]">{article.readTime}</span>
      </summary>
      <p className="mt-4 leading-7 text-[#3f3f3f]">{article.excerpt}</p>
    </details>
  );
}

export default function News() {
  useSEO("PAGE", "news");
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("All");
  const query = q.trim().toLowerCase();
  const filtered = ARTICLES.filter((article) =>
    (category === "All" || article.category === category) &&
    `${article.title} ${article.excerpt}`.toLowerCase().includes(query)
  );
  const lead = ARTICLES[0];

  return (
    <div className="min-h-screen bg-white">
      <div className="overflow-hidden bg-[#f6f6f6]">
        <Header theme="light" home flat />

        <section className="mx-auto grid max-w-[1440px] gap-8 px-5 pb-12 pt-12 sm:px-8 lg:grid-cols-[minmax(0,1.04fr)_minmax(0,1fr)] lg:items-center xl:gap-12 xl:pb-[109px] xl:pe-[50px] xl:ps-[121px] xl:pt-[74px]">
          <div className="min-w-0">
            <p className="text-base font-bold text-[#16355d]">News &amp; Updates</p>
            <h1 className="mt-6 max-w-[635px] text-[32px] font-bold leading-[1.18] text-black sm:text-[42px] xl:mt-[50px] xl:text-[50px]">
              Find all the latest<br className="hidden xl:block" />
              <span> developments and</span><br className="hidden xl:block" />
              <span> happenings at Gulf Al Olaya</span><br className="hidden xl:block" />
              <span> right here.</span>
            </h1>
          </div>
          <img src="/images/Union.png" alt="Gulf Al Olaya General Contracting" className="h-auto w-full max-w-[600px] lg:justify-self-end xl:mt-[88px]" />
        </section>

        <section aria-label="Featured news" className="mx-auto max-w-[1440px] px-5 pb-20 sm:px-8 xl:pb-[155px] xl:pe-8 xl:ps-[121px]">
          <article className="grid items-center gap-6 lg:grid-cols-2 xl:grid-cols-[minmax(0,600px)_minmax(0,1fr)] xl:gap-[72px]">
            <div className="relative aspect-[3/2]">
              <img src="/images/Frame51.png" alt="" className="absolute top-0 h-auto max-w-none -start-[13.17%] w-[121.17%]" />
            </div>
            <div className="min-w-0">
              <ArticleMeta article={lead} />
              <h2 className="mt-5 text-xl font-medium leading-tight text-black xl:mt-8 xl:text-[24px]">{lead.title}</h2>
              <ArticleDisclosure article={lead} />
            </div>
          </article>

          <div className="mt-10 grid gap-8 lg:grid-cols-2 xl:mt-[62px]">
            {[{ ...ARTICLES[1], image: "/images/Frame53.png" }, { ...ARTICLES[3], image: "/images/Frame56.png" }].map(article => (
              <article key={article.id} className="grid min-w-0 items-center gap-5 sm:grid-cols-2 xl:gap-9">
                <img src={article.image} alt="" className="h-auto w-full" />
                <div>
                  <ArticleMeta article={article} />
                  <h2 className="mt-3 text-lg font-bold leading-snug">{article.title}</h2>
                  <ArticleDisclosure article={article} />
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>

      <section aria-label="Find news" className="relative mx-4 -mt-10 max-w-[1160px] rounded-lg bg-white px-4 py-5 shadow-md sm:mx-8 lg:p-10 xl:mx-auto">
        <div className="flex flex-wrap items-center gap-3 lg:gap-6">
          <input type="search" aria-label="Search news by keywords" placeholder="Search By Keywords" value={q}
            onChange={e => setQ(e.target.value)}
            className="min-h-12 w-full rounded-lg bg-[#f5f5f5] px-5 text-sm outline-offset-2 sm:min-w-[190px] sm:flex-1" />
          <label className="flex items-center gap-2 font-bold text-[#16355d]">
            Category
            <select value={category} onChange={e => setCategory(e.target.value)} className="min-h-10 max-w-[145px] rounded border border-slate-200 bg-white px-2 text-sm font-normal">
              {CATEGORIES.map(value => <option key={value}>{value}</option>)}
            </select>
          </label>
          <button type="button" onClick={() => { setQ(""); setCategory("All"); }} className="min-h-10 px-3 font-bold text-[#16355d] hover:underline">Reset</button>
        </div>
      </section>

      <section aria-label="News results" className="mx-auto max-w-[1232px] px-5 pb-12 pt-9">
        <p aria-live="polite" className="text-[30px] text-black"><span className="font-bold text-[#f17124]">{filtered.length}</span> Results</p>
        {filtered.length ? (
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map(article => (
              <article key={article.id} className="min-w-0 rounded-2xl border border-black/10 p-3">
                <img src={article.image} alt="" className="aspect-[3/2] w-full object-cover" />
                <div className="px-1 pb-4 pt-4">
                  <ArticleMeta article={article} />
                  <h3 className="mt-3 text-lg font-medium leading-snug text-black">{article.title}</h3>
                  <ArticleDisclosure article={article} />
                </div>
              </article>
            ))}
          </div>
        ) : <p className="py-16 text-center text-[#3f3f3f]">No articles found.</p>}
      </section>

      <section className="mx-auto w-[calc(100%-2rem)] max-w-[1340px] bg-[#f6f6f6] px-4 py-10 text-center sm:px-8 xl:w-[calc(100%-100px)] xl:py-14">
        <h2 className="mx-auto max-w-[730px] text-[28px] font-bold leading-tight text-[#16355d] xl:text-[36px]">
          Subscribe to our newsletter to receive all the latest news
        </h2>
        <div className="mx-auto mt-10 flex max-w-[1000px] flex-col gap-4 sm:flex-row sm:items-center xl:mt-[72px]">
          <input type="email" aria-label="Your email address" placeholder="example@email.com" className="h-14 min-w-0 flex-1 rounded-xl border border-[#aaa] bg-transparent px-4 xl:h-[82px]" />
          <button type="button" className="min-h-12 rounded-lg bg-[#f17124] px-6 font-bold uppercase text-white">Subscribe</button>
        </div>
        <label className="mx-auto mt-8 flex max-w-[1000px] items-start gap-3 text-start text-sm text-[#16355d] xl:mt-14">
          <input type="checkbox" className="mt-0.5 size-4 shrink-0" />
          By subscribing, you agree to our terms &amp; conditions and privacy policy. You may unsubscribe anytime.
        </label>
      </section>

      <nav aria-label="Related pages" className="mt-12 flex flex-wrap justify-center gap-x-10 gap-y-4 border-t border-black/10 px-5 py-9">
        {[["Homepage", "/"], ["Project/Portfolio", "/projects"], ["About Us Mainpage", "/about"]].map(([label, path]) => (
          <Link key={path} to={path} className="inline-flex items-center gap-3 font-bold text-black hover:underline">
            <span aria-hidden="true" className="grid size-12 place-items-center rounded-full border border-[#f17124] text-xl text-[#f17124]">↗</span>{label}
          </Link>
        ))}
      </nav>

      <section className="relative isolate grid min-h-[460px] place-items-center overflow-hidden px-6 py-16 text-center text-white xl:min-h-[810px]">
        <img src="/images/panel.png" alt="" className="absolute inset-0 -z-20 size-full object-cover" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[#16355d]/45" />
        <h2 className="text-[32px] font-bold leading-tight xl:text-[48px]">For the world. With the world.™</h2>
      </section>
    </div>
  );
}
