import React from "react"

import { RouteComponentProps, Link } from "react-router-dom"

import Typography from "@material-ui/core/Typography"
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles"
import Chip from "@material-ui/core/Chip"
import ListItem from "@material-ui/core/ListItem"
import List from "@material-ui/core/List"
import ListItemText from "@material-ui/core/ListItemText"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import {
  Fab,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Grid,
  ListItemAvatar,
  Avatar,
} from "@material-ui/core"
import EditIcon from "@material-ui/icons/Edit"
import { AppState } from "app/appState"
import { connect } from "react-redux"
import { newRecipe } from "recipe/recipeModel"
import {
  firestoreConnect,
  isLoaded,
  isEmpty,
  WithFirestoreProps,
} from "react-redux-firebase"
import { compose } from "redux"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    recipeImage: {
      height: 0,
      paddingTop: "56.25%", // 16:9
    },
    tags: {
      display: "flex",
      flexWrap: "wrap",
    },
    tag: {
      margin: theme.spacing(0.2),
    },
    stepNumber: {
      marginLeft: theme.spacing(-0.6),
    },
    stepContent: {
      marginLeft: theme.spacing(-3),
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(-1),
    },
    noteContent: {
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
  props: ReturnType<typeof mapStateToProps> & WithFirestoreProps
) {
  const classes = useStyles()

  // TODO: Better UI integration
  if (props.isLoading) {
    return <div>Loading...</div>
  }
  if (props.isEmpty) {
    return <div>Error: no recipe with this ID</div>
  }

  const recipe = props.recipe

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={4}>
          <Card>
            <CardHeader title={recipe.title} />
            <CardMedia
              image={recipe.img}
              title={recipe.title}
              className={classes.recipeImage}
            />
            <CardContent>
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
              <Typography variant="h6" component="h3">
                Ingredients
              </Typography>
              <List>
                {recipe.ingredients.map((ingredient, index) => (
                  <ListItem key={`ingredient${index}`}>
                    <ListItemAvatar>
                      <Avatar src={ingredient.img} alt={ingredient.name} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={ingredient.name}
                      secondary={`${
                        ingredient.amount ? ingredient.amount : ""
                      } ${ingredient.unit ? ingredient.unit : ""}`}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
            <CardActions></CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} lg={8}>
          <Typography variant="h5" component="h3">
            Steps
          </Typography>
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
          <Typography variant="h5" component="h3">
            Note
          </Typography>
          <Typography component="p" className={classes.noteContent}>
            {recipe.notes}
          </Typography>
        </Grid>
      </Grid>
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
  const id = router.match.params.id
  const recipes = state.firestore.data.recipes

  let recipe = newRecipe()
  let loading = !isLoaded(recipes)
  let empty = isEmpty(recipes)
  if (!empty) {
    recipe = recipes[id]
  }

  return {
    id: router.match.params.id,
    isLoading: loading,
    isEmpty: empty,
    recipe: recipe,
    router: router,
  }
}
export default compose<React.ComponentType>(
  connect(mapStateToProps),
  firestoreConnect((props: ReturnType<typeof mapStateToProps>) => {
    if (!props.id) {
      return []
    }
    return [
      {
        collection: "recipes",
        doc: props.id,
      },
    ]
  })
)(RecipeViewer)
