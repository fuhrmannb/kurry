import React from "react"

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom"

import AppBar from "@material-ui/core/AppBar"
import CssBaseline from "@material-ui/core/CssBaseline"
import Divider from "@material-ui/core/Divider"
import Drawer from "@material-ui/core/Drawer"
import Hidden from "@material-ui/core/Hidden"
import IconButton from "@material-ui/core/IconButton"
import InboxIcon from "@material-ui/icons/MoveToInbox"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import MenuIcon from "@material-ui/icons/Menu"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from "@material-ui/core/styles"

import Home from "app/web/Home"
import Recipe from "recipe/web/Recipe"
import About from "app/web/About"
import AuthMenu from "app/web/AuthMenu"
import LoggedRoute from "app/routes/LoggedRoute"

import Container from "@material-ui/core/Container"
import { AppState } from "app/appState"
import { isEmpty, firebaseConnect } from "react-redux-firebase"
import { compose } from "redux"
import { connect } from "react-redux"

const drawerWidth = 240

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    drawer: {
      [theme.breakpoints.up("md")]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      marginLeft: drawerWidth,
      [theme.breakpoints.up("md")]: {
        width: `calc(100% - ${drawerWidth}px)`,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
    toolbar: {
      fontSize: "2rem",
      marginTop: 10,
      marginLeft: 25,
      marginBottom: -10,
      ...theme.mixins.toolbar,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  })
)

function App({ auth }: ReturnType<typeof mapStateToProps>) {
  const classes = useStyles()
  const theme = useTheme()
  const [mobileOpen, setMobileOpen] = React.useState(false)

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen)
  }
  const authDrawer = isEmpty(auth) ? (
    <React.Fragment />
  ) : (
    <React.Fragment>
      <Divider />
      <List>
        <ListItem button component={Link} to="/recipes/" key="recipes">
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Recipes" />
        </ListItem>
      </List>
    </React.Fragment>
  )

  const drawer = (
    <div>
      <div className={classes.toolbar}>
        <Link to="/">DuckFood</Link>
      </div>
      {authDrawer}
      <Divider />
      <List>
        <ListItem button component={Link} to="/about/" key="about">
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="About" />
        </ListItem>
      </List>
    </div>
  )

  return (
    <Router>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Welcome to DuckFood!
            </Typography>
            <AuthMenu />
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer} aria-label="Mailbox folders">
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden mdUp implementation="css">
            <Drawer
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden smDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Container>
            <Switch>
              <Route exact path="/" component={Home} />
              <LoggedRoute path="/recipes" component={Recipe} />
              <Route path="/about" component={About} />
            </Switch>
          </Container>
        </main>
      </div>
    </Router>
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
)(App)
