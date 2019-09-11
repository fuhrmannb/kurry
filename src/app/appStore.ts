import { configureStore, getDefaultMiddleware } from "redux-starter-kit"

import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import "firebase/storage"
import { createFirestoreInstance } from "redux-firestore"

import appReducer from "app/appState"
import firebaseConfig from "app/firebaseConfig";
import { actionTypes } from "react-redux-firebase";

firebase.initializeApp(firebaseConfig)
firebase.firestore()

const store = configureStore({
  reducer: appReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
        ignoredActions: [
          actionTypes.LOGIN,
          actionTypes.FILE_UPLOAD_START,
          actionTypes.FILE_UPLOAD_ERROR,
          actionTypes.FILE_UPLOAD_PROGRESS,
          actionTypes.FILE_UPLOAD_COMPLETE,
          actionTypes.FILE_DELETE_START,
          actionTypes.FILE_DELETE_ERROR,
          actionTypes.FILE_DELETE_COMPLETE],
    }
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