import React from "react"

import Button from "@material-ui/core/Button"
import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import Grid from "@material-ui/core/Grid"
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import AccessTimeIcon from "@material-ui/icons/AccessTime"
import AddIcon from "@material-ui/icons/Add"
import PersonIcon from "@material-ui/icons/Person"
import Fab from "@material-ui/core/Fab"

import { Link, RouteComponentProps } from "react-router-dom"
import { Recipe, newRecipe } from "recipe/recipeModel"
import { AppState } from "app/appState"
import { connect } from "react-redux"
import { v4 } from "uuid"
import RecipeDeleteDialog from "recipe/web/RecipeDeleteDialog"
import { compose } from "redux"
import {
  firestoreConnect,
  WithFirestoreProps,
  isLoaded,
  isEmpty,
} from "react-redux-firebase"
import defaultRecipeImage from "recipe/resources/defaultRecipe.jpg"

const itemStyles = makeStyles(
  createStyles({
    media: {
      height: 140,
    },
  })
)

function RecipeItem(props: { recipe: Recipe; deleteRecipe: () => void }) {
  const classes = itemStyles()
  const recipe = props.recipe

  return (
    <Grid item xs={12} md={6} lg={4} xl={3}>
      <Card>
        <CardActionArea component={Link} to={recipe.id}>
          <CardMedia
            className={classes.media}
            image={recipe.img || defaultRecipeImage}
            title="Test"
          />
          <CardContent>
            <Grid container direction="row">
              <Grid item xs={8}>
                <Typography gutterBottom variant="h5" component="h2">
                  {recipe.title}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Grid container direction="row" justify="flex-end" spacing={2}>
                  <Grid item>
                    <Grid container direction="row" alignItems="center">
                      <Grid item>
                        <PersonIcon />
                      </Grid>
                      <Grid item>
                        <Typography variant="body1">
                          {recipe.servings}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid container direction="row" alignItems="center">
                      <Grid item>
                        <AccessTimeIcon />
                      </Grid>
                      <Grid item>
                        <Typography variant="body1">{recipe.time}"</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Typography variant="body2" color="textSecondary" component="p">
              // TODO: Description (Images des principaux ingrédients ?)
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            size="small"
            color="primary"
            component={Link}
            to={`edit/${recipe.id}`}
          >
            Edit
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={() => {
              props.deleteRecipe()
            }}
          >
            Delete
          </Button>
        </CardActions>
      </Card>
    </Grid>
  )
}

const recipeStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      position: "fixed",
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  })
)

function RecipeList(
  props: ReturnType<typeof mapStateToProps> & WithFirestoreProps
) {
  const classes = recipeStyles()
  const addUUID = v4()

  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false)
  const [selectedReciped, setSelectedRecipe] = React.useState(newRecipe())

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false)
    setSelectedRecipe(newRecipe())
  }
  const agreeDeleteDialog = () => {
    const id = selectedReciped.id
    // Delete image file and document
    props.firebase.deleteFile(`/recipes/${id}/img`)
    props.firestore.delete({
      collection: "recipes",
      doc: id,
    })
    closeDeleteDialog()
  }

  let recipeItems
  // TODO: Better UI integration
  if (!isLoaded(props.recipes)) {
    recipeItems = <div>Loading...</div>
  } else if (isEmpty(props.recipes)) {
    recipeItems = <div>Recipe list is empty</div>
  } else {
    recipeItems = (
      <Grid container spacing={3}>
        {props.recipes.map(r => (
          <RecipeItem
            key={r.id}
            recipe={r}
            deleteRecipe={() => {
              setSelectedRecipe(r)
              setDeleteDialogOpen(true)
            }}
          />
        ))}
      </Grid>
    )
  }

  return (
    <React.Fragment>
      {recipeItems}
      <Fab
        size="large"
        color="secondary"
        aria-label="New"
        className={classes.fab}
        component={Link}
        to={`edit/${addUUID}`}
      >
        <AddIcon />
      </Fab>
      <RecipeDeleteDialog
        open={deleteDialogOpen}
        recipe={selectedReciped}
        onAgree={agreeDeleteDialog}
        onCancel={closeDeleteDialog}
      />
    </React.Fragment>
  )
}

function mapStateToProps(state: AppState, router: RouteComponentProps) {
  return {
    uid: state.firebase.auth.uid,
    recipes: state.firestore.ordered.recipes as Recipe[],
  }
}
export default compose<React.ComponentType>(
  // Need to pass connect first, otherwise uid is not passed into firestoreConnect
  connect(mapStateToProps),
  firestoreConnect((props: ReturnType<typeof mapStateToProps>) => {
    if (!props.uid) {
      return []
    }
    return [
      {
        collection: "recipes",
        where: ["uid", "==", props.uid],
      },
    ]
  })
)(RecipeList)
