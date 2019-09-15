import React from "react"
import { Route, Redirect, RouteProps } from "react-router-dom"
import { AppState } from "app/appState"
import { compose } from "redux"
import { connect } from "react-redux"
import { firebaseConnect, isEmpty } from "react-redux-firebase"

function LoggedRoute<T extends RouteProps = RouteProps>({
  component,
  auth,
  ...rest
}: T & ReturnType<typeof mapStateToProps>) {
  return (
    <Route
      {...rest}
      render={props =>
        !isEmpty(auth) ? (
          component === undefined ? (
            <React.Fragment />
          ) : (
            React.createElement(component, props)
          )
        ) : (
          <Redirect
            to={{
              // TODO: improve redirecting by going to previous route
              pathname: "/",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  )
}

function mapStateToProps(state: AppState) {
  return {
    auth: state.firebase.auth,
  }
}

export default compose<typeof Route>(
  connect(mapStateToProps),
  firebaseConnect()
)(LoggedRoute)
