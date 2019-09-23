
// Generated from FoodDB
// https://github.com/fuhrmannb/fooddb

// Category images


// Ingredient images


export const Languages = ["en", "fr"] as const
export type Language = typeof Languages[number]

export const Units = ["g", "kg", "mL", "cL", "L", "each"] as const
export type Unit = typeof Units[number]

export type IngredientCategory = {
  id: string
  name: Partial<Record<Language, string>>
  img?: string
}

export type Ingredient = {
  id: string
  name: Record<Language, string>
  img?: string
  categories: string[]
  units: Unit[]
}

const categoryCatalog: Record<string, IngredientCategory> = {
  dairy: {
    id: "dairy",
    name: {
      en: "Dairy",
      fr: "Crèmerie",
    },
  },
  drinks: {
    id: "drinks",
    name: {
      en: "Drinks",
      fr: "Boissons",
    },
  },
  fruits: {
    id: "fruits",
    name: {
      en: "Fruits",
      fr: "Fruits",
    },
  },
  grains: {
    id: "grains",
    name: {
      en: "Grains",
      fr: "Féculents",
    },
  },
  meat: {
    id: "meat",
    name: {
      en: "Meat",
      fr: "Viandes",
    },
  },
  seafood: {
    id: "seafood",
    name: {
      en: "Fish and seafood",
      fr: "Poissons et fruits de mer",
    },
  },
  seeds: {
    id: "seeds",
    name: {
      en: "Seeds and Leguminous",
      fr: "Graines et Légumineuses",
    },
  },
  spices: {
    id: "spices",
    name: {
      en: "Spices and Herbs",
      fr: "Epices et Herbes",
    },
  },
  vegetables: {
    id: "vegetables",
    name: {
      en: "Vegetables",
      fr: "Légumes",
    },
  },
}

const ingredientCatalog: Record<string, Ingredient> = {
  almond: {
    id: "almond",
    name: {
      en: "Almond",
      fr: "Amande",
    },
    categories: [
      "fruits",
    ],
    units: [
        "g",
        "each",
    ],
  },
  apple: {
    id: "apple",
    name: {
      en: "Apple",
      fr: "Pomme",
    },
    categories: [
      "fruits",
    ],
    units: [
        "each",
        "g",
    ],
  },
  apricot: {
    id: "apricot",
    name: {
      en: "Apricot",
      fr: "Abricot",
    },
    categories: [
      "fruits",
    ],
    units: [
        "g",
        "each",
    ],
  },
  artichoke: {
    id: "artichoke",
    name: {
      en: "Artichoke",
      fr: "Artichaut",
    },
    categories: [
      "vegetables",
    ],
    units: [
        "g",
        "each",
    ],
  },
  asparagus: {
    id: "asparagus",
    name: {
      en: "Asparagus",
      fr: "Asperge",
    },
    categories: [
      "vegetables",
    ],
    units: [
        "g",
        "each",
    ],
  },
  avocado: {
    id: "avocado",
    name: {
      en: "Avocado",
      fr: "Avocat",
    },
    categories: [
      "fruits",
    ],
    units: [
        "g",
        "each",
    ],
  },
  banana: {
    id: "banana",
    name: {
      en: "Banana",
      fr: "Banane",
    },
    categories: [
      "fruits",
    ],
    units: [
        "each",
        "g",
    ],
  },
  bean: {
    id: "bean",
    name: {
      en: "Bean",
      fr: "Haricot",
    },
    categories: [
      "vegetables",
    ],
    units: [
        "g",
    ],
  },
  beef: {
    id: "beef",
    name: {
      en: "Beef",
      fr: "Boeuf",
    },
    categories: [
      "meat",
    ],
    units: [
        "g",
        "kg",
        "each",
    ],
  },
  beetroot: {
    id: "beetroot",
    name: {
      en: "Beetroot",
      fr: "Betterave",
    },
    categories: [
      "vegetables",
    ],
    units: [
        "g",
        "each",
    ],
  },
  blackberry: {
    id: "blackberry",
    name: {
      en: "Blackberry",
      fr: "Mûre",
    },
    categories: [
      "fruits",
    ],
    units: [
        "g",
        "each",
    ],
  },
  bread: {
    id: "bread",
    name: {
      en: "Bread",
      fr: "Pain",
    },
    categories: [
      "grains",
    ],
    units: [
        "g",
        "each",
    ],
  },
  broccoli: {
    id: "broccoli",
    name: {
      en: "Broccoli",
      fr: "Broccoli",
    },
    categories: [
      "vegetables",
    ],
    units: [
        "g",
        "each",
    ],
  },
  brusselsprouts: {
    id: "brusselsprouts",
    name: {
      en: "Brussel sprouts",
      fr: "Choux de Bruxelles",
    },
    categories: [
      "vegetables",
    ],
    units: [
        "g",
        "each",
    ],
  },
  butter: {
    id: "butter",
    name: {
      en: "Butter",
      fr: "Beurre",
    },
    categories: [
      "dairy",
    ],
    units: [
        "g",
    ],
  },
  cabbage: {
    id: "cabbage",
    name: {
      en: "Cabbage",
      fr: "Chou",
    },
    categories: [
      "vegetables",
    ],
    units: [
        "g",
        "each",
    ],
  },
  carrot: {
    id: "carrot",
    name: {
      en: "Carrot",
      fr: "Carotte",
    },
    categories: [
      "vegetables",
    ],
    units: [
        "g",
        "kg",
        "each",
    ],
  },
  cauliflower: {
    id: "cauliflower",
    name: {
      en: "Cauliflower",
      fr: "Chou-fleur",
    },
    categories: [
      "vegetables",
    ],
    units: [
        "g",
        "each",
    ],
  },
  celery: {
    id: "celery",
    name: {
      en: "Celery",
      fr: "Céleri",
    },
    categories: [
      "vegetables",
    ],
    units: [
        "g",
        "each",
    ],
  },
  cherry: {
    id: "cherry",
    name: {
      en: "Cherry",
      fr: "Cerise",
    },
    categories: [
      "fruits",
    ],
    units: [
        "g",
        "each",
    ],
  },
  chicken: {
    id: "chicken",
    name: {
      en: "Chicken",
      fr: "Poulet",
    },
    categories: [
      "meat",
    ],
    units: [
        "g",
        "kg",
        "each",
    ],
  },
  coconut: {
    id: "coconut",
    name: {
      en: "Coconut",
      fr: "Noix de coco",
    },
    categories: [
      "fruits",
    ],
    units: [
        "g",
        "each",
    ],
  },
  cod: {
    id: "cod",
    name: {
      en: "Cod",
      fr: "Cabillaud",
    },
    categories: [
      "seafood",
    ],
    units: [
        "g",
        "kg",
        "each",
    ],
  },
  corn: {
    id: "corn",
    name: {
      en: "Corn",
      fr: "Maïs",
    },
    categories: [
      "vegetables",
    ],
    units: [
        "g",
        "each",
    ],
  },
  crab: {
    id: "crab",
    name: {
      en: "Crab",
      fr: "Crabe",
    },
    categories: [
      "seafood",
    ],
    units: [
        "g",
        "each",
    ],
  },
  cream: {
    id: "cream",
    name: {
      en: "Cream",
      fr: "Crème",
    },
    categories: [
      "dairy",
    ],
    units: [
        "g",
    ],
  },
  cucumber: {
    id: "cucumber",
    name: {
      en: "Cucumber",
      fr: "Concombre",
    },
    categories: [
      "vegetables",
    ],
    units: [
        "g",
        "each",
    ],
  },
  duck: {
    id: "duck",
    name: {
      en: "Duck",
      fr: "Canard",
    },
    categories: [
      "meat",
    ],
    units: [
        "g",
        "kg",
        "each",
    ],
  },
  egg: {
    id: "egg",
    name: {
      en: "Egg",
      fr: "Oeuf",
    },
    categories: [
      "meat",
    ],
    units: [
        "each",
    ],
  },
  eggplant: {
    id: "eggplant",
    name: {
      en: "Eggplant",
      fr: "Aubergine",
    },
    categories: [
      "vegetables",
    ],
    units: [
        "g",
        "each",
    ],
  },
  fig: {
    id: "fig",
    name: {
      en: "Fig",
      fr: "Figue",
    },
    categories: [
      "fruits",
    ],
    units: [
        "g",
        "each",
    ],
  },
  goose: {
    id: "goose",
    name: {
      en: "Goose",
      fr: "Oie",
    },
    categories: [
      "meat",
    ],
    units: [
        "g",
        "kg",
        "each",
    ],
  },
  grape: {
    id: "grape",
    name: {
      en: "Grape",
      fr: "Raisin",
    },
    categories: [
      "fruits",
    ],
    units: [
        "g",
        "each",
    ],
  },
  grapefruit: {
    id: "grapefruit",
    name: {
      en: "Grapefruit",
      fr: "Pamplemousse",
    },
    categories: [
      "fruits",
    ],
    units: [
        "g",
        "each",
    ],
  },
  haddock: {
    id: "haddock",
    name: {
      en: "Haddock",
      fr: "Haddock",
    },
    categories: [
      "seafood",
    ],
    units: [
        "g",
        "kg",
        "each",
    ],
  },
  ham: {
    id: "ham",
    name: {
      en: "Ham",
      fr: "Jambon",
    },
    categories: [
      "meat",
    ],
    units: [
        "g",
        "kg",
        "each",
    ],
  },
  hazelnut: {
    id: "hazelnut",
    name: {
      en: "Hazelnut",
      fr: "Noisette",
    },
    categories: [
      "fruits",
    ],
    units: [
        "g",
        "each",
    ],
  },
  herring: {
    id: "herring",
    name: {
      en: "Herring",
      fr: "Hareng",
    },
    categories: [
      "seafood",
    ],
    units: [
        "g",
        "kg",
        "each",
    ],
  },
  kiwi: {
    id: "kiwi",
    name: {
      en: "Kiwi",
      fr: "Kiwi",
    },
    categories: [
      "fruits",
    ],
    units: [
        "g",
        "each",
    ],
  },
  lamb: {
    id: "lamb",
    name: {
      en: "Lamb",
      fr: "Agneau",
    },
    categories: [
      "meat",
    ],
    units: [
        "g",
        "kg",
        "each",
    ],
  },
  leek: {
    id: "leek",
    name: {
      en: "Leek",
      fr: "Poireau",
    },
    categories: [
      "vegetables",
    ],
    units: [
        "g",
        "each",
    ],
  },
  lemon: {
    id: "lemon",
    name: {
      en: "Lemon",
      fr: "Citron",
    },
    categories: [
      "fruits",
    ],
    units: [
        "g",
        "kg",
        "each",
    ],
  },
  lettuce: {
    id: "lettuce",
    name: {
      en: "Lettuce",
      fr: "Laitue",
    },
    categories: [
      "vegetables",
    ],
    units: [
        "g",
        "each",
    ],
  },
  lobster: {
    id: "lobster",
    name: {
      en: "Lobster",
      fr: "Homard",
    },
    categories: [
      "seafood",
    ],
    units: [
        "g",
        "kg",
        "each",
    ],
  },
  maclerel: {
    id: "maclerel",
    name: {
      en: "Maclerel",
      fr: "Maquereau",
    },
    categories: [
      "seafood",
    ],
    units: [
        "g",
        "kg",
        "each",
    ],
  },
  mango: {
    id: "mango",
    name: {
      en: "Mango",
      fr: "Mangue",
    },
    categories: [
      "fruits",
    ],
    units: [
        "g",
        "each",
    ],
  },
  melon: {
    id: "melon",
    name: {
      en: "Melon",
      fr: "Melon",
    },
    categories: [
      "fruits",
    ],
    units: [
        "g",
        "each",
    ],
  },
  milk: {
    id: "milk",
    name: {
      en: "Milk",
      fr: "Lait",
    },
    categories: [
      "drinks",
      "dairy",
    ],
    units: [
        "L",
        "cL",
        "mL",
    ],
  },
  mushroom: {
    id: "mushroom",
    name: {
      en: "Muschrooms",
      fr: "Champignons",
    },
    categories: [
      "vegetables",
    ],
    units: [
        "g",
        "each",
    ],
  },
  mussel: {
    id: "mussel",
    name: {
      en: "Mussel",
      fr: "Moule",
    },
    categories: [
      "seafood",
    ],
    units: [
        "g",
        "kg",
        "each",
    ],
  },
  mutton: {
    id: "mutton",
    name: {
      en: "Mutton",
      fr: "Mouton",
    },
    categories: [
      "meat",
    ],
    units: [
        "g",
        "kg",
        "each",
    ],
  },
  noodle: {
    id: "noodle",
    name: {
      en: "Noodles",
      fr: "Nouilles",
    },
    categories: [
      "grains",
    ],
    units: [
        "g",
    ],
  },
  octopus: {
    id: "octopus",
    name: {
      en: "Octopus",
      fr: "Poulpe",
    },
    categories: [
      "seafood",
    ],
    units: [
        "g",
        "kg",
        "each",
    ],
  },
  onion: {
    id: "onion",
    name: {
      en: "Onion",
      fr: "Oignon",
    },
    categories: [
      "vegetables",
    ],
    units: [
        "g",
        "each",
    ],
  },
  orange: {
    id: "orange",
    name: {
      en: "Orange",
      fr: "Orange",
    },
    categories: [
      "fruits",
    ],
    units: [
        "g",
        "each",
    ],
  },
  oyster: {
    id: "oyster",
    name: {
      en: "Oyster",
      fr: "Huître",
    },
    categories: [
      "seafood",
    ],
    units: [
        "g",
        "kg",
        "each",
    ],
  },
  pasta: {
    id: "pasta",
    name: {
      en: "Pasta",
      fr: "Pâtes",
    },
    categories: [
      "grains",
    ],
    units: [
        "g",
    ],
  },
  peach: {
    id: "peach",
    name: {
      en: "Peach",
      fr: "Pêche",
    },
    categories: [
      "fruits",
    ],
    units: [
        "g",
        "each",
    ],
  },
  peanut: {
    id: "peanut",
    name: {
      en: "Peanut",
      fr: "Cacahuète",
    },
    categories: [
      "fruits",
    ],
    units: [
        "g",
        "each",
    ],
  },
  pear: {
    id: "pear",
    name: {
      en: "Pear",
      fr: "Poire",
    },
    categories: [
      "fruits",
    ],
    units: [
        "g",
        "each",
    ],
  },
  peas: {
    id: "peas",
    name: {
      en: "Peas",
      fr: "Petits pois",
    },
    categories: [
      "vegetables",
    ],
    units: [
        "g",
    ],
  },
  pepper: {
    id: "pepper",
    name: {
      en: "Pepper",
      fr: "Poivron",
    },
    categories: [
      "vegetables",
    ],
    units: [
        "g",
        "each",
    ],
  },
  persimmon: {
    id: "persimmon",
    name: {
      en: "Persimmon",
      fr: "Kaki",
    },
    categories: [
      "fruits",
    ],
    units: [
        "g",
        "kg",
        "each",
    ],
  },
  pineapple: {
    id: "pineapple",
    name: {
      en: "Pineapple",
      fr: "Ananas",
    },
    categories: [
      "fruits",
    ],
    units: [
        "g",
        "each",
    ],
  },
  plaice: {
    id: "plaice",
    name: {
      en: "Plaice",
      fr: "Carrelet",
    },
    categories: [
      "seafood",
    ],
    units: [
        "g",
        "kg",
        "each",
    ],
  },
  pork: {
    id: "pork",
    name: {
      en: "Pork",
      fr: "Porc",
    },
    categories: [
      "meat",
    ],
    units: [
        "g",
        "kg",
        "each",
    ],
  },
  potatoe: {
    id: "potatoe",
    name: {
      en: "Potatoe",
      fr: "Pomme de terre",
    },
    categories: [
      "vegetables",
    ],
    units: [
        "g",
        "each",
    ],
  },
  rabbit: {
    id: "rabbit",
    name: {
      en: "Rabbit",
      fr: "Lapin",
    },
    categories: [
      "meat",
    ],
    units: [
        "g",
        "kg",
        "each",
    ],
  },
  radish: {
    id: "radish",
    name: {
      en: "Radish",
      fr: "Radis",
    },
    categories: [
      "vegetables",
    ],
    units: [
        "g",
        "each",
    ],
  },
  raisin: {
    id: "raisin",
    name: {
      en: "Raisin",
      fr: "Raisin sec",
    },
    categories: [
      "fruits",
    ],
    units: [
        "g",
    ],
  },
  raspberry: {
    id: "raspberry",
    name: {
      en: "Raspberry",
      fr: "Framboise",
    },
    categories: [
      "fruits",
    ],
    units: [
        "g",
        "each",
    ],
  },
  rice: {
    id: "rice",
    name: {
      en: "Rice",
      fr: "Riz",
    },
    categories: [
      "grains",
    ],
    units: [
        "g",
    ],
  },
  salad: {
    id: "salad",
    name: {
      en: "Salad",
      fr: "Salade",
    },
    categories: [
      "vegetables",
    ],
    units: [
        "g",
        "each",
    ],
  },
  salmon: {
    id: "salmon",
    name: {
      en: "Salmon",
      fr: "Saumon",
    },
    categories: [
      "seafood",
    ],
    units: [
        "g",
        "kg",
        "each",
    ],
  },
  sardine: {
    id: "sardine",
    name: {
      en: "Sardine",
      fr: "Sardine",
    },
    categories: [
      "seafood",
    ],
    units: [
        "g",
        "kg",
        "each",
    ],
  },
  sausage: {
    id: "sausage",
    name: {
      en: "Sausage",
      fr: "Saucisse",
    },
    categories: [
      "meat",
    ],
    units: [
        "g",
        "kg",
        "each",
    ],
  },
  shrimp: {
    id: "shrimp",
    name: {
      en: "Shrimp",
      fr: "Crevette",
    },
    categories: [
      "seafood",
    ],
    units: [
        "g",
        "kg",
        "each",
    ],
  },
  sole: {
    id: "sole",
    name: {
      en: "Sole",
      fr: "Sole",
    },
    categories: [
      "seafood",
    ],
    units: [
        "g",
        "kg",
        "each",
    ],
  },
  spawn: {
    id: "spawn",
    name: {
      en: "Spawn",
      fr: "Oeufs de poisson",
    },
    categories: [
      "seafood",
    ],
    units: [
        "g",
    ],
  },
  spinach: {
    id: "spinach",
    name: {
      en: "Spinach",
      fr: "Epinard",
    },
    categories: [
      "vegetables",
    ],
    units: [
        "g",
        "kg",
    ],
  },
  squash: {
    id: "squash",
    name: {
      en: "Squash",
      fr: "Courge",
    },
    categories: [
      "vegetables",
    ],
    units: [
        "g",
        "kg",
        "each",
    ],
  },
  squid: {
    id: "squid",
    name: {
      en: "Squid",
      fr: "Calamar",
    },
    categories: [
      "seafood",
    ],
    units: [
        "g",
        "kg",
        "each",
    ],
  },
  strawberry: {
    id: "strawberry",
    name: {
      en: "Strawberry",
      fr: "Fraise",
    },
    categories: [
      "fruits",
    ],
    units: [
        "g",
        "each",
    ],
  },
  tangerine: {
    id: "tangerine",
    name: {
      en: "Tangerine",
      fr: "Clémentine",
    },
    categories: [
      "fruits",
    ],
    units: [
        "g",
        "each",
    ],
  },
  tomato: {
    id: "tomato",
    name: {
      en: "Tomato",
      fr: "Tomate",
    },
    categories: [
      "vegetables",
    ],
    units: [
        "g",
        "each",
    ],
  },
  trout: {
    id: "trout",
    name: {
      en: "Trout",
      fr: "Truite",
    },
    categories: [
      "seafood",
    ],
    units: [
        "g",
        "kg",
        "each",
    ],
  },
  tuna: {
    id: "tuna",
    name: {
      en: "Tuna",
      fr: "Thon",
    },
    categories: [
      "seafood",
    ],
    units: [
        "g",
        "kg",
        "each",
    ],
  },
  turkey: {
    id: "turkey",
    name: {
      en: "Turkey",
      fr: "Dinde",
    },
    categories: [
      "meat",
    ],
    units: [
        "g",
        "kg",
        "each",
    ],
  },
  turnip: {
    id: "turnip",
    name: {
      en: "Turnip",
      fr: "Navet",
    },
    categories: [
      "vegetables",
    ],
    units: [
        "g",
        "each",
    ],
  },
  veal: {
    id: "veal",
    name: {
      en: "Veal",
      fr: "Veau",
    },
    categories: [
      "meat",
    ],
    units: [
        "g",
        "kg",
        "each",
    ],
  },
  walnut: {
    id: "walnut",
    name: {
      en: "Walnut",
      fr: "Noix",
    },
    categories: [
      "fruits",
    ],
    units: [
        "g",
        "each",
    ],
  },
  watermelon: {
    id: "watermelon",
    name: {
      en: "Watermelon",
      fr: "Pastèque",
    },
    categories: [
      "fruits",
    ],
    units: [
        "g",
        "kg",
        "each",
    ],
  },
  zucchini: {
    id: "zucchini",
    name: {
      en: "Zucchini",
      fr: "Courgette",
    },
    categories: [
      "vegetables",
    ],
    units: [
        "g",
        "each",
    ],
  },
}

export const FoodDB = {
  categories: categoryCatalog,
  ingredients: ingredientCatalog,
}
export default FoodDB
