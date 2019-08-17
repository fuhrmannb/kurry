import React from "react"
import ReactDOM from "react-dom"

import { Provider } from "react-redux"

import * as serviceWorker from "serviceWorker"
import "index.scss"

import App from "app/web/App"
import appStore, { rrfProps } from "app/appStore"
import { ReactReduxFirebaseProvider } from "react-redux-firebase"

ReactDOM.render(
  <Provider store={appStore}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <App />
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
