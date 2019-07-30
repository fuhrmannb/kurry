import { Action } from "redux"
import { RecipeState, IngredientState } from "recipe/recipeState";

export type AppState = {
  recipes: {
    byId: { [s: string]: RecipeState }
    allIds: string[]
  }
}

const recipes = {
  byId: {
    "dcbc9a7d-6085-400e-8c18-a926e3ac152d": {
      id: "dcbc9a7d-6085-400e-8c18-a926e3ac152d",
      title: "Quiche Lorraine",
      img: "quiche.jpeg",
      tags: ["entrée", "omnivore", "lorraine"],
      time: 45,
      servings: 4,
      ingredients: [
        {
          img: "/test/creme.jpeg",
          name: "Crème",
          amount: 20,
          unit: "cL",
        },
        {
          img: "/test/lardons.jpeg",
          name: "Lardons",
          amount: 200,
          unit: "g",
        },
        {
          img: "/test/beurre.jpeg",
          name: "Beurre",
          amount: 30,
          unit: "g",
        },
        {
          img: "/test/oeufs.jpeg",
          name: "Oeufs",
          amount: 3,
        },
        {
          img: "/test/sel.jpeg",
          name: "Sel",
        },
        {
          img: "/test/poivre.jpeg",
          name: "Poivre",
        },
      ],
      steps: [
        `Préchauffer le four à 180°C (thermostat 6).
        sdfdsf sdfdsf sdf dsf dsfdsfds fsdf dsfqd fqd fqsdfqdf qdsf
        sdfdsf qsdf qsdf qds fqdsf qsdfsdqf qdsfhgfdjh gjhgj
        sdfdsf gdfgs gsfdg sfdgsfd h`,
        "Etaler la pâte dans un moule, la piquer à la fourchette. Parsemer de copeaux de beurre.",
        "Faire rissoler les lardons à la poêle.",
        "Battre les oeufs, la crème fraîche et le lait.",
        "Ajouter les lardons.",
        "Assaisonner de sel, de poivre et de muscade.",
        "Verser sur la pâte.",
        "Cuire 45 à 50 min.",
        "C'est prêt, déguster!",
      ],
      notes: "Servir avec une bonne salade :)",
    },
  },
  allIds: ["dcbc9a7d-6085-400e-8c18-a926e3ac152d"],
}

const initialState: AppState = {
  recipes: recipes,
}

export default function reducer(state = initialState, action: Action<string>) {
  return state
}
