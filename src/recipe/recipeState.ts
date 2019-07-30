import produce from "immer"
import { AppState } from "app/appState";

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

const ADD = "recipe/ADD"
const UPDATE = "recipe/UPDATE"
const DELETE = "recipe/DELETE"

export function updateRecipe(recipe: RecipeState): UpdateRecipeAction {
  return {
    type: UPDATE,
    payload: {
      recipe: recipe,
    },
  }
}
export type UpdateRecipeAction = {
  type: typeof UPDATE,
  payload: {
    recipe: RecipeState,
  }
}


export type RecipeActions = UpdateRecipeAction
export default function reducer(state: AppState, action: RecipeActions) {
  produce(state, draft => {
    switch (action.type) {
      case UPDATE:
        //TODO better check
        draft.recipes.byId[action.payload.recipe.id] = action.payload.recipe
      default:
        return state;
    }
  })
}