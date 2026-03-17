-- ============================================================
--  YumQuick â€” Seed Data
--  Run after: pnpm db:push
--
--  Design rules:
--  â€¢ One row per food item â€” no duplicates across sections.
--  â€¢ is_best_seller / is_recommended flags control which home-screen
--    lists an item appears in (10 per flag).
--  â€¢ Promo items have discount + original_price set on the food_item row.
--  â€¢ Promo banners reference the item's id for the carousel.
-- ============================================================

-- â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
--  CATEGORIES
-- â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
INSERT INTO categories (id, label, sort_order) VALUES
  ('snacks',  'Snacks',  1),
  ('meal',    'Meal',    2),
  ('vegan',   'Vegan',   3),
  ('dessert', 'Dessert', 4),
  ('drinks',  'Drinks',  5)
ON CONFLICT (id) DO NOTHING;

-- â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
--  FOOD ITEMS
--  Columns: id, category_id, name, price, original_price,
--           discount, rating, description, long_description,
--           bg_color, image_url, is_best_seller, is_recommended
-- â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

-- â”€â”€ SNACKS (10) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
INSERT INTO food_items
  (id, category_id, name, price, rating, description, long_description, bg_color, image_url, is_best_seller, is_recommended)
VALUES
  ('s-01', 'snacks', 'Mexican Appetizer', 15.00, 5.0,
   'Tortilla chips with house-made salsas and avocado dip.',
   'Crispy tortilla chips served with a trio of house-made salsas â€” roasted tomato, verde, and mango â€” plus a creamy avocado dip. Perfect for sharing.',
   '#FFE4B5',
   'https://res.cloudinary.com/dhxpzzz5a/image/upload/v1772680054/Skillet-Nachos_EXPS_TOHD24_133666_AlejandroMonfort_5_pnehvh.jpg',
   FALSE, FALSE),

  ('s-02', 'snacks', 'Pork Skewer', 12.99, 4.0,
   'Grilled pork skewers marinated in herbs and spices.',
   'Tender pork skewers marinated overnight in garlic, lime, and chili, flame-grilled to perfection and finished with a tangy herb sauce. Served with fresh lemon wedges.',
   '#FFDECF',
   'https://res.cloudinary.com/dhxpzzz5a/image/upload/v1772680055/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__2019__07__20190618-grilled-thai-pork-skewers-vicky-wasik-13-8b3614c8f6234187abf1396973a4eeea_buce3d.jpg',
   FALSE, FALSE),

  ('s-03', 'snacks', 'Spring Rolls', 9.50, 4.5,
   'Crispy golden rolls filled with fresh vegetables and glass noodles.',
   'Light and crunchy spring rolls packed with julienned vegetables, glass noodles, and aromatic herbs. Served with a sweet chili dipping sauce.',
   '#D4EDDA',
   'https://res.cloudinary.com/dhxpzzz5a/image/upload/v1772680055/Crispy-spring-rolls_raimxn.jpg',
   FALSE, TRUE),

  ('s-04', 'snacks', 'Nachos Supreme', 11.00, 4.8,
   'Loaded with cheese, jalapeÃ±os, salsa, and sour cream.',
   'A generous plate of tortilla chips layered with melted cheese, pickled jalapeÃ±os, seasoned beans, fresh pico de gallo, and sour cream.',
   '#FFF3CD',
   'https://res.cloudinary.com/dhxpzzz5a/image/upload/v1772680055/Nachos-Supreme-13-Edit_hly88s.jpg',
   TRUE, FALSE),

  ('s-05', 'snacks', 'Chicken Wings', 13.99, 4.7,
   'Crispy fried wings tossed in smoky BBQ sauce.',
   'Juicy chicken wings deep-fried to a golden crisp, then tossed in our signature smoky BBQ glaze. Served with a cool ranch dressing and celery sticks.',
   '#FFDECF',
   'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=400&q=80',
   TRUE, FALSE),

  ('s-06', 'snacks', 'Mozzarella Sticks', 8.99, 4.3,
   'Golden-fried mozzarella sticks with marinara dipping sauce.',
   'Thick, hand-breaded mozzarella sticks fried until perfectly golden outside and gooey inside. Served hot with a zesty house marinara sauce.',
   '#FFF3CD',
   'https://images.unsplash.com/photo-1531749668029-2db88e4276c7?auto=format&fit=crop&w=400&q=80',
   FALSE, FALSE),

  ('s-07', 'snacks', 'Garlic Bruschetta', 7.50, 4.4,
   'Toasted baguette topped with fresh tomatoes and basil.',
   'Rustic toasted baguette slices rubbed with garlic and drizzled with olive oil, topped with vine-ripe diced tomatoes, fresh basil, and a balsamic glaze.',
   '#FFE4B5',
   'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?auto=format&fit=crop&w=400&q=80',
   FALSE, FALSE),

  ('s-08', 'snacks', 'Onion Rings', 7.99, 4.2,
   'Beer-battered onion rings, crispy and golden.',
   'Thick-cut sweet onion rings coated in a light beer batter and fried to a crunchy golden finish. Served with smoky chipotle mayo.',
   '#FFE4B5',
   'https://images.unsplash.com/photo-1639024471283-03518883512d?auto=format&fit=crop&w=400&q=80',
   FALSE, FALSE),

  ('s-09', 'snacks', 'Samosas', 9.99, 4.6,
   'Flaky pastry filled with spiced potatoes and peas.',
   'Crispy handcrafted pastry parcels filled with a savory mix of spiced potatoes, green peas, and fresh coriander. Served with tangy tamarind and mint chutneys.',
   '#D4EDDA',
   'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=400&q=80',
   FALSE, TRUE),

  ('s-10', 'snacks', 'Cheese Quesadilla', 10.99, 4.5,
   'Flour tortilla filled with melted cheese and peppers.',
   'A golden-pressed flour tortilla stuffed with a blend of Monterey Jack and cheddar cheeses, sautÃ©ed bell peppers, and onions. Served with salsa and sour cream.',
   '#FFF3CD',
   'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?auto=format&fit=crop&w=400&q=80',
   FALSE, FALSE)

ON CONFLICT (id) DO NOTHING;

-- â”€â”€ MEAL (10) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
INSERT INTO food_items
  (id, category_id, name, price, original_price, discount, rating, description, long_description, bg_color, image_url, is_best_seller, is_recommended)
VALUES
  ('m-01', 'meal', 'Grilled Salmon', 24.00, NULL, NULL, 5.0,
   'Fresh Atlantic salmon grilled with lemon butter sauce.',
   'Atlantic salmon fillet grilled to flaky perfection, glazed with a silky lemon-butter sauce and served with seasonal roasted vegetables and herbed potatoes.',
   '#FFDECF',
   'https://res.cloudinary.com/dhxpzzz5a/image/upload/v1772680054/how-to-grill-salmon-2216658-hero-01-a9c948f8a238400ebaafc0caf509c7fa_sqciyv.jpg',
   TRUE, FALSE),

  ('m-02', 'meal', 'Chicken Pasta', 18.00, NULL, NULL, 4.6,
   'Creamy Alfredo pasta with grilled chicken and parmesan.',
   'Al dente pasta tossed in a rich Alfredo sauce, topped with grilled chicken breast, shaved parmesan, and fresh parsley.',
   '#E8D5F5',
   'https://res.cloudinary.com/dhxpzzz5a/image/upload/v1772680054/One-Pan-Chicken-Pasta-Romano-4x3-1-2000-8de21961bb3a4a5abd6eaa3c9c7668df_bpng16.jpg',
   FALSE, TRUE),

  ('m-03', 'meal', 'Sushi Roll', 22.00, 31.50, 30, 5.0,
   'Smoked salmon roll with avocado and special house sauce.',
   'Our signature smoked salmon sushi roll layered with creamy avocado, cucumber, and drizzled with a special umami house sauce. Six pieces per order.',
   '#FFDECF',
   'https://res.cloudinary.com/dhxpzzz5a/image/upload/v1772680056/smoked-salmon-sushi-roll-recipe-1739410610_m5guak.jpg',
   TRUE, FALSE),

  ('m-04', 'meal', 'Beef Burger', 14.99, NULL, NULL, 5.0,
   'Thick and juicy cheeseburger topped with fresh lettuce and tomato.',
   'A half-pound hand-formed beef patty seasoned with our secret blend, grilled to order, and stacked with aged cheddar, crisp lettuce, ripe tomato, and house sauce on a brioche bun.',
   '#FFDECF',
   'https://res.cloudinary.com/dhxpzzz5a/image/upload/v1772680055/20250523-SEA-ThickandJuicyCheeseburgers-LorenaMasso-HERO-68563a45a4184a0e82c5a8b9f68a719d_qvnp1k.jpg',
   TRUE, TRUE),

  ('m-05', 'meal', 'BBQ Pork Ribs', 28.00, NULL, NULL, 4.8,
   'Slow-cooked ribs glazed with smoky BBQ sauce.',
   'A full rack of pork ribs slow-cooked for 6 hours until fall-off-the-bone tender, then finished on the grill with a sticky smoky BBQ glaze. Served with coleslaw and corn bread.',
   '#FFDECF',
   'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80',
   TRUE, FALSE),

  ('m-06', 'meal', 'Fried Chicken Combo', 16.99, 21.24, 20, 4.7,
   'Crispy golden fried chicken with fries and dipping sauce.',
   'Triple-dipped fried chicken with our secret blend of spices, served alongside hand-cut fries and a choice of dipping sauce. Crispy outside, juicy inside.',
   '#FFE4B5',
   'https://res.cloudinary.com/dhxpzzz5a/image/upload/v1772680055/AR-89268-triple-dipped-fried-chicken-beauty-2x1-2ece2beac2344ad68477c9ebd4c1f4d5_favcee.jpg',
   TRUE, FALSE),

  ('m-07', 'meal', 'Margherita Pizza', 15.00, NULL, NULL, 4.8,
   'Classic tomato and mozzarella pizza with fresh basil.',
   'Hand-stretched pizza dough topped with a rich San Marzano tomato sauce, fresh mozzarella, and fragrant basil leaves, baked in a wood-fired oven to bubbly perfection.',
   '#FFE4B5',
   'https://res.cloudinary.com/dhxpzzz5a/image/upload/v1772680055/tomato-mozzarella-pizza-FT-RECIPE0725-e7244e979c504188a049623668c15b2e_xvtjdc.jpg',
   FALSE, TRUE),

  ('m-08', 'meal', 'Roasted Duck Noodles', 17.50, NULL, NULL, 4.7,
   'Savory roasted duck noodles in a rich flavorful broth.',
   'Slow-roasted duck sliced over a bed of springy noodles, bathed in a deeply flavored master stock broth and garnished with bok choy, scallions, and chili oil.',
   '#E8D5F5',
   'https://res.cloudinary.com/dhxpzzz5a/image/upload/v1772680055/pngtree-roasted-duck-nooddle-with-sauce-image_16126724_vagoka.jpg',
   FALSE, TRUE),

  ('m-09', 'meal', 'Shrimp Tacos', 17.50, NULL, NULL, 4.5,
   'Grilled shrimp tacos with mango salsa and lime crema.',
   'Seasoned grilled shrimp nestled in warm corn tortillas, topped with a fresh mango salsa, shredded purple cabbage, and a cooling lime crema. Three tacos per serving.',
   '#D4EDDA',
   'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=400&q=80',
   FALSE, FALSE),

  ('m-10', 'meal', 'Fish & Chips', 15.99, NULL, NULL, 4.3,
   'Beer-battered fish fillet with thick-cut fries and tartare.',
   'Classic British-style beer-battered cod fillet, fried golden and served with chunky hand-cut chips, house tartare sauce, and a wedge of lemon.',
   '#FFF3CD',
   'https://images.unsplash.com/photo-1579208575657-c595a05383b7?auto=format&fit=crop&w=400&q=80',
   FALSE, FALSE)

ON CONFLICT (id) DO NOTHING;

-- â”€â”€ VEGAN (10) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
INSERT INTO food_items
  (id, category_id, name, price, rating, description, long_description, bg_color, image_url, is_best_seller, is_recommended)
VALUES
  ('v-01', 'vegan', 'Buddha Bowl', 14.00, 4.9,
   'Quinoa, roasted vegetables, avocado, and tahini dressing.',
   'A nourishing bowl of tri-color quinoa, roasted seasonal vegetables, creamy avocado, pickled red cabbage, and a zesty tahini-lemon dressing.',
   '#D4EDDA',
   'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80',
   FALSE, TRUE),

  ('v-02', 'vegan', 'Avocado Toast', 11.99, 4.7,
   'Sourdough toast with smashed avocado and cherry tomatoes.',
   'Thick-cut sourdough toasted until golden, topped with freshly smashed avocado seasoned with sea salt and chili flakes, halved cherry tomatoes, and a drizzle of extra-virgin olive oil.',
   '#D4EDDA',
   'https://images.unsplash.com/photo-1541519227354-08fa5d50c820?auto=format&fit=crop&w=400&q=80',
   FALSE, FALSE),

  ('v-03', 'vegan', 'Vegan Burger', 13.99, 4.5,
   'Plant-based patty with lettuce, tomato, and vegan mayo.',
   'A hearty plant-based patty made from black beans and mushrooms, grilled and served on a whole-grain bun with crisp lettuce, ripe tomato, pickles, and house vegan aioli.',
   '#FFDECF',
   'https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=400&q=80',
   FALSE, FALSE),

  ('v-04', 'vegan', 'Lentil Soup', 9.50, 4.4,
   'Hearty red lentil soup with cumin and fresh herbs.',
   'A warming bowl of red lentil soup simmered with onion, garlic, cumin, and turmeric, finished with a squeeze of lemon and fresh cilantro. Served with warm pita bread.',
   '#FFE4B5',
   'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=400&q=80',
   FALSE, FALSE),

  ('v-05', 'vegan', 'Cauliflower Steak', 16.00, 4.6,
   'Roasted cauliflower steak with chimichurri sauce.',
   'A thick-cut cauliflower steak roasted until caramelized and tender, served on a bed of sweet potato purÃ©e and drizzled with a vibrant herb chimichurri.',
   '#D4EDDA',
   'https://images.unsplash.com/photo-1568625365131-079e026a927d?auto=format&fit=crop&w=400&q=80',
   FALSE, FALSE),

  ('v-06', 'vegan', 'Chickpea Curry', 13.50, 4.8,
   'Creamy coconut chickpea curry with fragrant basmati rice.',
   'Tender chickpeas simmered in a rich coconut milk and tomato curry sauce spiced with garam masala, turmeric, and ginger. Served over fragrant basmati rice.',
   '#FFE4B5',
   'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=400&q=80',
   FALSE, TRUE),

  ('v-07', 'vegan', 'Mushroom Risotto', 15.00, 4.7,
   'Creamy Arborio rice with wild mushrooms and truffle oil.',
   'Slowly stirred Arborio rice cooked in a rich vegetable broth with sautÃ©ed wild mushrooms, shallots, and white wine, finished with a drizzle of truffle oil and fresh thyme.',
   '#E8D5F5',
   'https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=400&q=80',
   FALSE, FALSE),

  ('v-08', 'vegan', 'Falafel Wrap', 12.00, 4.6,
   'Crispy falafel in a warm pita with hummus and tabbouleh.',
   'Golden crispy falafel made from ground chickpeas and herbs, wrapped in a warm pita bread with creamy hummus, fresh tabbouleh, and pickled turnip.',
   '#D4EDDA',
   'https://images.unsplash.com/photo-1571197119739-7ca4e0ee7c5b?auto=format&fit=crop&w=400&q=80',
   FALSE, FALSE),

  ('v-09', 'vegan', 'Tofu Stir Fry', 14.50, 4.5,
   'Crispy tofu with seasonal vegetables in ginger soy glaze.',
   'Pressed tofu pan-fried until crispy and tossed with seasonal vegetables in a savory ginger-soy glaze. Served over steamed jasmine rice with sesame seeds.',
   '#D4EDDA',
   'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=400&q=80',
   FALSE, FALSE),

  ('v-10', 'vegan', 'AÃ§aÃ­ Bowl', 12.99, 4.9,
   'Blended aÃ§aÃ­ topped with granola, fresh fruit, and honey.',
   'Thick blended aÃ§aÃ­ and banana base poured into a chilled bowl and topped with house-made granola, sliced fresh strawberries, banana, blueberries, and a drizzle of agave.',
   '#E8D5F5',
   'https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=400&q=80',
   FALSE, FALSE)

ON CONFLICT (id) DO NOTHING;

-- â”€â”€ DESSERT (10) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
INSERT INTO food_items
  (id, category_id, name, price, original_price, discount, rating, description, long_description, bg_color, image_url, is_best_seller, is_recommended)
VALUES
  ('d-01', 'dessert', 'Berry Cheesecake', 8.50, NULL, NULL, 5.0,
   'New York cheesecake topped with mixed berry compote.',
   'Creamy New York-style cheesecake on a buttery graham cracker crust, crowned with a house-made mixed berry compote of strawberries, blueberries, and raspberries.',
   '#E8D5F5',
   'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=400&q=80',
   FALSE, FALSE),

  ('d-02', 'dessert', 'Chocolate Lava Cake', 9.99, NULL, NULL, 4.9,
   'Warm chocolate cake with a gooey molten center.',
   'A rich dark chocolate cake with a perfectly molten center, baked to order and served warm with a scoop of vanilla bean ice cream and a dusting of powdered sugar.',
   '#391713',
   'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=400&q=80',
   TRUE, FALSE),

  ('d-03', 'dessert', 'Tiramisu', 8.99, NULL, NULL, 4.8,
   'Classic Italian dessert with espresso-soaked ladyfingers.',
   'Layers of espresso-soaked savoiardi biscuits and silky mascarpone cream, dusted with premium dark cocoa powder. A timeless Italian classic served chilled.',
   '#FFE4B5',
   'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=400&q=80',
   FALSE, FALSE),

  ('d-04', 'dessert', 'CrÃ¨me BrÃ»lÃ©e', 9.50, NULL, NULL, 4.7,
   'Silky vanilla custard with a caramelized sugar crust.',
   'A velvety smooth vanilla bean custard baked until just set, then finished tableside with a crisp caramelized sugar crust. Served with fresh seasonal berries.',
   '#FFF3CD',
   'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?auto=format&fit=crop&w=400&q=80',
   FALSE, FALSE),

  ('d-05', 'dessert', 'Berry Cake', 8.20, 8.20, NULL, 5.0,
   'Layered berry cake with vanilla cream â€” light and indulgent.',
   'A heavenly mix of fresh berries layered between soft vanilla sponge cake and whipped vanilla cream. Light, fruity, and perfect for any occasion.',
   '#E8D5F5',
   'https://res.cloudinary.com/dhxpzzz5a/image/upload/v1772680055/Simply-Recipes-Berry-Chantilly-Cake-LEAD-6-3598d9645fba4f6e998e6f7a80a5fdaf_vjhuwr.jpg',
   TRUE, FALSE),

  ('d-06', 'dessert', 'Mango Sorbet', 6.99, NULL, NULL, 4.6,
   'Refreshing mango sorbet made with real Alphonso mangoes.',
   'A vibrant and intensely flavored sorbet made from the finest Alphonso mangoes, churned to a silky smooth texture. Dairy-free and refreshingly cold.',
   '#FFE4B5',
   'https://images.unsplash.com/photo-1488900128323-21503983a07e?auto=format&fit=crop&w=400&q=80',
   FALSE, FALSE),

  ('d-07', 'dessert', 'Apple Pie', 7.99, NULL, NULL, 4.5,
   'Homestyle apple pie with flaky crust and cinnamon filling.',
   'A golden flaky all-butter pastry filled with a cinnamon-spiced Granny Smith apple filling. Served warm with a scoop of vanilla ice cream or pouring cream.',
   '#FFF3CD',
   'https://images.unsplash.com/photo-1535920527002-b35e96722eb9?auto=format&fit=crop&w=400&q=80',
   FALSE, FALSE),

  ('d-08', 'dessert', 'Churros', 7.50, NULL, NULL, 4.7,
   'Fried dough sticks dusted with cinnamon sugar and chocolate dip.',
   'Light and airy Spanish-style churros fried golden and rolled in cinnamon sugar. Served with a thick house-made dark chocolate dipping sauce.',
   '#FFE4B5',
   'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&w=400&q=80',
   FALSE, TRUE),

  ('d-09', 'dessert', 'Panna Cotta', 8.50, NULL, NULL, 4.6,
   'Creamy vanilla panna cotta with passion fruit coulis.',
   'Silky smooth vanilla panna cotta gently set and topped with a vibrant passion fruit coulis and fresh mint. A light and elegant Italian dessert.',
   '#E8D5F5',
   'https://images.unsplash.com/photo-1488477304112-4944851de03d?auto=format&fit=crop&w=400&q=80',
   FALSE, FALSE),

  ('d-10', 'dessert', 'Waffle Stack', 10.99, NULL, NULL, 4.8,
   'Fluffy Belgian waffles stacked with fresh fruit and syrup.',
   'Three light and fluffy Belgian waffles stacked high and served with fresh seasonal berries, whipped cream, and a generous pour of pure maple syrup.',
   '#FFE4B5',
   'https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=400&q=80',
   FALSE, FALSE)

ON CONFLICT (id) DO NOTHING;

-- â”€â”€ DRINKS (10) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
INSERT INTO food_items
  (id, category_id, name, price, rating, description, long_description, bg_color, image_url, is_best_seller, is_recommended)
VALUES
  ('dr-01', 'drinks', 'Mango Smoothie', 6.00, 4.7,
   'Blended fresh mango, banana, and coconut milk.',
   'A creamy smoothie made with ripe Alphonso mangoes, banana, and coconut milk, blended silky smooth and served chilled with a coconut flake garnish.',
   '#FFE4B5',
   'https://res.cloudinary.com/dhxpzzz5a/image/upload/v1772680054/tropical-mango-smoothie-vegan-2_vnbnaz.jpg',
   FALSE, FALSE),

  ('dr-02', 'drinks', 'Cold Brew Coffee', 5.99, 4.8,
   'Smooth, slow-steeped cold brew over ice.',
   'Premium single-origin coffee grounds steeped in cold filtered water for 18 hours, producing a silky, low-acidity cold brew. Served over ice with optional oat milk.',
   '#391713',
   'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=400&q=80',
   FALSE, TRUE),

  ('dr-03', 'drinks', 'Fresh Orange Juice', 5.50, 4.6,
   'Freshly squeezed orange juice, served chilled.',
   'Squeezed fresh to order from sweet navel oranges, this vibrant juice is packed with natural vitamin C and delivered pure with no added sugar.',
   '#FFE4B5',
   'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=400&q=80',
   FALSE, FALSE),

  ('dr-04', 'drinks', 'Matcha Latte', 6.50, 4.7,
   'Ceremonial-grade matcha whisked with steamed oat milk.',
   'Premium ceremonial-grade Japanese matcha powder whisked smooth and topped with velvety steamed oat milk. Naturally sweet and earthy.',
   '#D4EDDA',
   'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=400&q=80',
   FALSE, FALSE),

  ('dr-05', 'drinks', 'Strawberry Milkshake', 7.99, 4.9,
   'Thick and creamy milkshake blended with fresh strawberries.',
   'Premium vanilla ice cream blended with fresh ripe strawberries into a thick, indulgent milkshake. Topped with whipped cream and a fresh strawberry.',
   '#FFDECF',
   'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80',
   TRUE, FALSE),

  ('dr-06', 'drinks', 'Lemonade', 4.99, 4.5,
   'Classic freshly squeezed lemonade with a hint of mint.',
   'Hand-squeezed lemon juice balanced with just the right amount of cane sugar and sparkling water, finished with fresh mint leaves and a lemon wheel.',
   '#FFF3CD',
   'https://images.unsplash.com/photo-1523677011781-c91d1bbe2f9e?auto=format&fit=crop&w=400&q=80',
   FALSE, FALSE),

  ('dr-07', 'drinks', 'Berry Smoothie', 8.99, 4.8,
   'Blended mixed berries, banana, and almond milk.',
   'A vibrant blend of fresh strawberries, blueberries, raspberries, and banana with creamy almond milk. Packed with antioxidants and natural energy.',
   '#E8D5F5',
   'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=400&q=80',
   FALSE, FALSE),

  ('dr-08', 'drinks', 'Iced Chai Latte', 6.50, 4.7,
   'Spiced chai tea concentrate with cold milk over ice.',
   'A bold chai tea concentrate brewed with cardamom, cinnamon, ginger, and cloves, poured over ice and topped with cold frothy oat milk.',
   '#FFE4B5',
   'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=400&q=80',
   FALSE, FALSE),

  ('dr-09', 'drinks', 'Tropical Fruit Juice', 5.50, 4.5,
   'Blended pineapple, passion fruit, and mango juice.',
   'A sunshine blend of fresh pineapple, passion fruit pulp, and ripe mango, lightly sweetened and served chilled. A tropical escape in a glass.',
   '#FFE4B5',
   'https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?auto=format&fit=crop&w=400&q=80',
   FALSE, FALSE),

  ('dr-10', 'drinks', 'Watermelon Cooler', 5.50, 4.6,
   'Fresh watermelon juice with lime and sparkling water.',
   'Pure blended watermelon juice mixed with a squeeze of fresh lime and a splash of sparkling water for a light, hydrating summer cooler. Served over ice.',
   '#FFDECF',
   'https://images.unsplash.com/photo-1582801688088-b09ff2f70804?auto=format&fit=crop&w=400&q=80',
   FALSE, FALSE)

ON CONFLICT (id) DO NOTHING;

-- â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
--  PROMO BANNERS
--  Reference food items that have discount + original_price set.
-- â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
INSERT INTO promo_banners (id, food_item_id, title, subtitle, discount, bg_color, sort_order) VALUES
  ('promo-1', 'm-03', 'Experience our delicious new dish',  'Sushi Roll Special',       30, '#E95322', 1),
  ('promo-2', 'm-06', 'Try our special weekend deal',       'Fried Chicken Combo',       20, '#391713', 2),
  ('promo-3', 'd-05', 'Free delivery on orders over $30',  'Berry Cake Delight',      NULL, '#252525', 3)
ON CONFLICT (id) DO NOTHING;

-- â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
--  TOPPING OPTIONS
-- â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
DELETE FROM topping_options;

INSERT INTO topping_options (id, label, value, price, sort_order) VALUES
  -- Savory (snacks + meal items)
  ('top-s-01', 'Guacamole',          'guacamole',          2.99,  1),
  ('top-s-02', 'Jalapeños',          'jalapenos',          1.99,  2),
  ('top-s-03', 'Ground Beef',        'ground-beef',        3.99,  3),
  ('top-s-04', 'Pico de Gallo',      'pico-de-gallo',      1.99,  4),
  ('top-s-05', 'Extra Cheese',       'extra-cheese',       2.49,  5),
  ('top-s-06', 'Sour Cream',         'sour-cream',         1.49,  6),
  ('top-s-07', 'Bacon Bits',         'bacon-bits',         2.99,  7),
  ('top-s-08', 'Caramelized Onions', 'caramelized-onions', 1.99,  8),
  ('top-s-09', 'Mushrooms',          'mushrooms',          2.49,  9),
  ('top-s-10', 'Extra Sauce',        'extra-sauce',        0.99, 10),
  -- Vegan
  ('top-v-01', 'Extra Avocado',      'extra-avocado',      2.99, 11),
  ('top-v-02', 'Roasted Peppers',    'roasted-peppers',    1.99, 12),
  ('top-v-03', 'Extra Tofu',         'extra-tofu',         2.49, 13),
  ('top-v-04', 'Hummus',             'hummus',             1.99, 14),
  ('top-v-05', 'Hemp Seeds',         'hemp-seeds',         1.49, 15),
  ('top-v-06', 'Cashew Cream',       'cashew-cream',       2.49, 16),
  ('top-v-07', 'Extra Quinoa',       'extra-quinoa',       1.99, 17),
  ('top-v-08', 'Crispy Chickpeas',   'crispy-chickpeas',   1.99, 18),
  -- Dessert
  ('top-d-01', 'Whipped Cream',      'whipped-cream',      1.49, 19),
  ('top-d-02', 'Chocolate Sauce',    'chocolate-sauce',    1.49, 20),
  ('top-d-03', 'Caramel Drizzle',    'caramel-drizzle',    1.49, 21),
  ('top-d-04', 'Fresh Berries',      'fresh-berries',      2.49, 22),
  ('top-d-05', 'Vanilla Ice Cream',  'vanilla-ice-cream',  2.99, 23),
  ('top-d-06', 'Crushed Nuts',       'crushed-nuts',       1.99, 24),
  ('top-d-07', 'Sprinkles',          'sprinkles',          0.99, 25),
  ('top-d-08', 'Cookie Crumble',     'cookie-crumble',     1.99, 26),
  -- Drinks
  ('top-dr-01', 'Oat Milk',          'oat-milk',           0.75, 27),
  ('top-dr-02', 'Extra Shot',        'extra-shot',         1.50, 28),
  ('top-dr-03', 'Vanilla Syrup',     'vanilla-syrup',      0.75, 29),
  ('top-dr-04', 'Honey',             'honey',              0.75, 30),
  ('top-dr-05', 'Coconut Milk',      'coconut-milk',       0.75, 31),
  ('top-dr-06', 'Caramel Syrup',     'caramel-syrup',      0.75, 32),
  ('top-dr-07', 'Brown Sugar',       'brown-sugar',        0.50, 33),
  ('top-dr-08', 'Pearl Boba',        'pearl-boba',         1.50, 34),
  ('top-dr-09', 'Extra Fruit',       'extra-fruit',        1.50, 35)
ON CONFLICT (value) DO UPDATE SET id = EXCLUDED.id, label = EXCLUDED.label, price = EXCLUDED.price;

-- ────────────────────────────────────────────────────────────
--  PORTION OPTIONS
-- ────────────────────────────────────────────────────────────
INSERT INTO portion_options (label, value, price, sort_order) VALUES
  ('Personal (4 Slices)',  'personal',  0.00, 1),
  ('Medium (8 Slices)',    'medium',    3.00, 2),
  ('Familiar (10 Slices)', 'familiar',  6.00, 3),
  ('Jumbo (12 Slices)',    'jumbo',    10.00, 4)
ON CONFLICT (value) DO NOTHING;

-- ────────────────────────────────────────────────────────────
--  FOOD ITEM <-> TOPPING OPTIONS (junction)
--  Maps each food item to the toppings that make sense for it.
--  No meat/dairy on vegan items; no savory toppings on drinks/desserts.
-- ────────────────────────────────────────────────────────────
DELETE FROM food_item_topping_options;

INSERT INTO food_item_topping_options (food_item_id, topping_option_id, sort_order) VALUES
  -- ── SNACKS ──
  -- s-01 Mexican Appetizer
  ('s-01','top-s-01',1),('s-01','top-s-02',2),('s-01','top-s-03',3),('s-01','top-s-04',4),('s-01','top-s-05',5),('s-01','top-s-06',6),
  -- s-02 Pork Skewer
  ('s-02','top-s-02',1),('s-02','top-s-08',2),('s-02','top-s-10',3),
  -- s-03 Spring Rolls
  ('s-03','top-s-02',1),('s-03','top-s-10',2),
  -- s-04 Nachos Supreme
  ('s-04','top-s-01',1),('s-04','top-s-02',2),('s-04','top-s-03',3),('s-04','top-s-04',4),('s-04','top-s-05',5),('s-04','top-s-06',6),('s-04','top-s-07',7),
  -- s-05 Chicken Wings
  ('s-05','top-s-02',1),('s-05','top-s-07',2),('s-05','top-s-08',3),('s-05','top-s-10',4),
  -- s-06 Mozzarella Sticks
  ('s-06','top-s-02',1),('s-06','top-s-05',2),('s-06','top-s-10',3),
  -- s-07 Garlic Bruschetta
  ('s-07','top-s-04',1),('s-07','top-s-05',2),('s-07','top-s-08',3),('s-07','top-s-09',4),
  -- s-08 Onion Rings
  ('s-08','top-s-02',1),('s-08','top-s-05',2),('s-08','top-s-07',3),('s-08','top-s-10',4),
  -- s-09 Samosas
  ('s-09','top-s-02',1),('s-09','top-s-10',2),
  -- s-10 Cheese Quesadilla
  ('s-10','top-s-01',1),('s-10','top-s-02',2),('s-10','top-s-03',3),('s-10','top-s-04',4),('s-10','top-s-05',5),('s-10','top-s-06',6),

  -- ── MEAL ──
  -- m-01 Grilled Salmon
  ('m-01','top-s-08',1),('m-01','top-s-09',2),('m-01','top-s-10',3),
  -- m-02 Chicken Pasta
  ('m-02','top-s-05',1),('m-02','top-s-07',2),('m-02','top-s-09',3),('m-02','top-s-10',4),
  -- m-03 Sushi Roll
  ('m-03','top-s-02',1),('m-03','top-s-10',2),
  -- m-04 Beef Burger
  ('m-04','top-s-02',1),('m-04','top-s-03',2),('m-04','top-s-05',3),('m-04','top-s-07',4),('m-04','top-s-08',5),('m-04','top-s-09',6),
  -- m-05 BBQ Pork Ribs
  ('m-05','top-s-02',1),('m-05','top-s-08',2),('m-05','top-s-10',3),
  -- m-06 Fried Chicken Combo
  ('m-06','top-s-02',1),('m-06','top-s-05',2),('m-06','top-s-07',3),('m-06','top-s-10',4),
  -- m-07 Margherita Pizza
  ('m-07','top-s-02',1),('m-07','top-s-03',2),('m-07','top-s-05',3),('m-07','top-s-07',4),('m-07','top-s-08',5),('m-07','top-s-09',6),
  -- m-08 Duck Noodles
  ('m-08','top-s-02',1),('m-08','top-s-09',2),('m-08','top-s-10',3),
  -- m-09 Shrimp Tacos
  ('m-09','top-s-01',1),('m-09','top-s-02',2),('m-09','top-s-04',3),('m-09','top-s-06',4),('m-09','top-s-10',5),
  -- m-10 Fish & Chips
  ('m-10','top-s-05',1),('m-10','top-s-09',2),('m-10','top-s-10',3),

  -- ── VEGAN (no meat, no dairy) ──
  -- v-01 Buddha Bowl
  ('v-01','top-v-01',1),('v-01','top-v-04',2),('v-01','top-v-05',3),('v-01','top-v-07',4),('v-01','top-v-08',5),
  -- v-02 Avocado Toast
  ('v-02','top-v-01',1),('v-02','top-v-02',2),('v-02','top-v-03',3),('v-02','top-v-05',4),
  -- v-03 Vegan Burger
  ('v-03','top-v-01',1),('v-03','top-v-02',2),('v-03','top-v-03',3),('v-03','top-v-06',4),
  -- v-04 Lentil Soup
  ('v-04','top-v-04',1),('v-04','top-v-08',2),
  -- v-05 Cauliflower Steak
  ('v-05','top-v-02',1),('v-05','top-v-04',2),('v-05','top-v-06',3),
  -- v-06 Chickpea Curry
  ('v-06','top-v-04',1),('v-06','top-v-07',2),('v-06','top-v-08',3),
  -- v-07 Mushroom Risotto
  ('v-07','top-v-05',1),('v-07','top-v-06',2),
  -- v-08 Falafel Wrap
  ('v-08','top-v-01',1),('v-08','top-v-02',2),('v-08','top-v-04',3),
  -- v-09 Tofu Stir Fry
  ('v-09','top-v-03',1),('v-09','top-v-05',2),('v-09','top-v-07',3),
  -- v-10 Acai Bowl (sweet vegan — gets both vegan + dessert add-ons)
  ('v-10','top-v-01',1),('v-10','top-v-05',2),('v-10','top-d-04',3),('v-10','top-d-06',4),

  -- ── DESSERT ──
  -- d-01 Berry Cheesecake
  ('d-01','top-d-01',1),('d-01','top-d-02',2),('d-01','top-d-04',3),
  -- d-02 Chocolate Lava Cake
  ('d-02','top-d-01',1),('d-02','top-d-02',2),('d-02','top-d-03',3),('d-02','top-d-05',4),
  -- d-03 Tiramisu
  ('d-03','top-d-01',1),('d-03','top-d-07',2),
  -- d-04 Creme Brulee
  ('d-04','top-d-01',1),('d-04','top-d-04',2),
  -- d-05 Berry Cake
  ('d-05','top-d-01',1),('d-05','top-d-02',2),('d-05','top-d-04',3),('d-05','top-d-06',4),('d-05','top-d-07',5),
  -- d-06 Mango Sorbet
  ('d-06','top-d-04',1),('d-06','top-d-07',2),
  -- d-07 Apple Pie
  ('d-07','top-d-01',1),('d-07','top-d-03',2),('d-07','top-d-05',3),('d-07','top-d-06',4),
  -- d-08 Churros
  ('d-08','top-d-01',1),('d-08','top-d-02',2),('d-08','top-d-03',3),('d-08','top-d-07',4),('d-08','top-d-08',5),
  -- d-09 Panna Cotta
  ('d-09','top-d-01',1),('d-09','top-d-04',2),('d-09','top-d-07',3),
  -- d-10 Waffle Stack
  ('d-10','top-d-01',1),('d-10','top-d-02',2),('d-10','top-d-03',3),('d-10','top-d-04',4),('d-10','top-d-06',5),('d-10','top-d-07',6),

  -- ── DRINKS ──
  -- dr-01 Mango Smoothie
  ('dr-01','top-dr-04',1),('dr-01','top-dr-05',2),('dr-01','top-dr-08',3),('dr-01','top-dr-09',4),
  -- dr-02 Cold Brew Coffee
  ('dr-02','top-dr-01',1),('dr-02','top-dr-02',2),('dr-02','top-dr-03',3),('dr-02','top-dr-06',4),('dr-02','top-dr-07',5),
  -- dr-03 Fresh Orange Juice
  ('dr-03','top-dr-04',1),('dr-03','top-dr-09',2),
  -- dr-04 Matcha Latte
  ('dr-04','top-dr-01',1),('dr-04','top-dr-02',2),('dr-04','top-dr-03',3),('dr-04','top-dr-04',4),
  -- dr-05 Strawberry Milkshake
  ('dr-05','top-d-01',1),('dr-05','top-d-03',2),('dr-05','top-d-07',3),('dr-05','top-dr-03',4),
  -- dr-06 Lemonade
  ('dr-06','top-dr-04',1),('dr-06','top-dr-08',2),('dr-06','top-dr-09',3),
  -- dr-07 Berry Smoothie
  ('dr-07','top-dr-04',1),('dr-07','top-dr-05',2),('dr-07','top-dr-08',3),('dr-07','top-dr-09',4),
  -- dr-08 Iced Chai Latte
  ('dr-08','top-dr-01',1),('dr-08','top-dr-04',2),('dr-08','top-dr-05',3),('dr-08','top-dr-07',4),
  -- dr-09 Tropical Fruit Juice
  ('dr-09','top-dr-04',1),('dr-09','top-dr-05',2),('dr-09','top-dr-09',3),
  -- dr-10 Watermelon Cooler
  ('dr-10','top-dr-04',1),('dr-10','top-dr-08',2),('dr-10','top-dr-09',3)
;
