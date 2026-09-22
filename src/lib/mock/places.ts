import { VeganPlace, TrendingTopic } from "./types";

export const VEGAN_PLACES: VeganPlace[] = [
  {
    id: "p1",
    name: "Hum Vegetarian Café & Restaurant",
    district: "District 3",
    address: "32 Võ Văn Tần, Ward 6, District 3, HCMC",
    distance: "1.2 km",
    rating: 4.8,
    reviewsCount: 1420,
    type: "Vegetarian",
    openingHours: "10:00 - 22:00",
    popularDish: "Pineapple Fried Rice & Lotus Leaf Salad",
    x: 28,
    y: 36,
  },
  {
    id: "p2",
    name: "Organik Grocer & Herb Kitchen",
    district: "Thảo Điền",
    address: "11B Thảo Điền, District 2, Thu Duc City",
    distance: "3.8 km",
    rating: 4.6,
    reviewsCount: 512,
    type: "Grocer",
    openingHours: "08:00 - 20:30",
    popularDish: "Fresh Organic Produce & Artisanal Tempeh",
    x: 76,
    y: 24,
  },
  {
    id: "p3",
    name: "Loving Hut Hoa Đăng",
    district: "District 1",
    address: "38 Huỳnh Khương Ninh, Đa Kao, District 1, HCMC",
    distance: "2.1 km",
    rating: 4.7,
    reviewsCount: 890,
    type: "Vegan",
    openingHours: "09:30 - 21:30",
    popularDish: "Mushroom Claypot & Veggie Pho",
    x: 48,
    y: 42,
  },
  {
    id: "p4",
    name: "Zero Waste Saigon Grocer",
    district: "Bình Thạnh",
    address: "24 Nguyễn Cửu Vân, Ward 17, Bình Thạnh",
    distance: "2.7 km",
    rating: 4.5,
    reviewsCount: 340,
    type: "Grocer",
    openingHours: "09:00 - 21:00",
    popularDish: "Bulk Nuts, Seeds & Nutritional Yeast",
    x: 58,
    y: 58,
  },
  {
    id: "p5",
    name: "The Green Box Botanical Café",
    district: "District 1",
    address: "85 Pasteur, Bến Nghé, District 1, HCMC",
    distance: "1.5 km",
    rating: 4.7,
    reviewsCount: 670,
    type: "Café",
    openingHours: "07:30 - 22:00",
    popularDish: "Cold-pressed Green Juice & Acai Bowls",
    x: 42,
    y: 68,
  },
  {
    id: "p6",
    name: "Bếp Chay An Lạc",
    district: "Phú Nhuận",
    address: "142 Phan Xích Long, Ward 2, Phú Nhuận",
    distance: "3.2 km",
    rating: 4.8,
    reviewsCount: 420,
    type: "Vegan",
    openingHours: "08:00 - 21:00",
    popularDish: "Lemongrass Tofu Rice & Steamed Dumplings",
    x: 22,
    y: 62,
  },
];

export const SHOP_FILTERS = ["All", "Vegan", "Vegetarian", "Grocer", "Café"] as const;

export const SUGGESTED_FOOD_SPOTS = [
  {
    dish: "Crispy Lemongrass Tofu Bowl",
    places: [
      { name: "Hum Vegetarian Café", distance: "1.2 km", price: "85,000 VND" },
      { name: "Bếp Chay An Lạc", distance: "3.2 km", price: "55,000 VND" },
    ],
  },
  {
    dish: "Creamy Coconut Lime Noodle Soup",
    places: [
      { name: "Loving Hut Hoa Đăng", distance: "2.1 km", price: "70,000 VND" },
    ],
  },
];

export const TRENDING_TOPICS: TrendingTopic[] = [
  { tag: "#highprotein", posts: "1.4k posts" },
  { tag: "#fermentation", posts: "890 posts" },
  { tag: "#mealprep", posts: "2.1k posts" },
  { tag: "#saigonvegan", posts: "640 posts" },
];
