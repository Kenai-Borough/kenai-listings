import { Component, createContext, useContext, useEffect, useMemo, useState, type PropsWithChildren, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CircleMarker, MapContainer, Popup, TileLayer } from 'react-leaflet';
import { Bell, LayoutGrid, List, MapPin, Menu, Moon, ShieldCheck, Sun } from 'lucide-react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import type { Listing, ThemeMode } from './types';
import { cn, currency } from './lib/utils';
import { KenaiNetworkBanner } from './components/KenaiNetworkBanner';

const networkLinks = [
  ['Kenai Borough', 'https://kenaiborough.com'],
  ['Kenai Borough Realty', 'https://kenaiboroughrealty.com'],
  ['Kenai Land Sales', 'https://kenailandsales.com'],
  ['Kenai Peninsula Rentals', 'https://kenaipeninsularentals.com'],
  ['Kenai Home Sales', 'https://kenaihomesales.com'],
  ['Kenai News', 'https://kenainews.com'],
  ['Kenai Auto Sales', 'https://kenaiautosales.com'],
] as const;

export const Button = ({ className, children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button className={cn('inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60', className)} {...props}>{children}</button>
);

export const Card = ({ className, children }: PropsWithChildren<{ className?: string }>) => (
  <div className={cn('rounded-3xl border border-white/10 bg-white/5 p-5 shadow-glow backdrop-blur', className)}>{children}</div>
);

export const Badge = ({ className, children }: PropsWithChildren<{ className?: string }>) => (
  <span className={cn('inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-200', className)}>{children}</span>
);

export const SectionHeading = ({ eyebrow, title, description, action }: { eyebrow: string; title: string; description: string; action?: ReactNode }) => (
  <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
    <div className="space-y-2">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">{eyebrow}</p>
      <h2 className="text-3xl font-semibold text-white sm:text-4xl">{title}</h2>
      <p className="max-w-2xl text-sm text-slate-300 sm:text-base">{description}</p>
    </div>
    {action}
  </div>
);

export const ListingCard = ({ listing, mode = 'grid' }: { listing: Listing; mode?: 'grid' | 'list' }) => (
  <motion.article layout className={cn('overflow-hidden rounded-3xl border border-white/10 bg-slate-900/80', mode === 'list' && 'grid md:grid-cols-[260px,1fr]')}>
    <img src={listing.photos[0]} alt={listing.title} className="h-56 w-full object-cover md:h-full" />
    <div className="flex flex-col gap-4 p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-accent">{listing.category}</p>
          <h3 className="text-2xl font-semibold text-white">{listing.title}</h3>
          <p className="text-sm text-slate-300">{listing.location} · {listing.postedAt}</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-white">{listing.isFree ? 'Free' : listing.isTrade ? 'Trade' : currency(listing.price)}</p>
          <p className="text-xs text-slate-400 capitalize">{listing.subcategory}</p>
        </div>
      </div>
      <p className="text-sm text-slate-300">{listing.description}</p>
      <div className="flex flex-wrap gap-2">
        <Badge>{listing.condition}</Badge>
        <Badge>{listing.distanceMiles} mi away</Badge>
      </div>
      <div className="mt-auto flex items-center justify-between gap-3 text-sm">
        <span className="text-slate-300">{listing.viewCount} local views</span>
        <Link to={`/listing/${listing.id}`} className="font-semibold text-accent">View details</Link>
      </div>
    </div>
  </motion.article>
);

const ToastContext = createContext<{ push: (message: string) => void }>({ push: () => undefined });

export const ToastProvider = ({ children }: PropsWithChildren) => {
  const [toasts, setToasts] = useState<{ id: number; message: string }[]>([]);
  const value = useMemo(() => ({
    push: (message: string) => {
      const id = Date.now();
      setToasts((current) => [...current, { id, message }]);
      window.setTimeout(() => setToasts((current) => current.filter((toast) => toast.id !== id)), 2600);
    },
  }), []);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex w-full max-w-sm flex-col gap-3 px-4">
        <AnimatePresence>
          {toasts.map((toast) => <motion.div key={toast.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }} className="rounded-2xl border border-white/10 bg-slate-900/95 px-4 py-3 text-sm text-white shadow-glow">{toast.message}</motion.div>)}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);

export const ListingMap = ({ listing }: { listing: Listing }) => (
  <Card className="overflow-hidden p-0">
    <div className="border-b border-white/10 px-5 py-4 text-sm text-slate-300"><MapPin className="mr-2 inline h-4 w-4 text-accent" /> Approximate posting location · {listing.location}</div>
    <MapContainer center={[listing.lat, listing.lng]} zoom={9} scrollWheelZoom={false} className="h-72 w-full">
      <TileLayer attribution="&copy; OpenStreetMap contributors" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <CircleMarker center={[listing.lat, listing.lng]} radius={10} pathOptions={{ color: '#16a34a', fillColor: '#16a34a', fillOpacity: 0.9 }}>
        <Popup>{listing.title}</Popup>
      </CircleMarker>
    </MapContainer>
  </Card>
);

export const Layout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState<ThemeMode>(() => (document.documentElement.classList.contains('dark') ? 'dark' : 'light'));

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('kenai-listings-theme', theme);
  }, [theme]);

  return (
    <div className="min-h-screen bg-background bg-aurora text-ink">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/" className="text-white">
            <div className="text-xl font-semibold">Kenai Listings</div>
            <div className="text-xs text-slate-400">Fast local classifieds for the Peninsula</div>
          </Link>
          <nav className="hidden items-center gap-5 text-sm text-slate-300 md:flex">
            {[
              ['Browse', '/browse'],
              ['Post Listing', '/post'],
              ['Dashboard', '/dashboard'],
              ['Safety', '/safety'],
              ['Admin', '/admin'],
            ].map(([label, href]) => <NavLink key={href} to={href} className={({ isActive }) => cn('transition hover:text-white', isActive && 'text-white')}>{label}</NavLink>)}
          </nav>
          <div className="hidden items-center gap-3 md:flex">
            <button onClick={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))} className="rounded-full border border-white/10 p-2 text-slate-200">{theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}</button>
            <Link to="/auth" className="rounded-full border border-white/10 px-4 py-2 text-sm text-white">Sign in</Link>
          </div>
          <button onClick={() => setMobileOpen((current) => !current)} className="rounded-full border border-white/10 p-2 text-white md:hidden"><Menu className="h-5 w-5" /></button>
        </div>
        {mobileOpen && <div className="border-t border-white/10 px-4 py-4 md:hidden"><div className="flex flex-col gap-3 text-sm text-slate-200">{[['Browse', '/browse'], ['Post', '/post'], ['Dashboard', '/dashboard'], ['Safety', '/safety'], ['Auth', '/auth']].map(([label, href]) => <Link key={href} to={href} onClick={() => setMobileOpen(false)}>{label}</Link>)}</div></div>}
      </header>
      <main className="mx-auto flex max-w-7xl flex-col gap-16 px-4 py-8 sm:px-6 lg:px-8"><Outlet /></main>
      <footer className="border-t border-white/10 bg-slate-950/90">
        <KenaiNetworkBanner />
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr,1fr] lg:px-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-white">Local, clean, and built for everyday Kenai needs.</h3>
            <p className="max-w-2xl text-sm text-slate-300">Post for free, scan listings quickly, and keep every exchange grounded in public-meeting and payment-safety best practices.</p>
            <div className="flex flex-wrap gap-2">
              <Badge><ShieldCheck className="mr-1 inline h-3 w-3" /> Public-safety tips</Badge>
              <Badge><Bell className="mr-1 inline h-3 w-3" /> Saved listings & alerts</Badge>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent">Kenai Network</p>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {networkLinks.map(([label, href]) => <a key={href} href={href} className="text-sm text-slate-300 transition hover:text-white">{label}</a>)}
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 px-4 py-4 text-center"><div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-400"><Link to="/terms" className="hover:text-white transition">Terms of Service</Link> | <Link to="/privacy" className="hover:text-white transition">Privacy Policy</Link> | <Link to="/cookies" className="hover:text-white transition">Cookie Policy</Link> | <Link to="/dmca" className="hover:text-white transition">DMCA</Link> | <Link to="/acceptable-use" className="hover:text-white transition">Acceptable Use</Link></div></div>
      </footer>
    </div>
  );
};

export const ViewToggle = ({ mode, setMode }: { mode: 'grid' | 'list'; setMode: (value: 'grid' | 'list') => void }) => (
  <div className="flex rounded-full border border-white/10 bg-slate-900 p-1 text-sm">
    <button onClick={() => setMode('grid')} className={`rounded-full px-4 py-2 ${mode === 'grid' ? 'bg-accent text-white' : 'text-slate-300'}`}><LayoutGrid className="h-4 w-4" /></button>
    <button onClick={() => setMode('list')} className={`rounded-full px-4 py-2 ${mode === 'list' ? 'bg-accent text-white' : 'text-slate-300'}`}><List className="h-4 w-4" /></button>
  </div>
);

export class ErrorBoundary extends Component<PropsWithChildren, { hasError: boolean }> {
  constructor(props: PropsWithChildren) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div className="flex min-h-screen items-center justify-center bg-background px-4 text-center text-white"><Card className="max-w-lg"><h1 className="text-2xl font-semibold">Something broke in listings.</h1><p className="mt-3 text-slate-300">Refresh to reload Kenai Listings.</p></Card></div>;
    }

    return this.props.children;
  }
}
