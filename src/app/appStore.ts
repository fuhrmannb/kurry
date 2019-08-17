import { configureStore } from "redux-starter-kit";

import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
import { createFirestoreInstance } from "redux-firestore";

import appReducer from "app/appState"
import firebaseConfig from "app/firebaseConfig";

firebase.initializeApp(firebaseConfig)
firebase.firestore().settings({ timestampsInSnapshots: true })

const store = configureStore({
  reducer: appReducer,
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