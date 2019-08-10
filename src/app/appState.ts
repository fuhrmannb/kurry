import { combineReducers } from "redux"
import recipeReducer, { RecipeCatalogState } from "recipe/recipeState";

export type AppState = {
  recipes: RecipeCatalogState
}

export default combineReducers<AppState>({
  recipes: recipeReducer,
})
