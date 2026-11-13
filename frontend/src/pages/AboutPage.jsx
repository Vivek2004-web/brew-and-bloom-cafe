import { motion } from 'framer-motion'
import { Coffee, Award, Heart, Leaf, Shield, Users, Sparkles, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import SectionHeader from '../components/shared/SectionHeader'

const TEAM = [
  {
    name: 'Kabir Varma',
    role: 'Founder & Head of Roasting',
    bio: 'Q-Grader certified with 14 years across specialty coffee plantations in Chikmagalur & Colombia.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80'
  },
  {
    name: 'Ananya Deshmukh',
    role: 'Head Pastry Chef & Chocolatier',
    bio: 'Le Cordon Bleu Paris alumna specializing in layered viennoiserie, sourdoughs, and mirror-glaze cakes.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80'
  },
  {
    name: 'Devraj Sen',
    role: 'Master Barista & Trainer',
    bio: 'National Latte Art finalist dedicated to precision milk steaming, cold drips, and zero-waste coffee bars.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80'
  }
]

const PILLARS = [
  {
    icon: Leaf,
    title: '100% Direct Fair-Trade',
    desc: 'We procure beans directly from multi-generational farming families in Karnataka, Kerala, and Ethiopia, paying 40% above fair-trade floor benchmarks.'
  },
  {
    icon: Award,
    title: 'Small-Batch Cast-Iron Roasts',
    desc: 'Each 5kg batch is roasted on our custom vintage Giesen drum, profiling unique altitude sugars and floral bouquets.'
  },
  {
    icon: Heart,
    title: 'Warmth in Every Detail',
    desc: 'No rushed service or impersonal apps. Our café is designed as an unhurried, warm sanctuary with soft lighting and natural woods.'
  }
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-cream-50 dark:bg-gray-950 py-20 pt-28">
      {/* Hero Header */}
      <div className="relative h-72 md:h-96 overflow-hidden mb-16">
        <img
          src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1600&q=80"
          alt="Brew & Bloom Café Story"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30 flex flex-col items-center justify-center text-center text-white px-4">
          <span className="text-coffee-300 uppercase tracking-widest text-xs font-semibold mb-2">Since 2015</span>
          <h1 className="font-display text-4xl md:text-6xl font-bold">Our Story & Craft</h1>
          <p className="text-cream-200/90 max-w-xl text-base md:text-lg mt-3 leading-relaxed">
            Where botanical calm meets the exacting science of specialty single-origin coffee.
          </p>
        </div>
      </div>

      <div className="container-custom">
        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <div>
            <span className="text-coffee-600 dark:text-coffee-400 uppercase tracking-widest text-xs font-bold">The Heritage</span>
            <h2 className="section-title text-left mt-1 mb-6">A Sanctuary for the Senses</h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-300 text-base leading-relaxed">
              <p>
                Brew & Bloom was founded on a simple truth: in a frantic world that demands everything instantly, coffee should remain an oasis of intentional pause.
              </p>
              <p>
                We began with a restored 1970s espresso lever machine in a quiet Mumbai laneway. Over the last decade, our passion for high-grown Arabica, heritage varietals, and artisan slow-bakes transformed Brew & Bloom into a cultural destination for creatives, thinkers, and culinary romantics.
              </p>
              <p>
                Today, every batch roasted in our micro-roastery and every croissant laminated at dawn is a love letter to craft and community.
              </p>
            </div>
            <div className="mt-8 flex gap-4">
              <Link to="/menu" className="btn-primary text-sm">Explore Our Creations</Link>
              <Link to="/reservation" className="btn-secondary text-sm">Book a Visit</Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=600&q=80"
              alt="Barista at work"
              className="w-full h-80 object-cover rounded-3xl shadow-lg"
            />
            <img
              src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&q=80"
              alt="Café interior"
              className="w-full h-80 object-cover rounded-3xl shadow-lg mt-6"
            />
          </div>
        </div>

        {/* Pillars */}
        <div className="mb-24">
          <SectionHeader
            eyebrow="Core Values"
            title="The Three Pillars of Brew & Bloom"
            subtitle="How we maintain uncompromising standards across our cups, bakes, and hospitality."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PILLARS.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="card p-8 bg-white dark:bg-gray-900 border border-coffee-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-14 h-14 rounded-2xl bg-coffee-100 dark:bg-coffee-950 flex items-center justify-center mb-6 text-coffee-700 dark:text-coffee-300">
                  <Icon size={26}/>
                </div>
                <h3 className="font-display text-xl font-bold text-coffee-900 dark:text-cream-100 mb-3">{title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Meet the Artisans */}
        <div className="mb-20">
          <SectionHeader
            eyebrow="Our Craft Team"
            title="Meet the Artisans"
            subtitle="The roasters, bakers, and baristas who breathe life into every Brew & Bloom morning."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TEAM.map((member) => (
              <div
                key={member.name}
                className="card overflow-hidden bg-white dark:bg-gray-900 border border-coffee-100 dark:border-gray-800 shadow-sm"
              >
                <div className="h-72 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-bold text-coffee-900 dark:text-cream-100">{member.name}</h3>
                  <p className="text-coffee-600 dark:text-coffee-400 text-xs font-semibold uppercase tracking-wider mb-3">{member.role}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

