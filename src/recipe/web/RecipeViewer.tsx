import React from "react"

import { RouteComponentProps, Link } from "react-router-dom"

import GridList from "@material-ui/core/GridList"
import GridListTile from "@material-ui/core/GridListTile"
import GridListTileBar from "@material-ui/core/GridListTileBar"
import Typography from "@material-ui/core/Typography"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import {
  makeStyles,
  Theme,
  createStyles,
  useTheme,
} from "@material-ui/core/styles"
import Chip from "@material-ui/core/Chip"
import ListItem from "@material-ui/core/ListItem"
import List from "@material-ui/core/List"
import ListItemText from "@material-ui/core/ListItemText"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import Paper from "@material-ui/core/Paper"
import { Fab } from "@material-ui/core"
import EditIcon from "@material-ui/icons/Edit"
import { AppState } from "app/appState"
import { connect } from "react-redux"
import { deleteRecipe, newRecipe } from "recipe/recipeState"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      overflow: "hidden",
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      flexWrap: "nowrap",
      margin: theme.spacing(5),
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: "translateZ(0)",
    },
    tags: {
      margin: theme.spacing(2),
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
    },
    tag: {
      margin: theme.spacing(0.2),
    },
    tile: {
      width: 10,
    },
    tileBar: {
      background:
        "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
      height: 55,
    },
    stepNumber: {
      marginLeft: theme.spacing(-0.6),
    },
    stepContent: {
      marginLeft: theme.spacing(-3),
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(-1),
    },
    note: {
      padding: theme.spacing(3, 2),
    },
    fab: {
      position: "fixed",
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  })
)

function RecipeViewer(
  props: ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps
) {
  const classes = useStyles()
  const recipe = props.recipe

  // FIXME: resize issue -> scroll bar on the whole page
  const theme = useTheme()
  let col = 3.5
  if (useMediaQuery(theme.breakpoints.up("sm"))) {
    col = 4.5
  }
  if (useMediaQuery(theme.breakpoints.up("md"))) {
    col = 5.5
  }
  if (useMediaQuery(theme.breakpoints.up("lg"))) {
    col = 8.5
  }

  return (
    <React.Fragment>
      <Typography variant="h2" gutterBottom align="center">
        {recipe.title}
      </Typography>
      <div className={classes.tags}>
        {recipe.tags.map(tag => (
          <Chip
            size="small"
            color="secondary"
            className={classes.tag}
            label={tag}
            key={tag}
          />
        ))}
      </div>
      <div className={classes.root}>
        <GridList className={classes.gridList} cols={col} spacing={8}>
          {recipe.ingredients.map(ingredient => (
            <GridListTile key={ingredient.img}>
              <img src={ingredient.img} alt={ingredient.name} />
              <GridListTileBar
                className={classes.tileBar}
                title={ingredient.name}
                subtitle={`${ingredient.amount} ${ingredient.unit}`}
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
      <List>
        {recipe.steps.map((step, index) => (
          <ListItem alignItems="flex-start" key={`step${index}`}>
            <ListItemIcon>
              <Chip
                className={classes.stepNumber}
                size="small"
                color="primary"
                label={index + 1}
              />
            </ListItemIcon>
            <ListItemText className={classes.stepContent} primary={step} />
          </ListItem>
        ))}
      </List>
      <Paper className={classes.note}>
        <Typography variant="h5" component="h3">
          Note
        </Typography>
        <Typography component="p">{recipe.notes}</Typography>
      </Paper>
      <Fab
        size="large"
        color="secondary"
        aria-label="New"
        className={classes.fab}
        component={Link}
        to={`edit/${recipe.id}`}
      >
        <EditIcon />
      </Fab>
    </React.Fragment>
  )
}

function mapStateToProps(
  state: AppState,
  router: RouteComponentProps<{ id: string }>
) {
  return {
    recipe: state.recipes.byId[router.match.params.id] || newRecipe(),
    router: router,
  }
}
const mapDispatchToProps = {
  deleteRecipe,
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipeViewer)
