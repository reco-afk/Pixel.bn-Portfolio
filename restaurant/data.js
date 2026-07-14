window.RUMBIA = {
  restaurant: {
    name: "Rumbia",
    descriptor: "Bruneian and Southeast Asian kitchen",
    location: "Kiulap, Bandar Seri Begawan",
    email: "hello@rumbia.example",
    phone: "+673 222 0148",
    hours: [
      ["Tuesday to Thursday", "5:30 pm - 10:00 pm"],
      ["Friday to Sunday", "12:00 pm - 10:30 pm"],
      ["Monday", "Closed"]
    ]
  },
  navigation: [
    ["Home", "index.html", "home"],
    ["Menu", "menu.html", "menu"],
    ["Reservations", "reservations.html", "reservations"],
    ["About", "about.html", "about"],
    ["Visit", "about.html#visit", "visit"]
  ],
  categories: [
    { id: "small-plates", label: "Small plates", malay: "Pembuka selera" },
    { id: "ambuyat-rice", label: "Ambuyat and rice", malay: "Ambuyat dan nasi" },
    { id: "sea", label: "From the sea", malay: "Hasil laut" },
    { id: "grill", label: "Charcoal grill", malay: "Panggang arang" },
    { id: "vegetables", label: "Vegetables", malay: "Sayur-sayuran" },
    { id: "sweets", label: "Sweets", malay: "Pencuci mulut" },
    { id: "drinks", label: "Drinks", malay: "Minuman" }
  ],
  dishes: [
    { category: "small-plates", name: "Udang Cucur", description: "Crisp prawn fritters, torch ginger, cucumber and chilli vinegar.", price: 8.5, dietary: "Shellfish" },
    { category: "small-plates", name: "Satay Arang", description: "Charcoal chicken skewers, peanut-tamarind sauce, compressed rice and relish.", price: 11, dietary: "Contains peanuts", image: "assets/satay.webp" },
    { category: "small-plates", name: "Kerabu Pakis", description: "Young fern tips, calamansi, toasted coconut and shallot.", price: 9, dietary: "Vegan" },
    { category: "ambuyat-rice", name: "Ambuyat Tiga Cacah", description: "Sago starch with three house dips, grilled aubergine and seasonal greens.", price: 16, dietary: "Vegetarian" },
    { category: "ambuyat-rice", name: "Nasi Katok Rumbia", description: "Steamed rice, crisp spiced chicken, sambal merah and cucumber.", price: 12.5, dietary: "Medium heat" },
    { category: "ambuyat-rice", name: "Nasi Hujan Panas", description: "Fragrant coloured rice, slow-braised beef, pickled pineapple and herbs.", price: 19, dietary: "Gluten free" },
    { category: "sea", name: "Ikan Bakar Asam", description: "Whole grilled sea bass, tamarind, turmeric, local herbs and calamansi.", price: 27, dietary: "Fish", image: "assets/hero-spread.webp" },
    { category: "sea", name: "Udang Lemak Kunyit", description: "Prawns, turmeric coconut sauce, torch ginger and lime leaf.", price: 23, dietary: "Shellfish", image: "assets/prawns.webp" },
    { category: "sea", name: "Sotong Sambal Hitam", description: "Grilled squid, dark chilli sambal, green mango and roasted sesame.", price: 18.5, dietary: "Shellfish" },
    { category: "grill", name: "Ayam Percik Arang", description: "Charred chicken, spiced coconut glaze, herb salad and lime.", price: 20, dietary: "Gluten free" },
    { category: "grill", name: "Daging Rendang Panggang", description: "Grilled beef, dry coconut rendang, cassava leaf and crisp shallot.", price: 25, dietary: "Medium heat" },
    { category: "grill", name: "Kambing Serai", description: "Lemongrass lamb shoulder, smoked aubergine and tamarind jus.", price: 28, dietary: "Gluten free" },
    { category: "vegetables", name: "Terung Sambal", description: "Fire-roasted aubergine, tomato sambal, basil and toasted peanut.", price: 13, dietary: "Vegan, contains peanuts" },
    { category: "vegetables", name: "Labu Lemak", description: "Pumpkin, coconut, turmeric leaf, long bean and chilli oil.", price: 14, dietary: "Vegan" },
    { category: "vegetables", name: "Tauhu Kicap Lada", description: "Crisp tofu, black pepper soy, spring onion and jasmine rice.", price: 15, dietary: "Vegetarian" },
    { category: "sweets", name: "Sago Gula Apong", description: "Chilled sago, palm sugar, coconut cream and sea salt.", price: 8, dietary: "Vegan" },
    { category: "sweets", name: "Kuih Sapit Semifreddo", description: "Coconut semifreddo, crisp wafer and roasted pineapple.", price: 10, dietary: "Contains dairy" },
    { category: "sweets", name: "Pisang Panggang", description: "Grilled banana, gula apong caramel and peanut crumble.", price: 9, dietary: "Contains peanuts" },
    { category: "drinks", name: "Calamansi Asam Boi", description: "Calamansi, preserved plum, soda and mint.", price: 5.5, dietary: "Alcohol free" },
    { category: "drinks", name: "Pandan Barley", description: "Toasted barley, pandan, lemon and soda.", price: 5, dietary: "Alcohol free" },
    { category: "drinks", name: "Kopi Gula Apong", description: "Cold coffee, palm sugar and coconut foam.", price: 6.5, dietary: "Contains caffeine" }
  ],
  reservationTimes: ["5:30 pm", "6:00 pm", "6:30 pm", "7:15 pm", "7:45 pm", "8:30 pm", "9:00 pm"]
};
