import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, SlidersHorizontal, Coffee, IceCream, Leaf, Wind, Cake, Cookie, Sandwich } from 'lucide-react'
import ProductCard from '../components/shared/ProductCard'
import SkeletonCard from '../components/shared/SkeletonCard'
import { useProducts } from '../hooks/useProducts'

const CATEGORIES = [
  { id: 'all', label: 'All Items', icon: Coffee },
  { id: 'hot-coffee', label: 'Hot Coffee', icon: Coffee },
  { id: 'cold-coffee', label: 'Cold Coffee', icon: IceCream },
  { id: 'tea', label: 'Tea', icon: Leaf },
  { id: 'frappes', label: 'Frappes', icon: Wind },
  { id: 'desserts', label: 'Desserts', icon: Cake },
  { id: 'bakery', label: 'Bakery', icon: Cookie },
  { id: 'snacks', label: 'Snacks', icon: Sandwich },
]

const MENU_ITEMS = [
  // Hot Coffee
  { _id: 'h1', name: 'Espresso', category: 'hot-coffee', price: 160, description: 'Pure, intense double shot of our house blend.', isAvailable: true, avgRating: 4.9, reviewCount: 230, image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400&q=80' },
  { _id: 'h2', name: 'Cappuccino', category: 'hot-coffee', price: 220, description: 'Equal parts espresso, steamed milk, and silky microfoam.', isAvailable: true, isBestSeller: true, avgRating: 4.8, reviewCount: 310, image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=400&q=80' },
  { _id: 'h3', name: 'Vanilla Latte', category: 'hot-coffee', price: 280, description: 'Velvety espresso meets house-made vanilla syrup.', isAvailable: true, isBestSeller: true, avgRating: 4.8, reviewCount: 95, image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=400&q=80' },
  { _id: 'h4', name: 'Flat White', category: 'hot-coffee', price: 260, description: 'Ristretto shots with velvety steamed whole milk.', isAvailable: true, avgRating: 4.7, reviewCount: 88, image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80' },
  { _id: 'h5', name: 'Hazelnut Mocha', category: 'hot-coffee', price: 300, description: 'Espresso, dark chocolate, and toasted hazelnut syrup.', isAvailable: true, avgRating: 4.6, reviewCount: 72, image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=80' },
  // Cold Coffee
  { _id: 'c1', name: 'Signature Cold Brew', category: 'cold-coffee', price: 320, description: 'Slow-steeped 24 hours for a smooth, chocolatey finish.', isAvailable: true, isBestSeller: true, avgRating: 4.9, reviewCount: 128, image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=80' },
  { _id: 'c2', name: 'Iced Americano', category: 'cold-coffee', price: 200, description: 'Chilled espresso over ice with sparkling water.', isAvailable: true, avgRating: 4.5, reviewCount: 142, image: 'https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?w=400&q=80' },
  { _id: 'c3', name: 'Vietnamese Iced Coffee', category: 'cold-coffee', price: 240, description: 'Strong drip coffee with sweet condensed milk over ice.', isAvailable: true, avgRating: 4.8, reviewCount: 96, image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=400&q=80' },
  // Tea
  { _id: 't1', name: 'Matcha Latte', category: 'tea', price: 260, description: 'Ceremonial-grade matcha with silky oat milk.', isAvailable: true, isNew: true, avgRating: 4.6, reviewCount: 43, image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=400&q=80' },
  { _id: 't2', name: 'Masala Chai', category: 'tea', price: 160, description: 'Spiced CTC tea with ginger, cardamom & cloves.', isAvailable: true, isBestSeller: true, avgRating: 4.9, reviewCount: 215, image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&q=80' },
  { _id: 't3', name: 'Earl Grey Latte', category: 'tea', price: 220, description: 'Bergamot-scented Earl Grey with steamed oat milk.', isAvailable: true, avgRating: 4.5, reviewCount: 38, image: 'https://images.unsplash.com/photo-1562547256-2c5ee93b60b7?w=400&q=80' },
  // Frappes
  { _id: 'f1', name: 'Caramel Frappe', category: 'frappes', price: 350, description: 'Blended espresso, milk, ice & rich caramel drizzle.', isAvailable: true, isBestSeller: true, avgRating: 4.7, reviewCount: 112, image: 'https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?w=400&q=80' },
  { _id: 'f2', name: 'Oreo Frappe', category: 'frappes', price: 380, description: 'Blended cold coffee with crushed Oreo cookies & cream.', isAvailable: true, avgRating: 4.6, reviewCount: 78, image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=80' },
  { _id: 'f3', name: 'Mocha Frappe', category: 'frappes', price: 360, description: 'Espresso meets chocolate in a chilled blended delight.', isAvailable: true, avgRating: 4.5, reviewCount: 65, image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80' },
  // Desserts
  { _id: 'd1', name: 'Blueberry Cheesecake', category: 'desserts', price: 380, description: 'Rich NY-style cheesecake with fresh blueberry compote.', isAvailable: true, avgRating: 4.9, reviewCount: 74, image: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=400&q=80' },
  { _id: 'd2', name: 'Tiramisu', category: 'desserts', price: 360, description: 'Classic Italian espresso-soaked ladyfingers with mascarpone.', isAvailable: true, isBestSeller: true, avgRating: 4.8, reviewCount: 93, image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&q=80' },
  { _id: 'd3', name: 'Chocolate Lava Cake', category: 'desserts', price: 320, description: 'Warm dark chocolate fondant with molten centre & ice cream.', isAvailable: true, avgRating: 4.7, reviewCount: 86, image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&q=80' },
  // Bakery
  { _id: 'b1', name: 'Almond Croissant', category: 'bakery', price: 180, description: 'Buttery flaky croissant filled with frangipane almond cream.', isAvailable: true, avgRating: 4.8, reviewCount: 67, image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&q=80' },
  { _id: 'b2', name: 'Blueberry Muffin', category: 'bakery', price: 140, description: 'Moist, fluffy muffin bursting with fresh blueberries.', isAvailable: true, avgRating: 4.6, reviewCount: 54, image: 'https://images.unsplash.com/photo-1558303648-37828b7a9d8f?w=400&q=80' },
  { _id: 'b3', name: 'Cinnamon Roll', category: 'bakery', price: 200, description: 'Pillowy bun swirled with cinnamon sugar & cream cheese glaze.', isAvailable: true, isBestSeller: true, avgRating: 4.9, reviewCount: 118, image: 'https://images.unsplash.com/photo-1584365685547-9a5fb6f3a70c?w=400&q=80' },
  // Snacks
  { _id: 's1', name: 'Avocado Toast', category: 'snacks', price: 280, description: 'Sourdough toast with smashed avocado, poached egg & chilli flakes.', isAvailable: true, avgRating: 4.7, reviewCount: 61, image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c820?w=400&q=80' },
  { _id: 's2', name: 'Club Sandwich', category: 'snacks', price: 320, description: 'Triple-decker with grilled chicken, bacon, egg & fresh veggies.', isAvailable: true, isBestSeller: true, avgRating: 4.6, reviewCount: 89, image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&q=80' },
  { _id: 's3', name: 'Paneer Tikka Wrap', category: 'snacks', price: 260, description: 'Charred paneer tikka, mint chutney & crisp veggies in a whole-wheat wrap.', isAvailable: true, avgRating: 4.5, reviewCount: 44, image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&q=80' },
]

const SORT_OPTIONS = [
  { value: 'default', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'name', label: 'Name A–Z' },
]

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('default')

  const { data, isLoading } = useProducts()
  const allProducts = data?.products?.length ? data.products : MENU_ITEMS

  const filtered = useMemo(() => {
    let items = activeCategory === 'all' ? allProducts : allProducts.filter(p => p.category === activeCategory)
    if (search.trim()) items = items.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase()))
    switch (sort) {
      case 'price-asc': return [...items].sort((a, b) => a.price - b.price)
      case 'price-desc': return [...items].sort((a, b) => b.price - a.price)
      case 'rating': return [...items].sort((a, b) => (b.avgRating || 0) - (a.avgRating || 0))
      case 'name': return [...items].sort((a, b) => a.name.localeCompare(b.name))
      default: return items
    }
  }, [allProducts, activeCategory, search, sort])

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-gray-950">
      <Helmet>
        <title>Menu – Brew &amp; Bloom Café</title>
        <meta name="description" content="Explore our full menu of handcrafted coffees, teas, frappes, desserts, bakery items and snacks." />
      </Helmet>

      {/* Page Hero */}
      <div className="relative h-48 md:h-64 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=80"
          alt="Menu hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-display text-4xl md:text-5xl font-bold"
          >
            Our Menu
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-cream-200 mt-2"
          >
            Handcrafted with love, served with warmth
          </motion.p>
        </div>
      </div>

      <div className="container-custom py-10">
        {/* Search + Sort */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search menu items…"
              className="input-field pl-11"
            />
          </div>
          <div className="relative">
            <SlidersHorizontal size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              className="input-field pl-10 pr-10 appearance-none cursor-pointer min-w-44"
            >
              {SORT_OPTIONS.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveCategory(id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === id
                  ? 'bg-coffee-600 text-white shadow-md'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-coffee-50 border border-gray-200 dark:border-gray-700'
              }`}
            >
              <Icon size={15} />
              {label}
            </button>
          ))}
        </div>

        {/* Item count */}
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          {filtered.length} item{filtered.length !== 1 ? 's' : ''} found
        </p>

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(6).fill(0).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-6xl mb-4">☕</p>
            <p className="text-xl font-display text-coffee-700 dark:text-coffee-400">No items found</p>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Try a different search or category</p>
            <button
              onClick={() => { setSearch(''); setActiveCategory('all') }}
              className="btn-primary mt-6"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory + search + sort}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((p, i) => (
                <motion.div
                  key={p._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <ProductCard product={p} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  )
}
