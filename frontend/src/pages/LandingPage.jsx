import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';

const STEPS = [
  {
    title: 'Post or browse an offer',
    body: 'Shop owners, wholesalers, and manufacturers list what they are buying or selling. Consumers browse offers near them.'
  },
  {
    title: 'Compare prices across districts',
    body: 'See how the same product is priced in Kigali, Musanze, Huye, and every other district, side by side.'
  },
  {
    title: 'Connect and transact',
    body: 'Reach out directly using the contact details on an offer, and get notified when a matching offer appears.'
  }
];

const TESTIMONIALS = [
  {
    quote:
      'I used to drive to three different markets just to check sugar prices. Now I check e-Giciro before I leave home.',
    name: 'Consumer, Kigali'
  },
  {
    quote: 'Posting our wholesale rice prices here brought us buyers from districts we never used to reach.',
    name: 'Wholesaler, Huye'
  },
  {
    quote: 'The notifications tell me the moment someone nearby is looking for what I sell.',
    name: 'Shop owner, Musanze'
  }
];

export default function LandingPage() {
  const [stats, setStats] = useState({ totalOffers: null, districtsCovered: 8 });

  useEffect(() => {
    api
      .get('/offers/averages')
      .then((res) => {
        const rows = res.data.data.averages;
        const totalOffers = rows.reduce((sum, r) => sum + Number(r.offer_count), 0);
        setStats({ totalOffers, districtsCovered: rows.length || 8 });
      })
      .catch(() => {});
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary-700 text-white">
        <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:24px_24px]" />
        <div className="container-page relative py-20 sm:py-28 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-semibold tracking-wide uppercase text-secondary-400">
              Made for Rwanda&apos;s markets
            </span>
            <h1 className="mt-5 text-4xl sm:text-5xl font-extrabold leading-tight">
              Bringing Price Transparency to Rwanda&apos;s Markets
            </h1>
            <p className="mt-5 text-lg text-white/80 max-w-xl">
              e-Giciro connects consumers, shop owners, wholesalers, and manufacturers around real-time,
              location-aware prices — so no one overpays and no one undersells.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/register" className="btn-secondary !px-6 !py-3 !text-base">
                Get Started Free
              </Link>
              <Link to="/offers" className="btn !px-6 !py-3 !text-base bg-white/10 text-white hover:bg-white/20">
                Browse Offers
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <StatBlock value={stats.totalOffers ?? '—'} label="Active offers" />
            <StatBlock value={stats.districtsCovered} label="Districts" />
            <StatBlock value="4" label="Market roles" />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="container-page py-20">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-center">How e-Giciro works</h2>
        <p className="mt-3 text-center text-ink/50 max-w-xl mx-auto">
          A simple, three-step loop that keeps prices honest and markets efficient.
        </p>

        <div className="mt-12 grid sm:grid-cols-3 gap-6">
          {STEPS.map((step, i) => (
            <div key={step.title} className="card p-6">
              <span className="text-3xl font-extrabold text-secondary-600">{`0${i + 1}`}</span>
              <h3 className="mt-3 font-bold text-lg">{step.title}</h3>
              <p className="mt-2 text-sm text-ink/60">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white border-y border-black/5">
        <div className="container-page py-20">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-center">Trusted across the market chain</h2>
          <div className="mt-12 grid sm:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="card p-6">
                <p className="text-sm text-ink/70 italic">&ldquo;{t.quote}&rdquo;</p>
                <p className="mt-4 text-xs font-semibold text-ink/50">— {t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-page py-20 text-center">
        <h2 className="text-2xl sm:text-3xl font-extrabold">Ready to see real prices, right now?</h2>
        <p className="mt-3 text-ink/50">Join in under a minute — no fees, no middlemen.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/register" className="btn-primary !px-6 !py-3 !text-base">
            Create your account
          </Link>
          <Link to="/offers" className="btn-outline !px-6 !py-3 !text-base">
            Explore the market map
          </Link>
        </div>
      </section>
    </div>
  );
}

function StatBlock({ value, label }) {
  return (
    <div className="rounded-card bg-white/10 border border-white/10 p-4 text-center">
      <p className="text-2xl font-extrabold">{value}</p>
      <p className="mt-1 text-xs text-white/60">{label}</p>
    </div>
  );
}
