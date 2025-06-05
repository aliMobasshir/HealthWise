import React, { useState } from 'react';
import { Search, Info, X, Leaf, AlertTriangle, Heart, Brain, Apple } from 'lucide-react';

// Sample food data
const foodsData = [
  {
    id: 1,
    name: 'Avocado',
    category: 'Fruit',
    image: 'https://images.pexels.com/photos/557659/pexels-photo-557659.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    servingSize: '100g (about 2/3 of a medium avocado)',
    nutrients: {
      calories: 160,
      protein: '2g',
      fat: '15g',
      carbs: '9g',
      fiber: '7g'
    },
    benefits: [
      'Rich in heart-healthy monounsaturated fats',
      'Contains potassium which helps regulate blood pressure',
      'High in fiber which aids digestion',
      'Contains lutein which is beneficial for eye health',
      'Rich in folate which is important for cell repair'
    ],
    sideEffects: [
      'High in calories which may contribute to weight gain if consumed in excess',
      'May cause allergic reactions in some individuals',
      'Contains compounds that may interact with certain medications'
    ]
  },
  {
    id: 2,
    name: 'Salmon',
    category: 'Fish',
    image: 'https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    servingSize: '100g (about 3.5 oz fillet)',
    nutrients: {
      calories: 206,
      protein: '22g',
      fat: '13g',
      carbs: '0g',
      fiber: '0g'
    },
    benefits: [
      'Excellent source of high-quality protein',
      'Rich in omega-3 fatty acids which support heart and brain health',
      'Good source of B vitamins for energy production',
      'Contains selenium which is important for thyroid function',
      'High in potassium which helps regulate blood pressure'
    ],
    sideEffects: [
      'May contain environmental contaminants like mercury',
      'Can cause allergic reactions in people with fish allergies',
      'High in purines which may trigger gout in susceptible individuals'
    ]
  },
  {
    id: 3,
    name: 'Spinach',
    category: 'Vegetable',
    image: 'https://images.pexels.com/photos/2255925/pexels-photo-2255925.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    servingSize: '100g (about 3 cups raw)',
    nutrients: {
      calories: 23,
      protein: '2.9g',
      fat: '0.4g',
      carbs: '3.6g',
      fiber: '2.2g'
    },
    benefits: [
      'Rich in iron which is essential for blood production',
      'High in vitamin K which is important for bone health',
      'Contains antioxidants that help fight oxidative stress',
      'Good source of vitamin A for vision and immune function',
      'Rich in folate which is important for DNA synthesis'
    ],
    sideEffects: [
      'High in oxalates which may contribute to kidney stone formation in susceptible individuals',
      'May interact with blood-thinning medications due to high vitamin K content',
      'Can cause bloating or gas in some people'
    ]
  },
  {
    id: 4,
    name: 'Almonds',
    category: 'Nuts',
    image: 'https://images.pexels.com/photos/1013420/pexels-photo-1013420.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    servingSize: '28g (about 23 almonds)',
    nutrients: {
      calories: 164,
      protein: '6g',
      fat: '14g',
      carbs: '6g',
      fiber: '3.5g'
    },
    benefits: [
      'Good source of healthy fats which support heart health',
      'Rich in vitamin E which acts as an antioxidant',
      'Contains magnesium which supports muscle and nerve function',
      'High in protein which helps with muscle maintenance',
      'Contains fiber which supports digestive health'
    ],
    sideEffects: [
      'High in calories which may contribute to weight gain if consumed in excess',
      'May cause allergic reactions in some individuals',
      'Contains compounds that can interfere with nutrient absorption in large amounts'
    ]
  },
  {
    id: 5,
    name: 'Blueberries',
    category: 'Fruit',
    image: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?q=80&w=2669&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    servingSize: '100g (about 3/4 cup)',
    nutrients: {
      calories: 84,
      protein: '1.1g',
      fat: '0.5g',
      carbs: '21g',
      fiber: '3.6g'
    },
    benefits: [
      'High in antioxidants which help combat oxidative stress',
      'Contains anthocyanins which support brain health',
      'May help improve memory and cognitive function',
      'Support heart health by improving cholesterol levels',
      'Rich in vitamin C which supports immune function'
    ],
    sideEffects: [
      'May interact with blood thinning medications',
      'Can cause digestive issues in some people',
      'May lower blood sugar levels which could affect diabetics on medication'
    ]
  },
  {
    id: 6,
    name: 'Quinoa',
    category: 'Grain',
    image: 'https://images.unsplash.com/photo-1586201375799-47cd24c3f595?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    servingSize: '100g (about 1/2 cup uncooked)',
    nutrients: {
      calories: 120,
      protein: '4.4g',
      fat: '1.9g',
      carbs: '21.3g',
      fiber: '2.8g'
    },
    benefits: [
      'Complete protein source containing all essential amino acids',
      'Rich in fiber which supports digestive health',
      'Contains manganese which is important for metabolism',
      'Good source of magnesium which supports muscle function',
      'Contains antioxidants which help fight inflammation'
    ],
    sideEffects: [
      'Contains saponins which can cause digestive discomfort in some people',
      'May trigger allergic reactions in sensitive individuals',
      'Can cause bloating or gas in some people'
    ]
  },
  {
    id: 7,
    name: 'Sweet Potato',
    category: 'Vegetable',
    image: 'https://images.unsplash.com/photo-1648722750947-a9614ffd359e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c3dlZXQlMjBwb3RhdG98ZW58MHwwfDB8fHww',
    servingSize: '100g (about 1 small potato)',
    nutrients: {
      calories: 86,
      protein: '1.6g',
      fat: '0.1g',
      carbs: '20.1g',
      fiber: '3g'
    },
    benefits: [
      'Rich in beta-carotene which supports eye health',
      'Good source of vitamin C which supports immune function',
      'Contains potassium which helps regulate blood pressure',
      'High in fiber which supports digestive health',
      'Contains antioxidants which help fight inflammation'
    ],
    sideEffects: [
      'High in carbohydrates which may affect blood sugar levels',
      'May cause digestive issues in some people',
      'Can trigger allergic reactions in rare cases'
    ]
  },
  {
    id: 8,
    name: 'Greek Yogurt',
    category: 'Dairy',
    image: 'https://images.unsplash.com/photo-1633893215271-f7e1fca081ad?q=80&w=2672&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    servingSize: '100g (about 1/2 cup)',
    nutrients: {
      calories: 100,
      protein: '17g',
      fat: '0.4g',
      carbs: '6g',
      fiber: '0g'
    },
    benefits: [
      'High in protein which supports muscle growth and repair',
      'Contains probiotics which support gut health',
      'Good source of calcium which is important for bone health',
      'Contains B vitamins which support energy metabolism',
      'Rich in iodine which is important for thyroid function'
    ],
    sideEffects: [
      'May cause digestive issues in lactose intolerant individuals',
      'Can trigger allergic reactions in those with milk allergies',
      'Some varieties are high in added sugars'
    ]
  },
  {
    id: 9,
    name: 'Turmeric',
    category: 'Spice',
    image: 'https://plus.unsplash.com/premium_photo-1726862790171-0d6208559224?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dHVybWVyaWN8ZW58MHwwfDB8fHww',
    servingSize: '10g (about 1 tablespoon)',
    nutrients: {
      calories: 24,
      protein: '0.5g',
      fat: '0.7g',
      carbs: '4.4g',
      fiber: '1.4g'
    },
    benefits: [
      'Contains curcumin which has powerful anti-inflammatory properties',
      'Has antioxidant effects which help combat oxidative stress',
      'May improve brain function and lower risk of brain diseases',
      'Can help reduce symptoms of arthritis',
      'May help lower risk of heart disease'
    ],
    sideEffects: [
      'May interact with certain medications including blood thinners',
      'Can cause digestive issues in some people',
      'May lower blood sugar levels which could affect diabetics on medication',
      'May cause allergic reactions in some individuals'
    ]
  },
  {
    id: 10,
    name: 'Kale',
    category: 'Vegetable',
    image: 'https://plus.unsplash.com/premium_photo-1702286619432-740a9d5e3ff0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a2FsZXxlbnwwfDB8MHx8fDA%3D',
    servingSize: '100g (about 2 cups chopped)',
    nutrients: {
      calories: 49,
      protein: '4.3g',
      fat: '0.7g',
      carbs: '8.8g',
      fiber: '3.6g'
    },
    benefits: [
      'Rich in vitamins A, K, and C',
      'Contains antioxidants which help combat oxidative stress',
      'Good source of calcium which is important for bone health',
      'Contains lutein and zeaxanthin which support eye health',
      'Has anti-inflammatory properties'
    ],
    sideEffects: [
      'High in vitamin K which may interact with blood-thinning medications',
      'Contains goitrogens which can affect thyroid function in large amounts',
      'May cause digestive discomfort in some people',
      'Can cause bloating or gas'
    ]
  },
   {
    id: 11,
    name: 'Eggs',
    category: 'Protein',
    image: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZWdnc3xlbnwwfDB8MHx8fDA%3D',
    servingSize: '100g (about 2 large eggs)',
    nutrients: {
      calories: 155,
      protein: '13g',
      fat: '11g',
      carbs: '1.1g',
      fiber: '0g'
    },
    benefits: [
      'Excellent source of high-quality protein',
      'Rich in choline which supports brain health',
      'Contains lutein and zeaxanthin which support eye health',
      'Provide essential B vitamins',
      'Promote muscle growth and repair'
    ],
    sideEffects: [
      'High in cholesterol which may affect heart health in some individuals',
      'May cause allergic reactions especially in children',
      'Overconsumption may lead to digestive issues'
    ]
  },
  {
    id: 12,
    name: 'Broccoli',
    category: 'Vegetable',
    image: 'https://images.unsplash.com/photo-1628773822503-930a7eaecf80?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YnJvY29sbGl8ZW58MHwwfDB8fHww',
    servingSize: '100g (about 1 cup chopped)',
    nutrients: {
      calories: 55,
      protein: '3.7g',
      fat: '0.6g',
      carbs: '11g',
      fiber: '3.8g'
    },
    benefits: [
      'Rich in vitamins C and K',
      'Contains compounds that may help fight cancer',
      'Supports immune system health',
      'Good for digestion due to high fiber',
      'Anti-inflammatory and antioxidant properties'
    ],
    sideEffects: [
      'May cause gas or bloating',
      'Can interfere with thyroid function in large amounts',
      'May interact with blood thinners due to vitamin K'
    ]
  },
  {
    id: 13,
    name: 'Chia Seeds',
    category: 'Seeds',
    image: 'https://plus.unsplash.com/premium_photo-1725677198539-c8e28ba403bd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNoaWElMjBzZWVkc3xlbnwwfDB8MHx8fDA%3D',
    servingSize: '28g (about 2 tablespoons)',
    nutrients: {
      calories: 137,
      protein: '4g',
      fat: '9g',
      carbs: '12g',
      fiber: '10g'
    },
    benefits: [
      'Excellent source of omega-3 fatty acids',
      'High in fiber which promotes satiety',
      'Support heart health',
      'Aid in digestion',
      'Rich in antioxidants and minerals like calcium'
    ],
    sideEffects: [
      'May cause digestive issues if not consumed with enough water',
      'Can lead to choking if consumed dry',
      'Overconsumption may cause bloating'
    ]
  },
  {
    id: 14,
    name: 'Banana',
    category: 'Fruit',
    image: 'https://images.pexels.com/photos/461208/pexels-photo-461208.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    servingSize: '118g (1 medium banana)',
    nutrients: {
      calories: 105,
      protein: '1.3g',
      fat: '0.3g',
      carbs: '27g',
      fiber: '3.1g'
    },
    benefits: [
      'Rich in potassium which helps regulate blood pressure',
      'Provides quick energy due to natural sugars',
      'Supports digestion',
      'Contains vitamin B6 for brain health',
      'Natural prebiotic food for gut bacteria'
    ],
    sideEffects: [
      'Can cause blood sugar spikes in diabetics',
      'May lead to constipation in some people',
      'Overconsumption may cause weight gain'
    ]
  },
  {
    id: 15,
    name: 'Oats',
    category: 'Grain',
    image: 'https://plus.unsplash.com/premium_photo-1661457816683-86bc95383edd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8b2F0c3xlbnwwfDB8MHx8fDA%3D',
    servingSize: '100g (about 1 cup dry)',
    nutrients: {
      calories: 389,
      protein: '16.9g',
      fat: '6.9g',
      carbs: '66.3g',
      fiber: '10.6g'
    },
    benefits: [
      'Excellent source of soluble fiber (beta-glucan)',
      'Helps reduce cholesterol levels',
      'Supports digestive health',
      'Keeps you full longer, aiding weight control',
      'Rich in antioxidants and B vitamins'
    ],
    sideEffects: [
      'May cause bloating or gas',
      'Cross-contamination risk with gluten (for celiacs)',
      'Excessive intake may hinder absorption of some minerals'
    ]
  },
  {
    id: 16,
    name: 'Green Tea',
    category: 'Beverage',
    image: 'https://images.pexels.com/photos/1417945/pexels-photo-1417945.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    servingSize: '240ml (1 cup brewed)',
    nutrients: {
      calories: 2,
      protein: '0g',
      fat: '0g',
      carbs: '0.5g',
      fiber: '0g'
    },
    benefits: [
      'Rich in antioxidants like catechins',
      'Boosts metabolism and fat burning',
      'May reduce the risk of heart disease',
      'Enhances brain function',
      'May improve insulin sensitivity'
    ],
    sideEffects: [
      'May cause insomnia due to caffeine content',
      'Can lead to iron absorption issues',
      'May cause stomach upset if consumed on an empty stomach'
    ]
  },
  {
    id: 17,
    name: 'Lentils',
    category: 'Legumes',
    image: 'https://images.pexels.com/photos/4198023/pexels-photo-4198023.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    servingSize: '100g (about 1/2 cup cooked)',
    nutrients: {
      calories: 230,
      protein: '18g',
      fat: '0.8g',
      carbs: '40g',
      fiber: '15.6g'
    },
    benefits: [
      'High in plant-based protein',
      'Great source of dietary fiber',
      'Rich in iron and folate',
      'Support heart health',
      'Help regulate blood sugar levels'
    ],
    sideEffects: [
      'May cause gas and bloating',
      'Contain antinutrients like lectins',
      'Can trigger allergic reactions in rare cases'
    ]
  },
  {
    id: 18,
    name: 'Carrots',
    category: 'Vegetable',
    image: 'https://images.unsplash.com/photo-1447175008436-054170c2e979?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2Fycm90c3xlbnwwfDB8MHx8fDA%3D',
    servingSize: '100g (about 2 medium carrots)',
    nutrients: {
      calories: 41,
      protein: '0.9g',
      fat: '0.2g',
      carbs: '10g',
      fiber: '2.8g'
    },
    benefits: [
      'Excellent source of beta-carotene for eye health',
      'Support immune function',
      'Promote healthy skin',
      'Aid digestion',
      'Low in calories and great for weight loss'
    ],
    sideEffects: [
      'Overconsumption may lead to carotenemia (orange skin)',
      'May cause digestive discomfort in large amounts',
      'Can be allergenic to some individuals'
    ]
  },
  {
    id: 19,
    name: 'Coconut Water',
    category: 'Beverage',
    image: 'https://images.unsplash.com/photo-1620752420341-4cd7642568dd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29jb251dCUyMHdhdGVyfGVufDB8MHwwfHx8MA%3D%3D',
    servingSize: '240ml (1 cup)',
    nutrients: {
      calories: 46,
      protein: '1.7g',
      fat: '0.5g',
      carbs: '9g',
      fiber: '2.6g'
    },
    benefits: [
      'Excellent natural hydrator',
      'Contains electrolytes like potassium and magnesium',
      'Low in calories and fat',
      'Supports heart health',
      'May aid in digestion'
    ],
    sideEffects: [
      'May cause bloating in some individuals',
      'Can interact with medications for blood pressure',
      'High in potassium – excess may affect kidney patients'
    ]
  },
  {
    id: 20,
    name: 'Pumpkin Seeds',
    category: 'Seeds',
    image: 'https://plus.unsplash.com/premium_photo-1725878603130-1cf318b481c3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHVtcGtpbiUyMHNlZWRzfGVufDB8MHwwfHx8MA%3D%3D',
    servingSize: '28g (about 1/4 cup)',
    nutrients: {
      calories: 151,
      protein: '7g',
      fat: '13g',
      carbs: '5g',
      fiber: '1.1g'
    },
    benefits: [
      'Rich in magnesium for heart and bone health',
      'Good source of plant-based protein',
      'Contain antioxidants that reduce inflammation',
      'Support prostate and bladder health',
      'Aid in improving sleep due to tryptophan content'
    ],
    sideEffects: [
      'May cause gas or bloating',
      'High in calories if overeaten',
      'Can cause allergic reactions in some people'
    ]
  },
  {
  id: 21,
  name: 'Garlic',
  category: 'Vegetable',
  image: 'https://plus.unsplash.com/premium_photo-1666877049261-ea88f75e7be2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Z2FybGljfGVufDB8MHwwfHx8MA%3D%3D',
  servingSize: '100g (about 30 cloves)',
  nutrients: {
    calories: 149,
    protein: '6.4g',
    fat: '0.5g',
    carbs: '33g',
    fiber: '2.1g'
  },
  benefits: [
    'Supports immune system function',
    'Has anti-inflammatory and antibacterial properties',
    'May help reduce blood pressure',
    'Improves heart health',
    'Contains antioxidants that protect against cell damage'
  ],
  sideEffects: [
    'Can cause bad breath and body odor',
    'May lead to heartburn or stomach upset',
    'Can interfere with blood-thinning medications'
  ]
},
{
  id: 22,
  name: 'Tomato',
  category: 'Fruit',
  image: 'https://images.unsplash.com/photo-1607305387299-a3d9611cd469?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dG9tYXRvfGVufDB8MHwwfHx8MA%3D%3D',
  servingSize: '100g (about 1 medium tomato)',
  nutrients: {
    calories: 18,
    protein: '0.9g',
    fat: '0.2g',
    carbs: '3.9g',
    fiber: '1.2g'
  },
  benefits: [
    'Rich in lycopene, which helps reduce cancer risk',
    'Good for skin health and UV protection',
    'Improves heart health',
    'Supports vision and bone health',
    'Hydrating due to high water content'
  ],
  sideEffects: [
    'May worsen acid reflux or GERD symptoms',
    'Possible allergic reactions in sensitive individuals',
    'Excess intake may cause kidney issues due to oxalates'
  ]
},
{
  id: 23,
  name: 'Mango',
  category: 'Fruit',
  image: 'https://plus.unsplash.com/premium_photo-1725813912692-e37fd5aa1b5a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWFuZ298ZW58MHwwfDB8fHww',
  servingSize: '100g (about 2/3 cup sliced)',
  nutrients: {
    calories: 60,
    protein: '0.8g',
    fat: '0.4g',
    carbs: '15g',
    fiber: '1.6g'
  },
  benefits: [
    'Rich in vitamin C for immune support',
    'Contains digestive enzymes that aid digestion',
    'Supports skin health and eye health',
    'Contains antioxidants like beta-carotene',
    'Natural energy booster'
  ],
  sideEffects: [
    'High sugar content may spike blood glucose',
    'Overeating may cause diarrhea or indigestion',
    'May cause allergies in rare cases'
  ]
},
{
  id: 24,
  name: 'Walnuts',
  category: 'Nuts',
  image: 'https://images.unsplash.com/photo-1524593656068-fbac72624bb0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d2FsbnV0c3xlbnwwfDB8MHx8fDA%3D',
  servingSize: '28g (about 1/4 cup or 14 halves)',
  nutrients: {
    calories: 185,
    protein: '4.3g',
    fat: '18.5g',
    carbs: '3.9g',
    fiber: '1.9g'
  },
  benefits: [
    'High in omega-3 fatty acids for brain and heart health',
    'Promotes healthy aging',
    'Supports good gut bacteria',
    'Improves cognitive function',
    'Reduces inflammation'
  ],
  sideEffects: [
    'Calorie-dense and may lead to weight gain if overeaten',
    'Possible nut allergies',
    'Can cause bloating or digestive issues'
  ]
},
{
  id: 25,
  name: 'Beetroot',
  category: 'Vegetable',
  image: 'https://images.unsplash.com/photo-1533231040102-5ec7a63e6d0a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmVldHJvb3R8ZW58MHwwfDB8fHww',
  servingSize: '100g (about 1 medium beetroot)',
  nutrients: {
    calories: 43,
    protein: '1.6g',
    fat: '0.2g',
    carbs: '10g',
    fiber: '2.8g'
  },
  benefits: [
    'Supports blood pressure regulation',
    'Boosts athletic performance',
    'Rich in nitrates and antioxidants',
    'Improves blood flow and oxygen delivery',
    'Promotes liver detoxification'
  ],
  sideEffects: [
    'Can turn urine and stool pink (beeturia)',
    'May cause kidney stones in susceptible individuals',
    'Excessive intake may lead to low calcium levels'
  ]
},
{
  id: 26,
  name: 'Pineapple',
  category: 'Fruit',
  image: 'https://plus.unsplash.com/premium_photo-1675237625753-94d031305521?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cGluZWFwcGxlfGVufDB8MHwwfHx8MA%3D%3D',
  servingSize: '100g (about 1 slice)',
  nutrients: {
    calories: 50,
    protein: '0.5g',
    fat: '0.1g',
    carbs: '13g',
    fiber: '1.4g'
  },
  benefits: [
    'Rich in vitamin C and manganese',
    'Contains bromelain enzyme for digestion',
    'Anti-inflammatory properties',
    'Supports immune function',
    'Aids tissue healing'
  ],
  sideEffects: [
    'Can cause mouth or tongue irritation',
    'May trigger allergic reactions in sensitive people',
    'High sugar content if overconsumed'
  ]
},
{
  id: 27,
  name: 'Cucumber',
  category: 'Vegetable',
  image: 'https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y3VjdW1iZXJ8ZW58MHwwfDB8fHww',
  servingSize: '100g (about 1/2 medium cucumber)',
  nutrients: {
    calories: 16,
    protein: '0.7g',
    fat: '0.1g',
    carbs: '3.6g',
    fiber: '0.5g'
  },
  benefits: [
    'High water content for hydration',
    'Supports skin health',
    'Aids in weight loss',
    'Contains antioxidants and silica',
    'May help lower blood sugar'
  ],
  sideEffects: [
    'Overeating may cause bloating',
    'May lead to digestive upset if waxed',
    'Could interfere with kidney issues due to potassium'
  ]
},
{
  id: 28,
  name: 'Apple',
  category: 'Fruit',
  image: 'https://images.pexels.com/photos/39803/pexels-photo-39803.jpeg',
  servingSize: '100g (about 1/2 medium apple)',
  nutrients: {
    calories: 52,
    protein: '0.3g',
    fat: '0.2g',
    carbs: '14g',
    fiber: '2.4g'
  },
  benefits: [
    'Rich in fiber and vitamin C',
    'Supports heart health',
    'May aid weight loss',
    'Promotes gut health',
    'Contains polyphenols with antioxidant effects'
  ],
  sideEffects: [
    'May cause bloating or gas in some people',
    'Seeds contain small amounts of cyanide',
    'May raise blood sugar levels if eaten in excess'
  ]
},
{
  id: 29,
  name: 'Dark Chocolate',
  category: 'Snack',
  image: 'https://images.unsplash.com/photo-1542843137-8791a6904d14?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZGFyayUyMGNob2NvbGF0ZXxlbnwwfDB8MHx8fDA%3D',
  servingSize: '28g (about 1 oz or 3-4 small squares)',
  nutrients: {
    calories: 155,
    protein: '1.4g',
    fat: '9g',
    carbs: '17g',
    fiber: '2g'
  },
  benefits: [
    'Rich in antioxidants like flavonoids',
    'Improves blood flow and lowers blood pressure',
    'Boosts brain function',
    'May reduce heart disease risk',
    'Enhances mood'
  ],
  sideEffects: [
    'High in calories and fat',
    'Contains caffeine which may disrupt sleep',
    'May trigger migraines in sensitive individuals'
  ]
},
{
  id: 30,
  name: 'Tofu',
  category: 'Protein',
  image: 'https://plus.unsplash.com/premium_photo-1712849061733-1d2964712479?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dG9mdXxlbnwwfDB8MHx8fDA%3D',
  servingSize: '100g (about 1/2 cup)',
  nutrients: {
    calories: 76,
    protein: '8g',
    fat: '4.8g',
    carbs: '1.9g',
    fiber: '0.3g'
  },
  benefits: [
    'Excellent plant-based protein',
    'Contains all essential amino acids',
    'Good source of calcium and iron',
    'Supports heart health',
    'May reduce risk of certain cancers'
  ],
  sideEffects: [
    'May affect hormone levels if consumed excessively',
    'Possible allergen for soy-sensitive individuals',
    'May interfere with thyroid medications'
  ]
},
{
  id: 31,
  name: 'Pomegranate',
  category: 'Fruit',
  image: 'https://plus.unsplash.com/premium_photo-1668076515507-c5bc223c99a4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG9tZWdyYW5hdGV8ZW58MHwwfDB8fHww',
  servingSize: '100g (about 1/2 cup arils)',
  nutrients: {
    calories: 83,
    protein: '1.7g',
    fat: '1.2g',
    carbs: '19g',
    fiber: '4g'
  },
  benefits: [
    'Rich in antioxidants (punicalagins and anthocyanins)',
    'Supports heart health',
    'Has anti-inflammatory effects',
    'May help fight bacterial and fungal infections',
    'Improves memory and brain function'
  ],
  sideEffects: [
    'May interact with blood pressure medications',
    'Can cause allergies in rare cases',
    'Juice is high in natural sugars'
  ]
},
{
  id: 32,
  name: 'Cabbage',
  category: 'Vegetable',
  image: 'https://images.unsplash.com/photo-1697346327617-c333613a349a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2FiYmFnZXxlbnwwfDB8MHx8fDA%3D',
  servingSize: '100g (about 1 cup shredded)',
  nutrients: {
    calories: 25,
    protein: '1.3g',
    fat: '0.1g',
    carbs: '6g',
    fiber: '2.5g'
  },
  benefits: [
    'Rich in vitamin K and C',
    'Supports digestion and detoxification',
    'Contains cancer-fighting compounds',
    'Boosts immunity',
    'Anti-inflammatory properties'
  ],
  sideEffects: [
    'May cause gas or bloating',
    'High intake may interfere with thyroid in raw form',
    'Can trigger IBS symptoms in some people'
  ]
},
{
  id: 33,
  name: 'Mushrooms',
  category: 'Fungus',
  image: 'https://images.unsplash.com/photo-1512595765784-5ebad80772a3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bXVzaHJvb21zfGVufDB8MHwwfHx8MA%3D%3D',
  servingSize: '100g (about 1 cup sliced)',
  nutrients: {
    calories: 22,
    protein: '3.1g',
    fat: '0.3g',
    carbs: '3.3g',
    fiber: '1g'
  },
  benefits: [
    'Low in calories but rich in nutrients',
    'Contains B vitamins and selenium',
    'Supports immune function',
    'May have anti-cancer properties',
    'Promotes brain health'
  ],
  sideEffects: [
    'Some wild mushrooms are toxic if misidentified',
    'May cause allergic reactions',
    'Raw mushrooms contain agaritine, a potential toxin'
  ]
},
{
  id: 34,
  name: 'Peanut Butter',
  category: 'Spread',
  image: 'https://images.unsplash.com/flagged/photo-1625402535207-953e03369f59?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGVhbnV0JTIwYnV0dGVyfGVufDB8MHwwfHx8MA%3D%3D',
  servingSize: '32g (about 2 tablespoons)',
  nutrients: {
    calories: 188,
    protein: '8g',
    fat: '16g',
    carbs: '6.3g',
    fiber: '1.9g'
  },
  benefits: [
    'High in healthy fats and protein',
    'Rich in niacin and vitamin E',
    'Provides long-lasting energy',
    'Supports muscle gain',
    'May help control blood sugar levels'
  ],
  sideEffects: [
    'High in calories and fat',
    'May contain added sugars and oils',
    'Risk of peanut allergy'
  ]
},
{
  id: 35,
  name: 'Orange',
  category: 'Fruit',
  image: 'https://images.unsplash.com/photo-1591206369811-4eeb2f03bc95?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG9yYW5nZXxlbnwwfDB8MHx8fDA%3D',
  servingSize: '100g (about 1 small orange)',
  nutrients: {
    calories: 47,
    protein: '0.9g',
    fat: '0.1g',
    carbs: '12g',
    fiber: '2.4g'
  },
  benefits: [
    'High in vitamin C for immunity',
    'Hydrating due to water content',
    'Supports skin health and iron absorption',
    'Contains antioxidants and potassium',
    'May help reduce inflammation'
  ],
  sideEffects: [
    'Acidic nature can cause tooth enamel erosion',
    'May cause heartburn or acid reflux',
    'High natural sugar content if overeaten'
  ]
},{
  id: 36,
  name: 'Brown Rice',
  category: 'Grain',
  image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=80&w=2650&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  servingSize: '100g (about 1/2 cup uncooked)',
  nutrients: {
    calories: 111,
    protein: '2.6g',
    fat: '0.9g',
    carbs: '23g',
    fiber: '1.8g'
  },
  benefits: [
    'Whole grain rich in fiber',
    'Supports heart health',
    'Stabilizes blood sugar',
    'Aids digestion',
    'Contains magnesium and selenium'
  ],
  sideEffects: [
    'May contain traces of arsenic',
    'Harder to digest for some people',
    'Excessive consumption may cause bloating'
  ]
},
{
  id: 37,
  name: 'Zucchini',
  category: 'Vegetable',
  image: 'https://images.unsplash.com/photo-1692956475726-d4a90d0dfbdf?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8enVjY2hpbml8ZW58MHwwfDB8fHww',
  servingSize: '100g (about 1 small zucchini)',
  nutrients: {
    calories: 17,
    protein: '1.2g',
    fat: '0.3g',
    carbs: '3.1g',
    fiber: '1g'
  },
  benefits: [
    'Low in calories and carbs',
    'Rich in vitamin A and antioxidants',
    'Promotes healthy digestion',
    'Supports eye health',
    'May reduce blood sugar levels'
  ],
  sideEffects: [
    'May cause gas if not cooked properly',
    'Bitter varieties may contain toxic cucurbitacins',
    'Allergic reactions are rare but possible'
  ]
},
{
  id: 38,
  name: 'Dates',
  category: 'Fruit',
  image: 'https://plus.unsplash.com/premium_photo-1676208753932-6e8bc83a0b0d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGF0ZXN8ZW58MHwwfDB8fHww',
  servingSize: '100g (about 4-5 Medjool dates)',
  nutrients: {
    calories: 277,
    protein: '2g',
    fat: '0.2g',
    carbs: '75g',
    fiber: '7g'
  },
  benefits: [
    'High in natural sugars and energy',
    'Rich in fiber and antioxidants',
    'Promotes brain health',
    'Improves digestion',
    'Natural sweetener alternative'
  ],
  sideEffects: [
    'Can raise blood sugar levels if overconsumed',
    'High calorie content may lead to weight gain',
    'May cause diarrhea in large quantities'
  ]
},
{
  id: 39,
  name: 'Cottage Cheese',
  category: 'Dairy',
  image: 'https://plus.unsplash.com/premium_photo-1700612684956-2a6b996d6df7?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  servingSize: '100g (about 1/2 cup)',
  nutrients: {
    calories: 98,
    protein: '11g',
    fat: '4.3g',
    carbs: '3.4g',
    fiber: '0g'
  },
  benefits: [
    'Excellent source of casein protein',
    'Supports muscle repair and growth',
    'Low in carbs',
    'High in calcium and phosphorus',
    'Promotes bone health'
  ],
  sideEffects: [
    'May cause bloating or lactose intolerance issues',
    'High sodium content in some brands',
    'Not suitable for vegan diets'
  ]
},
{
  id: 40,
  name: 'Papaya',
  category: 'Fruit',
  image: 'https://images.unsplash.com/photo-1541472596887-494ee5c0fe30?q=80&w=2767&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  servingSize: '100g (about 1 cup cubed)',
  nutrients: {
    calories: 59,
    protein: '0.5g',
    fat: '0.4g',
    carbs: '15g',
    fiber: '2.7g'
  },
  benefits: [
    'Rich in papain enzyme aiding digestion',
    'High in vitamin C and A',
    'Supports eye and skin health',
    'May reduce inflammation',
    'Helps with constipation'
  ],
  sideEffects: [
    'May cause allergic reactions',
    'Unripe papaya unsafe during pregnancy',
    'Overconsumption may cause stomach upset'
  ]
},
{
  id: 41,
  name: 'Raspberries',
  category: 'Fruit',
  image: 'https://plus.unsplash.com/premium_photo-1675731118509-ab902002dbac?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFzcGJlcnJ5fGVufDB8MHwwfHx8MA%3D%3D',
  servingSize: '100g (about 3/4 cup)',
  nutrients: {
    calories: 52,
    protein: '1.2g',
    fat: '0.7g',
    carbs: '12g',
    fiber: '6.5g'
  },
  benefits: [
    'High in dietary fiber',
    'Loaded with antioxidants',
    'Supports weight management',
    'May protect against cancer',
    'Improves blood sugar control'
  ],
  sideEffects: [
    'Pesticide exposure if not organic',
    'May cause allergic reactions',
    'Can cause bloating in some people'
  ]
},
{
  id: 42,
  name: 'Barley',
  category: 'Grain',
  image: 'https://images.unsplash.com/photo-1497448134719-754ac7fd09eb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YmFybGV5fGVufDB8MHwwfHx8MA%3D%3D',
  servingSize: '100g (about 1/2 cup uncooked)',
  nutrients: {
    calories: 354,
    protein: '12g',
    fat: '2.3g',
    carbs: '73g',
    fiber: '17g'
  },
  benefits: [
    'Excellent source of soluble fiber (beta-glucan)',
    'Lowers cholesterol levels',
    'Improves digestion and satiety',
    'Regulates blood sugar',
    'Supports heart health'
  ],
  sideEffects: [
    'Contains gluten, not suitable for celiac disease',
    'May cause bloating',
    'Can lower blood sugar too much with medication'
  ]
},
{
  id: 43,
  name: 'Peas',
  category: 'Legume',
  image: 'https://images.unsplash.com/photo-1668548205372-1becd11b5641?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGVhc3xlbnwwfDB8MHx8fDA%3D',
  servingSize: '100g (about 2/3 cup)',
  nutrients: {
    calories: 81,
    protein: '5.4g',
    fat: '0.4g',
    carbs: '14g',
    fiber: '5.7g'
  },
  benefits: [
    'Good source of plant-based protein',
    'Rich in fiber and iron',
    'Supports digestive and heart health',
    'Helps manage weight',
    'Promotes muscle growth'
  ],
  sideEffects: [
    'Can cause bloating due to starches',
    'Moderate purine content may affect gout',
    'Allergic reactions are possible'
  ]
},
{
  id: 44,
  name: 'Asparagus',
  category: 'Vegetable',
  image: 'https://images.unsplash.com/photo-1629875235136-737fef945cfd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXNwYXJhZ3VzfGVufDB8MHwwfHx8MA%3D%3D',
  servingSize: '100g (about 5 medium spears)',
  nutrients: {
    calories: 20,
    protein: '2.2g',
    fat: '0.2g',
    carbs: '3.9g',
    fiber: '2.1g'
  },
  benefits: [
    'Rich in folate, vitamin A, C, and K',
    'Supports detoxification',
    'Promotes digestive health',
    'Natural diuretic',
    'May improve fertility'
  ],
  sideEffects: [
    'May cause smelly urine',
    'Could lead to gas or bloating',
    'Potential allergic reaction in some'
  ]
},
{
  id: 45,
  name: 'Buckwheat',
  category: 'Pseudo-grain',
  image: 'https://images.unsplash.com/photo-1671731478749-047201d3278e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YnVja3doZWF0fGVufDB8MHwwfHx8MA%3D%3D',
  servingSize: '100g (about 1/2 cup uncooked)',
  nutrients: {
    calories: 343,
    protein: '13g',
    fat: '3.4g',
    carbs: '72g',
    fiber: '10g'
  },
  benefits: [
    'Gluten-free alternative',
    'Rich in fiber and magnesium',
    'Supports heart health',
    'Lowers cholesterol',
    'Stabilizes blood sugar'
  ],
  sideEffects: [
    'Rare allergy known as "buckwheat allergy"',
    'Overconsumption may cause gas',
    'Can interact with blood pressure meds'
  ]
},
{
  id: 46,
  name: 'Honey',
  category: 'Natural Sweetener',
  image: 'https://images.unsplash.com/photo-1642067958024-1a2d9f836920?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aG9uZXl8ZW58MHwwfDB8fHww',
  servingSize: '21g (about 1 tablespoon)',
  nutrients: {
    calories: 64,
    protein: '0.1g',
    fat: '0g',
    carbs: '17g',
    fiber: '0g'
  },
  benefits: [
    'Natural cough suppressant',
    'Antibacterial and antifungal properties',
    'Good for wound healing',
    'Soothes sore throats',
    'Source of antioxidants'
  ],
  sideEffects: [
    'High in sugars and calories',
    'Not safe for infants under 1 year (botulism risk)',
    'May spike blood sugar levels'
  ]
},
{
  id: 47,
  name: 'Basil',
  category: 'Herb',
  image: 'https://images.unsplash.com/photo-1538596313828-41d729090199?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  servingSize: '10g (about 2 tablespoons chopped)',
  nutrients: {
    calories: 2,
    protein: '0.3g',
    fat: '0.1g',
    carbs: '0.3g',
    fiber: '0.2g'
  },
  benefits: [
    'Rich in vitamin K and antioxidants',
    'May reduce oxidative stress',
    'Supports liver and skin health',
    'Has anti-inflammatory properties',
    'Aids digestion'
  ],
  sideEffects: [
    'May lower blood pressure too much',
    'Contains estragole, a potential carcinogen in high doses',
    'Allergy risk if consumed raw in excess'
  ]
},
{
  id: 48,
  name: 'Milk',
  category: 'Dairy',
  image: 'https://images.unsplash.com/photo-1588710929895-6ee7a0a4d155?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bWlsa3xlbnwwfDB8MHx8fDA%3D',
  servingSize: '240ml (1 cup)',
  nutrients: {
    calories: 102,
    protein: '8.2g',
    fat: '2.4g',
    carbs: '12g',
    fiber: '0g'
  },
  benefits: [
    'High in calcium for bone health',
    'Rich in protein and B12',
    'Supports muscle growth and repair',
    'Promotes hydration',
    'Improves dental health'
  ],
  sideEffects: [
    'Lactose intolerance can cause bloating and gas',
    'May increase mucus production',
    'Potential allergy in children'
  ]
},
{
  id: 49,
  name: 'Cranberries',
  category: 'Fruit',
  image: 'https://plus.unsplash.com/premium_photo-1663840820025-110ceadc4e60?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y3JhbmJlcnJpZXN8ZW58MHwwfDB8fHww',
  servingSize: '100g (about 1 cup)',
  nutrients: {
    calories: 46,
    protein: '0.4g',
    fat: '0.1g',
    carbs: '12g',
    fiber: '3.6g'
  },
  benefits: [
    'Prevents urinary tract infections (UTIs)',
    'Rich in antioxidants and vitamin C',
    'Supports immune health',
    'Promotes oral health',
    'Reduces inflammation'
  ],
  sideEffects: [
    'May interact with blood thinners like warfarin',
    'Can cause stomach upset in large amounts',
    'Sweetened juice adds extra sugar'
  ]
},
{
  id: 50,
  name: 'Eggplant',
  category: 'Vegetable',
  image: 'https://images.unsplash.com/photo-1683543122945-513029986574?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZWdncGxhbnR8ZW58MHwwfDB8fHww',
  servingSize: '100g (about 1 cup cubed)',
  nutrients: {
    calories: 25,
    protein: '1g',
    fat: '0.2g',
    carbs: '6g',
    fiber: '3g'
  },
  benefits: [
    'Rich in anthocyanins, supporting brain health',
    'Good source of dietary fiber',
    'Lowers cholesterol',
    'Supports weight loss',
    'Contains nasunin, a powerful antioxidant'
  ],
  sideEffects: [
    'May contain solanine, a natural toxin in excess',
    'Can cause allergic reactions',
    'Might worsen IBS symptoms'
  ]
}
];

// Categories for filter
const categories = ['All', ...new Set(foodsData.map(food => food.category))];

const FoodDatabase = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedFood, setSelectedFood] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Filter foods based on search term and category
  const filteredFoods = foodsData.filter(food => {
    const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || food.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Open food details modal
  const openFoodDetails = (food) => {
    setSelectedFood(food);
    setShowModal(true);
    // Prevent scrolling when modal is open
    document.body.style.overflow = 'hidden';
  };

  // Close food details modal
  const closeFoodDetails = () => {
    setShowModal(false);
    // Re-enable scrolling
    document.body.style.overflow = 'auto';
  };

  return (
    <div className="page-transition">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Food Database</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Explore our comprehensive food database to learn about the nutritional content, health benefits, 
          and potential side effects of various foods. Make informed decisions about your diet.
        </p>
      </div>

      {/* Search and filter */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-8 border border-gray-100 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label htmlFor="search" className="form-label">Search Foods</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="search"
                type="text"
                className="form-input pl-10 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Search by food name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label htmlFor="category" className="form-label">Filter by Category</label>
            <select
              id="category"
              className="form-select dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Food cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {filteredFoods.map(food => (
          <div
            key={food.id}
            className="card group cursor-pointer hover:transform hover:scale-[1.02] transition-all duration-200"
            onClick={() => openFoodDetails(food)}
          >
            <div className="relative h-48 overflow-hidden rounded-t-xl">
              <img 
                src={food.image} 
                alt={food.name} 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 gap-">
                <span className="badge bg-white/90 text-gray-800">{food.category}</span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{food.name}</h3>
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                <span className="font-medium">Serving Size:</span> {food.servingSize}
              </div>
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Calories:</span>
                  <span className="ml-1 font-medium text-gray-900 dark:text-white">{food.nutrients.calories}</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Protein:</span>
                  <span className="ml-1 font-medium text-gray-900 dark:text-white">{food.nutrients.protein}</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Fat:</span>
                  <span className="ml-1 font-medium text-gray-900 dark:text-white">{food.nutrients.fat}</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Carbs:</span>
                  <span className="ml-1 font-medium text-gray-900 dark:text-white">{food.nutrients.carbs}</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <Leaf className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                    <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                  </div>
                </div>
                <button className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:text-blue-800 dark:hover:text-blue-300 flex items-center">
                  View Details <Info className="ml-1 h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredFoods.length === 0 && (
        <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <Apple className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">No Foods Found</h3>
          <p className="text-gray-500 dark:text-gray-400">
            Try adjusting your search or filters to find what you're looking for.
          </p>
        </div>
      )}

      {/* Food details modal */}
      {showModal && selectedFood && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div 
              className="fixed inset-0 bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-90 transition-opacity" 
              aria-hidden="true"
              onClick={closeFoodDetails}
            ></div>

            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white dark:bg-gray-700 rounded-full p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none"
                  onClick={closeFoodDetails}
                >
                  <span className="sr-only">Close</span>
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="relative h-64 sm:h-80">
                <img 
                  src={selectedFood.image} 
                  alt={selectedFood.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <h2 className="text-3xl font-bold text-white" id="modal-title">
                    {selectedFood.name}
                  </h2>
                  <span className="inline-block badge bg-white/90 text-gray-800 mt-2">
                    {selectedFood.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Nutritional Information</h3>
                 <div className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                <span className="font-medium">Serving Size:</span> {selectedFood.servingSize}
              </div>
                <div className="grid grid-cols-5 gap-4 mb-6">
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 text-center">
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Calories</div>
                    <div className="text-lg font-semibold text-gray-900 dark:text-white">{selectedFood.nutrients.calories}</div>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 text-center">
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Protein</div>
                    <div className="text-lg font-semibold text-gray-900 dark:text-white">{selectedFood.nutrients.protein}</div>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 text-center">
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Fat</div>
                    <div className="text-lg font-semibold text-gray-900 dark:text-white">{selectedFood.nutrients.fat}</div>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 text-center">
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Carbs</div>
                    <div className="text-lg font-semibold text-gray-900 dark:text-white">{selectedFood.nutrients.carbs}</div>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 text-center">
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Fiber</div>
                    <div className="text-lg font-semibold text-gray-900 dark:text-white">{selectedFood.nutrients.fiber}</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center mb-4">
                      <Heart className="h-5 w-5 text-green-600 dark:text-green-400 mr-2" />
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Health Benefits</h3>
                    </div>
                    <ul className="space-y-2">
                      {selectedFood.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start">
                          <div className="flex-shrink-0 h-5 w-5 text-green-500 dark:text-green-400">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="ml-2 text-gray-600 dark:text-gray-300">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <div className="flex items-center mb-4">
                      <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 mr-2" />
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Potential Side Effects</h3>
                    </div>
                    <ul className="space-y-2">
                      {selectedFood.sideEffects.map((effect, index) => (
                        <li key={index} className="flex items-start">
                          <div className="flex-shrink-0 h-5 w-5 text-amber-500 dark:text-amber-400">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="ml-2 text-gray-600 dark:text-gray-300">{effect}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4">
                <div className="flex items-center">
                  <Brain className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
                  <p className="text-sm text-gray-500 dark:text-gray-300">
                    Remember that individual responses to foods can vary. Always consult with a healthcare professional
                    before making significant dietary changes, especially if you have health conditions or take medications.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodDatabase;