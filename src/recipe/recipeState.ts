import { createSlice } from "redux-starter-kit";

export type RecipeCatalogState = {
  byId: { [s: string]: RecipeState }
  allIds: string[]
}
export type RecipeState = {
  id: string
  title: string
  img: string
  tags: string[]
  time: number
  servings: number
  ingredients: IngredientState[]
  steps: string[]
  notes: string
}
export type IngredientState = { img: string; name: string; amount?: number; unit?: string }

export const newRecipe = (id: string = "") => (
  {
    id: id,
    title: "",
    img: "",
    tags: [],
    time: 0,
    servings: 0,
    ingredients: [],
    steps: [],
    notes: "",
  } as RecipeState
)

export const newIngredient = () => (
  {
    img: "",
    name: "",
  } as IngredientState
)

// const recipeInitialState: RecipeCatalogState = {
//   byId: {},
//   allIds: [],
// }
const recipeInitialState: RecipeCatalogState = {
  byId: {
    "dcbc9a7d-6085-400e-8c18-a926e3ac152d": {
      id: "dcbc9a7d-6085-400e-8c18-a926e3ac152d",
      title: "Quiche Lorraine",
      img: "/test/quiche.jpeg",
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

const postAction = (state: RecipeCatalogState, action: {
  payload: {
    recipe: RecipeState,
  }
}) => {
  var index = state.allIds.indexOf(action.payload.recipe.id)
  if (index === -1) {
    state.allIds.push(action.payload.recipe.id)
  }
  state.byId[action.payload.recipe.id] = action.payload.recipe
}

const deleteAction = (state: RecipeCatalogState, action: {
  payload: {
    id: string,
  }
}) => {
  var index = state.allIds.indexOf(action.payload.id)
  if (index > -1) {
    state.allIds.splice(index, 1)
    delete state.byId[action.payload.id]
  }
}

const recipeSlice = createSlice({
  initialState: recipeInitialState,
  reducers: {
    postRecipe: postAction,
    deleteRecipe: deleteAction,
  }
})
const recipeReducer = recipeSlice.reducer
export const {postRecipe, deleteRecipe} = recipeSlice.actions
export default recipeReducer