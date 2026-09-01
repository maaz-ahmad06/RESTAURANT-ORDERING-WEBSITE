// Rich dataset for Savoria Luxe Restaurant Ordering Website

export const restaurantInfo = {
  name: "Savoria Luxe",
  tagline: "Artisanal Dining & Gourmet Delicacies",
  address: "742 Evergreen Terrace, Gourmet Boulevard, Metro City",
  phone: "+1 (800) 555-FOOD",
  whatsapp: "+1 (800) 555-3663",
  email: "reservations@savorialuxe.com",
  hours: {
    weekdays: "11:00 AM - 11:00 PM",
    weekends: "10:00 AM - Midnight",
  },
  social: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    twitter: "https://twitter.com",
    youtube: "https://youtube.com"
  }
};

export const menuCategories = [
  { id: "all", name: "All Dishes", icon: "UtensilsCrossed" },
  { id: "starters", name: "Starters & Appetizers", icon: "Flame" },
  { id: "main-course", name: "Main Course", icon: "Soup" },
  { id: "fast-food", name: "Artisanal Fast Food", icon: "Pizza" },
  { id: "desserts", name: "Desserts & Pastries", icon: "IceCream" },
  { id: "beverages", name: "Beverages & Cocktails", icon: "Coffee" },
  { id: "chef-specials", name: "Chef's Specials", icon: "Sparkles" },
];

export const foodItems = [
  // --- STARTERS ---
  {
    id: "dish-1",
    name: "Truffle Infused Crispy Arancini",
    category: "starters",
    price: 14.99,
    rating: 4.9,
    reviewsCount: 142,
    description: "Golden carnaroli rice croquettes stuffed with black truffle, wild mushrooms, and smoked mozzarella dip.",
    image: "https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isSpicy: false,
    isBestSeller: true,
    calories: "380 kcal",
    prepTime: "15 mins",
    tags: ["Truffle", "Crispy", "Italian"]
  },
  {
    id: "dish-2",
    name: "Fiery Peri-Peri Chicken Wings",
    category: "starters",
    price: 16.50,
    rating: 4.8,
    reviewsCount: 210,
    description: "Smoked jumbo chicken wings tossed in homemade artisan peri-peri glaze with cilantro lime ranch.",
    image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=800&q=80",
    isVeg: false,
    isSpicy: true,
    isBestSeller: true,
    calories: "520 kcal",
    prepTime: "18 mins",
    tags: ["Spicy", "Crispy", "Poultry"]
  },
  {
    id: "dish-3",
    name: "Charred Mediterranean Bruschetta",
    category: "starters",
    price: 12.99,
    rating: 4.7,
    reviewsCount: 98,
    description: "Rustic sourdough grilled over oak wood, heirloom San Marzano tomatoes, fresh basil, aged balsamic glaze.",
    image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isSpicy: false,
    isBestSeller: false,
    calories: "290 kcal",
    prepTime: "12 mins",
    tags: ["Vegan Option", "Healthy", "Organic"]
  },
  {
    id: "dish-4",
    name: "Garlic Butter Jumbo Tiger Prawns",
    category: "starters",
    price: 21.99,
    rating: 4.95,
    reviewsCount: 180,
    description: "Sizzling skillet caught prawns bathed in lemon herb emulsion, roasted garlic chunks, and toasted ciabatta.",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80",
    isVeg: false,
    isSpicy: false,
    isBestSeller: true,
    calories: "410 kcal",
    prepTime: "20 mins",
    tags: ["Seafood", "Keto", "Chef Recommended"]
  },

  // --- MAIN COURSE ---
  {
    id: "dish-5",
    name: "Prime Wood-Fired Ribeye Steak",
    category: "main-course",
    price: 38.50,
    rating: 5.0,
    reviewsCount: 340,
    description: "USDA Prime 30-day dry aged ribeye with rosemary bone marrow butter, roasted asparagus, and truffle potato puree.",
    image: "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80",
    isVeg: false,
    isSpicy: false,
    isBestSeller: true,
    calories: "780 kcal",
    prepTime: "25 mins",
    tags: ["Signature", "Dry Aged", "Gourmet"]
  },
  {
    id: "dish-6",
    name: "Creamy Tuscan Salmon Risotto",
    category: "main-course",
    price: 29.99,
    rating: 4.85,
    reviewsCount: 165,
    description: "Pan-seared Atlantic wild salmon over saffron-infused arborio risotto with sun-dried tomatoes and baby spinach.",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80",
    isVeg: false,
    isSpicy: false,
    isBestSeller: true,
    calories: "640 kcal",
    prepTime: "22 mins",
    tags: ["Omega 3", "Italian", "Gluten Free"]
  },
  {
    id: "dish-7",
    name: "Royal Smoked Butter Chicken",
    category: "main-course",
    price: 24.50,
    rating: 4.9,
    reviewsCount: 290,
    description: "Charcoal grilled tandoori chicken cooked in velvety cashew-tomato sauce with fenugreek butter & garlic naan.",
    image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=800&q=80",
    isVeg: false,
    isSpicy: true,
    isBestSeller: true,
    calories: "710 kcal",
    prepTime: "20 mins",
    tags: ["Traditional", "Rich", "Aromatic"]
  },
  {
    id: "dish-8",
    name: "Handmade Wild Mushroom Ravioli",
    category: "main-course",
    price: 23.00,
    rating: 4.8,
    reviewsCount: 124,
    description: "Delicate pasta parcels filled with porcini and ricotta, tossed in brown butter sage sauce and toasted pine nuts.",
    image: "https://images.unsplash.com/photo-1587740908075-9e245070dfaa?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isSpicy: false,
    isBestSeller: false,
    calories: "550 kcal",
    prepTime: "18 mins",
    tags: ["Artisan Pasta", "Vegetarian", "Savory"]
  },

  // --- FAST FOOD ---
  {
    id: "dish-9",
    name: "The Savoria Wagyu Smoked Burger",
    category: "fast-food",
    price: 19.99,
    rating: 4.95,
    reviewsCount: 420,
    description: "Double smash A5 Wagyu blend, aged cheddar, caramelised bacon onion jam, brioche bun with truffle parmesan fries.",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
    isVeg: false,
    isSpicy: false,
    isBestSeller: true,
    calories: "890 kcal",
    prepTime: "15 mins",
    tags: ["Top Ranked", "Wagyu", "Comfort Food"]
  },
  {
    id: "dish-10",
    name: "Napoli Truffle Burrata Pizza",
    category: "fast-food",
    price: 22.50,
    rating: 4.9,
    reviewsCount: 310,
    description: "48-hour fermented sourdough, San Marzano sauce, fresh torn burrata ball, black truffle oil, and fresh sweet basil.",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isSpicy: false,
    isBestSeller: true,
    calories: "760 kcal",
    prepTime: "16 mins",
    tags: ["Wood Fired", "Authentic", "Cheese Lovers"]
  },
  {
    id: "dish-11",
    name: "Korean Crispy Fried Chicken Baos",
    category: "fast-food",
    price: 17.50,
    rating: 4.85,
    reviewsCount: 190,
    description: "Three pillowy steamed bao buns, gochujang glazed crispy chicken thigh, pickled daikon radish, and toasted sesame.",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80",
    isVeg: false,
    isSpicy: true,
    isBestSeller: false,
    calories: "620 kcal",
    prepTime: "14 mins",
    tags: ["Asian Fusion", "Crunchy", "Spicy"]
  },
  {
    id: "dish-12",
    name: "Avocado & Halloumi Gourmet Wrap",
    category: "fast-food",
    price: 15.00,
    rating: 4.75,
    reviewsCount: 115,
    description: "Grilled Cypriot halloumi cheese, Hass avocado mash, charred peppers, baby rocket, and chipotle lime drizzle.",
    image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isSpicy: false,
    isBestSeller: false,
    calories: "510 kcal",
    prepTime: "12 mins",
    tags: ["Vegetarian", "Healthy", "Grilled"]
  },

  // --- DESSERTS ---
  {
    id: "dish-13",
    name: "Molten Belgian Dark Chocolate Lava",
    category: "desserts",
    price: 13.50,
    rating: 5.0,
    reviewsCount: 380,
    description: "Warm 70% Callebaut dark chocolate cake with flowing ganache center, Madagascar vanilla bean gelato, raspberry coulis.",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isSpicy: false,
    isBestSeller: true,
    calories: "580 kcal",
    prepTime: "15 mins",
    tags: ["Decadent", "Warm", "Must Try"]
  },
  {
    id: "dish-14",
    name: "Classic Venetian Mascarpone Tiramisu",
    category: "desserts",
    price: 12.00,
    rating: 4.9,
    reviewsCount: 220,
    description: "Espresso soaked Savoiardi ladyfingers layered with whipped zabaione mascarpone cream and Valrhona cocoa dust.",
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isSpicy: false,
    isBestSeller: true,
    calories: "450 kcal",
    prepTime: "8 mins",
    tags: ["Authentic", "Coffee", "Dessert"]
  },
  {
    id: "dish-15",
    name: "New York Berry Swirl Cheesecake",
    category: "desserts",
    price: 11.50,
    rating: 4.8,
    reviewsCount: 140,
    description: "Dense and velvety cream cheese cake on graham cracker crust topped with fresh forest berry compote.",
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isSpicy: false,
    isBestSeller: false,
    calories: "490 kcal",
    prepTime: "5 mins",
    tags: ["Creamy", "Classic", "Berry"]
  },
  {
    id: "dish-16",
    name: "Pistachio & Rose Saffron Kulfi",
    category: "desserts",
    price: 10.50,
    rating: 4.85,
    reviewsCount: 95,
    description: "Traditional slow-reduced frozen dairy dessert infused with Kashmiri saffron, crushed pistachios, and edible gold leaf.",
    image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isSpicy: false,
    isBestSeller: false,
    calories: "320 kcal",
    prepTime: "5 mins",
    tags: ["Exotic", "Cooling", "Royal"]
  },

  // --- BEVERAGES ---
  {
    id: "dish-17",
    name: "Smoked Rosemary Blackberry Mocktail",
    category: "beverages",
    price: 8.50,
    rating: 4.9,
    reviewsCount: 175,
    description: "Muddled fresh blackberries, organic apple cider, botanical ginger elixir, served with torch-smoked rosemary sprig.",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isSpicy: false,
    isBestSeller: true,
    calories: "140 kcal",
    prepTime: "6 mins",
    tags: ["Artisan Drink", "Refreshing", "Smoke"]
  },
  {
    id: "dish-18",
    name: "Passionfruit Mango Dragon Mojito",
    category: "beverages",
    price: 7.99,
    rating: 4.8,
    reviewsCount: 130,
    description: "Crushed lime, fresh spearmint leaves, passionfruit purée, sparkling soda, and dragonfruit pearls.",
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isSpicy: false,
    isBestSeller: false,
    calories: "160 kcal",
    prepTime: "5 mins",
    tags: ["Tropical", "Fizzy", "Minty"]
  },
  {
    id: "dish-19",
    name: "Artisan Iced Caramel Macchiato",
    category: "beverages",
    price: 6.75,
    rating: 4.85,
    reviewsCount: 260,
    description: "Single-origin Ethiopian cold brew espresso, oat milk, handmade Madagascar vanilla, and salted amber caramel drizzle.",
    image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isSpicy: false,
    isBestSeller: true,
    calories: "210 kcal",
    prepTime: "5 mins",
    tags: ["Coffee", "Energizing", "Sweet"]
  },
  {
    id: "dish-20",
    name: "Cold Pressed Green Detox Glow",
    category: "beverages",
    price: 8.00,
    rating: 4.7,
    reviewsCount: 88,
    description: "Fresh organic kale, green apple, cucumber, celery, fresh ginger root, and Japanese ceremonial matcha boost.",
    image: "https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isSpicy: false,
    isBestSeller: false,
    calories: "95 kcal",
    prepTime: "5 mins",
    tags: ["Immunity", "Healthy", "Zero Sugar"]
  },

  // --- CHEF SPECIALS ---
  {
    id: "dish-21",
    name: "24K Gold Leaf Saffron Lobster Thermidor",
    category: "chef-specials",
    price: 65.00,
    rating: 5.0,
    reviewsCount: 160,
    description: "Whole Maine lobster tail baked in cognac saffron cream reduction with Gruyère gratin, garnished with genuine 24K edible gold flakes.",
    image: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=800&q=80",
    isVeg: false,
    isSpicy: false,
    isBestSeller: true,
    calories: "820 kcal",
    prepTime: "30 mins",
    tags: ["Ultra Luxury", "24K Gold", "Maine Lobster"]
  },
  {
    id: "dish-22",
    name: "Smoked Duck Breast with Cherry Glaze",
    category: "chef-specials",
    price: 36.00,
    rating: 4.95,
    reviewsCount: 110,
    description: "Hickory wood smoked Barbary duck breast, glazed with sour cherry reduction, served alongside roasted parsnip purée.",
    image: "https://images.unsplash.com/photo-1514944265492-f04b1e55091c?auto=format&fit=crop&w=800&q=80",
    isVeg: false,
    isSpicy: false,
    isBestSeller: false,
    calories: "690 kcal",
    prepTime: "25 mins",
    tags: ["French", "Signature", "Smoked"]
  },
  {
    id: "dish-23",
    name: "Truffle Scented Wild Morel Risotto",
    category: "chef-specials",
    price: 32.50,
    rating: 4.9,
    reviewsCount: 145,
    description: "Harvested Himalayan morel mushrooms simmered in 36-month Parmigiano Reggiano broth with shaved Alba white truffle.",
    image: "https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isSpicy: false,
    isBestSeller: true,
    calories: "590 kcal",
    prepTime: "24 mins",
    tags: ["Gourmet Veg", "Truffle", "Chef Special"]
  },
  {
    id: "dish-24",
    name: "Flame-Torched Spanish Octopus Carpaccio",
    category: "chef-specials",
    price: 27.00,
    rating: 4.88,
    reviewsCount: 102,
    description: "Paper thin tender Galician octopus slices, smoked paprika oil, lemon caviar pearls, and crispy caper berries.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    isVeg: false,
    isSpicy: true,
    isBestSeller: false,
    calories: "340 kcal",
    prepTime: "18 mins",
    tags: ["Seafood", "Exotic", "Mediterranean"]
  }
];

export const dealsAndCombos = [
  {
    id: "deal-1",
    title: "Artisan Burger & Truffle Fries Feast",
    badge: "SAVE 30%",
    originalPrice: 34.99,
    dealPrice: 24.50,
    discountPercent: 30,
    description: "Wagyu Smoked Burger + Truffle Parmesan Fries + Choice of Mocktail.",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80",
    couponCode: "BURGER30",
    itemsIncluded: ["Wagyu Burger", "Truffle Fries", "Blackberry Mocktail"],
    expiry: "Limited time today"
  },
  {
    id: "deal-2",
    title: "Italian Romance Date Night Combo",
    badge: "CHEF'S PICK",
    originalPrice: 68.00,
    dealPrice: 48.99,
    discountPercent: 28,
    description: "Truffle Burrata Pizza + Mushroom Ravioli + 2x Classic Tiramisu.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    couponCode: "ROMANCE28",
    itemsIncluded: ["Burrata Pizza", "Wild Mushroom Ravioli", "2x Tiramisu"],
    expiry: "Valid till midnight"
  },
  {
    id: "deal-3",
    title: "Gourmet Seafood & Wine Delight",
    badge: "HOT DEAL",
    originalPrice: 62.50,
    dealPrice: 44.99,
    discountPercent: 32,
    description: "Tuscan Salmon Risotto + Garlic Butter Tiger Prawns + 2 Drinks.",
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80",
    couponCode: "OCEAN32",
    itemsIncluded: ["Salmon Risotto", "Garlic Tiger Prawns", "2x Mocktails"],
    expiry: "Weekend Special"
  }
];

export const restaurantGallery = [
  {
    id: "g-1",
    title: "Luxury Dining Ambience",
    category: "Interior",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
    description: "Warm amber mood lighting and bespoke velvet seating in our main dining hall."
  },
  {
    id: "g-2",
    title: "Master Chef Open Kitchen",
    category: "Culinary Craft",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=80",
    description: "Watch our culinary masters handcraft every dish with precision and passion."
  },
  {
    id: "g-3",
    title: "Rooftop Sunset Lounge",
    category: "Skyline View",
    image: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=1200&q=80",
    description: "Panoramic city skyline views paired with curated artisanal mixology."
  },
  {
    id: "g-4",
    title: "Artisanal Plating Standards",
    category: "Dishes",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80",
    description: "Every plate is a canvas of vibrant colors, rich textures, and bold aromatics."
  },
  {
    id: "g-5",
    title: "Private VIP Dining Suite",
    category: "VIP Experience",
    image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80",
    description: "Exclusive private dining with dedicated sommelier and custom tasting menus."
  },
  {
    id: "g-6",
    title: "Outdoor Enchanted Garden",
    category: "Outdoor",
    image: "https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&w=1200&q=80",
    description: "Dine under fairy lights surrounded by fragrant Mediterranean herbs and olive trees."
  }
];

export const customerTestimonials = [
  {
    id: "t-1",
    name: "Victoria Sterling",
    role: "Michelin Guide Food Critic",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    rating: 5,
    comment: "The Dry-Aged Ribeye and Truffle Ravioli at Savoria Luxe are transcendent. The online ordering delivery was piping hot and plated with the same elegance as in-restaurant dining!",
    date: "2 days ago"
  },
  {
    id: "t-2",
    name: "Chef Marcus Vance",
    role: "Culinary Director & Author",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    rating: 5,
    comment: "Flawless flavors and unmatched attention to detail. The Wagyu Burger sauce and Burrata Pizza are the gold standard. Fast delivery and intuitive web interface!",
    date: "1 week ago"
  },
  {
    id: "t-3",
    name: "Elena Rostova",
    role: "Lifestyle & Travel Blogger",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
    rating: 5,
    comment: "Booked a table for our 5th anniversary on the rooftop lounge. The atmosphere was magical, cocktails were smoky & delightful, and the Molten Lava cake was perfection!",
    date: "2 weeks ago"
  },
  {
    id: "t-4",
    name: "David Chen",
    role: "Tech Executive & Foodie",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
    rating: 5,
    comment: "The real-time live order tracker and checkout animations are incredibly slick. 25 minutes from order click to my front door. Savoria Luxe never misses!",
    date: "3 weeks ago"
  }
];

export const masterChefs = [
  {
    name: "Chef Alessandro Bellini",
    role: "Executive Head Chef",
    experience: "18+ Years Experience",
    bio: "Former Head Chef at 3-Star Michelin establishments in Florence and Milan. Master of pasta art and wood-fired gastronomy.",
    image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=600&q=80",
    specialty: "Artisanal Italian & Truffle Cuisine"
  },
  {
    name: "Chef Meera Kapoor",
    role: "Master of Spices & Grills",
    experience: "14+ Years Experience",
    bio: "Pioneering modern royal slow-cooked meats, complex botanical marinades, and charcoal tandoor wizardry.",
    image: "https://images.unsplash.com/photo-1583394293214-28ded15ee548?auto=format&fit=crop&w=600&q=80",
    specialty: "Smoked Marinades & Fusion Flavors"
  },
  {
    name: "Chef Jean-Luc Moreau",
    role: "Executive Pastry Artist",
    experience: "12+ Years Experience",
    bio: "Trained at Le Cordon Bleu Paris. Renowned for multi-layered cocoa sculptures, gold leaf patisserie, and gelato alchemy.",
    image: "https://images.unsplash.com/photo-1607631568010-a87245c0daf8?auto=format&fit=crop&w=600&q=80",
    specialty: "High Patisserie & Decadent Desserts"
  }
];

export const couponCodes = {
  "TASTY20": { discount: 20, type: "percent", label: "20% OFF Entire Order" },
  "WELCOME50": { discount: 15, type: "fixed", label: "$15 Flat Welcome Discount" },
  "FEAST10": { discount: 10, type: "percent", label: "10% VIP Foodie Discount" },
  "BURGER30": { discount: 30, type: "percent", label: "30% Burger Combo Discount" },
  "ROMANCE28": { discount: 28, type: "percent", label: "28% Italian Combo Discount" },
  "OCEAN32": { discount: 32, type: "percent", label: "32% Seafood Combo Discount" }
};
