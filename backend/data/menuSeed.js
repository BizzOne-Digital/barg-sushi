// ============================================================
// BARG SUSHI BAR & GRILL — COMPLETE MENU SEED DATA
// Extracted from client-provided menu photos (100+ items)
// ============================================================

const menuItems = [

  // ─────────────────────────────────────────
  // APPETIZERS / HORS-D'ŒUVRE
  // ─────────────────────────────────────────
  { name: "Fries", nameFr: "Frites", category: "Appetizers", price: 8, description: "Classic fries.", descriptionFr: "Frites classiques.", pieces: null, image: null, available: true, featured: false },
  { name: "Sweet Potato Fries", nameFr: "Frites Patates Douce", category: "Appetizers", price: 10, description: "Crispy sweet potato fries.", descriptionFr: "Frites de patate douce croustillantes.", pieces: null, image: null, available: true, featured: false },
  { name: "Edamame", nameFr: "Edamame", category: "Appetizers", price: 10, description: "Steamed edamame.", descriptionFr: "Edamame vapeur.", pieces: null, image: null, available: true, featured: false },
  { name: "Soup of the Day", nameFr: "Soupe du Jour", category: "Appetizers", price: 7, description: "Ask your server for today's soup.", descriptionFr: "Demandez à votre serveur.", pieces: null, image: null, available: true, featured: false },
  { name: "Shrimp Tempura", nameFr: "Crevettes Tempura", category: "Appetizers", price: 15, description: "6 pieces of crispy shrimp tempura.", descriptionFr: "6 mcx de crevettes tempura croustillantes.", pieces: 6, image: null, available: true, featured: false },
  { name: "Wakame Salad", nameFr: "Salade Wakame", category: "Appetizers", price: 10, description: "Seaweed salad garnished with ponzu and carrots.", descriptionFr: "Salade d'algues, garnie de ponzu et de carottes.", pieces: null, image: null, available: true, featured: false },
  { name: "Kani Salad", nameFr: "Salade Kani", category: "Appetizers", price: 14, description: "Kani (mock crab) salad with crisp cucumber, creamy-spicy dressing, fresh avocado, and crispy puffed rice.", descriptionFr: "Salade de kani (surimi) avec concombres croquants, sauce crémeuse épicée, avocat frais et riz soufflé croustillant.", pieces: null, image: null, available: true, featured: false },

  // ─────────────────────────────────────────
  // DRINKS / BOISSONS
  // ─────────────────────────────────────────
  { name: "Water", nameFr: "Eau", category: "Drinks", price: 2, description: "Still water.", descriptionFr: "Eau plate.", pieces: null, image: null, available: true, featured: false },
  { name: "Soft Drinks", nameFr: "Boissons Gazeuses", category: "Drinks", price: 2.5, description: "Assorted soft drinks.", descriptionFr: "Boissons gazeuses assorties.", pieces: null, image: null, available: true, featured: false },
  { name: "Sanpellegrino", nameFr: "Sanpellegrino", category: "Drinks", price: 3.5, description: "Sparkling mineral water.", descriptionFr: "Eau minérale pétillante.", pieces: null, image: null, available: true, featured: false },
  { name: "Snapple", nameFr: "Snapple", category: "Drinks", price: 3.5, description: "Snapple iced tea.", descriptionFr: "Thé glacé Snapple.", pieces: null, image: null, available: true, featured: false },

  // ─────────────────────────────────────────
  // SALADS / SALADES
  // ─────────────────────────────────────────
  { name: "Kani Salad Bowl", nameFr: "Salade Kani", category: "Salads", price: 14, description: "Mock crabstick, cucumber, avocado, crispy puffed rice, spicy mayo.", descriptionFr: "Surimi, concombre, avocat, riz croustillant, mayo épicée.", pieces: null, image: null, available: true, featured: false },
  { name: "Wakame Salad Bowl", nameFr: "Salade Wakame", category: "Salads", price: 10, description: "Seaweed salad garnished with ponzu and carrots.", descriptionFr: "Salade d'algues, garnie de ponzu et de carottes.", pieces: null, image: null, available: true, featured: false },
  { name: "Wafu Salad", nameFr: "Salade Wafu", category: "Salads", price: 10, description: "Lettuce, cucumber, tomatoes, and blueberries topped with almonds, sunflower seeds, and crispy Asian noodles. Served with our Wafu dressing.", descriptionFr: "Laitue, concombre, tomates et bleuets, garnis d'amandes, de graines de tournesol et de nouilles asiatiques croustillantes, accompagné de notre vinaigrette Wafu maison.", pieces: null, image: null, available: true, featured: false },

  // ─────────────────────────────────────────
  // NIGIRI
  // ─────────────────────────────────────────
  { name: "Tuna Nigiri", nameFr: "Nigiri Thon", category: "Nigiri", price: 9, description: "Rice, tuna. 2 pcs.", descriptionFr: "Riz, thon. 2 mcx.", pieces: 2, image: null, available: true, featured: false },
  { name: "Masago Nigiri", nameFr: "Nigiri Masago", category: "Nigiri", price: 8, description: "Rice, nori, masago. 2 pcs.", descriptionFr: "Riz, nori, masago. 2 mcx.", pieces: 2, image: null, available: true, featured: false },
  { name: "Salmon Nigiri", nameFr: "Nigiri Saumon", category: "Nigiri", price: 7, description: "Rice, salmon. 2 pcs.", descriptionFr: "Riz, saumon. 2 mcx.", pieces: 2, image: null, available: true, featured: false },
  { name: "Hamachi Nigiri", nameFr: "Nigiri Hamachi", category: "Nigiri", price: 9, description: "Rice, hamachi. 2 pcs.", descriptionFr: "Riz, hamachi. 2 mcx.", pieces: 2, image: null, available: true, featured: false },

  // ─────────────────────────────────────────
  // SASHIMI
  // ─────────────────────────────────────────
  { name: "Salmon Sashimi", nameFr: "Sashimi Saumon", category: "Sashimi", price: 9, description: "3 pcs fresh salmon sashimi.", descriptionFr: "3 mcx de sashimi de saumon frais.", pieces: 3, image: null, available: true, featured: false },
  { name: "Hamachi Sashimi", nameFr: "Sashimi Hamachi", category: "Sashimi", price: 10, description: "3 pcs hamachi sashimi.", descriptionFr: "3 mcx de sashimi hamachi.", pieces: 3, image: null, available: true, featured: false },
  { name: "Tuna Sashimi", nameFr: "Sashimi Thon", category: "Sashimi", price: 10, description: "3 pcs fresh tuna sashimi.", descriptionFr: "3 mcx de sashimi de thon frais.", pieces: 3, image: null, available: true, featured: false },
  { name: "Masago Sashimi", nameFr: "Sashimi Masago", category: "Sashimi", price: 10, description: "2 pcs masago with cucumber.", descriptionFr: "2 mcx masago, concombre.", pieces: 2, image: null, available: true, featured: false },
  { name: "Sashimi Lovers", nameFr: "Amateurs de Sashimis", category: "Sashimi", price: 45, description: "4 pcs hamachi, 4 pcs tuna, 4 pcs salmon, 4 pcs seabass, mock crabstick. Served with ponzu sauce.", descriptionFr: "4 mcx hamachi, 4 mcx thon, 4 mcx saumon, 4 mcx loup de mer, surimi. Servi avec la sauce ponzu.", pieces: 16, image: null, available: true, featured: true },

  // ─────────────────────────────────────────
  // HAND ROLLS / CORNETS
  // ─────────────────────────────────────────
  { name: "Tuna Hand Roll", nameFr: "Cornet Thon", category: "Hand Rolls", price: 20, description: "2 pcs. Nori, chopped tuna, mock crabstick, tempura, avocado, spicy mayo and sweet sauce.", descriptionFr: "2 mcx. Nori, thon haché, simili crabe, tempura, avocat, mayonnaise épicée et sauce sucrée.", pieces: 2, image: null, available: true, featured: false },
  { name: "Salmon Hand Roll", nameFr: "Cornet Saumon", category: "Hand Rolls", price: 18, description: "2 pcs. Nori, chopped salmon, mock crabstick, tempura, avocado, spicy mayo and sweet sauce.", descriptionFr: "2 mcx. Nori, saumon haché, surimi, tempura, avocat, mayonnaise épicée et sauce sucrée.", pieces: 2, image: null, available: true, featured: false },

  // ─────────────────────────────────────────
  // OUR CLASSICS / INCONTOURNABLES
  // ─────────────────────────────────────────
  { name: "California", nameFr: "California", category: "Our Classics", price: 10, description: "8 pcs. Nori, rice, cucumber, mock crab, avocado.", descriptionFr: "8 mcx. Nori, riz, concombre, surimi, avocat.", pieces: 8, image: null, available: true, featured: false },
  { name: "Cucumber Roll", nameFr: "Concombre", category: "Our Classics", price: 7, description: "8 pcs. Nori, rice, cucumber.", descriptionFr: "8 mcx. Nori, riz, concombre.", pieces: 8, image: null, available: true, featured: false },
  { name: "Avocado Roll", nameFr: "Avocat", category: "Our Classics", price: 8, description: "8 pcs. Nori, rice, avocado.", descriptionFr: "8 mcx. Nori, riz, avocat.", pieces: 8, image: null, available: true, featured: false },
  { name: "Orange Alaska", nameFr: "Orange Alaska", category: "Our Classics", price: 16, description: "8 pcs. Nori, rice, salmon, avocado, cucumber. Topped with salmon.", descriptionFr: "8 mcx. Nori, riz, saumon, avocat, concombre. Garni de saumon.", pieces: 8, image: null, available: true, featured: false },
  { name: "Tiger Stripe", nameFr: "Tiger Stripe", category: "Our Classics", price: 15, description: "8 pcs. Nori, rice, fried mock crab, avocado. Topped with mock crab.", descriptionFr: "8 mcx. Nori, riz, surimi tempura, avocat. Garni de surimi.", pieces: 8, image: null, available: true, featured: false },
  { name: "New York", nameFr: "New York", category: "Our Classics", price: 12, description: "5 pcs. Nori, rice, fried mock crab, cucumber, avocado, lettuce.", descriptionFr: "5 mcx. Nori, riz, surimi frit, concombre, avocat, laitue.", pieces: 5, image: null, available: true, featured: false },
  { name: "Salmon Kamikaze", nameFr: "Kamikaze au Saumon", category: "Our Classics", price: 13, description: "5 pcs. Nori, rice, salmon, avocado, spicy mayo, tempura.", descriptionFr: "5 mcx. Nori, riz, saumon, avocat, mayonnaise épicée et tempura.", pieces: 5, image: null, available: true, featured: false },
  { name: "Dynamite", nameFr: "Dynamite", category: "Our Classics", price: 16, description: "8 pcs. Nori, rice, spicy tuna, avocado. Topped with red masago.", descriptionFr: "8 mcx. Nori, riz, thon épicé, avocat. Garni de masago rouge.", pieces: 8, image: null, available: true, featured: false },
  { name: "Boston", nameFr: "Boston", category: "Our Classics", price: 12, description: "8 pcs. Nori, rice, mock shrimp tempura, avocado, cucumber, lettuce.", descriptionFr: "8 mcx. Nori, riz, simili-crevette tempura, avocat, concombre, laitue.", pieces: 8, image: null, available: true, featured: false },

  // ─────────────────────────────────────────
  // VEGGIE ROLLS
  // ─────────────────────────────────────────
  { name: "Veggie Wrap", nameFr: "Wrap Végé", category: "Veggie Rolls", price: 15, description: "2 pcs. Rice paper, lettuce, avocado, cucumber, carrot, sweet potato, beets, mango.", descriptionFr: "2 mcx. Papier de riz, laitue, avocat, concombre, carotte, patate douce, betteraves, mangue.", pieces: 2, image: null, available: true, featured: false },
  { name: "Veggie Maki", nameFr: "Véggie Maki", category: "Veggie Rolls", price: 12, description: "5 pcs. Nori, rice, sweet potato, cucumber, avocado.", descriptionFr: "5 mcx. Nori, riz, patate douce, concombre, avocat.", pieces: 5, image: null, available: true, featured: false },
  { name: "Satsuma", nameFr: "Satsuma", category: "Veggie Rolls", price: 10, description: "8 pcs. Nori, rice, sweet potato.", descriptionFr: "8 mcx. Nori, riz, patate douce.", pieces: 8, image: null, available: true, featured: false },
  { name: "Sweetie", nameFr: "La Douceur", category: "Veggie Rolls", price: 12, description: "5 pcs. Nori, rice, sweet potato, avocado, mango.", descriptionFr: "5 mcx. Nori, riz, patate douce, avocat, mangue.", pieces: 5, image: null, available: true, featured: false },
  { name: "Veggie Delight", nameFr: "Délice Végé", category: "Veggie Rolls", price: 15, description: "8 pcs. Rice paper, rice, lettuce, avocado, cucumber, sweet potato.", descriptionFr: "8 mcx. Papier de riz, riz, laitue, avocat, concombre, patate douce.", pieces: 8, image: null, available: true, featured: false },
  { name: "Avocado Blast", nameFr: "Explosion d'Avocat", category: "Veggie Rolls", price: 12, description: "8 pcs. Nori, rice, avocado, caramelized onion, tempura. Topped with avocado and crunchy onion.", descriptionFr: "8 mcx. Nori, riz, avocat, oignons caramélisés, tempura. Garni d'avocat et d'oignons croquants.", pieces: 8, image: null, available: true, featured: false },
  { name: "Kinoko", nameFr: "Kinoko", category: "Veggie Rolls", price: 12, description: "5 pcs. Nori, rice, mushroom fried tempura, ginger, avocado. Covered in avocado and Umai sauce.", descriptionFr: "5 mcx. Nori, riz, champignon tempura, gingembre, avocat. Recouvert d'avocat et la sauce Umai.", pieces: 5, image: null, available: true, featured: false },
  { name: "Green Garden", nameFr: "Le Jardin Vert", category: "Veggie Rolls", price: 15, description: "8 pcs. Nori, rice, golden tempura vegetables (red pepper, onion, sweet potato) and avocado. Topped with fresh avocado.", descriptionFr: "8 mcx. Nori, riz, légumes tempura dorés (poivron rouge, oignon, patate douce) et avocat. Garnie d'avocat frais.", pieces: 8, image: null, available: true, featured: false },
  { name: "The Batchy™", nameFr: "Le Batchy™", category: "Veggie Rolls", price: 16, description: "8 pcs. Rice paper, rice, avocado, cucumber. Topped with vegetables fried in tempura, red pepper, onion, sweet potato, sweet sauce, spicy mayo.", descriptionFr: "8 mcx. Feuille de riz, riz, avocat, concombre. Garni de légumes frits en tempura, poivron rouge, oignon, patate douce, sauce sucrée, mayonnaise épicée.", pieces: 8, image: null, available: true, featured: false },
  { name: "Atomic Veggie", nameFr: "Légume Atomique", category: "Veggie Rolls", price: 12, description: "5 pcs. Nori, rice, sweet potato, avocado, jalapeno, crispy puffed rice, spicy mayo.", descriptionFr: "5 mcx. Nori, riz, patate douce, avocat, jalapeño, riz soufflé croustillant, mayonnaise épicée.", pieces: 5, image: null, available: true, featured: false },

  // ─────────────────────────────────────────
  // HOSOMAKI & SPECIALTY ROLLS
  // ─────────────────────────────────────────
  { name: "Salmon Hosomaki", nameFr: "Hosomaki au Saumon", category: "Rolls", price: 12, description: "8 pcs. Nori, rice, salmon.", descriptionFr: "8 mcx. Nori, riz, saumon.", pieces: 8, image: null, available: true, featured: false },
  { name: "Tuna Hosomaki", nameFr: "Hosomaki au Thon", category: "Rolls", price: 14, description: "8 pcs. Nori, rice, tuna.", descriptionFr: "8 mcx. Nori, riz, thon.", pieces: 8, image: null, available: true, featured: false },
  { name: "Tuna Kamikaze", nameFr: "Kamikaze au Thon", category: "Rolls", price: 18, description: "5 pcs. Nori, rice, tuna, avocado, spicy mayo, tempura.", descriptionFr: "5 mcx. Nori, riz, thon, avocat, mayonnaise épicée, tempura.", pieces: 5, image: null, available: true, featured: false },
  { name: "Spicy Tuna", nameFr: "Thon Épicée", category: "Rolls", price: 15, description: "8 pcs. Nori, rice, spicy tuna.", descriptionFr: "8 mcx. Nori, riz, thon épicé.", pieces: 8, image: null, available: true, featured: false },
  { name: "Alaska", nameFr: "Alaska", category: "Rolls", price: 12, description: "8 pcs. Nori, rice, salmon, cucumber, avocado.", descriptionFr: "8 mcx. Nori, riz, saumon, concombre, avocat.", pieces: 8, image: null, available: true, featured: false },
  { name: "Geiko", nameFr: "Geiko", category: "Rolls", price: 12, description: "8 pcs. Nori, rice, mock shrimp tempura, red masago. Garnished with avocado and crispy onions.", descriptionFr: "8 mcx. Nori, riz, simili-crevettes tempura, masago rouge. Garni d'avocat et d'oignons croustillants.", pieces: 8, image: null, available: true, featured: false },
  { name: "Osaka", nameFr: "Osaka", category: "Rolls", price: 15, description: "8 pcs. Nori, rice, fried mock crab and shrimp tempura, tempura, spicy mayo. Topped with avocado, fried mock crab, crispy onion, spicy mayo and sweet sauce.", descriptionFr: "8 mcx. Nori, riz, surimi tempura et crevette tempura. Recouvert d'avocat, surimi frit, oignons croustillants, mayonnaise épicée et sauce sucrée.", pieces: 8, image: null, available: true, featured: false },
  { name: "Spicy Kani", nameFr: "Kani Épicée", category: "Rolls", price: 12, description: "8 pcs. Nori, rice, mock crab, tempura, cucumber, spicy mayo.", descriptionFr: "8 mcx. Nori, riz, surimi, tempura, concombre, mayonnaise épicée.", pieces: 8, image: null, available: true, featured: false },
  { name: "Kani Special", nameFr: "Kani Spéciale", category: "Rolls", price: 15, description: "8 pcs. Nori, rice, mock crab, tempura, avocado, spicy mayo. Topped with salmon, crispy onion, spicy mayo and sweet sauce.", descriptionFr: "8 mcx. Nori, riz, surimi, tempura, avocat, mayonnaise épicée. Recouvert de saumon, oignons croustillants, mayonnaise épicée et sauce sucrée.", pieces: 8, image: null, available: true, featured: false },
  { name: "Spicy Salmon", nameFr: "Saumon Épicée", category: "Rolls", price: 12, description: "8 pcs. Nori, rice, spicy salmon.", descriptionFr: "8 mcx. Nori, riz, saumon épicé.", pieces: 8, image: null, available: true, featured: false },
  { name: "Rainbow Special", nameFr: "Arc-en-Ciel", category: "Rolls", price: 22, description: "8 pcs. Rice paper roll filled with rice, cucumber, avocado, spicy tuna, spicy salmon, and mock crab. Finished with tuna, salmon, crispy onions, and a drizzle of our Umai sauce.", descriptionFr: "8 mcx. Papier de riz garni de riz, concombre, avocat, thon et saumon épicés, ainsi que de surimi. Couronné de thon, de saumon, d'oignons croustillants et nappé de notre sauce Umai.", pieces: 8, image: null, available: true, featured: true },

  // ─────────────────────────────────────────
  // CRISPY COLLECTION / COLLECTION CROUSTILLANTE
  // ─────────────────────────────────────────
  { name: "Crunch", nameFr: "Crunch", category: "Crispy Collection", price: 16, description: "8 pcs. Nori, rice, salmon, crab, avocado, covered and fried in panko. Drizzled with sweet sauce and spicy mayo.", descriptionFr: "8 mcx. Nori, riz, saumon, surimi, avocat, frit dans du tempura, garnie de mayonnaise épicée et sauce sucrée.", pieces: 8, image: null, available: true, featured: true },
  { name: "Triple Crunch", nameFr: "Triple Croquant", category: "Crispy Collection", price: 18, description: "5 pcs. Nori, rice, salmon, tuna, seabass, and avocado, fried in a golden panko crust. Topped with spicy mayo and sweet sauce.", descriptionFr: "5 mcx. Nori, riz, saumon, thon, bar et avocat, frit dans une panure panko dorée. Garnis de mayonnaise épicée et de sauce sucrée.", pieces: 5, image: null, available: true, featured: false },
  { name: "Danseels", nameFr: "Danseels", category: "Crispy Collection", price: 18, description: "8 pcs. Nori, rice, avocado, salmon. Topped with sea bass and nori. Fried in tempura and garnished with sweet sauce.", descriptionFr: "8 mcx. Nori, riz, avocat, saumon. Garnie de bar et de nori. Tempura frit et garni de sauce sucrée.", pieces: 8, image: null, available: true, featured: false },
  { name: "Yokohama", nameFr: "Yokohama", category: "Crispy Collection", price: 18, description: "8 pcs. Nori, rice, salmon, tuna, avocado, masago. Fried in a golden panko crust. Topped with spicy mayo and sweet sauce.", descriptionFr: "8 mcx. Nori, riz, saumon, thon, avocat, masago. Frit dans une panure panko dorée. Couvert avec de la mayonnaise épicée et sauce sucrée.", pieces: 8, image: null, available: true, featured: false },
  { name: "Red Dragon", nameFr: "Dragon Rouge", category: "Crispy Collection", price: 16, description: "5 pcs. Nori, rice, salmon, red masago, asparagus. Fried in a tempura batter. Topped with spicy mayo and sweet sauce.", descriptionFr: "5 mcx. Nori, riz, saumon, masago rouge, asperges. Frit dans une pâte tempura. Garnis de mayonnaise épicée et de sauce sucrée.", pieces: 5, image: null, available: true, featured: false },

  // ─────────────────────────────────────────
  // LIGHT & FRESH / MENU SANTÉ (Rice-Free)
  // ─────────────────────────────────────────
  { name: "Sunshine", nameFr: "Soleil", category: "Light & Fresh", price: 18, description: "8 pcs. Rice paper, lettuce, spicy salmon, spicy tuna, mock crab, avocado, cucumber.", descriptionFr: "8 mcx. Papier de riz, laitue, saumon épicé, thon épicé, surimi, avocat, concombre.", pieces: 8, image: null, available: true, featured: false },
  { name: "Umai Special", nameFr: "Umai Spéciale", category: "Light & Fresh", price: 20, description: "8 pcs. Nori, salmon, tuna, red onion, crispy puffed rice, spicy mayo, hot sauce. Topped with seared salmon and Umai special sauce.", descriptionFr: "8 mcx. Nori, saumon, thon, oignon rouge, riz soufflé croustillant, mayonnaise épicée, sauce sucrée. Couvert avec du saumon torché et sauce Umai spéciale.", pieces: 8, image: null, available: true, featured: true },
  { name: "Paper Bee", nameFr: "Paper Bee", category: "Light & Fresh", price: 17, description: "6 pcs. Soy paper, spicy salmon, spicy tuna, avocado, cucumber, masago, hot sauce.", descriptionFr: "6 mcx. Papier soya, saumon épicé, thon épicé, avocat, concombre, masago, sauce piquante.", pieces: 6, image: null, available: true, featured: false },
  { name: "Salmon Kyuri", nameFr: "Kyuri Saumon", category: "Light & Fresh", price: 15, description: "5 pcs. Cucumber-wrapped roll filled with salmon, mock crab, cilantro, and avocado. Served with ponzu sauce.", descriptionFr: "5 mcx. Concombre roulé, garni de saumon, surimi, coriandre et avocat. Servi avec sauce ponzu.", pieces: 5, image: null, available: true, featured: false },
  { name: "Tuna Kyuri", nameFr: "Kyuri Thon", category: "Light & Fresh", price: 18, description: "5 pcs. Cucumber-wrapped roll filled with tuna, mock crab, and green onion. Topped with jalapeño and served with ponzu sauce.", descriptionFr: "5 mcx. Concombre roulé, garni de thon, surimi et échalote. Couronné de jalapeño et servi avec sauce ponzu.", pieces: 5, image: null, available: true, featured: false },
  { name: "Umai Wrap", nameFr: "Wrap Umai", category: "Light & Fresh", price: 20, description: "2 pcs. Rice paper, spicy salmon, mock crabstick, lettuce, avocado, cucumber, mango and masago. Spicy mayo and sweet sauce.", descriptionFr: "2 mcx. Papier de riz, saumon épicé, surimi, laitue, avocat, concombre, mangue et masago. Mayonnaise épicée et sauce sucrée.", pieces: 2, image: null, available: true, featured: false },
  { name: "Rock N'Roll", nameFr: "Rock N'Roll", category: "Light & Fresh", price: 18, description: "8 pcs. Soy paper, spicy salmon, spicy tuna, avocado, hot sauce, red onion. Topped with avocado, crispy onion, and hot sauce.", descriptionFr: "8 mcx. Papier soya, saumon épicé, thon épicé, avocat, sauce piquante, oignon rouge. Couvert avec l'avocat, oignon croustillant et sauce piquante.", pieces: 8, image: null, available: true, featured: false },
  { name: "Amai", nameFr: "Amai", category: "Light & Fresh", price: 22, description: "8 pcs. Rice paper, rice, spicy tuna, avocado. Topped with tuna, chef special sauce and mandarin.", descriptionFr: "8 mcx. Papier de riz, riz, thon épicé, avocat. Couvert avec du thon, sauce spéciale du chef et mandarin.", pieces: 8, image: null, available: true, featured: false },
  { name: "Umami", nameFr: "Umami", category: "Light & Fresh", price: 18, description: "8 pcs. Rice paper, rice, spicy salmon, avocado. Topped with salmon, spicy mayo, sweet sauce, and a maraschino cherry.", descriptionFr: "8 mcx. Papier de riz, riz, saumon épicé, avocat. Couvert avec du saumon, sauce épicée, sauce sucrée, et une cerise au marasquin.", pieces: 8, image: null, available: true, featured: false },
  { name: "Firecracker", nameFr: "Feu d'Artifice", category: "Light & Fresh", price: 23, description: "8 pcs. Soy paper, rice, salmon, tuna, jalapeno, avocado, ginger, coriander, tempura. Topped with salmon, tuna, fried onion, spicy mayo, sweet sauce.", descriptionFr: "8 mcx. Papier de soya, riz, saumon, thon, jalapeño, avocat, gingembre, coriandre, tempura. Garni de saumon, thon, oignons frits, mayonnaise épicée, sauce sucrée.", pieces: 8, image: null, available: true, featured: false },
  { name: "Kryptonite", nameFr: "Kryptonite", category: "Light & Fresh", price: 20, description: "5 pcs. Soy paper, rice, salmon, avocado, tempura. Topped with tuna, salmon tartar, jalapeno, masago and avocado.", descriptionFr: "5 mcx. Papier soya, riz, saumon, avocat, tempura. Couvert avec du tartare de saumon, thon, jalapeño, avocat et masago.", pieces: 5, image: null, available: true, featured: false },

  // ─────────────────────────────────────────
  // SPECIALTIES / SPÉCIALITÉS
  // ─────────────────────────────────────────
  { name: "Lychee Bomb", nameFr: "Bombe de Lychee", category: "Specialties", price: 18, description: "8 pcs. Nori, rice, spicy salmon, avocado, cucumber. Topped with salmon, tuna, spicy mayo, lychee.", descriptionFr: "8 mcx. Nori, riz, saumon épicé, avocat, concombre. Garni de saumon, thon, mayo épicée, litchi.", pieces: 8, image: null, available: true, featured: true },
  { name: "Blueberry Bomb", nameFr: "Bombe de Bleuet", category: "Specialties", price: 18, description: "8 pcs. Nori, rice, spicy salmon, avocado, cucumber, scallion. Topped with salmon, tuna, and blueberries.", descriptionFr: "8 mcx. Nori, riz, saumon épicé, avocat, concombre, oignon vert. Garnie de saumon, de thon et de bleuets.", pieces: 8, image: null, available: true, featured: false },
  { name: "Kilimanjaro", nameFr: "Kilimanjaro", category: "Specialties", price: 20, description: "8 pcs. Soy paper, rice, spicy salmon, green onion, and avocado with hot sauce. Topped with salmon and tuna.", descriptionFr: "8 mcx. Papier de soya, riz, saumon épicé, oignon vert et avocat, avec sauce piquante. Garni de saumon et de thon.", pieces: 8, image: null, available: true, featured: false },
  { name: "Le Booster", nameFr: "Le Booster", category: "Specialties", price: 17, description: "5 pcs. Nori, rice, spicy salmon, fried mock shrimp, avocado. Topped with seared salmon, jalapeno, spicy mayo, sweet sauce.", descriptionFr: "5 mcx. Nori, riz, saumon épicé, simili-crevette frit, avocat. Garni de saumon poêlé, jalapeño, mayonnaise épicée, sauce sucrée.", pieces: 5, image: null, available: true, featured: false },
  { name: "Umai Special (Roll)", nameFr: "Umai Spéciale", category: "Specialties", price: 22, description: "8 pcs. Nori, salmon, tuna, red onion, crispy puffed rice, spicy mayo, hot sauce. Topped with seared salmon and Umai sauce.", descriptionFr: "8 mcx. Nori, saumon, thon, oignon rouge, riz soufflé croustillant, mayonnaise épicée, sauce sucrée. Couvert avec du saumon torché et sauce Umai.", pieces: 8, image: null, available: true, featured: false },
  { name: "High Heat", nameFr: "Chaleur Intense", category: "Specialties", price: 28, description: "8 pcs. Nori, rice, spicy salmon, avocado, scallion, jalapeno tempura. Topped with tuna, salmon, fried onions, spicy mayo, sweet sauce, and jalapeno.", descriptionFr: "8 mcx. Nori, riz, saumon épicé, avocat, oignon vert, jalapeño tempura. Couvert de thon, saumon, oignons frits, mayonnaise épicée, sauce sucrée, et jalapeño.", pieces: 8, image: null, available: true, featured: true },

  // ─────────────────────────────────────────
  // MORE SPECIALTY ROLLS
  // ─────────────────────────────────────────
  { name: "Green Hornet", nameFr: "Frelon Vert", category: "Specialties", price: 17, description: "5 pcs. Nori, rice, tempura, spicy mayo, hot sauce, salmon, tuna, mock crab. Topped with avocado, fried onion, spicy mayo, hot sauce, sweet sauce.", descriptionFr: "5 mcx. Nori, riz, tempura, mayonnaise épicée, sauce piquante, saumon, thon, surimi. Garni d'avocat, d'oignons frits, mayonnaise épicée, sauce piquante et sauce sucrée.", pieces: 5, image: null, available: true, featured: false },
  { name: "Honey Bee", nameFr: "Abeille", category: "Specialties", price: 18, description: "5 pcs. Nori, rice, mock crab, salmon, avocado, masago, cucumber, lettuce. Topped with salmon, tuna, fried onion, honey.", descriptionFr: "5 mcx. Nori, riz, surimi, saumon, avocat, masago, concombre, laitue. Garni de saumon, thon, oignons frits, miel.", pieces: 5, image: null, available: true, featured: false },
  { name: "Lemon Zinger", nameFr: "Zeste de Citron", category: "Specialties", price: 15, description: "8 pcs. Nori, rice, sweet potato, avocado. Topped with seared salmon, lemon zest, spicy mayo, sweet sauce.", descriptionFr: "8 mcx. Nori, riz, patate douce, avocat. Garni de saumon poêlé, zeste de citron, mayonnaise épicée, sauce sucrée.", pieces: 8, image: null, available: true, featured: false },

  // ─────────────────────────────────────────
  // POKE BOWLS
  // ─────────────────────────────────────────
  { name: "Sake Poke Bowl", nameFr: "Saké", category: "Poke Bowls", price: 18, description: "Rice, cucumber, avocado, mango, and edamame. Topped with salmon and finished with spicy mayo and sweet sauce.", descriptionFr: "Riz, concombre, avocat, mangue et edamame. Garni de saumon et nappé de mayonnaise épicée et de sauce sucrée.", pieces: null, image: null, available: true, featured: false },
  { name: "Maguro Poke Bowl", nameFr: "Maguro", category: "Poke Bowls", price: 21, description: "Rice, cucumber, avocado, mango, and edamame. Topped with tuna and finished with spicy mayo and sweet sauce.", descriptionFr: "Riz, concombre, avocat, mangue et edamame. Garni de thon et nappé de mayonnaise épicée et de sauce sucrée.", pieces: null, image: null, available: true, featured: false },
  { name: "Mix Poke Bowl", nameFr: "Mix", category: "Poke Bowls", price: 20, description: "Rice, cucumber, avocado, mango, and edamame. Topped with salmon and tuna, and finished with spicy mayo and sweet sauce.", descriptionFr: "Riz, concombre, avocat, mangue et edamame. Garni de saumon et thon, et nappé de mayonnaise épicée et de sauce sucrée.", pieces: null, image: null, available: true, featured: false },
  { name: "Crabe Tempura Poke Bowl", nameFr: "Crabe Tempura", category: "Poke Bowls", price: 16, description: "Rice, cucumber, avocado, mango, and edamame. Topped with tempura mock crabstick and tuna, and finished with spicy mayo and sweet sauce.", descriptionFr: "Riz, concombre, avocat, mangue et edamame. Garni de surimi tempura et thon, nappé de mayonnaise épicée et de sauce sucrée.", pieces: null, image: null, available: true, featured: false },
  { name: "Yasai Poke Bowl", nameFr: "Yasai", category: "Poke Bowls", price: 15, description: "Rice, cucumber, avocado, mango, and edamame. Topped with sweet potato and finished with spicy mayo and sweet sauce.", descriptionFr: "Riz, concombre, avocat, mangue et edamame. Garni de patate douce et nappé de mayonnaise épicée et de sauce sucrée.", pieces: null, image: null, available: true, featured: false },

  // ─────────────────────────────────────────
  // TATAKI & TARTAR
  // ─────────────────────────────────────────
  { name: "Salmon Tataki", nameFr: "Tataki au Saumon", category: "Tataki & Tartar", price: 18, description: "7 pcs. Seared salmon slices served with sauce of your choice.", descriptionFr: "7 mcx. Tranches de saumon poêlées servies avec sauce au choix.", pieces: 7, image: null, available: true, featured: false },
  { name: "Tuna Tataki", nameFr: "Tataki au Thon", category: "Tataki & Tartar", price: 20, description: "7 pcs. Delicately sliced tuna, lightly seared. Served with sauce of your choice.", descriptionFr: "7 mcx. Thon finement tranché, légèrement poêlées. Servi avec sauce au choix.", pieces: 7, image: null, available: true, featured: false },
  { name: "Tsurai Hamachi", nameFr: "Tsurai Hamachi", category: "Tataki & Tartar", price: 25, description: "7 pcs. Yellowtail hamachi, topped with jalapeño and chili flakes, garnished with ponzu.", descriptionFr: "7 mcx. Hamachi (sériole) garni de jalapeño et de flocons de piment, nappé de sauce ponzu.", pieces: 7, image: null, available: true, featured: false },
  { name: "Salmon Taco", nameFr: "Taco Saumon", category: "Tataki & Tartar", price: 18, description: "3 pcs. Avocado, olive oil, hot sauce, homemade sauce, scallion, lettuce, cilantro, masago, spices.", descriptionFr: "3 mcx. Avocat, huile d'olive, sauce piquante, sauce maison, oignon vert, laitue, coriandre, masago, épices.", pieces: 3, image: null, available: true, featured: false },
  { name: "Tuna Taco", nameFr: "Taco Thon", category: "Tataki & Tartar", price: 20, description: "3 pcs. Avocado, olive oil, hot sauce, homemade sauce, scallion, lettuce, cilantro, masago, spices.", descriptionFr: "3 mcx. Avocat, huile d'olive, sauce piquante, sauce maison, oignon vert, laitue, coriandre, masago, épices.", pieces: 3, image: null, available: true, featured: false },
  { name: "Salmon Tartar", nameFr: "Tartare au Saumon", category: "Tataki & Tartar", price: 20, description: "Freshly diced salmon with avocado, masago, ponzu, and black pepper. Served with crispy homemade chips.", descriptionFr: "Saumon frais en dés, accompagné d'avocat, de masago, de sauce ponzu et de poivre noir. Servi avec croustilles maison.", pieces: null, image: null, available: true, featured: false },
  { name: "Tuna Tartar", nameFr: "Tartare au Thon", category: "Tataki & Tartar", price: 22, description: "Freshly diced tuna with avocado, masago, ponzu, and black pepper. Served with crispy homemade chips.", descriptionFr: "Thon frais en dés, accompagné d'avocat, de masago, de sauce ponzu et de poivre noir. Servi avec croustilles maison.", pieces: null, image: null, available: true, featured: false },

  // ─────────────────────────────────────────
  // PLATTERS & COMBOS
  // ─────────────────────────────────────────
  { name: "Vegetarian Platter", nameFr: "Plateau Végétarien", category: "Platters & Combos", price: 50, description: "50 pcs. Avocado, Kappa, The Batchy™, Atomic Veggie, Veggie Delight, Kinoko, Green Garden.", descriptionFr: "50 mcx. Avocado, Kappa, Le Batchy™, Légume Atomique, Délice Végé, Kinoko, Jardin Vert.", pieces: 50, image: null, available: true, featured: false },
  { name: "Salmon Combo", nameFr: "Combo Saumon", category: "Platters & Combos", price: 40, description: "21 pcs. Kamikaze, Orange Alaska, Nagano.", descriptionFr: "21 mcx. Kamikaze, Orange Alaska, Nagano.", pieces: 21, image: null, available: true, featured: false },
  { name: "Tuna Combo", nameFr: "Combo Thon", category: "Platters & Combos", price: 45, description: "21 pcs. Kamikaze, Dynamite, Amai.", descriptionFr: "21 mcx. Kamikaze, Dynamite, Amai.", pieces: 21, image: null, available: true, featured: false },
  { name: "Fried Combo", nameFr: "Combo Frits", category: "Platters & Combos", price: 40, description: "21 pcs. Red Dragon, Crunch, Yokohama.", descriptionFr: "21 mcx. Red Dragon, Crunch, Yokohama.", pieces: 21, image: null, available: true, featured: false },
  { name: "Veggie Combo", nameFr: "Combo Végétarien", category: "Platters & Combos", price: 30, description: "21 pcs. Avocado, The Batchy™, Sweetie.", descriptionFr: "21 mcx. Avocado, Le Batchy™, La Douceur.", pieces: 21, image: null, available: true, featured: false },
];

const categories = [
  "Appetizers",
  "Salads",
  "Nigiri",
  "Sashimi",
  "Hand Rolls",
  "Our Classics",
  "Veggie Rolls",
  "Rolls",
  "Crispy Collection",
  "Light & Fresh",
  "Specialties",
  "Poke Bowls",
  "Tataki & Tartar",
  "Platters & Combos",
  "Drinks",
];

module.exports = { menuItems, categories };
