import { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Briefcase, ShieldAlert, Sparkles } from 'lucide-react';
import { Badge, Button, Card, ListingCard, ListingMap, SectionHeading, ViewToggle, useToast } from './components';
import { categories, categoryOptions, conditionOptions, listings, locationOptions, trendingCategories } from './data/listings';
import { currency } from './lib/utils';

export const HomePage = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  return (
    <>
      <Helmet><title>Kenai Listings | Kenai Peninsula Classifieds</title></Helmet>
      <section className="grid gap-8 rounded-[2rem] border border-white/10 bg-rugged p-8 shadow-glow lg:grid-cols-[1.1fr,0.9fr]">
        <div className="space-y-5">
          <Badge className="bg-accent/15 text-emerald-100">Fast local classifieds</Badge>
          <h1 className="max-w-3xl text-4xl font-semibold text-white sm:text-5xl">Post it free. Find it fast. Keep it local.</h1>
          <p className="max-w-2xl text-base text-slate-200">Kenai Listings covers gear, seasonal jobs, contractor services, housing, free stuff, community boards, and barter posts tuned for the Borough.</p>
          <form className="flex flex-col gap-3 sm:flex-row" onSubmit={(event) => { event.preventDefault(); navigate(`/browse?q=${encodeURIComponent(query)}`); }}>
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search listings, jobs, services..." className="flex-1 rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white" />
            <Button type="submit">Search</Button>
          </form>
        </div>
        <Card className="grid gap-4 bg-slate-950/70">
          <div className="grid gap-3 sm:grid-cols-2">
            {categories.map((category) => <button key={category.id} onClick={() => navigate(`/browse?category=${encodeURIComponent(category.name)}`)} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-left text-slate-200"><div className="font-semibold text-white">{category.name}</div><div className="mt-2 text-sm text-slate-400">{category.description}</div></button>)}
          </div>
        </Card>
      </section>

      <section className="space-y-6">
        <SectionHeading eyebrow="Trending categories" title="What locals are opening most right now" description="High-interest categories across jobs, community, and gear." />
        <div className="flex flex-wrap gap-3">{trendingCategories.map((category) => <Badge key={category} className="bg-accent/10 text-emerald-100">{category}</Badge>)}</div>
      </section>

      <section className="space-y-6">
        <SectionHeading eyebrow="Recent listings" title="Fresh posts from around the Kenai Peninsula" description="Clean previews, quick filters, and clear pricing keep browsing fast on mobile and desktop." action={<Link to="/browse" className="text-sm font-semibold text-accent">Browse all</Link>} />
        <div className="grid gap-5 lg:grid-cols-2">{listings.slice(0, 6).map((listing) => <ListingCard key={listing.id} listing={listing} />)}</div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {[
          ['Post for free', 'Simple three-step posting for categories, details, and contact preferences.'],
          ['Stay safe', 'Built-in safety page with scam awareness, payment tips, and public meetup reminders.'],
          ['Move fast', 'Optimized layout, dark mode support, and responsive browsing for quick local deals.'],
        ].map(([title, description]) => <Card key={title}><Sparkles className="h-8 w-8 text-accent" /><h3 className="mt-4 text-xl font-semibold text-white">{title}</h3><p className="mt-3 text-sm text-slate-300">{description}</p></Card>)}
      </section>
    </>
  );
};

export const BrowsePage = () => {
  const [params] = useSearchParams();
  const [mode, setMode] = useState<'grid' | 'list'>('grid');
  const [sort, setSort] = useState('newest');
  const [filters, setFilters] = useState({
    q: params.get('q') ?? '',
    category: params.get('category') ?? '',
    location: '',
    condition: '',
    price: 1500,
    date: 30,
  });

  const results = useMemo(() => listings.filter((listing) =>
    (!filters.q || `${listing.title} ${listing.description}`.toLowerCase().includes(filters.q.toLowerCase())) &&
    (!filters.category || listing.category === filters.category) &&
    (!filters.location || listing.city === filters.location) &&
    (!filters.condition || listing.condition === filters.condition) &&
    (listing.price <= filters.price || listing.isFree || listing.isTrade) &&
    listing.daysOld <= filters.date,
  ).sort((a, b) => sort === 'price' ? a.price - b.price : sort === 'distance' ? a.distanceMiles - b.distanceMiles : a.daysOld - b.daysOld), [filters, sort]);

  return (
    <>
      <Helmet><title>Browse Listings | Kenai Listings</title></Helmet>
      <SectionHeading eyebrow="Browse listings" title="Search by category, price, location, date, and condition" description="Flip between grid and list view while sorting by newest, price, or distance." />
      <section className="grid gap-6 lg:grid-cols-[300px,1fr]">
        <Card className="space-y-4 self-start lg:sticky lg:top-24">
          <input value={filters.q} onChange={(event) => setFilters((current) => ({ ...current, q: event.target.value }))} placeholder="Search terms" className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white" />
          <select value={filters.category} onChange={(event) => setFilters((current) => ({ ...current, category: event.target.value }))} className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white"><option value="">All categories</option>{categoryOptions.map((item) => <option key={item}>{item}</option>)}</select>
          <select value={filters.location} onChange={(event) => setFilters((current) => ({ ...current, location: event.target.value }))} className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white"><option value="">All locations</option>{locationOptions.map((item) => <option key={item}>{item}</option>)}</select>
          <select value={filters.condition} onChange={(event) => setFilters((current) => ({ ...current, condition: event.target.value }))} className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white"><option value="">Any condition</option>{conditionOptions.map((item) => <option key={item}>{item}</option>)}</select>
          <label className="text-sm text-slate-300">Max price: {currency(filters.price)}<input type="range" min="0" max="1500" step="25" value={filters.price} onChange={(event) => setFilters((current) => ({ ...current, price: Number(event.target.value) }))} className="mt-2 w-full accent-accent" /></label>
          <label className="text-sm text-slate-300">Posted within {filters.date} days<input type="range" min="1" max="30" value={filters.date} onChange={(event) => setFilters((current) => ({ ...current, date: Number(event.target.value) }))} className="mt-2 w-full accent-accent" /></label>
        </Card>
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-slate-300">{results.length} results</p>
            <div className="flex flex-wrap gap-3">
              <select value={sort} onChange={(event) => setSort(event.target.value)} className="rounded-full border border-white/10 bg-slate-900 px-4 py-2 text-sm text-white"><option value="newest">Newest</option><option value="price">Price</option><option value="distance">Distance</option></select>
              <ViewToggle mode={mode} setMode={setMode} />
            </div>
          </div>
          <motion.div layout className="grid gap-5">{results.map((listing) => <ListingCard key={listing.id} listing={listing} mode={mode} />)}</motion.div>
        </div>
      </section>
    </>
  );
};

export const DetailPage = () => {
  const { id } = useParams();
  const listing = listings.find((item) => item.id === id) ?? listings[0];
  const similar = listings.filter((item) => item.id !== listing.id && item.category === listing.category).slice(0, 3);
  const { push } = useToast();

  return (
    <>
      <Helmet><title>{listing.title} | Kenai Listings</title></Helmet>
      <section className="grid gap-8 lg:grid-cols-[1.2fr,0.8fr]">
        <div className="space-y-6">
          <img src={listing.photos[0]} alt={listing.title} className="h-[28rem] w-full rounded-[2rem] object-cover" />
          <Card className="space-y-4">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-sm text-accent">{listing.category} · {listing.subcategory}</p>
                <h1 className="text-4xl font-semibold text-white">{listing.title}</h1>
                <p className="mt-2 text-slate-300">{listing.location} · {listing.postedAt}</p>
              </div>
              <div className="text-right text-white">
                <p className="text-4xl font-bold">{listing.isFree ? 'Free' : listing.isTrade ? 'Trade' : currency(listing.price)}</p>
                <Badge className="mt-2">{listing.condition}</Badge>
              </div>
            </div>
            <p className="text-sm leading-7 text-slate-300">{listing.description}</p>
            <div className="flex flex-wrap gap-2">
              <Badge>{listing.distanceMiles} mi away</Badge>
              <Badge>{listing.viewCount} local views</Badge>
            </div>
          </Card>
          <ListingMap listing={listing} />
        </div>
        <div className="space-y-6">
          <Card className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Seller card</h3>
            <p className="text-sm text-slate-300">{listing.seller.name} · {listing.seller.phone}</p>
            <form className="space-y-3" onSubmit={(event) => { event.preventDefault(); push(`Message sent for ${listing.title}.`); }}>
              <input className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white" placeholder="Your name" />
              <input className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white" placeholder="Email or phone" />
              <textarea className="min-h-28 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white" defaultValue={`Hi, is "${listing.title}" still available?`} />
              <Button type="submit" className="w-full justify-center">Contact seller</Button>
            </form>
          </Card>
          <Card className="space-y-3">
            <h3 className="text-xl font-semibold text-white">Flag / report</h3>
            <p className="text-sm text-slate-300">Use the admin tools to report scams, prohibited items, or misleading content.</p>
            <Button className="w-full justify-center bg-white/10" onClick={() => push('Report queued for moderation.')}>Report listing</Button>
          </Card>
          <Card className="space-y-4"><h3 className="text-xl font-semibold text-white">Similar listings</h3>{similar.map((item) => <ListingCard key={item.id} listing={item} />)}</Card>
        </div>
      </section>
    </>
  );
};

export const PostPage = () => {
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState({ category: 'For Sale', title: '', description: '', price: '125', contact: 'Text preferred' });
  const steps = ['Category', 'Details', 'Publish'];

  return (
    <>
      <Helmet><title>Post Listing | Kenai Listings</title></Helmet>
      <SectionHeading eyebrow="Post listing" title="Create a free listing in three quick steps" description="Choose a category, add your details and photos, then set contact preferences and publish." />
      <section className="grid gap-6 lg:grid-cols-[260px,1fr]">
        <Card className="space-y-4">{steps.map((label, index) => <div key={label} className={`rounded-2xl border px-4 py-3 ${index === step ? 'border-accent bg-accent/10 text-white' : 'border-white/10 text-slate-300'}`}>{label}</div>)}</Card>
        <Card className="space-y-5">
          {step === 0 && <select value={draft.category} onChange={(event) => setDraft((current) => ({ ...current, category: event.target.value }))} className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white">{categoryOptions.map((item) => <option key={item}>{item}</option>)}</select>}
          {step === 1 && <div className="grid gap-4"><input value={draft.title} onChange={(event) => setDraft((current) => ({ ...current, title: event.target.value }))} placeholder="Title" className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white" /><textarea value={draft.description} onChange={(event) => setDraft((current) => ({ ...current, description: event.target.value }))} placeholder="Description" className="min-h-32 rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white" /><input value={draft.price} onChange={(event) => setDraft((current) => ({ ...current, price: event.target.value }))} placeholder="Price" className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white" /></div>}
          {step === 2 && <div className="grid gap-4"><input value={draft.contact} onChange={(event) => setDraft((current) => ({ ...current, contact: event.target.value }))} placeholder="Contact preferences" className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white" /><Card className="bg-accent/10 text-emerald-100">Ready to publish your {draft.category.toLowerCase()} listing.</Card></div>}
          <div className="flex justify-between">
            <Button className="bg-white/10" disabled={step === 0} onClick={() => setStep((current) => Math.max(current - 1, 0))}>Back</Button>
            <Button onClick={() => setStep((current) => Math.min(current + 1, steps.length - 1))}>{step === steps.length - 1 ? 'Publish' : 'Continue'}</Button>
          </div>
        </Card>
      </section>
    </>
  );
};

export const DashboardPage = () => (
  <>
    <Helmet><title>Dashboard | Kenai Listings</title></Helmet>
    <SectionHeading eyebrow="Dashboard" title="Track listings, saved posts, messages, and analytics" description="Clean dashboards for everyday users and moderators." />
    <section className="grid gap-6 xl:grid-cols-4">
      {[
        ['Active listings', '12', 'My posts live now'],
        ['Saved listings', '27', 'Shortlist'],
        ['Messages', '9', 'Unread'],
        ['Monthly views', '2.6k', 'Trailing 30 days'],
      ].map(([label, value, detail]) => <Card key={label}><p className="text-sm text-slate-400">{label}</p><p className="mt-2 text-3xl font-semibold text-white">{value}</p><p className="mt-2 text-sm text-slate-300">{detail}</p></Card>)}
    </section>
    <section className="grid gap-6 lg:grid-cols-2">
      <Card><ResponsiveContainer width="100%" height={260}><AreaChart data={[{ day: 'Mon', views: 180 }, { day: 'Tue', views: 210 }, { day: 'Wed', views: 260 }, { day: 'Thu', views: 240 }, { day: 'Fri', views: 310 }, { day: 'Sat', views: 330 }, { day: 'Sun', views: 290 }]}><defs><linearGradient id="listingsViews" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#16a34a" stopOpacity={0.55} /><stop offset="95%" stopColor="#16a34a" stopOpacity={0} /></linearGradient></defs><CartesianGrid stroke="#1e293b" /><XAxis dataKey="day" stroke="#94a3b8" /><YAxis stroke="#94a3b8" /><Tooltip /><Area type="monotone" dataKey="views" stroke="#16a34a" fill="url(#listingsViews)" /></AreaChart></ResponsiveContainer></Card>
      <Card><ResponsiveContainer width="100%" height={260}><BarChart data={[{ type: 'For Sale', count: 8 }, { type: 'Jobs', count: 4 }, { type: 'Services', count: 6 }, { type: 'Housing', count: 2 }]}><CartesianGrid stroke="#1e293b" /><XAxis dataKey="type" stroke="#94a3b8" /><YAxis stroke="#94a3b8" /><Tooltip /><Bar dataKey="count" fill="#16a34a" radius={[10, 10, 0, 0]} /></BarChart></ResponsiveContainer></Card>
    </section>
  </>
);

export const AuthPage = () => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const { push } = useToast();

  return (
    <>
      <Helmet><title>Sign In | Kenai Listings</title></Helmet>
      <section className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[0.9fr,1.1fr]">
        <Card className="bg-accent/10"><h1 className="text-3xl font-semibold text-white">Access your listings, saved posts, and moderation tools.</h1><p className="mt-4 text-sm text-emerald-100">Supabase auth is wired for user and admin roles.</p></Card>
        <Card>
          <div className="mb-6 flex rounded-full border border-white/10 bg-slate-900 p-1 text-sm"><button onClick={() => setMode('signin')} className={`rounded-full px-4 py-2 ${mode === 'signin' ? 'bg-accent text-white' : 'text-slate-300'}`}>Sign in</button><button onClick={() => setMode('signup')} className={`rounded-full px-4 py-2 ${mode === 'signup' ? 'bg-accent text-white' : 'text-slate-300'}`}>Create account</button></div>
          <form className="space-y-4" onSubmit={(event) => { event.preventDefault(); push(`${mode === 'signin' ? 'Sign in' : 'Sign up'} flow ready for Supabase.`); }}>
            <input className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white" placeholder="Email" />
            <input className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white" placeholder="Password" type="password" />
            <Button type="submit" className="w-full justify-center">{mode === 'signin' ? 'Sign in' : 'Create account'}</Button>
          </form>
        </Card>
      </section>
    </>
  );
};

export const AdminPage = () => (
  <>
    <Helmet><title>Admin | Kenai Listings</title></Helmet>
    <SectionHeading eyebrow="Admin" title="Moderate listings, reports, categories, and users" description="Flag suspicious posts quickly and keep the directory clean." />
    <section className="grid gap-6 lg:grid-cols-3">
      <Card><ShieldAlert className="h-8 w-8 text-accent" /><h3 className="mt-4 text-xl font-semibold text-white">Flagged content</h3><ul className="mt-4 space-y-2 text-sm text-slate-300"><li>Fish finder trade listing · missing photos</li><li>Roommate post · suspected duplicate</li><li>Generator ad · keyword review</li></ul></Card>
      <Card><Briefcase className="h-8 w-8 text-accent" /><h3 className="mt-4 text-xl font-semibold text-white">Categories</h3><ul className="mt-4 space-y-2 text-sm text-slate-300"><li>8 core categories live</li><li>31 subcategories configured</li><li>Auto-expire after 30 days</li></ul></Card>
      <Card><Sparkles className="h-8 w-8 text-accent" /><h3 className="mt-4 text-xl font-semibold text-white">Users</h3><ul className="mt-4 space-y-2 text-sm text-slate-300"><li>Members: 980</li><li>Admins: 3</li><li>Reports pending: 5</li></ul></Card>
    </section>
  </>
);

export const SafetyPage = () => (
  <>
    <Helmet><title>Safety | Kenai Listings</title></Helmet>
    <SectionHeading eyebrow="Safety" title="Meet smart, pay smart, and stay aware of scams" description="A lightweight guide for every listing category." />
    <section className="grid gap-6 lg:grid-cols-3">
      {[
        ['Meet in public', 'Choose police parking lots, busy stores, or daylight public places for exchanges.'],
        ['Use safe payments', 'Prefer cash in person or trusted payment platforms only after inspecting the item.'],
        ['Trust your instincts', 'Pause if a buyer or seller pressures you, changes stories, or avoids details.'],
      ].map(([title, body]) => <Card key={title}><h3 className="text-xl font-semibold text-white">{title}</h3><p className="mt-3 text-sm text-slate-300">{body}</p></Card>)}
    </section>
  </>
);

export const NotFoundPage = () => <section className="mx-auto max-w-xl text-center"><Helmet><title>Not Found | Kenai Listings</title></Helmet><Card><h1 className="text-3xl font-semibold text-white">That listing trail went cold.</h1><p className="mt-4 text-sm text-slate-300">Head back home or browse the latest local posts.</p><Link to="/"><Button className="mt-6">Return home</Button></Link></Card></section>;
