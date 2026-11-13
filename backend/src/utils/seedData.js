export const SEED_PRODUCTS = [
  // Hot Coffee
  {
    name: 'Single-Origin Ethiopian Espresso',
    category: 'hot-coffee',
    price: 180,
    description: 'Double extraction highlighting jasmine aromatics, bergamot citrus, and honey sweetness.',
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=500&q=80',
    isAvailable: true,
    isBestSeller: true,
    avgRating: 4.9,
    reviewCount: 142
  },
  {
    name: 'Artisan Velvet Cappuccino',
    category: 'hot-coffee',
    price: 240,
    description: 'Equal parts single-origin espresso, steamed organic whole milk, and silky microfoam art.',
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=500&q=80',
    isAvailable: true,
    isBestSeller: true,
    avgRating: 4.8,
    reviewCount: 310
  },
  {
    name: 'Madagascar Vanilla Flat White',
    category: 'hot-coffee',
    price: 280,
    description: 'Ristretto extraction folded into micro-textured milk infused with real Bourbon vanilla pod.',
    image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=500&q=80',
    isAvailable: true,
    isBestSeller: true,
    avgRating: 4.9,
    reviewCount: 185
  },
  {
    name: 'Valrhona Dark Mocha',
    category: 'hot-coffee',
    price: 310,
    description: '70% French dark cocoa melted into double espresso and lightly sweetened oat milk.',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&q=80',
    isAvailable: true,
    isBestSeller: false,
    avgRating: 4.7,
    reviewCount: 94
  },
  // Cold Coffee
  {
    name: '24-Hour Kyoto Slow Drip Cold Brew',
    category: 'cold-coffee',
    price: 320,
    description: 'Slow-steeped over 24 hours drop by drop for an intensely smooth, chocolatey, low-acid nectar.',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&q=80',
    isAvailable: true,
    isBestSeller: true,
    avgRating: 4.9,
    reviewCount: 420
  },
  {
    name: 'Tonic & Citrus Espresso Sparkler',
    category: 'cold-coffee',
    price: 260,
    description: 'Double espresso pulled directly over artisanal Indian tonic and fresh blood orange slice.',
    image: 'https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?w=500&q=80',
    isAvailable: true,
    isBestSeller: false,
    avgRating: 4.6,
    reviewCount: 88
  },
  {
    name: 'Vietnamese Condensed Milk Iced Drip',
    category: 'cold-coffee',
    price: 260,
    description: 'Dark slow phin-drip roast stirred with sweet milk over crushed mountain ice.',
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=500&q=80',
    isAvailable: true,
    isBestSeller: true,
    avgRating: 4.8,
    reviewCount: 112
  },
  // Teas
  {
    name: 'Uji Ceremonial Matcha Latte',
    category: 'tea',
    price: 290,
    description: 'First-harvest shade-grown green tea whisked with creamy oat milk and raw wildflower honey.',
    image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=500&q=80',
    isAvailable: true,
    isBestSeller: true,
    avgRating: 4.8,
    reviewCount: 154
  },
  {
    name: 'Handcrafted Masala Chai Royal',
    category: 'tea',
    price: 180,
    description: 'Assam CTC slow brewed with crushed green cardamom, ginger, cloves, and whole buffalo milk.',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500&q=80',
    isAvailable: true,
    isBestSeller: true,
    avgRating: 4.9,
    reviewCount: 290
  },
  // Frappes
  {
    name: 'Himalayan Salted Caramel Frappe',
    category: 'frappes',
    price: 360,
    description: 'Blended espresso shake drizzled with pink salt caramel cream and butterscotch crisps.',
    image: 'https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?w=500&q=80',
    isAvailable: true,
    isBestSeller: true,
    avgRating: 4.7,
    reviewCount: 140
  },
  {
    name: 'Dark Mocha Cookie Crunch Frappe',
    category: 'frappes',
    price: 380,
    description: 'Belgian chocolate, espresso, crushed waffle cookies, topped with espresso whipped cream.',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500&q=80',
    isAvailable: true,
    isBestSeller: false,
    avgRating: 4.8,
    reviewCount: 118
  },
  // Desserts
  {
    name: 'Wild Blueberry NY Cheesecake',
    category: 'desserts',
    price: 380,
    description: 'Dense Philadelphia cream cheese on graham crust with slow-reduced wild blueberry coulis.',
    image: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=500&q=80',
    isAvailable: true,
    isBestSeller: true,
    avgRating: 4.9,
    reviewCount: 210
  },
  {
    name: 'Traditional Venetian Tiramisu',
    category: 'desserts',
    price: 360,
    description: 'Savoiardi ladyfingers steeped in fresh espresso, layered with airy mascarpone cream & Dutch cocoa.',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500&q=80',
    isAvailable: true,
    isBestSeller: true,
    avgRating: 4.9,
    reviewCount: 175
  },
  // Bakery
  {
    name: 'Twice-Baked Almond Croissant',
    category: 'bakery',
    price: 210,
    description: 'Laminated French butter pastry filled with rich almond frangipane and toasted flakes.',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=500&q=80',
    isAvailable: true,
    isBestSeller: true,
    avgRating: 4.8,
    reviewCount: 195
  },
  {
    name: 'Cardamom Cinnamon Brioche Knot',
    category: 'bakery',
    price: 190,
    description: 'Swedish-style pillowy cardamom brioche swirled with Ceylon cinnamon and pearl sugar.',
    image: 'https://images.unsplash.com/photo-1584365685547-9a5fb6f3a70c?w=500&q=80',
    isAvailable: true,
    isBestSeller: false,
    avgRating: 4.7,
    reviewCount: 88
  },
  // Snacks
  {
    name: 'Smashed Avocado & Burrata Sourdough',
    category: 'snacks',
    price: 340,
    description: 'House sourdough toast, Hass avocado, fresh burrata, pomegranate, and za’atar drizzle.',
    image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c820?w=500&q=80',
    isAvailable: true,
    isBestSeller: true,
    avgRating: 4.8,
    reviewCount: 130
  },
  {
    name: 'Smoked Chicken & Pesto Club Toastie',
    category: 'snacks',
    price: 360,
    description: 'Smoked chicken breast, basil pine-nut pesto, melted mozzarella on toasted artisan loaf.',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=500&q=80',
    isAvailable: true,
    isBestSeller: true,
    avgRating: 4.7,
    reviewCount: 160
  }
]

export const SEED_COUPONS = [
  { code: 'BLOOM20', discount: 20, type: 'percentage', minOrder: 300, expiry: '2025-12-31', isActive: true },
  { code: 'PAIR399', discount: 15, type: 'percentage', minOrder: 400, expiry: '2025-12-31', isActive: true },
  { code: 'EARLYBIRD', discount: 20, type: 'percentage', minOrder: 250, expiry: '2025-12-31', isActive: true },
  { code: 'WELCOME100', discount: 100, type: 'flat', minOrder: 500, expiry: '2025-12-31', isActive: true },
]

