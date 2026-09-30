export const INITIAL_CATEGORIES = [
  { id: 'all', name: 'All Menu', icon: 'Sparkles' },
  { id: 'cold_coffee', name: 'Cold Coffee & Chocolate', icon: 'Coffee' },
  { id: 'hot', name: 'Hot Coffee & Chai', icon: 'Flame' },
  { id: 'shakes', name: 'Shakes & Mastani', icon: 'CupSoda' },
  { id: 'cad_shakes', name: 'Cad & Monster Shakes', icon: 'Sparkles' },
  { id: 'pizza', name: 'Pizzas & Momos', icon: 'Pizza' },
  { id: 'sandwiches', name: 'Sandwiches & Rolls', icon: 'Utensils' },
  { id: 'burgers_toast', name: 'Burgers & Garlic Bread', icon: 'Sandwich' },
  { id: 'pasta_fries', name: 'Pasta, Fries & Snacks', icon: 'Utensils' },
  { id: 'maggi', name: 'Maggi & Nachos', icon: 'Soup' },
  { id: 'mocktails', name: 'Mocktails & Juices', icon: 'Wine' },
  { id: 'desserts', name: 'Brownies, Lassi & Ice Cream', icon: 'Cake' },
];

export const INITIAL_MENU_ITEMS = [
  // 1. COLD COFFEE & COLD CHOCOLATE
  {
    id: 'c1',
    name: 'Cold Coffee (Classic)',
    category: 'cold_coffee',
    price: 30,
    description: 'Chilled creamy espresso blend with velvety thick froth.',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80',
    available: true,
    customizable: true,
    options: { variant: ['Plain (₹30)', 'Crush (₹40)', 'Ice Cream (₹50)', 'Both (₹60)'] }
  },
  {
    id: 'c2',
    name: 'Cold Chocolate',
    category: 'cold_coffee',
    price: 30,
    description: 'Rich Dutch cocoa blended with cold milk & chocochips.',
    image: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?auto=format&fit=crop&w=600&q=80',
    available: true,
    customizable: true,
    options: { variant: ['Plain (₹30)', 'Crush (₹40)', 'Ice Cream (₹50)', 'Both (₹60)'] }
  },
  {
    id: 'c3',
    name: 'Thick Coffee',
    category: 'cold_coffee',
    price: 45,
    description: 'Extra thick thick-cream cafe cold coffee.',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=600&q=80',
    available: true,
    customizable: true,
    options: { variant: ['Plain (₹45)', 'Crush (₹55)', 'Ice Cream (₹65)', 'Both (₹70)'] }
  },
  {
    id: 'c4',
    name: 'Thick Chocolate',
    category: 'cold_coffee',
    price: 45,
    description: 'Decadent thick Belgian chocolate smoothie.',
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=600&q=80',
    available: true,
    customizable: true,
    options: { variant: ['Plain (₹45)', 'Crush (₹55)', 'Ice Cream (₹65)', 'Both (₹70)'] }
  },
  {
    id: 'c5',
    name: 'White Coffee',
    category: 'cold_coffee',
    price: 55,
    description: 'Creamy white chocolate mocha blend.',
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=600&q=80',
    available: true,
    customizable: true,
    options: { variant: ['Plain (₹55)', 'Crush (₹65)', 'Ice Cream (₹75)', 'Both (₹70)'] }
  },
  {
    id: 'c6',
    name: 'Mocha Coffee',
    category: 'cold_coffee',
    price: 55,
    description: 'Espresso mixed with dark chocolate syrup & whipped cream.',
    image: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?auto=format&fit=crop&w=600&q=80',
    available: true,
    customizable: true,
    options: { variant: ['Plain (₹55)', 'Crush (₹65)', 'Ice Cream (₹75)', 'Both (₹90)'] }
  },
  {
    id: 'c7',
    name: 'Irish Coffee',
    category: 'cold_coffee',
    price: 55,
    description: 'Smooth Irish cream flavored cold brew espresso.',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
    available: true,
    customizable: true,
    options: { variant: ['Plain (₹55)', 'Crush (₹65)', 'Ice Cream (₹75)', 'Both (₹90)'] }
  },
  {
    id: 'c8',
    name: 'Black Forest Coffee',
    category: 'cold_coffee',
    price: 55,
    description: 'Chocolate & wild berry cold coffee topped with choco flakes.',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80',
    available: true,
    customizable: true,
    options: { variant: ['Plain (₹55)', 'Crush (₹65)', 'Ice Cream (₹75)', 'Both (₹90)'] }
  },
  {
    id: 'c9',
    name: 'Oreo Coffee',
    category: 'cold_coffee',
    price: 55,
    description: 'Blended with real crunchy Oreo biscuits.',
    image: 'https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?auto=format&fit=crop&w=600&q=80',
    available: true,
    customizable: true,
    options: { variant: ['Plain (₹55)', 'Crush (₹65)', 'Ice Cream (₹75)', 'Both (₹90)'] }
  },
  {
    id: 'c10',
    name: 'Kit-Kat Coffee',
    category: 'cold_coffee',
    price: 55,
    description: 'Blended with Kit-Kat chocolate finger bars.',
    image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=600&q=80',
    available: true,
    customizable: true,
    options: { variant: ['Plain (₹55)', 'Crush (₹65)', 'Ice Cream (₹75)', 'Both (₹90)'] }
  },

  // 2. HOT COFFEE & CHAI
  {
    id: 'h1',
    name: 'Espresso Italiano',
    category: 'hot',
    price: 40,
    description: 'Intense single origin dark roast espresso shot.',
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'h2',
    name: 'Artisan Cappuccino',
    category: 'hot',
    price: 60,
    description: 'Silky micro-foam, rich espresso & dusted cocoa powder.',
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'h3',
    name: 'Cafe Latte',
    category: 'hot',
    price: 65,
    description: 'Smooth espresso with velvety steamed fresh milk.',
    image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'h4',
    name: 'Hot Belgian Chocolate',
    category: 'hot',
    price: 70,
    description: 'Thick molten Belgian dark chocolate drink.',
    image: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'h5',
    name: 'Special Masala Chai',
    category: 'hot',
    price: 25,
    description: 'Slow-brewed Assam tea with cardamom, clove & ginger.',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'h6',
    name: 'Cardamom Ginger Chai',
    category: 'hot',
    price: 30,
    description: 'Aromatic elaichi and freshly crushed adrak tea.',
    image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'h7',
    name: 'Organic Green Tea',
    category: 'hot',
    price: 35,
    description: 'Handpicked antioxidant rich whole green tea leaves.',
    image: 'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?auto=format&fit=crop&w=600&q=80',
    available: true
  },

  // 3. SHAKES & MASTANI
  {
    id: 'sk1',
    name: 'Mango Mastani',
    category: 'shakes',
    price: 80,
    description: 'Pune specialty thick mango shake with vanilla ice cream & dry fruits.',
    image: 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'sk2',
    name: 'Chocolate Mastani',
    category: 'shakes',
    price: 80,
    description: 'Thick chocolate shake topped with choco ice cream & almonds.',
    image: 'https://images.unsplash.com/photo-1572498839857-4ae2a7c58577?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'sk3',
    name: 'Real Strawberry Shake',
    category: 'shakes',
    price: 70,
    description: 'Fresh Mahabaleshwar strawberries blended with creamy milk.',
    image: 'https://images.unsplash.com/photo-1553787499-6f9133860278?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'sk4',
    name: 'Rich Cream Vanilla Shake',
    category: 'shakes',
    price: 65,
    description: 'Classic Madagascar vanilla ice cream shake.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
    available: true
  },

  // 4. CAD & MONSTER SHAKES
  {
    id: 'cad1',
    name: 'Cad-B (Dark Chocolate)',
    category: 'cad_shakes',
    price: 90,
    description: 'World-famous ultra-dense chocolate cad milkshake.',
    image: 'https://images.unsplash.com/photo-1582293041079-7814c2f12063?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'cad2',
    name: 'Cad-M (White Chocolate)',
    category: 'cad_shakes',
    price: 90,
    description: 'Velvety rich white chocolate cad shake with white flakes.',
    image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'cad3',
    name: 'Monster KitKat Shake',
    category: 'cad_shakes',
    price: 120,
    description: 'Monster mason jar loaded with KitKat, whipped cream & fudge.',
    image: 'https://images.unsplash.com/photo-1577805947697-89e18249d767?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'cad4',
    name: 'Monster Brownie Lava Shake',
    category: 'cad_shakes',
    price: 130,
    description: 'Giant shake crowned with an entire warm chocolate brownie.',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80',
    available: true
  },

  // 5. PIZZAS & MOMOS
  {
    id: 'p1',
    name: 'Veg Momos',
    category: 'pizza',
    price: 60,
    description: 'Stuffed vegetable dumplings with spicy fiery red chutney.',
    image: 'https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?auto=format&fit=crop&w=600&q=80',
    available: true,
    customizable: true,
    options: { preparation: ['Steam (₹60)', 'Fried (₹80)'] }
  },
  {
    id: 'p2',
    name: 'Paneer Momos',
    category: 'pizza',
    price: 80,
    description: 'Soft cottage cheese paneer momos with herbs.',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80',
    available: true,
    customizable: true,
    options: { preparation: ['Steam (₹80)', 'Fried (₹90)'] }
  },
  {
    id: 'p3',
    name: 'Peri Peri Veg Momos',
    category: 'pizza',
    price: 70,
    description: 'Spicy Peri Peri tossed crispy fried momos.',
    image: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=600&q=80',
    available: true,
    customizable: true,
    options: { preparation: ['Steam (₹70)', 'Fried (₹90)'] }
  },
  {
    id: 'p4',
    name: 'Peri Peri Paneer Momos',
    category: 'pizza',
    price: 90,
    description: 'Spicy Peri Peri spiced paneer momos.',
    image: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=600&q=80',
    available: true,
    customizable: true,
    options: { preparation: ['Steam (₹90)', 'Fried (₹100)'] }
  },
  {
    id: 'p5',
    name: 'Veg Cheese Pizza',
    category: 'pizza',
    price: 90,
    description: 'Crisp hand-stretched crust with mozzarella, capsicum & onion.',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
    available: true,
    customizable: true,
    options: { size: ['Small (₹90)', 'Medium (₹120)'] }
  },
  {
    id: 'p6',
    name: 'Margherita Pizza',
    category: 'pizza',
    price: 90,
    description: 'Classic Italian tomato sauce & double mozzarella cheese.',
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=600&q=80',
    available: true,
    customizable: true,
    options: { size: ['Small (₹90)', 'Medium (₹120)'] }
  },
  {
    id: 'p7',
    name: 'Jain Pizza',
    category: 'pizza',
    price: 120,
    description: 'Prepared strictly without onion or garlic with bell peppers.',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80',
    available: true,
    customizable: true,
    options: { size: ['Small (₹120)', 'Medium (₹150)'] }
  },
  {
    id: 'p8',
    name: 'Sweetcorn Pizza',
    category: 'pizza',
    price: 120,
    description: 'Golden sweetcorn kernels with gooey melted mozzarella.',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=600&q=80',
    available: true,
    customizable: true,
    options: { size: ['Small (₹120)', 'Medium (₹150)'] }
  },
  {
    id: 'p10',
    name: 'Paneer Makhani Pizza',
    category: 'pizza',
    price: 150,
    description: 'Smoky tandoori paneer in rich royal makhani sauce.',
    image: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=600&q=80',
    available: true,
    customizable: true,
    options: { size: ['Small (₹150)', 'Medium (₹170)'] }
  },

  // 6. SANDWICHES & ROLLS
  {
    id: 'w1',
    name: 'Bread Butter',
    category: 'sandwiches',
    price: 40,
    description: 'Fresh white bread slices spread with pure Amul butter.',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'w2',
    name: 'Veg Sandwich',
    category: 'sandwiches',
    price: 70,
    description: 'Cucumber, tomato, potato & spicy mint chutney sandwich.',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'w3',
    name: 'Cheese Sandwich',
    category: 'sandwiches',
    price: 80,
    description: 'Stuffed with double grated cheddar & processed cheese.',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'w5',
    name: 'Grill Sandwich',
    category: 'sandwiches',
    price: 90,
    description: 'Crisp golden grilled vegetable sandwich with spices.',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'w6',
    name: 'Grill Cheese Sandwich',
    category: 'sandwiches',
    price: 100,
    description: 'Melted cheese overload in toasted buttery grilled bread.',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'w9',
    name: 'Veg Roll',
    category: 'sandwiches',
    price: 70,
    description: 'Spiced vegetable stuffing rolled in soft flaky paratha.',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'w10',
    name: 'Paneer Roll',
    category: 'sandwiches',
    price: 90,
    description: 'Char-grilled tandoori paneer tikka stuffed roll with onions.',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80',
    available: true
  },

  // 7. BURGERS & GARLIC BREAD
  {
    id: 't1',
    name: 'Masala Toast',
    category: 'burgers_toast',
    price: 50,
    description: 'Crispy toasted bread with spiced potato masala & chutney.',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 't2',
    name: 'Cheese Toast',
    category: 'burgers_toast',
    price: 50,
    description: 'Golden toast smothered in melted butter & cheese.',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 't3',
    name: 'Jeera Toast',
    category: 'burgers_toast',
    price: 40,
    description: 'Toasted bread with aromatic roasted cumin spices.',
    image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 't4',
    name: 'Cheese Chilli Toast',
    category: 'burgers_toast',
    price: 60,
    description: 'Melted cheese topped with chopped green chillies & oregano.',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 't5',
    name: 'Garlic Toast',
    category: 'burgers_toast',
    price: 60,
    description: 'Crispy toast infused with roasted herb garlic butter.',
    image: 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'gb1',
    name: 'Garlic Bread Cheese',
    category: 'burgers_toast',
    price: 90,
    description: 'Baked French loaf with garlic butter & mozzarella.',
    image: 'https://images.unsplash.com/photo-1619895092538-128341789043?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'gb2',
    name: 'Garlic Bread With Corn',
    category: 'burgers_toast',
    price: 100,
    description: 'Garlic bread topped with sweet corn & extra cheese.',
    image: 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'bg1',
    name: 'Veg Burger',
    category: 'burgers_toast',
    price: 70,
    description: 'Crispy vegetable patty with fresh veggies & mayo.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'bg2',
    name: 'Veg Cheese Burger',
    category: 'burgers_toast',
    price: 80,
    description: 'Crispy patty with a thick slice of melted cheese.',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'bg3',
    name: 'Double Cheese Burger',
    category: 'burgers_toast',
    price: 90,
    description: 'Double cheese slices over hot spiced vegetable patty.',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'bg4',
    name: 'Jumbo Burger',
    category: 'burgers_toast',
    price: 120,
    description: 'Giant double patty burger loaded with cheese & special sauce.',
    image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&w=600&q=80',
    available: true
  },

  // 8. PASTA, FRIES & SNACKS
  {
    id: 'ps1',
    name: 'Cheese Pasta (White Sauce)',
    category: 'pasta_fries',
    price: 150,
    description: 'Penne pasta in rich garlic cheesy white Alfredo sauce.',
    image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'ps2',
    name: 'Italian Pasta (Red Sauce)',
    category: 'pasta_fries',
    price: 160,
    description: 'Tangy Italian tomato arrabbiata sauce pasta with herbs.',
    image: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281270?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'ps3',
    name: 'Delight Pasta (Pink Sauce)',
    category: 'pasta_fries',
    price: 180,
    description: 'Creamy mixed pink sauce pasta with bell peppers & basil.',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'fr1',
    name: 'Fries Salted',
    category: 'pasta_fries',
    price: 60,
    description: 'Crispy golden potato French fries lightly salted.',
    image: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'fr2',
    name: 'Fries Peri Peri (Masala)',
    category: 'pasta_fries',
    price: 80,
    description: 'Hot crispy fries tossed in zesty Peri Peri seasoning.',
    image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'fr3',
    name: 'Cheese Peri Peri Fries',
    category: 'pasta_fries',
    price: 90,
    description: 'Peri Peri fries smothered in velvety molten cheddar cheese.',
    image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'fr4',
    name: 'Cheese Corn Nuggets',
    category: 'pasta_fries',
    price: 70,
    description: 'Crisp golden bites oozing with molten cheese & sweetcorn.',
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=600&q=80',
    available: true
  },

  // 9. MAGGI & NACHOS
  {
    id: 'mg1',
    name: 'Plain Maggi',
    category: 'maggi',
    price: 50,
    description: 'Hot 2-minute nostalgic classic Maggi noodles.',
    image: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'mg2',
    name: 'Veg Maggi',
    category: 'maggi',
    price: 60,
    description: 'Maggi noodles tossed with butter, peas & carrots.',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'mg3',
    name: 'Schezwan Maggi',
    category: 'maggi',
    price: 70,
    description: 'Spicy wok-tossed Schezwan sauce Maggi with garlic.',
    image: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'mg5',
    name: 'Cheese Maggi',
    category: 'maggi',
    price: 70,
    description: 'Topped with generous grated cheese that melts on top.',
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'n1',
    name: 'Nacho Cheese',
    category: 'maggi',
    price: 70,
    description: 'Crunchy Mexican tortilla nachos served with warm cheese dip.',
    image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=600&q=80',
    available: true,
    customizable: true,
    options: { variant: ['Plain (₹70)', 'Cheese Dip (₹100)'] }
  },

  // 10. MOCKTAILS & JUICES
  {
    id: 'mk2',
    name: 'Limo Mocktail',
    category: 'mocktails',
    price: 80,
    description: 'Zesty lemon mint sparkling soda cooler.',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'mk3',
    name: 'Blue Curacao',
    category: 'mocktails',
    price: 80,
    description: 'Tropical blue ocean citrus soda mocktail.',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'mk4',
    name: 'Mint Mojito',
    category: 'mocktails',
    price: 80,
    description: 'Fresh crushed mint leaves, key lime & sparkling fizz.',
    image: 'https://images.unsplash.com/photo-1546171753-97d7676e4602?auto=format&fit=crop&w=600&q=80',
    available: true
  },

  // 11. BROWNIES, LASSI & DESSERTS
  {
    id: 'b1',
    name: 'Hot Brownie',
    category: 'desserts',
    price: 80,
    description: 'Warm dark chocolate fudge brownie with gooey center.',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'b3',
    name: 'Hot Brownie With Ice Cream',
    category: 'desserts',
    price: 110,
    description: 'Hot brownie topped with vanilla scoop & hot chocolate fudge.',
    image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'b4',
    name: 'Sizzling Brownie',
    category: 'desserts',
    price: 150,
    description: 'Cast iron sizzling hot plate brownie with fudge & ice cream.',
    image: 'https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'ls1',
    name: 'Sweet Lassi',
    category: 'desserts',
    price: 40,
    description: 'Thick traditional Punjabi curd lassi topped with malai.',
    image: 'https://images.unsplash.com/photo-1571006682885-783709b17789?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'ls4',
    name: 'Spl. Lassi',
    category: 'desserts',
    price: 80,
    description: 'Special rabdi, saffron, pistachio & dry fruit loaded lassi.',
    image: 'https://images.unsplash.com/photo-1553787499-6f9133860278?auto=format&fit=crop&w=600&q=80',
    available: true
  }
];

export const INITIAL_TABLES = [
  { id: 1, name: 'Table 01', capacity: 2, section: 'Main Hall', status: 'occupied', waiterId: 'w1' },
  { id: 2, name: 'Table 02', capacity: 4, section: 'Main Hall', status: 'bill_requested', waiterId: 'w1' },
  { id: 3, name: 'Table 03', capacity: 2, section: 'Main Hall', status: 'vacant', waiterId: null },
  { id: 4, name: 'Table 04', capacity: 6, section: 'Window View', status: 'occupied', waiterId: 'w2' },
  { id: 5, name: 'Table 05', capacity: 2, section: 'Window View', status: 'vacant', waiterId: null },
  { id: 6, name: 'Table 06', capacity: 4, section: 'Terrace Garden', status: 'occupied', waiterId: 'w3' },
  { id: 7, name: 'Table 07', capacity: 4, section: 'Terrace Garden', status: 'vacant', waiterId: null },
  { id: 8, name: 'Table 08', capacity: 8, section: 'VIP Lounge', status: 'reserved', waiterId: 'w2' },
  { id: 9, name: 'Table 09', capacity: 2, section: 'Bar Counter', status: 'vacant', waiterId: null },
  { id: 10, name: 'Table 10', capacity: 2, section: 'Bar Counter', status: 'vacant', waiterId: null }
];

export const INITIAL_WAITERS = [
  { id: 'w1', name: 'Rahul Sharma', pin: '1111', role: 'Senior Waiter', avatar: '👨‍🍳', section: 'Main Hall', activeCount: 2 },
  { id: 'w2', name: 'Priya Patel', pin: '2222', role: 'Barista & Server', avatar: '👩‍🌾', section: 'Window View & VIP', activeCount: 1 },
  { id: 'w3', name: 'Amit Verma', pin: '3333', role: 'Terrace Specialist', avatar: '🧑‍🍳', section: 'Terrace Garden', activeCount: 1 },
  { id: 'w4', name: 'Sneha Deshmukh', pin: '4444', role: 'Floor Host', avatar: '👩‍💼', section: 'Bar Counter', activeCount: 0 }
];

export const INITIAL_ORDERS = [
  {
    id: 'ORD-1001',
    tableId: 1,
    tableName: 'Table 01',
    waiterId: 'w1',
    waiterName: 'Rahul Sharma',
    createdAt: new Date(Date.now() - 25 * 60000).toISOString(),
    status: 'preparing',
    paymentStatus: 'unpaid',
    items: [
      { id: 'c1', name: 'Cold Coffee (Classic)', quantity: 2, price: 30, notes: 'Ice Cream (₹50)' },
      { id: 'gb1', name: 'Garlic Bread Cheese', quantity: 1, price: 90, notes: 'Extra Cheese' }
    ],
    subtotal: 190,
    tax: 9.5,
    serviceCharge: 9.5,
    discountAmount: 0,
    total: 209
  },
  {
    id: 'ORD-1002',
    tableId: 2,
    tableName: 'Table 02',
    waiterId: 'w1',
    waiterName: 'Rahul Sharma',
    createdAt: new Date(Date.now() - 45 * 60000).toISOString(),
    status: 'ready',
    paymentStatus: 'unpaid',
    items: [
      { id: 'ps1', name: 'Cheese Pasta (White Sauce)', quantity: 1, price: 150, notes: '' },
      { id: 'bg2', name: 'Veg Cheese Burger', quantity: 2, price: 80, notes: '' },
      { id: 'fr2', name: 'Fries Peri Peri (Masala)', quantity: 1, price: 80, notes: '' }
    ],
    subtotal: 390,
    tax: 19.5,
    serviceCharge: 19.5,
    discountAmount: 39,
    discountCode: 'WELCOME10',
    total: 390
  }
];

export const INITIAL_DISCOUNTS = [
  { code: 'WELCOME10', percentage: 10, type: 'percent', description: '10% off for first-time guests' },
  { code: 'CAFE20', percentage: 20, type: 'percent', description: '20% Special discount' },
  { code: 'HAPPYHOUR', flat: 30, type: 'flat', description: '₹30 off during happy hour' }
];

export const SHOP_INFO = {
  name: 'Cafe Pailwan',
  tagline: 'Specialty Cold Coffee, Shakes, Pizzas, Momos & Indian Food',
  address: 'Shop 12, Station Road, Opp. City Mall',
  phone: '+91 98765 43210',
  gstin: '27AABCU9603R1ZM',
  taxRate: 5,
  serviceChargeRate: 5,
  currency: '₹'
};
