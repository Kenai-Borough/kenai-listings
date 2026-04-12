import type { Category, Listing } from '../types';

const photos = {
  gear: [
    'https://images.unsplash.com/photo-1516569422861-358f3b4f6d68?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1511884642898-4c92249e20b6?auto=format&fit=crop&w=1200&q=80',
  ],
  home: [
    'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80',
  ],
  work: [
    'https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80',
  ],
  service: [
    'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=1200&q=80',
  ],
};

export const categories: Category[] = [
  { id: 'for-sale', name: 'For Sale', slug: 'for-sale', description: 'Gear, tools, electronics, firewood, and outdoor essentials.' },
  { id: 'jobs', name: 'Jobs', slug: 'jobs', description: 'Full-time, part-time, seasonal, fishing, and tourism openings.' },
  { id: 'services', name: 'Services', slug: 'services', description: 'Contractors, childcare, cleaning, mechanical, and more.' },
  { id: 'housing', name: 'Housing', slug: 'housing', description: 'Rooms, roommates, and local housing leads.' },
  { id: 'free', name: 'Free Stuff', slug: 'free', description: 'Useful free items waiting for pickup.' },
  { id: 'wanted', name: 'Wanted', slug: 'wanted', description: 'Post what you need and let the Borough help.' },
  { id: 'community', name: 'Community', slug: 'community', description: 'Events, lost & found, and volunteer opportunities.' },
  { id: 'barter', name: 'Barter / Trade', slug: 'barter', description: 'Trade gear, tools, and skills locally.' },
];

type Seed = [string, string, string, string, number, string, string, string, number, number, string[], boolean, boolean, number, number];

const seller = { name: 'Kenai Neighbor', phone: '(907) 555-0177', role: 'user' as const };

const seeds: Seed[] = [
  ['salmon-rods', 'For Sale', 'sporting goods', 'Lamiglas salmon rod bundle', 320, 'excellent', 'Soldotna', 'Fresh lineup of river-ready rods with reels, rigged for the Kenai.', 60.4864, -151.0583, photos.gear, false, false, 2, 4],
  ['snowmachine-cover', 'For Sale', 'outdoor gear', 'Heavy-duty snow machine cover', 65, 'good', 'Kenai', 'Fits most trail sleds, waterproof, used two winters.', 60.5544, -151.2583, photos.gear, false, false, 5, 8],
  ['chainsaw-pro', 'For Sale', 'tools', 'Stihl farm chainsaw + extra chain', 540, 'excellent', 'Nikiski', 'Firewood-ready saw with carrying case and sharpened spare chain.', 60.6906, -151.2888, photos.gear, false, false, 1, 11],
  ['firewood-stack', 'For Sale', 'firewood', 'Seasoned birch firewood stack', 240, 'good', 'Soldotna', 'Split and stacked birch, about half cord, can help load.', 60.4864, -151.0583, photos.gear, false, false, 3, 6],
  ['ice-auger', 'For Sale', 'sporting goods', 'Eskimo ice auger', 180, 'good', 'Sterling', 'Reliable auger with fresh blades for winter lake trips.', 60.537, -150.7646, photos.gear, false, false, 6, 9],
  ['cabin-dresser', 'For Sale', 'furniture', 'Solid pine cabin dresser', 150, 'good', 'Homer', 'Rustic six-drawer dresser perfect for a dry cabin or bunkhouse.', 59.6425, -151.5483, photos.home, false, false, 4, 14],
  ['generator', 'For Sale', 'building materials', 'Portable backup generator 6500W', 700, 'excellent', 'Kenai', 'Starts easy, includes wheel kit and heavy extension cord.', 60.5544, -151.2583, photos.gear, false, false, 2, 15],
  ['halibut-cooler', 'For Sale', 'outdoor gear', 'Oversized fish cooler', 95, 'good', 'Ninilchik', 'Big enough for halibut runs, seals tight, cleaned after every trip.', 60.0519, -151.6687, photos.gear, false, false, 7, 13],
  ['tour-desk', 'Jobs', 'tourism', 'Front desk lead for summer lodge', 24, 'n/a', 'Cooper Landing', 'Seasonal tourism role managing bookings, guests, and local trip planning.', 60.485, -149.8294, photos.work, false, false, 1, 18],
  ['deckhand-job', 'Jobs', 'fishing', 'Deckhand for July salmon opener', 0, 'n/a', 'Homer', 'Seeking dependable deckhand with early starts and strong teamwork.', 59.6425, -151.5483, photos.work, false, false, 2, 21],
  ['bookkeeper-job', 'Jobs', 'part-time', 'Part-time bookkeeper for marine shop', 28, 'n/a', 'Kenai', 'Flexible hours, QuickBooks experience preferred.', 60.5544, -151.2583, photos.work, false, false, 4, 12],
  ['cook-job', 'Jobs', 'seasonal', 'Camp cook for peak fishing season', 0, 'n/a', 'Soldotna', 'Seasonal position with staff housing and river access.', 60.4864, -151.0583, photos.work, false, false, 3, 10],
  ['diesel-tech', 'Jobs', 'full-time', 'Full-time diesel technician', 38, 'n/a', 'Nikiski', 'Year-round shop role servicing pickups, trailers, and equipment.', 60.6906, -151.2888, photos.work, false, false, 1, 7],
  ['cleaning-service', 'Services', 'cleaning', 'Vacation rental turnover cleaning', 120, 'n/a', 'Homer', 'Reliable cabin and Airbnb cleaning with same-day availability.', 59.6425, -151.5483, photos.service, false, false, 2, 5],
  ['mechanic-mobile', 'Services', 'mechanical', 'Mobile small-engine repair', 90, 'n/a', 'Soldotna', 'Snowblower, ATV, and generator tune-ups at your driveway.', 60.4864, -151.0583, photos.service, false, false, 1, 4],
  ['landscaping-yard', 'Services', 'landscaping', 'Spring cleanup and gravel refresh', 200, 'n/a', 'Kenai', 'Yard cleanup, brush haul-off, gravel spreading, and drainage touchups.', 60.5544, -151.2583, photos.service, false, false, 5, 6],
  ['contractor-deck', 'Services', 'contractors', 'Deck repair and cabin skirting', 0, 'n/a', 'Sterling', 'Licensed local builder focused on weatherproof exterior work.', 60.537, -150.7646, photos.service, false, false, 3, 9],
  ['childcare-weekend', 'Services', 'childcare', 'Weekend childcare openings', 18, 'n/a', 'Soldotna', 'CPR-certified care for date nights and weekend shifts.', 60.4864, -151.0583, photos.service, false, false, 2, 11],
  ['room-river', 'Housing', 'rooms', 'Furnished room near the river', 850, 'good', 'Soldotna', 'Utilities included, washer/dryer, quiet house close to town.', 60.4864, -151.0583, photos.home, false, false, 2, 17],
  ['roommate-cabin', 'Housing', 'roommates', 'Roommate wanted for dry cabin share', 600, 'fair', 'Kenai', 'Looking for quiet roommate comfortable with wood heat and shared chores.', 60.5544, -151.2583, photos.home, false, false, 4, 16],
  ['free-pallets', 'Free Stuff', 'building materials', 'Free lumber pallets', 0, 'fair', 'Nikiski', 'Pickup this week only, great for projects or fire starter wood.', 60.6906, -151.2888, photos.gear, true, false, 1, 3],
  ['free-sofa', 'Free Stuff', 'furniture', 'Free cabin couch', 0, 'fair', 'Homer', 'Older sofa with lots of life left, must haul yourself.', 59.6425, -151.5483, photos.home, true, false, 6, 2],
  ['wanted-skiff', 'Wanted', 'outdoor gear', 'Wanted: 16-18 ft fishing skiff', 0, 'n/a', 'Kenai', 'Searching for an affordable skiff package ready for inlet days.', 60.5544, -151.2583, photos.gear, false, false, 5, 20],
  ['wanted-room', 'Wanted', 'housing', 'Seeking winter room rental', 900, 'n/a', 'Soldotna', 'Professional local looking for month-to-month furnished room.', 60.4864, -151.0583, photos.home, false, false, 3, 14],
  ['lost-lab', 'Community', 'lost & found', 'Lost yellow lab near Beaver Loop', 0, 'n/a', 'Kenai', 'Friendly older lab missing since yesterday afternoon.', 60.5544, -151.2583, photos.home, true, false, 1, 1],
  ['volunteer-pantry', 'Community', 'volunteer', 'Food pantry volunteer shift signups', 0, 'n/a', 'Soldotna', 'Looking for weekday volunteers to sort donations and help families.', 60.4864, -151.0583, photos.work, true, false, 2, 8],
  ['community-market', 'Community', 'events', 'Weekend makers market vendor spots', 25, 'n/a', 'Homer', 'Reserve a booth at the harbor community market this Saturday.', 59.6425, -151.5483, photos.work, false, false, 3, 7],
  ['barter-generator', 'Barter/Trade', 'tools', 'Trade: inverter generator for fish finder', 0, 'good', 'Kenai', 'Open to fair-value trades for marine electronics or cash combo.', 60.5544, -151.2583, photos.gear, false, true, 4, 19],
  ['trade-kayaks', 'Barter/Trade', 'outdoor gear', 'Two kayaks for utility trailer', 0, 'good', 'Soldotna', 'Pair of stable river kayaks, hoping to trade for small trailer.', 60.4864, -151.0583, photos.gear, false, true, 5, 12],
  ['laptop-sale', 'For Sale', 'electronics', 'Lightly used work laptop', 480, 'excellent', 'Kenai', 'Great battery, fast SSD, includes charger and protective case.', 60.5544, -151.2583, photos.work, false, false, 2, 13],
  ['contractor-tools', 'For Sale', 'tools', 'Framing nailer + compressor set', 340, 'good', 'Soldotna', 'Ready for a remodel or cabin build, hoses included.', 60.4864, -151.0583, photos.gear, false, false, 4, 9],
  ['tour-guide-job', 'Jobs', 'tourism', 'Wildlife shuttle driver', 26, 'n/a', 'Homer', 'Seasonal tourism driving role with tips and flexible shifts.', 59.6425, -151.5483, photos.work, false, false, 3, 8],
];

export const listings: Listing[] = seeds.map((seed, index) => {
  const [id, category, subcategory, title, price, condition, city, description, lat, lng, photoSet, isFree, isTrade, daysOld, distanceMiles] = seed;
  return {
    id,
    category,
    subcategory,
    title,
    description,
    price,
    condition,
    location: `${city}, Kenai Peninsula Borough, AK`,
    city,
    lat,
    lng,
    photos: photoSet,
    isFree,
    isTrade,
    status: index % 9 === 0 ? 'sold' : 'active',
    viewCount: 55 + index * 13,
    postedAt: `${daysOld} day${daysOld === 1 ? '' : 's'} ago`,
    daysOld,
    distanceMiles,
    seller,
  };
});

export const trendingCategories = ['For Sale', 'Jobs', 'Services', 'Housing', 'Community'];
export const categoryOptions = Array.from(new Set(listings.map((listing) => listing.category)));
export const locationOptions = Array.from(new Set(listings.map((listing) => listing.city)));
export const conditionOptions = ['excellent', 'good', 'fair', 'n/a'];
