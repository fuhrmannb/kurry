import { combineReducers } from "redux"
import recipeReducer, { RecipeCatalogState } from "recipe/recipeState";
import { firebaseReducer, FirebaseReducer } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore'

export type AppState = {
  firebase: FirebaseReducer.Reducer,
  firestore: any,
  recipes: RecipeCatalogState,
}

export default combineReducers<AppState>({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  recipes: recipeReducer,
})