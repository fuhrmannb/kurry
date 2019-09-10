import { combineReducers } from "redux"
import { firebaseReducer, FirebaseReducer, FirestoreReducer, firestoreReducer as fR } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore'

export type AppState = {
  firebase: FirebaseReducer.Reducer,
  firestore: FirestoreReducer.Reducer,
}

export default combineReducers<AppState>({
  firebase: firebaseReducer,
  firestore: firestoreReducer as typeof fR,
})