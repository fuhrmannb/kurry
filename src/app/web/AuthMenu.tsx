import React from "react"

import {
  firebaseConnect,
  WithFirebaseProps,
  isLoaded,
  isEmpty,
} from "react-redux-firebase"

import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle"
import { AppState } from "app/appState"
import { compose } from "redux"
import { connect } from "react-redux"

import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import firebase from "firebase/app"
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    loginButton: {
      position: "absolute",
      right: theme.spacing(2),
    },
  })
)

function AuthDialog(
  props: {
    open: boolean
    onSignIn: () => void
    onCancel: () => void
  } & WithFirebaseProps<{}>
) {
  return (
    <Dialog
      onClose={props.onCancel}
      aria-labelledby="auth-dialog"
      open={props.open}
    >
      <DialogTitle id="auth-dialog-title">Sign in to Kurry</DialogTitle>
      <StyledFirebaseAuth
        uiConfig={{
          signInFlow: "popup",
          callbacks: {
            signInSuccessWithAuthResult: (
              authResult: any,
              redirectUrl?: string
            ) => {
              props.onSignIn()
              return false
            },
          },
          // We will display Google and Facebook as auth providers.
          signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
          ],
        }}
        firebaseAuth={props.firebase.auth()}
      />
    </Dialog>
  )
}

function AuthMenu(
  props: WithFirebaseProps<{}> & ReturnType<typeof mapStateToProps>
) {
  const [open, setOpen] = React.useState(false)
  const classes = useStyles()

  // Log in/out is not yet completed
  if (!isLoaded(props.authState)) {
    return <React.Fragment />
  }
  // No logged
  if (isEmpty(props.authState)) {
    return (
      <React.Fragment>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setOpen(true)}
          className={classes.loginButton}
        >
          Sign in
        </Button>
        <AuthDialog
          open={open}
          firebase={props.firebase}
          onSignIn={() => setOpen(false)}
          onCancel={() => setOpen(false)}
        />
      </React.Fragment>
    )
  }
  // Logged
  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={() => props.firebase.logout()}
      className={classes.loginButton}
    >
      Sign out
    </Button>
  )
}

function mapStateToProps(state: AppState) {
  return {
    authState: state.firebase.auth,
  }
}

export default compose<React.ComponentType>(
  connect(mapStateToProps),
  firebaseConnect()
)(AuthMenu)
