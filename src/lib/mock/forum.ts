import { ForumPost } from "./types";

export const FORUM_CATEGORIES = [
  "All discussions",
  "Recipes & Tips",
  "Nutrition & B12",
  "Restaurant Finds",
  "Beginners Guide",
  "Saigon Vegan Community",
];

export const FORUM_POSTS: ForumPost[] = [
  {
    id: "f1",
    title: "How I hit 120g plant protein daily in Saigon without protein powder",
    excerpt: "Breakdown of my daily meal plan using locally sourced tempeh, seitan, lentils, and pumpkin seed butter. Macros and cost breakdown included!",
    content: `Plant-based protein in Southeast Asia is surprisingly affordable and abundant if you tap into traditional markets instead of relying exclusively on imported protein powders.

### My daily staple protein sources:
1. **Fresh artisan tempeh**: 200g provides ~38g of complete protein. I buy fresh unpasteurized cakes from local makers in District 3.
2. **Homemade Seitan (Mì Căn)**: Washed wheat flour dough braised with ginger and soy sauce gives 45g of protein for under $1.
3. **Mung bean & Red lentil dahl**: Packed with prebiotic fiber and lysine, essential for collagen synthesis.
4. **Roasted pumpkin & watermelon seeds**: High in zinc and leucine, great sprinkled over breakfast oats or lunchtime salads.

### Sample Day Breakdown:
- **Breakfast**: High-protein chia oats with soy milk, peanut butter, hemp hearts (30g protein).
- **Lunch**: Grilled lemongrass tempeh with red rice, morning glory, and edamame (45g protein).
- **Dinner**: Tofu & mushroom hotpot with fresh greens, konjac, and peanut dipping sauce (45g protein).

Total protein: **120g**. Feeling energized, recovered from workouts, and spending less than 150,000 VND per day!`,
    author: "Minh Duc",
    authorHandle: "@duc.plants",
    authorInitials: "MD",
    verified: true,
    category: "Nutrition & B12",
    tags: ["#highprotein", "#mealprep", "#saigonvegan", "#fitness"],
    votes: 84,
    commentsCount: 16,
    timestamp: "3 hours ago",
    comments: [
      {
        id: "fc1",
        author: "Linh Nguyen",
        authorInitials: "LN",
        verified: true,
        content: "Love this breakdown Minh! Where do you buy your fresh tempeh in D3? Would love to visit the maker.",
        timestamp: "2 hours ago",
        votes: 12,
      },
      {
        id: "fc2",
        author: "Alex Foster",
        authorInitials: "AF",
        verified: false,
        content: "Can confirm homemade seitan is a total gamechanger for macros. Great post!",
        timestamp: "1 hour ago",
        votes: 5,
      },
    ],
  },
  {
    id: "f2",
    title: "The Ultimate Guide to Plant-Based Calcium & B12 in Vietnam",
    excerpt: "Everything you need to know about methylcobalamin vs cyanocobalamin, plus regional calcium sources like sesame seeds and Asian greens.",
    content: `Vitamin B12 and calcium are the two nutrients every plant-eater needs to pay mindful attention to. Here is an evidence-based breakdown:

### Vitamin B12: Non-negotiable
- Plants do not synthesize B12. Fermented foods like nutritional yeast, tempeh, or kombucha contain inactive corrinoids (pseudo-B12) that do not adequately raise serum B12.
- **Recommended**: 2500 mcg Cyanocobalamin once weekly, or 250 mcg daily sublingually.

### Bioavailable Calcium Sources in Vietnam:
- **White sesame paste (Tahini)**: 2 tablespoons deliver 130mg calcium.
- **Bok choy & Gai lan**: Have higher calcium absorption rates (>50%) than cow's milk because they are low in oxalates.
- **Calcium-set tofu**: Check the package for calcium sulfate (thạch cao thực phẩm). 100g supplies up to 350mg!`,
    author: "Dr. Lan Huynh",
    authorHandle: "@lan.nutrition",
    authorInitials: "LH",
    verified: true,
    category: "Nutrition & B12",
    tags: ["#b12", "#nutrition", "#calcium", "#evidencebased"],
    votes: 142,
    commentsCount: 29,
    timestamp: "1 day ago",
    comments: [],
  },
  {
    id: "f3",
    title: "Hidden gems: 5 non-touristy vegetarian noodle houses in Bình Thạnh",
    excerpt: "From 30k VND hủ tiếu chay to herb-loaded bún riêu chay that rival traditional broths. Tested and reviewed with map coordinates.",
    content: `Bình Thạnh has quietly developed one of the most vibrant local vegetarian scenes in Ho Chi Minh City. Here are 5 spots frequented by locals:

1. **Quán Chay Pháp Hoa** (Nguyễn Văn Đậu): Famous for mushroom-stuffed crispy wontons and slow-simmered herbal noodle soup.
2. **Hủ Tiếu Chay Cây Bồ Đề** (Bạch Đằng): Clear sweet broth made from dried daikon, carrots, and sweet corn.
3. **Bún Riêu Chay Cô Ba** (Lê Quang Định): Tofu curd riêu with fresh tomatoes and water spinach.
4. **Cơm Chay Thanh Lương**: 40+ seasonal home-style stir fries and braised claypots daily.
5. **Tiệm Chè & Trà Thảo Mộc**: Perfect sweet finale with lotus seed longan sweet soup.`,
    author: "Mai Tran",
    authorHandle: "@mai.bowls",
    authorInitials: "MT",
    verified: true,
    category: "Restaurant Finds",
    tags: ["#saigonvegan", "#noodles", "#budgetfriendly"],
    votes: 95,
    commentsCount: 11,
    timestamp: "2 days ago",
    comments: [],
  },
  {
    id: "f4",
    title: "Beginner Vegan Pantry Checklist: What to buy on your first grocery run",
    excerpt: "A simple, stress-free guide to stocking your kitchen with flavorful essentials without spending a fortune on specialty products.",
    content: `Starting a plant-based journey can feel overwhelming if you think you need exotic imported products. Here is the realistic beginner checklist:

- **Grains**: Brown jasmine rice, rolled oats, rice noodles, quinoa.
- **Legumes**: Canned or dried chickpeas, green mung beans, red lentils.
- **Flavor bombs**: Nutritional yeast, tamari, miso paste, smoked paprika, garlic powder.
- **Healthy Fats**: Cold-pressed sesame oil, flaxseeds, raw cashews for making creamy sauces.`,
    author: "Sarah Jenkins",
    authorHandle: "@sarah.eats",
    authorInitials: "SJ",
    verified: false,
    category: "Beginners Guide",
    tags: ["#beginners", "#pantry", "#groceryhaul"],
    votes: 68,
    commentsCount: 8,
    timestamp: "3 days ago",
    comments: [],
  },
];
