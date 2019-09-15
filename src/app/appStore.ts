import { configureStore, getDefaultMiddleware } from "redux-starter-kit"

import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import "firebase/storage"
import { createFirestoreInstance } from "redux-firestore"

import appReducer from "app/appState"
import firebaseConfig from "app/firebaseConfig"

firebase.initializeApp(firebaseConfig)
firebase.firestore()

const store = configureStore({
  reducer: appReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
})

export const rrfProps = {
  firebase,
  config: {
    userProfile: 'users',
    useFirestoreForProfile: true,
  },
  dispatch: store.dispatch,
  createFirestoreInstance
}

export default store